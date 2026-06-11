import json
from odoo_lib import search_read_all, execute, search_count

SINCE = "2024-06-11"

# ---- Phase 1: orders ----
orders = search_read_all(
    "sale.order",
    [["date_order", ">=", SINCE]],
    ["name","state","date_order","amount_total","amount_untaxed","margin",
     "partner_id","partner_shipping_id"],
)
print("orders pulled:", len(orders))

# staleness check
recent = search_count("sale.order", [["date_order", ">=", "2026-04-12"]])
print("orders in last 60 days:", recent)

# resolve unique ship-to partners
ship_ids = sorted({o["partner_shipping_id"][0] for o in orders if o["partner_shipping_id"]})
print("unique ship-to partners:", len(ship_ids))
partners = []
for i in range(0, len(ship_ids), 200):
    partners.extend(execute("res.partner", "read", ship_ids[i:i+200],
                            fields=["id","name","city","zip","state_id","country_id"]))
print("partners read:", len(partners))

# ---- crm.lead incl. lost (active=False) ----
leads = search_read_all(
    "crm.lead",
    ["&", ["create_date", ">=", SINCE], "|", ["active", "=", True], ["active", "=", False]],
    ["name","create_date","active","probability","expected_revenue","lost_reason_id",
     "stage_id","state_id","zip","city","partner_id","country_id"],
)
print("crm leads pulled (incl. lost):", len(leads))

# ---- Phase 2: vendors ----
vendors = search_read_all(
    "res.partner",
    [["supplier_rank", ">", 0]],
    ["name","city","zip","state_id","country_id","category_id","supplier_rank","type","parent_id"],
)
print("vendors pulled:", len(vendors))
cat_ids = sorted({c for v in vendors for c in v["category_id"]})
cats = execute("res.partner.category", "read", cat_ids, fields=["id","name"]) if cat_ids else []
print("vendor tags:", len(cats))

with open("raw_data.json","w") as f:
    json.dump({"orders":orders,"partners":partners,"leads":leads,
               "vendors":vendors,"categories":cats}, f, default=str)
print("saved raw_data.json")

# date coverage summary
dates = sorted(o["date_order"] for o in orders)
from collections import Counter
states = Counter(o["state"] for o in orders)
print("date range:", dates[0], "->", dates[-1])
print("order states:", dict(states))
