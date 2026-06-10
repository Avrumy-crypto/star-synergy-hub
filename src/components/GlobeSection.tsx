import { useState, useRef, useCallback, useEffect, lazy, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MapPin, Users, Building2, ArrowRight } from "lucide-react";
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

const PRIMARY = "#1076b8";
const PRIMARY_GLOW = "rgba(16,118,184,0.5)";
// USA-centered point of view
const USA_POV = { lat: 39.5, lng: -98.35, altitude: 1.45 };

export default function GlobeSection() {
  const [active, setActive] = useState<Location | null>(null);
  const [globeReady, setGlobeReady] = useState(false);
  const globeRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [globeWidth, setGlobeWidth] = useState(600);
  const globeHeight = 500;
  const returnTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Measure globe container width
  useEffect(() => {
    const update = () => {
      if (containerRef.current) setGlobeWidth(containerRef.current.offsetWidth);
    };
    update();
    const ro = new ResizeObserver(update);
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  // Schedule auto-return to USA view after 5s of inactivity
  const scheduleReturn = useCallback(() => {
    if (returnTimer.current) clearTimeout(returnTimer.current);
    returnTimer.current = setTimeout(() => {
      if (globeRef.current) {
        globeRef.current.pointOfView(USA_POV, 1400);
      }
    }, 5000);
  }, []);

  // Configure controls once globe is ready
  useEffect(() => {
    if (!globeReady || !globeRef.current) return;
    const ctrl = globeRef.current.controls();
    ctrl.enableZoom = true;
    ctrl.enablePan = false;
    ctrl.minDistance = 120;
    ctrl.maxDistance = 500;
    ctrl.addEventListener("change", scheduleReturn);
    // Start zoomed to USA
    globeRef.current.pointOfView(USA_POV, 0);
    scheduleReturn();
    return () => {
      ctrl.removeEventListener("change", scheduleReturn);
      if (returnTimer.current) clearTimeout(returnTimer.current);
    };
  }, [globeReady, scheduleReturn]);

  const handleMarkerClick = useCallback(
    (point: object) => {
      const loc = point as Location;
      setActive(loc);
      if (globeRef.current) {
        globeRef.current.pointOfView({ lat: loc.lat, lng: loc.lng, altitude: 0.9 }, 900);
      }
      scheduleReturn();
    },
    [scheduleReturn]
  );

  const handleClose = () => {
    setActive(null);
    if (globeRef.current) globeRef.current.pointOfView(USA_POV, 1000);
    if (returnTimer.current) clearTimeout(returnTimer.current);
  };

  return (
    <section className="relative overflow-hidden" style={{ background: "hsl(220,30%,10%)" }}>
      {/* top gradient blend from previous section */}
      <div
        className="pointer-events-none absolute top-0 left-0 right-0 h-24 z-10"
        style={{ background: "linear-gradient(to bottom, hsl(210,17%,98%) 0%, transparent 100%)" }}
      />
      {/* radial blue glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 70% 50%, rgba(16,118,184,0.12) 0%, transparent 65%)",
        }}
      />

      <div className="container-narrow px-6 lg:px-12 relative z-10 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* ── Left: text ── */}
          <ScrollReveal>
            <div className="max-w-lg">
              <p
                className="text-xs font-bold tracking-[0.2em] uppercase mb-4"
                style={{ color: "hsl(205,84%,62%)" }}
              >
                Our Locations
              </p>
              <h2 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-5">
                Serving You<br />
                <span style={{ color: "hsl(205,84%,62%)" }}>Coast to Coast.</span>
              </h2>
              <p className="text-white/50 text-lg leading-relaxed mb-8">
                With facilities strategically placed across the United States, Five Star Group delivers faster, smarter, and closer to your door.
              </p>

              {/* Stats row */}
              <div className="flex gap-8 mb-10">
                <div>
                  <div className="text-3xl font-extrabold text-white">{LOCATIONS.length}</div>
                  <div className="text-xs text-white/40 mt-0.5 uppercase tracking-wide">Facilities</div>
                </div>
                <div className="w-px bg-white/10" />
                <div>
                  <div className="text-3xl font-extrabold text-white">6</div>
                  <div className="text-xs text-white/40 mt-0.5 uppercase tracking-wide">States</div>
                </div>
                <div className="w-px bg-white/10" />
                <div>
                  <div className="text-3xl font-extrabold text-white">30+</div>
                  <div className="text-xs text-white/40 mt-0.5 uppercase tracking-wide">Years</div>
                </div>
              </div>

              {/* Location pills */}
              <div className="flex flex-wrap gap-2">
                {LOCATIONS.map((loc) => (
                  <motion.button
                    key={loc.id}
                    onClick={() => handleMarkerClick(loc)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.96 }}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all"
                    style={
                      active?.id === loc.id
                        ? { background: PRIMARY, color: "#fff", borderColor: PRIMARY }
                        : {
                            background: "rgba(255,255,255,0.05)",
                            color: "rgba(255,255,255,0.55)",
                            borderColor: "rgba(255,255,255,0.1)",
                          }
                    }
                  >
                    <MapPin size={9} />
                    {loc.city}, {loc.state}
                  </motion.button>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* ── Right: globe ── */}
          <div ref={containerRef} className="relative" style={{ height: globeHeight }}>
            <Suspense
              fallback={
                <div
                  className="h-full flex items-center justify-center text-white/20 text-sm"
                  style={{ height: globeHeight }}
                >
                  Loading map…
                </div>
              }
            >
              <GlobeGL
                ref={globeRef}
                width={globeWidth}
                height={globeHeight}
                backgroundColor="rgba(0,0,0,0)"
                globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
                atmosphereColor={PRIMARY}
                atmosphereAltitude={0.18}
                pointsData={LOCATIONS}
                pointAltitude={0.06}
                pointRadius={0.55}
                pointColor={(d) =>
                  active?.id === (d as Location).id ? "#ffffff" : PRIMARY
                }
                pointLabel={(d) => `<div style="background:rgba(10,15,30,0.85);color:#fff;padding:6px 10px;border-radius:8px;font-size:12px;font-family:sans-serif;border:1px solid rgba(16,118,184,0.4)">${(d as Location).name}<br/><span style="color:rgba(255,255,255,0.5);font-size:10px">${(d as Location).city}, ${(d as Location).state}</span></div>`}
                onPointClick={handleMarkerClick}
                ringsData={active ? [active] : []}
                ringColor={() => PRIMARY_GLOW}
                ringMaxRadius={4}
                ringPropagationSpeed={2.5}
                ringRepeatPeriod={1000}
                onGlobeReady={() => setGlobeReady(true)}
              />
            </Suspense>

            {/* Detail card */}
            <AnimatePresence>
              {active && (
                <motion.div
                  key={active.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 12 }}
                  transition={{ type: "spring", stiffness: 340, damping: 28 }}
                  className="absolute bottom-4 left-1/2 -translate-x-1/2 w-72 rounded-2xl overflow-hidden shadow-2xl z-20"
                  style={{
                    background: "rgba(255,255,255,0.97)",
                    backdropFilter: "blur(12px)",
                  }}
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

            {/* hint text */}
            {!active && globeReady && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="absolute bottom-2 left-1/2 -translate-x-1/2 text-white/25 text-[11px] text-center whitespace-nowrap select-none pointer-events-none"
              >
                Drag to rotate · Scroll to zoom · Click a marker
              </motion.p>
            )}
          </div>
        </div>
      </div>

      {/* bottom gradient blend to next section */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-24 z-10"
        style={{ background: "linear-gradient(to top, hsl(210,17%,98%) 0%, transparent 100%)" }}
      />
    </section>
  );
}
