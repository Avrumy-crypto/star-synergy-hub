import { useState, useRef, useCallback, useEffect, lazy, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { X, MapPin, Users, Building2, ArrowRight } from "lucide-react";
import * as THREE from "three";
import ScrollReveal from "./ScrollReveal";

const GlobeGL = lazy(() => import("react-globe.gl"));

interface Location {
  id: number;
  name: string;
  city: string;
  state: string;
  lat: number;
  lng: number;
  description: string;
  division: string;
  photo: string;
  employees: string;
  sqft: string;
}

const LOCATIONS: Location[] = [
  {
    id: 1,
    name: "Global Headquarters",
    city: "Brooklyn",
    state: "New York",
    lat: 40.6782,
    lng: -73.9442,
    description: "Five Star Group's global HQ — strategic center for all divisions, R&D, and executive leadership.",
    division: "Corporate HQ",
    photo: "/placeholder.svg",
    employees: "250+",
    sqft: "180,000 sq ft",
  },
  {
    id: 2,
    name: "Radiant Flexo — East",
    city: "Newark",
    state: "New Jersey",
    lat: 40.7357,
    lng: -74.1724,
    description: "East Coast flexible packaging hub serving major retail and consumer brands.",
    division: "Radiant Flexo",
    photo: "/placeholder.svg",
    employees: "150+",
    sqft: "120,000 sq ft",
  },
  {
    id: 3,
    name: "CorrStar — Southeast",
    city: "Atlanta",
    state: "Georgia",
    lat: 33.749,
    lng: -84.388,
    description: "Southeast corrugated packaging production and distribution center.",
    division: "CorrStar",
    photo: "/placeholder.svg",
    employees: "180+",
    sqft: "140,000 sq ft",
  },
  {
    id: 4,
    name: "Industry Plastic — Midwest",
    city: "Chicago",
    state: "Illinois",
    lat: 41.8781,
    lng: -87.6298,
    description: "Midwest rigid plastic container manufacturing and fulfillment center.",
    division: "Industry Plastic",
    photo: "/placeholder.svg",
    employees: "120+",
    sqft: "95,000 sq ft",
  },
  {
    id: 5,
    name: "Stellar Board — South",
    city: "Dallas",
    state: "Texas",
    lat: 32.7767,
    lng: -96.797,
    description: "Southern US folding carton production facility, ISO 9001 certified.",
    division: "Stellar Board",
    photo: "/placeholder.svg",
    employees: "200+",
    sqft: "160,000 sq ft",
  },
  {
    id: 6,
    name: "ClamPak — West Coast",
    city: "Los Angeles",
    state: "California",
    lat: 34.0522,
    lng: -118.2437,
    description: "West Coast clamshell and specialty rigid packaging solutions hub.",
    division: "ClamPak",
    photo: "/placeholder.svg",
    employees: "90+",
    sqft: "75,000 sq ft",
  },
];

const ACCENT = "hsl(205, 84%, 62%)";
const PRIMARY = "#1076b8";
const USA_POV = { lat: 39.5, lng: -97, altitude: 2.3 };
const COUNTRIES_URL = "https://globe.gl/example/datasets/ne_110m_admin_0_countries.geojson";

export default function GlobeSection() {
  const [active, setActive] = useState<Location | null>(null);
  const [countries, setCountries] = useState<object[]>([]);
  const [globeReady, setGlobeReady] = useState(false);
  const globeRef = useRef<any>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [wrapSize, setWrapSize] = useState({ w: 700, h: 620 });
  const returnTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Land dot-matrix data
  useEffect(() => {
    fetch(COUNTRIES_URL)
      .then((r) => r.json())
      .then((geo) => setCountries(geo.features))
      .catch(() => {});
  }, []);

  // Track wrapper size so the globe canvas can overflow the card edge
  useEffect(() => {
    const update = () => {
      if (!wrapRef.current) return;
      setWrapSize({ w: wrapRef.current.offsetWidth, h: wrapRef.current.offsetHeight });
    };
    update();
    const ro = new ResizeObserver(update);
    if (wrapRef.current) ro.observe(wrapRef.current);
    return () => ro.disconnect();
  }, []);

  // After 5s of no interaction, glide back to the USA view
  const scheduleReturn = useCallback(() => {
    if (returnTimer.current) clearTimeout(returnTimer.current);
    returnTimer.current = setTimeout(() => {
      globeRef.current?.pointOfView(USA_POV, 1400);
    }, 5000);
  }, []);

  useEffect(() => {
    if (!globeReady || !globeRef.current) return;
    const ctrl = globeRef.current.controls();
    ctrl.enableZoom = false;
    ctrl.enablePan = false;
    ctrl.addEventListener("change", scheduleReturn);
    globeRef.current.pointOfView(USA_POV, 0);
    return () => {
      ctrl.removeEventListener("change", scheduleReturn);
      if (returnTimer.current) clearTimeout(returnTimer.current);
    };
  }, [globeReady, scheduleReturn]);

  const selectLocation = useCallback(
    (loc: Location) => {
      setActive(loc);
      globeRef.current?.pointOfView({ lat: loc.lat, lng: loc.lng - 10, altitude: 2.0 }, 900);
      scheduleReturn();
    },
    [scheduleReturn]
  );

  const handleClose = () => {
    setActive(null);
    globeRef.current?.pointOfView(USA_POV, 1000);
  };

  // Pill-style HTML markers on the globe (like the reference)
  const makeMarker = useCallback(
    (d: object) => {
      const loc = d as Location;
      const el = document.createElement("div");
      el.style.cssText =
        "display:flex;align-items:center;gap:6px;padding:5px 12px 5px 8px;border-radius:999px;" +
        "background:rgba(255,255,255,0.14);border:1px solid rgba(255,255,255,0.35);" +
        "backdrop-filter:blur(6px);color:#fff;font-size:11px;font-weight:600;" +
        "font-family:'Plus Jakarta Sans',sans-serif;cursor:pointer;white-space:nowrap;" +
        "transform:translate(-50%,-50%);pointer-events:auto;transition:background .2s;";
      el.innerHTML =
        `<span style="width:9px;height:9px;border-radius:50%;border:2px solid #fff;` +
        `background:${ACCENT};box-shadow:0 0 8px ${ACCENT};flex-shrink:0"></span>${loc.state}`;
      el.onmouseenter = () => (el.style.background = "rgba(255,255,255,0.3)");
      el.onmouseleave = () => (el.style.background = "rgba(255,255,255,0.14)");
      el.onclick = (e) => {
        e.stopPropagation();
        selectLocation(loc);
      };
      return el;
    },
    [selectLocation]
  );

  const globeW = Math.round(wrapSize.w * 1.45);
  const globeH = Math.round(Math.max(wrapSize.h, globeW) * 1.15);

  return (
    <section className="px-4 py-10 md:px-8 lg:px-12 bg-background">
      <ScrollReveal>
        <div
          className="relative mx-auto max-w-[1500px] rounded-3xl overflow-hidden"
          style={{
            background:
              "linear-gradient(115deg, hsl(212,75%,14%) 0%, hsl(208,80%,20%) 55%, hsl(205,84%,28%) 100%)",
          }}
        >
          {/* soft light sweep, like the reference */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 55% 45% at 28% 22%, rgba(255,255,255,0.10) 0%, transparent 60%)",
            }}
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 items-stretch">
            {/* ── Left: copy ── */}
            <div className="relative z-10 px-8 py-16 md:px-14 lg:py-24 flex flex-col justify-center">
              <p
                className="text-xs font-bold tracking-[0.28em] uppercase mb-10"
                style={{ color: "rgba(255,255,255,0.85)" }}
              >
                Our Locations
              </p>
              <h2 className="text-5xl md:text-6xl font-extrabold leading-[1.05] text-white mb-3">
                National reach.
              </h2>
              <h2
                className="text-5xl md:text-6xl font-extrabold leading-[1.05] mb-10"
                style={{ color: ACCENT }}
              >
                Local commitment.
              </h2>
              <p className="text-white/70 text-lg leading-relaxed max-w-md mb-12">
                Six manufacturing facilities across the United States,
                delivering packaging where you need it — and growing.
              </p>
              <div className="flex items-center gap-3">
                <Link
                  to="/divisions"
                  className="inline-flex items-center px-7 py-3.5 rounded-full bg-white text-sm font-bold transition-transform hover:scale-[1.03]"
                  style={{ color: "hsl(208,80%,20%)" }}
                >
                  Explore divisions
                </Link>
                <Link
                  to="/contact"
                  className="w-12 h-12 rounded-full bg-white flex items-center justify-center transition-transform hover:scale-[1.06]"
                  style={{ color: "hsl(208,80%,20%)" }}
                >
                  <ArrowRight size={18} />
                </Link>
              </div>
            </div>

            {/* ── Right: dotted globe bleeding off the edge ── */}
            <div ref={wrapRef} className="relative h-[440px] lg:h-[680px]">
              <div
                className="absolute top-1/2 -translate-y-1/2"
                style={{ left: "2%" }}
              >
                <Suspense fallback={null}>
                  <GlobeGL
                    ref={globeRef}
                    width={globeW}
                    height={globeH}
                    backgroundColor="rgba(0,0,0,0)"
                    showGlobe={true}
                    globeMaterial={
                      new THREE.MeshPhongMaterial({
                        color: new THREE.Color("hsl(208, 72%, 26%)"),
                        transparent: true,
                        opacity: 0.96,
                      })
                    }
                    showAtmosphere={true}
                    atmosphereColor="#5db4e8"
                    atmosphereAltitude={0.12}
                    hexPolygonsData={countries}
                    hexPolygonResolution={3}
                    hexPolygonMargin={0.62}
                    hexPolygonUseDots={true}
                    hexPolygonColor={() => "rgba(255,255,255,0.82)"}
                    htmlElementsData={LOCATIONS}
                    htmlElement={makeMarker}
                    htmlAltitude={0.02}
                    ringsData={active ? [active] : []}
                    ringColor={() => "rgba(255,255,255,0.45)"}
                    ringMaxRadius={4}
                    ringPropagationSpeed={2.5}
                    ringRepeatPeriod={1000}
                    onGlobeReady={() => setGlobeReady(true)}
                  />
                </Suspense>
              </div>

              {/* Detail card */}
              <AnimatePresence>
                {active && (
                  <motion.div
                    key={active.id}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 14 }}
                    transition={{ type: "spring", stiffness: 340, damping: 28 }}
                    className="absolute bottom-5 left-5 w-72 rounded-2xl overflow-hidden shadow-2xl z-20 bg-white"
                  >
                    <div className="relative h-32 bg-gray-100">
                      <img
                        src={active.photo}
                        alt={active.name}
                        className="w-full h-full object-cover"
                      />
                      <button
                        onClick={handleClose}
                        className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-black/40 hover:bg-black/60 flex items-center justify-center text-white transition-colors"
                      >
                        <X size={13} />
                      </button>
                      <span
                        className="absolute bottom-2.5 left-3 text-[10px] font-bold px-2.5 py-1 rounded-md text-white"
                        style={{ background: PRIMARY }}
                      >
                        {active.division}
                      </span>
                    </div>
                    <div className="p-4">
                      <h3 className="font-extrabold text-gray-900 text-sm leading-snug mb-1">
                        {active.name}
                      </h3>
                      <div className="flex items-center gap-1 text-[11px] text-gray-400 mb-2.5">
                        <MapPin size={10} />
                        {active.city}, {active.state}
                      </div>
                      <p className="text-[11px] text-gray-500 leading-relaxed mb-3">
                        {active.description}
                      </p>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="rounded-lg p-2.5" style={{ background: "hsl(205,84%,95%)" }}>
                          <div className="flex items-center gap-1 mb-0.5">
                            <Users size={9} style={{ color: PRIMARY }} />
                            <span className="text-[9px] text-gray-400 uppercase tracking-wide">Team</span>
                          </div>
                          <div className="font-extrabold text-gray-800 text-sm">{active.employees}</div>
                        </div>
                        <div className="rounded-lg p-2.5" style={{ background: "hsl(205,84%,95%)" }}>
                          <div className="flex items-center gap-1 mb-0.5">
                            <Building2 size={9} style={{ color: PRIMARY }} />
                            <span className="text-[9px] text-gray-400 uppercase tracking-wide">Facility</span>
                          </div>
                          <div className="font-extrabold text-gray-800 text-sm">{active.sqft}</div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
