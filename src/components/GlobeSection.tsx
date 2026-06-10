import { useState, useRef, useCallback, useEffect, lazy, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MapPin, Users, Building2 } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const GlobeGL = lazy(() => import("react-globe.gl"));

interface Location {
  id: number;
  name: string;
  city: string;
  country: string;
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
    city: "Brooklyn, NY",
    country: "United States",
    lat: 40.6782,
    lng: -73.9442,
    description: "Five Star Group's global HQ and innovation hub — the strategic center for all divisions.",
    division: "Corporate HQ",
    photo: "/placeholder.svg",
    employees: "250+",
    sqft: "180,000 sq ft",
  },
  {
    id: 2,
    name: "Radiant Flexo — Asia Pacific",
    city: "Guangzhou",
    country: "China",
    lat: 23.1291,
    lng: 113.2644,
    description: "High-volume flexible packaging facility serving global brands with precision flexographic printing.",
    division: "Radiant Flexo",
    photo: "/placeholder.svg",
    employees: "400+",
    sqft: "320,000 sq ft",
  },
  {
    id: 3,
    name: "CorrStar — West Coast",
    city: "Los Angeles, CA",
    country: "United States",
    lat: 34.0522,
    lng: -118.2437,
    description: "West Coast corrugated packaging hub supplying premium retail and e-commerce clients.",
    division: "CorrStar",
    photo: "/placeholder.svg",
    employees: "120+",
    sqft: "95,000 sq ft",
  },
  {
    id: 4,
    name: "Industry Plastic — EMEA",
    city: "Rotterdam",
    country: "Netherlands",
    lat: 51.9225,
    lng: 4.4792,
    description: "European hub for rigid plastic container manufacturing, serving EMEA markets.",
    division: "Industry Plastic",
    photo: "/placeholder.svg",
    employees: "180+",
    sqft: "140,000 sq ft",
  },
  {
    id: 5,
    name: "Stellar Board — South Asia",
    city: "Mumbai",
    country: "India",
    lat: 19.076,
    lng: 72.8777,
    description: "High-volume folding carton production facility, ISO 9001 and FSC Chain of Custody certified.",
    division: "Stellar Board",
    photo: "/placeholder.svg",
    employees: "300+",
    sqft: "210,000 sq ft",
  },
  {
    id: 6,
    name: "ClamPak — Americas",
    city: "Miami, FL",
    country: "United States",
    lat: 25.7617,
    lng: -80.1918,
    description: "Americas regional hub for clamshell and specialty rigid packaging solutions.",
    division: "ClamPak",
    photo: "/placeholder.svg",
    employees: "90+",
    sqft: "75,000 sq ft",
  },
];

const PRIMARY = "#1a8fd1";
const PRIMARY_LIGHT = "rgba(26,143,209,0.55)";

