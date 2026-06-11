# Regional Demand & Vendor Coverage Gap Analysis

**Five Star Corrugated — 24-month window: 2024-06-11 → 2026-06-11**
Source: live Odoo 18 (erp.fivestarcorr.com) via XML-RPC, read-only. Generated 2026-06-11.

## Dataset at a glance

| Metric | Value |
|---|---|
| Sale orders pulled (24 mo, all states) | 9,053 |
| Orders in last 60 days (freshness check) | 1,226 — data is live, not stale |
| Order outcomes | 8,726 won (`sale`) · 52 cancelled · 2 expired drafts · 273 open |
| Total quoted $ (US ship-to) | $119.5M |
| Total won $ (US ship-to) | $113.3M |
| Vendor records (`supplier_rank > 0`) | 1,403 total · **804 active** (≥1 PO in 24 mo) |
| Purchase orders (24 mo) | 16,691 |
| CRM leads (24 mo) | 864 (42 marked lost) — thin, used only as side signal |

**NY/NJ/PA account for 68.3% of won revenue.** The brief's premise is confirmed: vendor purchasing is overwhelmingly concentrated in the Northeast (NY-state vendors alone received $96.8M of PO volume; the next state, Massachusetts, received $7.4M).

## Gap score formula

```
coverage_weakness = 1 / (1 + 2·vendors_within_150mi + 0.5·(vendors_300mi − vendors_150mi))
loss_factor       = max(1 − win_rate, 0.05)
gap_score         = quoted_$ × coverage_weakness × loss_factor / 1000
```

- `coverage_weakness` = 1.0 with zero vendors in range, shrinking as nearby vendors appear (a 150-mi vendor counts 4× a 150–300-mi one).
- Distances are haversine miles from each region's **quote-$-weighted demand centroid** (ship-to zips geocoded with `pgeocode` offline data) to geocoded active-vendor zips.
- **Important caveat:** this Odoo instance confirms orders rather than tracking quote pipelines — win rate is 99–100% everywhere, so `loss_factor` sits at its 0.05 floor and the ranking is effectively *demand $ × coverage weakness*. Lost-quote signal does not exist in the data today (see data-quality section).

## Top 5 gap regions

| # | Region | Quotes | Won $ | Vendors ≤150 mi | ≤300 mi | Nearest vendor | 6-mo trend¹ | Gap score |
|---|---|---|---|---|---|---|---|---|
| 1 | **Colorado** (Denver metro 802xx, 86% of state $) | 177 | $2.91M | 0 | 0 | 371 mi | **1.76× — accelerating** | 153.8 |
| 2 | **Texas** (Rio Grande Valley — Pharr/Edinburg, plus Houston) | 75 | $1.84M | 0 | 0 | 423 mi² | 1.02× — steady | 92.0 |
| 3 | **Georgia** (South GA — Moultrie/Norman Park 317xx $8.0M, Lyons 304xx $1.6M) | 408 | $9.89M | 1 | 6 | 145 mi | 1.40× — growing | 90.9 |
| 4 | **Florida** | 36 | $1.13M | 0 | 0 | 493 mi | 1.43× — growing | 56.3 |
| 5 | **Wisconsin** | 36 | $1.08M | 0 | 0 | n/a³ | 0.49× — declining | 54.2 |

¹ Daily quoted-$ rate, last 6 months vs. prior 18 months. ² Texas vendor distances are overstated by bad vendor zips — see caveats. ³ Wisconsin ship-to addresses couldn't be geocoded (street text in the city field).

Also notable: **Arizona** ($1.6M quoted, no vendor within 200 mi, gap score 20.2) and **Oregon** ($0.5M, nearest vendor 490 mi) — real but smaller and flat/declining.

## Defend list — win a lot, protect the coverage

