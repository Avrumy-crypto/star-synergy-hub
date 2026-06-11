import xmlrpc.client, os
from dotenv import load_dotenv
load_dotenv()

ODOO_URL      = os.environ["ODOO_URL"]
ODOO_DB       = os.environ["ODOO_DB"]
ODOO_USERNAME = os.environ["ODOO_USERNAME"]
ODOO_PASSWORD = os.environ["ODOO_PASSWORD"]

_common = xmlrpc.client.ServerProxy(f"{ODOO_URL}/xmlrpc/2/common")
UID = _common.authenticate(ODOO_DB, ODOO_USERNAME, ODOO_PASSWORD, {})
assert UID, "Odoo authentication failed"
_models = xmlrpc.client.ServerProxy(f"{ODOO_URL}/xmlrpc/2/object")

def execute(model, method, *args, **kw):
    return _models.execute_kw(ODOO_DB, UID, ODOO_PASSWORD, model, method, list(args), kw)

def fields_get(model):
    return execute(model, "fields_get", attributes=["string", "type"])

def search_count(model, domain):
    return execute(model, "search_count", domain)

def search_read_all(model, domain, fields, page=200, order="id"):
    out, offset = [], 0
    while True:
        batch = execute(model, "search_read", domain,
                        fields=fields, limit=page, offset=offset, order=order)
        out.extend(batch)
        if len(batch) < page:
            return out
        offset += page