export default function GlobeSection() {
  const [active, setActive] = useState<Location | null>(null);
  const [globeReady, setGlobeReady] = useState(false);
  const globeRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dims, setDims] = useState({ width: 900, height: 560 });

  useEffect(() => {
    const update = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.offsetWidth;
      setDims({ width: w, height: Math.max(380, Math.min(580, w * 0.58)) });
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    if (!globeReady || !globeRef.current) return;
    const ctrl = globeRef.current.controls();
    ctrl.autoRotate = true;
    ctrl.autoRotateSpeed = 0.35;
    ctrl.enableZoom = false;
    ctrl.enablePan = false;
  }, [globeReady]);

  const flyTo = useCallback((loc: Location) => {
    setActive(loc);
    if (globeRef.current) {
      globeRef.current.controls().autoRotate = false;
      globeRef.current.pointOfView({ lat: loc.lat, lng: loc.lng, altitude: 1.9 }, 900);
    }
  }, []);

  const handleClose = () => {
    setActive(null);
    if (globeRef.current) globeRef.current.controls().autoRotate = true;
  };

  return (
    <section className="relative bg-[#06091a] overflow-hidden py-20">
      {/* subtle radial glow behind globe */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 50% 55%, rgba(26,143,209,0.08) 0%, transparent 70%)",
        }}
      />

      {/* header */}
      <div className="container-narrow px-6 lg:px-12 relative z-10 mb-8">
        <ScrollReveal>
          <p
            className="text-sm font-semibold tracking-widest uppercase mb-3"
            style={{ color: "hsl(205,84%,62%)" }}
          >
            Our Global Footprint
          </p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            Everywhere You Need Us
          </h2>
          <p className="text-white/50 text-lg max-w-xl">
            From our Brooklyn headquarters to facilities across three continents.
            Drag the globe, then click any marker to explore a location.
          </p>
        </ScrollReveal>
      </div>

      {/* globe */}
      <div ref={containerRef} className="relative w-full" style={{ height: dims.height }}>
        <Suspense
          fallback={
            <div className="h-full flex items-center justify-center text-white/30 text-sm tracking-wide">
              Loading globe…
            </div>
          }
        >
          <GlobeGL
            ref={globeRef}
            width={dims.width}
            height={dims.height}
            backgroundColor="rgba(0,0,0,0)"
            globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
            backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
            atmosphereColor={PRIMARY}
            atmosphereAltitude={0.2}
            pointsData={LOCATIONS}
            pointAltitude={0.07}
            pointRadius={0.52}
            pointColor={(d) =>
              active?.id === (d as Location).id ? "#ffffff" : PRIMARY
            }
            pointLabel={(d) => (d as Location).name}
            onPointClick={(point) => flyTo(point as Location)}
            ringsData={active ? [active] : []}
            ringColor={() => PRIMARY_LIGHT}
            ringMaxRadius={4.5}
            ringPropagationSpeed={3}
            ringRepeatPeriod={900}
            onGlobeReady={() => setGlobeReady(true)}
          />
        </Suspense>

        {/* detail card — bottom-right overlay */}
        <div className="absolute bottom-6 right-4 md:right-10 z-20">
          <AnimatePresence>
            {active && (
              <motion.div
                key={active.id}
                initial={{ opacity: 0, x: 30, scale: 0.97 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 30, scale: 0.97 }}
                transition={{ type: "spring", stiffness: 320, damping: 28 }}
                className="w-64 md:w-72 rounded-2xl overflow-hidden shadow-2xl"
                style={{ background: "rgba(255,255,255,0.97)" }}
              >
                {/* photo */}
                <div className="relative h-36 bg-gray-100">
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
                    className="absolute bottom-2.5 left-3 text-[11px] font-bold px-2.5 py-1 rounded-md text-white"
                    style={{ background: PRIMARY }}
                  >
                    {active.division}
                  </span>
                </div>

                {/* content */}
                <div className="p-4">
                  <h3 className="font-extrabold text-gray-900 text-sm leading-snug mb-1">
                    {active.name}
                  </h3>
                  <div className="flex items-center gap-1 text-[11px] text-gray-400 mb-2.5">
                    <MapPin size={10} />
                    {active.city}, {active.country}
                  </div>
                  <p className="text-[11px] text-gray-500 leading-relaxed mb-3.5">
                    {active.description}
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    <div
                      className="rounded-lg p-2.5"
                      style={{ background: "hsl(205,84%,95%)" }}
                    >
                      <div className="flex items-center gap-1 mb-0.5">
                        <Users size={9} style={{ color: PRIMARY }} />
                        <span className="text-[9px] text-gray-400 uppercase tracking-wide">
                          Team
                        </span>
                      </div>
                      <div className="font-extrabold text-gray-800 text-sm">
                        {active.employees}
                      </div>
                    </div>
                    <div
                      className="rounded-lg p-2.5"
                      style={{ background: "hsl(205,84%,95%)" }}
                    >
                      <div className="flex items-center gap-1 mb-0.5">
                        <Building2 size={9} style={{ color: PRIMARY }} />
                        <span className="text-[9px] text-gray-400 uppercase tracking-wide">
                          Facility
                        </span>
                      </div>
                      <div className="font-extrabold text-gray-800 text-sm">
                        {active.sqft}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* location pills */}
      <div className="container-narrow px-6 lg:px-12 mt-8 relative z-10">
        <div className="flex flex-wrap gap-2">
          {LOCATIONS.map((loc) => (
            <motion.button
              key={loc.id}
              onClick={() => flyTo(loc)}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="px-4 py-1.5 rounded-full text-xs font-semibold border transition-all"
              style={
                active?.id === loc.id
                  ? {
                      background: PRIMARY,
                      color: "#fff",
                      borderColor: PRIMARY,
                    }
                  : {
                      background: "rgba(255,255,255,0.05)",
                      color: "rgba(255,255,255,0.5)",
                      borderColor: "rgba(255,255,255,0.12)",
                    }
              }
            >
              {loc.city}
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}
