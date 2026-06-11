import dashboard from "@/data/gap-dashboard.json";

export interface Region {
  region: string;
  level: "state" | "metro";
  quotes: number;
  won: number;
  lost_expired: number;
  open: number;
  win_rate: number | null;
  quoted_usd: number;
  won_usd: number;
  won_margin_usd: number;
  last6_quoted_usd: number;
  trend_ratio: number | null;
  vendors_150mi: number;
  vendors_300mi: number;
  nearest_vendor_mi: number | null;
  lost_crm_leads: number | null;
  centroid_lat: number | null;
  centroid_lng: number | null;
  coverage_weakness: number;
  loss_factor: number;
  gap_score: number;
}

export interface DemandPoint {
  zip3: string;
  lat: number;
  lng: number;
  quoted_usd: number;
  orders: number;
  state: string;
  city: string;
}

export interface VendorPoint {
  name: string;
  city: string | null;
  state: string | null;
  lat: number;
  lng: number;
  po_count: number;
  po_total: number;
}

export interface MonthlyRow {
  month: string;
  quoted_usd: number;
  won_usd: number;
  orders: number;
  [state: string]: string | number;
}

export const meta = dashboard.meta;
export const monthly = dashboard.monthly as MonthlyRow[];
export const topStates = dashboard.topStates as string[];
export const regions = dashboard.regions as Region[];
export const demandPoints = dashboard.demandPoints as DemandPoint[];
export const vendorPoints = dashboard.vendorPoints as VendorPoint[];
export const vendorFootprint = dashboard.vendorFootprint as {
  state: string;
  vendors: number;
  po_total: number;
  geocoded: number;
}[];
export const dataQuality = dashboard.dataQuality;

export const stateRegions = regions.filter((r) => r.level === "state");
export const metroRegions = regions.filter((r) => r.level === "metro");

const EARTH_RADIUS_MI = 3958.8;
export function haversineMiles(lat1: number, lng1: number, lat2: number, lng2: number) {
  const rad = Math.PI / 180;
  const dLat = (lat2 - lat1) * rad;
  const dLng = (lng2 - lng1) * rad;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * rad) * Math.cos(lat2 * rad) * Math.sin(dLng / 2) ** 2;
  return 2 * EARTH_RADIUS_MI * Math.asin(Math.sqrt(a));
}

export function nearestVendorMiles(lat: number, lng: number) {
  let best = Infinity;
  for (const v of vendorPoints) {
    const d = haversineMiles(lat, lng, v.lat, v.lng);
    if (d < best) best = d;
  }
  return best;
}

export const fmtUsd = (n: number | null | undefined) =>
  n == null
    ? "—"
    : n >= 1_000_000
      ? `$${(n / 1_000_000).toFixed(1)}M`
      : n >= 1_000
        ? `$${(n / 1_000).toFixed(0)}K`
        : `$${n.toFixed(0)}`;

export const fmtPct = (n: number | null | undefined) =>
  n == null ? "—" : `${(n * 100).toFixed(1)}%`;

export const fmtMiles = (n: number | null | undefined) =>
  n == null ? "n/a" : `${Math.round(n)} mi`;

export type CoverageBand = "strong" | "workable" | "none";
export function coverageBand(r: Region): CoverageBand {
  if (r.vendors_150mi > 0) return "strong";
  if (r.vendors_300mi > 0) return "workable";
  return "none";
}
