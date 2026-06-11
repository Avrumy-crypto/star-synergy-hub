import { useMemo, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
  ZAxis,
} from "recharts";
import {
  AlertTriangle,
  Crosshair,
  Database,
  Factory,
  MapPin,
  ShieldCheck,
  Target,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import {
  coverageBand,
  dataQuality,
  demandPoints,
  fmtMiles,
  fmtPct,
  fmtUsd,
  meta,
  metroRegions,
  monthly,
  nearestVendorMiles,
  Region,
  stateRegions,
  topStates,
  vendorFootprint,
  vendorPoints,
} from "./gapData";

const BAND_COLORS: Record<string, string> = {
  strong: "#16a34a",
  workable: "#d97706",
  none: "#dc2626",
};

const BAND_LABELS: Record<string, string> = {
  strong: "Strong (vendor ≤150 mi)",
  workable: "Workable (vendor ≤300 mi)",
  none: "No coverage (>300 mi)",
};

const STATE_LINE_COLORS = ["#1d4ed8", "#0891b2", "#7c3aed", "#16a34a", "#d97706", "#dc2626"];

/* ---------- small building blocks ---------- */

const KpiCard = ({
  label,
  value,
  sub,
  icon: Icon,
}: {
  label: string;
  value: string;
  sub?: string;
  icon: React.ElementType;
}) => (
  <Card>
    <CardContent className="pt-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground">{label}</p>
          <p className="text-2xl font-bold mt-1">{value}</p>
          {sub && <p className="text-xs text-muted-foreground mt-1">{sub}</p>}
        </div>
        <Icon className="h-5 w-5 text-primary mt-1" />
      </div>
    </CardContent>
  </Card>
);

const CoverageBadge = ({ region }: { region: Region }) => {
  const band = coverageBand(region);
  return (
    <Badge
      variant="outline"
      style={{ color: BAND_COLORS[band], borderColor: BAND_COLORS[band] }}
    >
      {band === "strong" ? "Strong" : band === "workable" ? "Workable" : "None"}
    </Badge>
  );
};

const TrendBadge = ({ ratio }: { ratio: number | null }) => {
  if (ratio == null) return <span className="text-muted-foreground">—</span>;
  const up = ratio >= 1.15;
  const down = ratio <= 0.85;
  return (
    <span
      className={`inline-flex items-center gap-1 ${
        up ? "text-green-600" : down ? "text-red-600" : "text-muted-foreground"
      }`}
    >
      {up ? <TrendingUp className="h-3.5 w-3.5" /> : down ? <TrendingDown className="h-3.5 w-3.5" /> : null}
      {ratio.toFixed(2)}×
    </span>
  );
};

/* ---------- overview tab ---------- */

const OverviewTab = () => {
  const topGaps = stateRegions.slice(0, 10).map((r) => ({
    name: r.region,
    gap_score: r.gap_score,
    band: coverageBand(r),
  }));

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard
          label="Quoted (24 mo, US)"
          value={fmtUsd(meta.totalQuotedUsd)}
          sub={`${meta.usOrders.toLocaleString()} orders · ${meta.uniqueShipTo} ship-to locations`}
          icon={Target}
        />
        <KpiCard
          label="Won revenue"
          value={fmtUsd(meta.totalWonUsd)}
          sub={`${meta.wonOrders.toLocaleString()} confirmed orders`}
          icon={TrendingUp}
        />
        <KpiCard
          label="NY/NJ/PA share of won $"
          value={fmtPct(meta.coreShareWonUsd)}
          sub="Everything else rides long freight"
          icon={MapPin}
        />
        <KpiCard
          label="Active vendors"
          value={`${meta.vendorsActive}`}
          sub={`of ${meta.vendorsTotal} records · only ${meta.vendorsGeocoded} geocodable`}
          icon={Factory}
        />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Gap score by state</CardTitle>
            <CardDescription>
              quoted $ × coverage weakness × loss factor — red/amber bars are demand we serve
              without nearby vendors
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={360}>
              <BarChart data={topGaps} layout="vertical" margin={{ left: 24 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" />
                <YAxis type="category" dataKey="name" width={96} tick={{ fontSize: 12 }} />
                <Tooltip formatter={(v: number) => [v.toFixed(1), "Gap score"]} />
                <Bar dataKey="gap_score" radius={[0, 4, 4, 0]}>
                  {topGaps.map((g) => (
                    <Cell key={g.name} fill={BAND_COLORS[g.band]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            <div className="flex flex-wrap gap-4 mt-2 text-xs text-muted-foreground">
              {Object.entries(BAND_LABELS).map(([band, label]) => (
                <span key={band} className="inline-flex items-center gap-1.5">
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ background: BAND_COLORS[band] }}
                  />
                  {label}
                </span>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Monthly quoted $ — total</CardTitle>
            <CardDescription>
              {meta.windowStart} → {meta.windowEnd}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={360}>
              <AreaChart data={monthly}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                <YAxis tickFormatter={(v) => fmtUsd(v)} tick={{ fontSize: 11 }} />
                <Tooltip formatter={(v: number) => fmtUsd(v)} />
                <Area
                  type="monotone"
                  dataKey="quoted_usd"
                  name="Quoted $"
                  stroke="#1d4ed8"
                  fill="#1d4ed8"
                  fillOpacity={0.15}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Monthly quoted $ by top state</CardTitle>
          <CardDescription>
            Watch Georgia and Colorado climbing while California fades
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={320}>
            <AreaChart data={monthly}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis tickFormatter={(v) => fmtUsd(v)} tick={{ fontSize: 11 }} />
              <Tooltip formatter={(v: number) => fmtUsd(v)} />
              <Legend />
              {topStates.map((st, i) => (
                <Area
                  key={st}
                  type="monotone"
                  dataKey={st}
                  stackId="states"
                  stroke={STATE_LINE_COLORS[i]}
                  fill={STATE_LINE_COLORS[i]}
                  fillOpacity={0.35}
                />
              ))}
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

/* ---------- map tab ---------- */

const MapTab = () => {
  const demand = useMemo(
    () =>
      demandPoints.map((d) => {
        const nearest = nearestVendorMiles(d.lat, d.lng);
        return {
          ...d,
          nearest,
          band: nearest <= 150 ? "strong" : nearest <= 300 ? "workable" : "none",
          size: Math.max(40, Math.sqrt(d.quoted_usd) / 8),
        };
      }),
    []
  );

  const uncovered = demand
    .filter((d) => d.band === "none")
    .reduce((s, d) => s + d.quoted_usd, 0);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Demand vs. vendor coverage map</CardTitle>
          <CardDescription>
            Bubbles = customer demand by zip3 (sized by quoted $, colored by distance to the
            nearest geocoded active vendor). Squares = active vendors. {fmtUsd(uncovered)} of
            quoted demand sits more than 300 miles from any verified vendor.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={520}>
            <ScatterChart margin={{ top: 8, right: 8, bottom: 8, left: 8 }}>
              <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.4} />
              <XAxis
                type="number"
                dataKey="lng"
                domain={[-126, -66]}
                hide
              />
              <YAxis type="number" dataKey="lat" domain={[24, 50]} hide />
              <ZAxis dataKey="size" range={[40, 900]} />
              <Tooltip
                cursor={{ strokeDasharray: "3 3" }}
                content={({ payload }) => {
                  const p = payload?.[0]?.payload;
                  if (!p) return null;
                  return (
                    <div className="rounded-md border bg-background p-3 text-sm shadow-md">
                      {p.zip3 ? (
                        <>
                          <p className="font-semibold">
                            {p.city || p.zip3} ({p.zip3}xx), {p.state}
                          </p>
                          <p>{fmtUsd(p.quoted_usd)} quoted · {p.orders} orders</p>
                          <p className="text-muted-foreground">
                            nearest vendor {fmtMiles(p.nearest)}
                          </p>
                        </>
                      ) : (
                        <>
                          <p className="font-semibold">{p.name}</p>
                          <p>
                            {p.city}, {p.state} · {p.po_count} POs · {fmtUsd(p.po_total)}
                          </p>
                        </>
                      )}
                    </div>
                  );
                }}
              />
              {(["strong", "workable", "none"] as const).map((band) => (
                <Scatter
                  key={band}
                  name={BAND_LABELS[band]}
                  data={demand.filter((d) => d.band === band)}
                  fill={BAND_COLORS[band]}
                  fillOpacity={0.55}
                />
              ))}
              <Scatter
                name="Active vendor"
                data={vendorPoints.map((v) => ({ ...v, size: 60 }))}
                fill="#0f172a"
                shape="square"
                fillOpacity={0.85}
              />
              <Legend />
            </ScatterChart>
          </ResponsiveContainer>
          <p className="text-xs text-muted-foreground mt-2">
            Geographic approximation: longitude/latitude plotted directly. 76% of active
            vendors are missing zip codes, so coverage shown here is an undercount.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

/* ---------- regions tab ---------- */

type SortKey = "gap_score" | "quoted_usd" | "won_usd" | "quotes" | "nearest_vendor_mi" | "trend_ratio";

const RegionsTab = () => {
  const [level, setLevel] = useState<"state" | "metro">("state");
  const [sortKey, setSortKey] = useState<SortKey>("gap_score");
  const [query, setQuery] = useState("");

  const rows = useMemo(() => {
    const base = level === "state" ? stateRegions : metroRegions;
    return base
      .filter((r) => r.region.toLowerCase().includes(query.toLowerCase()))
      .slice()
      .sort((a, b) => ((b[sortKey] ?? -1) as number) - ((a[sortKey] ?? -1) as number));
  }, [level, sortKey, query]);

  const headers: { key: SortKey | null; label: string; align?: string }[] = [
    { key: null, label: "Region" },
    { key: "quotes", label: "Quotes" },
    { key: "quoted_usd", label: "Quoted $" },
    { key: "won_usd", label: "Won $" },
    { key: null, label: "Win rate" },
    { key: "trend_ratio", label: "6-mo trend" },
    { key: null, label: "Vendors ≤150/300 mi" },
    { key: "nearest_vendor_mi", label: "Nearest vendor" },
    { key: null, label: "Coverage" },
    { key: "gap_score", label: "Gap score" },
  ];

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <CardTitle>Region explorer</CardTitle>
            <CardDescription>Click a column header to sort</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Input
              placeholder="Filter regions…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-44"
            />
            <Button
              variant={level === "state" ? "default" : "outline"}
              size="sm"
              onClick={() => setLevel("state")}
            >
              States
            </Button>
            <Button
              variant={level === "metro" ? "default" : "outline"}
              size="sm"
              onClick={() => setLevel("metro")}
            >
              Metros
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                {headers.map((h) => (
                  <TableHead
                    key={h.label}
                    className={h.key ? "cursor-pointer select-none whitespace-nowrap" : "whitespace-nowrap"}
                    onClick={h.key ? () => setSortKey(h.key as SortKey) : undefined}
                  >
                    {h.label}
                    {h.key === sortKey ? " ↓" : ""}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((r) => (
                <TableRow key={r.region}>
                  <TableCell className="font-medium whitespace-nowrap">{r.region}</TableCell>
                  <TableCell>{r.quotes}</TableCell>
                  <TableCell>{fmtUsd(r.quoted_usd)}</TableCell>
                  <TableCell>{fmtUsd(r.won_usd)}</TableCell>
                  <TableCell>{fmtPct(r.win_rate)}</TableCell>
                  <TableCell>
                    <TrendBadge ratio={r.trend_ratio} />
                  </TableCell>
                  <TableCell className="text-center">
                    {r.vendors_150mi} / {r.vendors_300mi}
                  </TableCell>
                  <TableCell>{fmtMiles(r.nearest_vendor_mi)}</TableCell>
                  <TableCell>
                    <CoverageBadge region={r} />
                  </TableCell>
                  <TableCell className="font-semibold">{r.gap_score.toFixed(1)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

/* ---------- vendors tab ---------- */

const VendorsTab = () => {
  const footprint = vendorFootprint.slice(0, 14).map((f) => ({
    ...f,
    missing: f.vendors - f.geocoded,
  }));
  const topVendors = vendorPoints
    .slice()
    .sort((a, b) => b.po_total - a.po_total)
    .slice(0, 15);

  return (
    <div className="space-y-6">
      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Active vendor footprint by state</CardTitle>
            <CardDescription>
              Vendors with ≥1 purchase order in 24 months; grey = records we can't geocode
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={380}>
              <BarChart data={footprint} layout="vertical" margin={{ left: 30 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" />
                <YAxis type="category" dataKey="state" width={100} tick={{ fontSize: 12 }} />
                <Tooltip />
                <Legend />
                <Bar dataKey="geocoded" name="Geocodable" stackId="v" fill="#1d4ed8" />
                <Bar dataKey="missing" name="Missing zip" stackId="v" fill="#94a3b8" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top vendors by 24-mo purchase volume</CardTitle>
            <CardDescription>Geocodable active vendors only</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Vendor</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead className="text-right">POs</TableHead>
                  <TableHead className="text-right">PO $</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topVendors.map((v) => (
                  <TableRow key={v.name}>
                    <TableCell className="font-medium">{v.name}</TableCell>
                    <TableCell className="text-muted-foreground">
                      {[v.city, v.state].filter(Boolean).join(", ")}
                    </TableCell>
                    <TableCell className="text-right">{v.po_count}</TableCell>
                    <TableCell className="text-right">{fmtUsd(v.po_total)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <Card className="border-amber-300 bg-amber-50/50 dark:bg-amber-950/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-amber-700 dark:text-amber-400">
            <Database className="h-5 w-5" /> Data quality — what the vendor intelligence
            system must fix
          </CardTitle>
        </CardHeader>
        <CardContent className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
          <div>
            <p className="text-2xl font-bold">{dataQuality.activeVendorsMissingZip}</p>
            <p className="text-muted-foreground">
              of {meta.vendorsActive} active vendors have no usable zip (76%) — every coverage
              number on this dashboard is an undercount
            </p>
          </div>
          <div>
            <p className="text-2xl font-bold">{dataQuality.cancelledOrders}</p>
            <p className="text-muted-foreground">
              cancelled orders in 24 months — lost quotes aren't tracked, so win rate (~99%)
              carries no signal
            </p>
          </div>
          <div>
            <p className="text-2xl font-bold">{dataQuality.ordersMissingState}</p>
            <p className="text-muted-foreground">orders missing a ship-to state entirely</p>
          </div>
          <div>
            <p className="text-2xl font-bold">{dataQuality.ordersUngeocodableZip}</p>
            <p className="text-muted-foreground">US orders with un-geocodable ship-to zips</p>
          </div>
          <div>
            <p className="text-2xl font-bold">{dataQuality.crmLeadsLost}</p>
            <p className="text-muted-foreground">
              lost CRM leads in 24 months ({dataQuality.crmLeads} leads total) — CRM is barely
              used as a demand signal
            </p>
          </div>
          <div>
            <p className="text-2xl font-bold">{dataQuality.vendorTags.length}</p>
            <p className="text-muted-foreground">
              vendor capability tag exists in all of Odoo ("{dataQuality.vendorTags[0]}") — we
              can't tell corrugated plants from freight carriers
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

/* ---------- action plan tab ---------- */

const planTargets = [
  {
    title: "1 · Denver / Colorado Front Range",
    icon: Target,
    tone: "border-red-300",
    points: [
      "$3.1M quoted, accelerating 1.76× in the last 6 months",
      "Zero vendors within 300 mi — nearest is 371 mi out",
      "Demand concentrated in Denver (802xx) + Loveland (805xx): 1–2 plant relationships cover the whole state",
      "We already win this business on long freight — a local vendor converts directly to margin",
    ],
  },
  {
    title: "2 · South Georgia (Moultrie–Tifton–Vidalia)",
    icon: Target,
    tone: "border-red-300",
    points: [
      "#4 revenue state: $9.9M won, growing 1.40×",
      "Demand sits in SOUTH Georgia (317xx alone = $8.0M) — zero vendors within 150 mi of it",
      "Largest single dollar exposure in the network; a Tifton/Albany/Valdosta plant protects ~$10M/yr",
      "Defensive priority even though Colorado scores higher on the formula",
    ],
  },
  {
    title: "3 · Texas (watch — clean data first)",
    icon: AlertTriangle,
    tone: "border-amber-300",
    points: [
      "$1.8M quoted, steady; demand node is the Rio Grande Valley (Pharr/Edinburg)",
      "Vendor records are too dirty to trust: NJ zips on TX vendors, missing cities",
      "May already have usable coverage that the data can't prove — fix records before investing",
    ],
  },
];

const defendList = stateRegions
  .filter((r) => ["New Jersey", "New York", "Pennsylvania", "Maryland"].includes(r.region))
  .sort((a, b) => b.won_usd - a.won_usd);

const ActionPlanTab = () => (
  <div className="space-y-6">
    <div className="grid lg:grid-cols-3 gap-6">
      {planTargets.map((t) => (
        <Card key={t.title} className={t.tone}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <t.icon className="h-5 w-5 text-primary" /> {t.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-4">
              {t.points.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      ))}
    </div>

    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ShieldCheck className="h-5 w-5 text-green-600" /> Defend — core regions to protect
        </CardTitle>
        <CardDescription>
          {fmtPct(meta.coreShareWonUsd)} of won revenue comes from NY/NJ/PA where vendor density
          is excellent. California is the one to watch: adequate coverage but revenue fading.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Region</TableHead>
              <TableHead>Won $</TableHead>
              <TableHead>Vendors ≤150 mi</TableHead>
              <TableHead>Nearest vendor</TableHead>
              <TableHead>6-mo trend</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {defendList.map((r) => (
              <TableRow key={r.region}>
                <TableCell className="font-medium">{r.region}</TableCell>
                <TableCell>{fmtUsd(r.won_usd)}</TableCell>
                <TableCell>{r.vendors_150mi}</TableCell>
                <TableCell>{fmtMiles(r.nearest_vendor_mi)}</TableCell>
                <TableCell>
                  <TrendBadge ratio={r.trend_ratio} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>

    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Crosshair className="h-5 w-5 text-primary" /> Scoring formula
        </CardTitle>
      </CardHeader>
      <CardContent className="text-sm text-muted-foreground space-y-2">
        <pre className="bg-muted rounded-md p-4 text-xs overflow-x-auto text-foreground">
{`coverage_weakness = 1 / (1 + 2·vendors_150mi + 0.5·(vendors_300mi − vendors_150mi))
loss_factor       = max(1 − win_rate, 0.05)
gap_score         = quoted_$ × coverage_weakness × loss_factor / 1000`}
        </pre>
        <p>
          Because this Odoo instance confirms orders rather than tracking quote pipelines, win
          rate is ~99% everywhere and the loss factor sits at its floor — the ranking is
          effectively <em>demand $ × coverage weakness</em>. Start recording lost quotes to
          unlock the third factor.
        </p>
      </CardContent>
    </Card>
  </div>
);

/* ---------- page shell ---------- */

const GapDashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">
            Five Star Corrugated — Regional Demand &amp; Vendor Coverage
          </h1>
          <p className="text-muted-foreground mt-1">
            24-month Odoo history ({meta.windowStart} → {meta.windowEnd}), generated{" "}
            {meta.generated}. Read-only analysis — coverage measured by freight distance, not
            state lines. Internal use only.
          </p>
        </div>
        <Tabs defaultValue="overview">
          <TabsList className="mb-6 flex-wrap h-auto">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="map">Coverage Map</TabsTrigger>
            <TabsTrigger value="regions">Regions</TabsTrigger>
            <TabsTrigger value="vendors">Vendors &amp; Data</TabsTrigger>
            <TabsTrigger value="plan">Action Plan</TabsTrigger>
          </TabsList>
          <TabsContent value="overview">
            <OverviewTab />
          </TabsContent>
          <TabsContent value="map">
            <MapTab />
          </TabsContent>
          <TabsContent value="regions">
            <RegionsTab />
          </TabsContent>
          <TabsContent value="vendors">
            <VendorsTab />
          </TabsContent>
          <TabsContent value="plan">
            <ActionPlanTab />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default GapDashboard;