| Region | Won $ | Vendors ≤150 mi | Nearest | Trend |
|---|---|---|---|---|
| New Jersey | $35.8M | 63 | 8 mi | 1.37× |
| New York | $28.2M | 59 | 5 mi | **1.85×** |
| Pennsylvania | $13.4M | 64 | 5 mi | 1.07× |
| California (Moorpark/Ventura 930xx) | $6.5M | 6 | 32 mi | 0.34× — watch the decline |
| Maryland | $1.9M | 15 | 25 mi | 9.95× — small base but exploding; coverage is fine via the NE network |

California deserves a flag: $6.5M won with adequate vendor density (6 within 150 mi), but the 6-month trend is 0.34× — revenue is falling in a region we *can* serve. That is a sales problem, not a vendor problem.

## Recommended top-2 targets

**1. Denver / Colorado Front Range.** Highest gap score and the strongest combination of size and momentum: $3.1M quoted over 24 months, accelerating 1.76× in the last six months, and literally zero active vendors within 300 miles — the nearest is 371 miles out, well past corrugated freight economics. Demand is concentrated in Denver proper (802xx) with a secondary node in Loveland, so one or two vendor relationships in the Denver–Front Range corridor would put essentially all Colorado demand inside the 150-mile "strong" band. We are currently winning this business anyway (99%+ confirm rate), which means we're almost certainly eating freight from distant plants — a local vendor converts directly to margin.

**2. South Georgia (Moultrie–Tifton–Vidalia corridor).** Georgia is our #4 revenue state at $9.9M won, growing 1.40×, yet the demand sits in *south* Georgia (317xx alone is $8.0M) where we have zero vendors within 150 miles — the single "Georgia coverage" vendor and the 300-mile ring (Atlanta/Carolinas) sit north of the demand. This is the largest dollar exposure in the entire network: one plant relationship around Tifton/Albany/Valdosta would protect nearly $10M of growing annual revenue that today depends on out-of-region supply. Given the volume, this is arguably the *defensive* priority even though Colorado scores higher on the formula.

Texas is the #3 candidate but should wait until its vendor records are cleaned (below) — we may already have usable coverage there that the data can't prove, and the Rio Grande Valley demand node is far from any plausible existing vendor regardless.

## Data-quality findings (counts)

These gaps are themselves a deliverable — they're exactly what the vendor intelligence system needs to fix:

- **Vendor zips are the single worst field: 614 of 804 active vendors (76%) have no usable zip.** Only 144 active vendors could be geocoded, so all "vendors within X mi" counts are *understatements* of true coverage. Several Texas vendor records carry New Jersey zips (e.g. "7644", "8854") or `False` for city/zip entirely (Houston Carton, Apple Corrugated, Thomas Display).
- **Lost-quote tracking doesn't exist.** 96.4% of orders are in `sale` state; only 52 cancels and 2 stale drafts in 24 months. Win rate is therefore uninformative and the gap score degenerates to demand × coverage. If you want real win/loss signal, quotes need to be entered at `draft`/`sent` and cancelled when lost. 7 orders sit in a custom `limit` state (treated as open).
- **CRM is barely used:** 864 leads in 24 months, only 42 lost, only 17 of those with a state — included as a side note, not in scoring.
- Orders excluded/unattributed: **209 non-US ship-tos** (incl. an Indonesian cluster, $0.78M, filtered out), **618 orders missing ship-to state**, **1,432 with un-geocodable ship-to zips** (these still count in state totals via Odoo's state field where present).
- Wisconsin ship-to addresses have street text in the city field — $1.1M of demand we can't place more precisely than the state.
- Vendor capability tagging is absent: exactly **one** partner tag exists in the system ("Gluing"). We cannot distinguish corrugated plants from freight carriers or office suppliers in `res.partner`; "active vendor" (≥1 PO in 24 mo) was used as the proxy.

## Files

- `gap-analysis-data.csv` — full region table (state + metro rows), Supabase-ready: quotes/won/lost/win rate, quoted/won $, vendor counts at 150/300 mi, nearest-vendor miles, trend ratio, centroid lat/lng, gap score.
- `analysis/` — the read-only pull and scoring scripts (`odoo_lib.py`, `pull_data.py`, `pull_po.py`, `analyze.py`). Credentials live in `.env` (git-ignored).
