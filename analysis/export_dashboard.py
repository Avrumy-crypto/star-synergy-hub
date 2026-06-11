"""Export aggregated gap-analysis data to dashboard/gap-dashboard.json for the web dashboard."""
import json, re
import pandas as pd
import numpy as np
import pgeocode

raw = json.load(open("raw_data.json"))
pos = json.load(open("raw_po.json"))
reg = pd.read_csv("../gap-analysis-data.csv")

TODAY = pd.Timestamp("2026-06-11")
nomi = pgeocode.Nominatim("us")

def clean_zip(z):
    if not z: return None
    m = re.match(r"\s*(\d{5})", str(z))
    return m.group(1) if m else None

# ---- partners / orders (same prep as analyze.py) ----
pdf = pd.DataFrame(raw["partners"])
pdf["zip5"] = pdf["zip"].apply(clean_zip)
pdf["state_name"] = pdf["state_id"].apply(lambda v: v[1] if v else None)
pdf["country"] = pdf["country_id"].apply(lambda v: v[1] if v else None)
geo = nomi.query_postal_code(pdf["zip5"].fillna("00000").tolist())
pdf["lat"], pdf["lng"] = geo["latitude"].values, geo["longitude"].values
pdf["geo_state"] = geo["state_name"].values
pdf["state_final"] = pdf["state_name"].fillna(pdf["geo_state"])
pmap = pdf.set_index("id")[["zip5","city","state_final","country","lat","lng"]].to_dict("index")

odf = pd.DataFrame(raw["orders"])
odf["date_order"] = pd.to_datetime(odf["date_order"])
odf["month"] = odf["date_order"].dt.strftime("%Y-%m")
odf["ship_id"] = odf["partner_shipping_id"].apply(lambda v: v[0] if v else None)
for col in ["zip5","city","state_final","country","lat","lng"]:
    odf[col] = odf["ship_id"].map(lambda i: pmap.get(i, {}).get(col))
odf["won"] = odf["state"].isin(["sale","done"])
us = odf[odf["state_final"].notna() & odf["state_final"].astype(str).str.endswith("(US)")].copy()
us["state_short"] = us["state_final"].str.replace(" (US)", "", regex=False)

# monthly series, overall + top states
monthly = (us.groupby("month")
    .agg(quoted_usd=("amount_total","sum"),
         won_usd=("amount_total", lambda s: float(s[us.loc[s.index,"won"]].sum())),
         orders=("id","size")).reset_index())
top_states = (us.groupby("state_short")["amount_total"].sum()
              .sort_values(ascending=False).head(6).index.tolist())
for st in top_states:
    m = us[us.state_short==st].groupby("month")["amount_total"].sum()
    monthly[st] = monthly["month"].map(m).fillna(0)
monthly = monthly.round(0)

# demand points (zip3 aggregate, for map)
dz = us.dropna(subset=["lat"]).copy()
dz["zip3"] = dz["zip5"].str[:3]
demand_points = (dz.groupby("zip3")
    .agg(lat=("lat","mean"), lng=("lng","mean"),
         quoted_usd=("amount_total","sum"), orders=("id","size"),
         state=("state_short", lambda s: s.mode().iloc[0]),
         city=("city", lambda s: s.dropna().mode().iloc[0] if len(s.dropna()) else ""))
    .reset_index().round({"lat":3,"lng":3,"quoted_usd":0}))

# vendors
vdf = pd.DataFrame(raw["vendors"])
vdf["zip5"] = vdf["zip"].apply(clean_zip)
vdf["state_name"] = vdf["state_id"].apply(lambda v: (v[1] or "").replace(" (US)","") if v else None)
vdf["country"] = vdf["country_id"].apply(lambda v: v[1] if v else None)
podf = pd.DataFrame(pos)
podf["vid"] = podf["partner_id"].apply(lambda v: v[0] if v else None)
po_agg = podf.groupby("vid").agg(po_count=("vid","size"), po_total=("amount_total","sum"))
vdf = vdf.merge(po_agg, left_on="id", right_index=True, how="left")
vdf["po_count"] = vdf["po_count"].fillna(0); vdf["po_total"] = vdf["po_total"].fillna(0)
vdf["active"] = vdf["po_count"] > 0
vg = nomi.query_postal_code(vdf["zip5"].fillna("00000").tolist())
vdf["lat"], vdf["lng"] = vg["latitude"].values, vg["longitude"].values
av = vdf[vdf["active"] & vdf["lat"].notna() &
         (vdf["country"].isin(["United States"]) | vdf["country"].isna())]
vendor_points = av[["name","city","state_name","lat","lng","po_count","po_total"]]\
    .round({"lat":3,"lng":3,"po_total":0}).rename(columns={"state_name":"state"})

footprint = (vdf[vdf.active & vdf.state_name.notna()].groupby("state_name")
    .agg(vendors=("id","size"), po_total=("po_total","sum"), geocoded=("lat", lambda s: int(s.notna().sum())))
    .reset_index().rename(columns={"state_name":"state"})
    .sort_values("po_total", ascending=False).round({"po_total":0}))

regions = reg.copy()
regions["region"] = regions["region"].str.replace(" (US)", "", regex=False)

out = {
  "meta": {
    "generated": str(TODAY.date()), "windowStart": "2024-06-11", "windowEnd": "2026-06-11",
    "totalOrders": int(len(odf)), "usOrders": int(len(us)),
    "totalQuotedUsd": float(us["amount_total"].sum().round(0)),
    "totalWonUsd": float(us[us.won]["amount_total"].sum().round(0)),
    "wonOrders": int(us["won"].sum()),
    "vendorsTotal": int(len(vdf)), "vendorsActive": int(vdf["active"].sum()),
    "vendorsGeocoded": int(len(av)),
    "uniqueShipTo": int(us["ship_id"].nunique()),
    "coreShareWonUsd": float((us[us.state_short.isin(["New Jersey","New York","Pennsylvania"]) & us.won]["amount_total"].sum()
                              / us[us.won]["amount_total"].sum()).round(3)),
  },
  "monthly": monthly.to_dict("records"),
  "topStates": top_states,
  "regions": json.loads(regions.to_json(orient="records")),
  "demandPoints": demand_points.to_dict("records"),
  "vendorPoints": vendor_points.to_dict("records"),
  "vendorFootprint": footprint.to_dict("records"),
  "dataQuality": {
    "nonUsOrders": int((~odf["country"].isin(["United States"]) & odf["country"].notna()).sum()),
    "ordersMissingState": int(odf["state_final"].isna().sum()),
    "ordersUngeocodableZip": int(us["lat"].isna().sum()),
    "activeVendorsMissingZip": int((vdf["active"] & vdf["zip5"].isna()).sum()),
    "cancelledOrders": int((odf["state"]=="cancel").sum()),
    "draftOrders": int(odf["state"].isin(["draft","sent"]).sum()),
    "crmLeads": len(raw["leads"]),
    "crmLeadsLost": int(sum(1 for l in raw["leads"] if not l["active"] and l["probability"]==0)),
    "vendorTags": [c["name"] for c in raw["categories"]],
  },
}
import os
import re as _re
payload = json.dumps(out, default=str)
payload = _re.sub(r"\bNaN\b", "null", payload)  # strict JSON for the Vite importer
with open("../dashboard/gap-dashboard.json","w") as f:
    f.write(payload)
print("wrote dashboard/gap-dashboard.json")
print({k: (len(v) if isinstance(v,list) else "...") for k,v in out.items()})
