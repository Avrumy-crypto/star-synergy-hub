import json, math, re
import pandas as pd
import numpy as np
import pgeocode

raw = json.load(open("raw_data.json"))
pos = json.load(open("raw_po.json"))
TODAY = pd.Timestamp("2026-06-11")
EXPIRY_CUTOFF = TODAY - pd.Timedelta(days=90)
LAST6 = TODAY - pd.Timedelta(days=182)

nomi = pgeocode.Nominatim("us")

def clean_zip(z):
    if not z: return None
    m = re.match(r"\s*(\d{5})", str(z))
    return m.group(1) if m else None

# ---- partners (ship-to) ----
pdf = pd.DataFrame(raw["partners"])
pdf["zip5"] = pdf["zip"].apply(clean_zip)
pdf["state_name"] = pdf["state_id"].apply(lambda v: v[1] if v else None)
pdf["country"] = pdf["country_id"].apply(lambda v: v[1] if v else None)
geo = nomi.query_postal_code(pdf["zip5"].fillna("00000").tolist())
pdf["lat"], pdf["lng"] = geo["latitude"].values, geo["longitude"].values
pdf["geo_state"] = geo["state_name"].values
pdf["state_final"] = pdf["state_name"].fillna(pdf["geo_state"])
pmap = pdf.set_index("id")[["zip5","city","state_final","country","lat","lng"]].to_dict("index")

# ---- orders ----
odf = pd.DataFrame(raw["orders"])
odf["date_order"] = pd.to_datetime(odf["date_order"])
odf["ship_id"] = odf["partner_shipping_id"].apply(lambda v: v[0] if v else None)
for col in ["zip5","city","state_final","country","lat","lng"]:
    odf[col] = odf["ship_id"].map(lambda i: pmap.get(i, {}).get(col))
def outcome(r):
    if r["state"] in ("sale","done"): return "won"
    if r["state"] == "cancel": return "lost"
    if r["state"] in ("draft","sent") and r["date_order"] < EXPIRY_CUTOFF: return "expired"
    return "open"
odf["outcome"] = odf.apply(outcome, axis=1)
odf["is_last6"] = odf["date_order"] >= LAST6
us = odf[(odf["country"].isin(["United States", None])) | odf["country"].isna()].copy()
non_us = len(odf) - len(us)

# ---- vendors + PO activity ----
vdf = pd.DataFrame(raw["vendors"])
vdf["zip5"] = vdf["zip"].apply(clean_zip)
vdf["state_name"] = vdf["state_id"].apply(lambda v: v[1] if v else None)
vdf["country"] = vdf["country_id"].apply(lambda v: v[1] if v else None)
podf = pd.DataFrame(pos)
podf["vid"] = podf["partner_id"].apply(lambda v: v[0] if v else None)
po_agg = podf.groupby("vid").agg(po_count=("vid","size"), po_total=("amount_total","sum"))
vdf = vdf.merge(po_agg, left_on="id", right_index=True, how="left")
vdf["po_count"] = vdf["po_count"].fillna(0)
vdf["active"] = vdf["po_count"] > 0
vgeo = nomi.query_postal_code(vdf["zip5"].fillna("00000").tolist())
vdf["lat"], vdf["lng"] = vgeo["latitude"].values, vgeo["longitude"].values
av = vdf[vdf["active"] & vdf["lat"].notna() & (vdf["country"].isin(["United States"]) | vdf["country"].isna())].copy()

def haversine(lat1, lng1, lat2, lng2):
    R = 3958.8
    p1, p2 = np.radians(lat1), np.radians(lat2)
    dp, dl = np.radians(lat2-lat1), np.radians(lng2-lng1)
    a = np.sin(dp/2)**2 + np.cos(p1)*np.cos(p2)*np.sin(dl/2)**2
    return 2*R*np.arcsin(np.sqrt(a))

VLAT, VLNG = av["lat"].values, av["lng"].values

# ---- leads (lost) by state ----
ldf = pd.DataFrame(raw["leads"])
ldf["state_name"] = ldf["state_id"].apply(lambda v: v[1] if v else None)
ldf["lost"] = (~ldf["active"].astype(bool)) & (ldf["probability"] == 0)
lost_leads = ldf[ldf["lost"]].groupby("state_name").size().to_dict()

