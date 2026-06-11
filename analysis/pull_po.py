import json
from odoo_lib import search_read_all, fields_get

po = search_read_all("purchase.order",
    [["date_order", ">=", "2024-06-11"]],
    ["partner_id","state","amount_total","date_order"])
print("purchase orders 24mo:", len(po))
with open("raw_po.json","w") as f:
    json.dump(po, f, default=str)
# what is the single vendor tag?
import json as j
cats = j.load(open("raw_data.json"))["categories"]
print("vendor tag(s):", cats)