# ---- region aggregation ----
def agg_region(df, label, level):
    g = df
    won = g[g.outcome=="won"]; lost = g[g.outcome.isin(["lost","expired"])]
    denom = len(won)+len(lost)
    win_rate = len(won)/denom if denom else np.nan
    glat = g.dropna(subset=["lat"])
    if len(glat):
        w = glat["amount_total"].clip(lower=1)
        clat = float(np.average(glat["lat"], weights=w)); clng = float(np.average(glat["lng"], weights=w))
        d = haversine(clat, clng, VLAT, VLNG)
        v150, v300 = int((d<=150).sum()), int((d<=300).sum())
        nearest = float(d.min()) if len(d) else np.nan
    else:
        clat=clng=np.nan; v150=v300=0; nearest=np.nan
    last6 = g[g.is_last6]["amount_total"].sum()
    prior = g[~g.is_last6]["amount_total"].sum()
    return dict(region=label, level=level,
        quotes=len(g), won=len(won), lost_expired=len(lost), open=len(g)-len(won)-len(lost),
        win_rate=round(win_rate,3) if denom else None,
        quoted_usd=round(g["amount_total"].sum(),0), won_usd=round(won["amount_total"].sum(),0),
        won_margin_usd=round(won["margin"].sum(),0),
        last6_quoted_usd=round(last6,0),
        trend_ratio=round((last6/182)/(prior/548),2) if prior>0 else None,
        vendors_150mi=v150, vendors_300mi=v300,
        nearest_vendor_mi=round(nearest,0) if not np.isnan(nearest) else None,
        lost_crm_leads=lost_leads.get(label.split(" / ")[0], 0) if level=="state" else None,
        centroid_lat=round(clat,3) if not np.isnan(clat) else None,
        centroid_lng=round(clng,3) if not np.isnan(clng) else None)

rows = []
usd = us[us["state_final"].notna() & us["state_final"].str.endswith("(US)")]
for st, g in usd.groupby("state_final"):
    rows.append(agg_region(g, st, "state"))
    if g["amount_total"].sum() > 2_000_000:  # metro split for high-volume states
        g2 = g.dropna(subset=["zip5"]).copy()
        g2["zip3"] = g2["zip5"].str[:3]
        for z3, gz in g2.groupby("zip3"):
            if len(gz) >= 20:
                city = gz["city"].mode().iloc[0] if len(gz["city"].mode()) else z3
                rows.append(agg_region(gz, f"{st} / {city} ({z3}xx)", "metro"))

reg = pd.DataFrame(rows)

# ---- gap score ----
# coverage_weakness = 1 / (1 + 2*v150 + 0.5*(v300 - v150))  -> 1.0 with zero coverage, shrinks with nearby vendors
# loss_factor = max(1 - win_rate, 0.05)
# gap_score = quoted_usd * coverage_weakness * loss_factor / 1000  (in "gap points")
reg["coverage_weakness"] = 1/(1 + 2*reg["vendors_150mi"] + 0.5*(reg["vendors_300mi"]-reg["vendors_150mi"]))
reg["loss_factor"] = (1-reg["win_rate"].fillna(0.5)).clip(lower=0.05)
reg["gap_score"] = (reg["quoted_usd"]*reg["coverage_weakness"]*reg["loss_factor"]/1000).round(1)
reg = reg.sort_values("gap_score", ascending=False)
reg.to_csv("../gap-analysis-data.csv", index=False)

# ---- console summary ----
pd.set_option("display.width", 250)
print("=== DATA QUALITY ===")
print("orders total:", len(odf), "| non-US ship-to:", non_us,
      "| missing ship-to state:", int(us['state_final'].isna().sum()),
      "| missing/un-geocodable ship-to zip:", int(us['lat'].isna().sum()))
print("vendors total:", len(vdf), "| active (>=1 PO in 24mo):", int(vdf['active'].sum()),
      "| active w/ usable US zip:", len(av),
      "| active missing zip:", int((vdf['active'] & vdf['zip5'].isna()).sum()))
print("order outcomes:", odf['outcome'].value_counts().to_dict())
print("lost CRM leads w/ state:", sum(lost_leads.values()), "of", int(ldf['lost'].sum()))
print("\n=== TOP 12 GAP REGIONS (state level) ===")
cols = ["region","quotes","won","lost_expired","win_rate","quoted_usd","won_usd","vendors_150mi","vendors_300mi","nearest_vendor_mi","trend_ratio","gap_score"]
print(reg[reg.level=="state"][cols].head(12).to_string(index=False))
print("\n=== TOP 8 METRO GAPS ===")
print(reg[reg.level=="metro"][cols].head(8).to_string(index=False))
print("\n=== DEFEND LIST (top won $, strong coverage) ===")
d = reg[reg.level=="state"].sort_values("won_usd", ascending=False).head(8)
print(d[["region","won","win_rate","won_usd","vendors_150mi","vendors_300mi","nearest_vendor_mi","trend_ratio"]].to_string(index=False))
print("\n=== ACTIVE VENDOR FOOTPRINT (by state) ===")
print(av.groupby("state_name").agg(vendors=("id","size"), po_total=("po_total","sum")).sort_values("po_total",ascending=False).head(12).to_string())
