import { useState, useRef, useCallback, useEffect, lazy, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { X, MapPin, ArrowRight } from "lucide-react";
import * as THREE from "three";
import ScrollReveal from "./ScrollReveal";

import photoNJ from "@/assets/division-corrugated.jpg";
import photoPA from "@/assets/division-containers.jpg";
import photoNY from "@/assets/hero-packaging.jpg";
import photoGA from "@/assets/division-carton.jpg";
import photoCA from "@/assets/division-flexible.jpg";
import photoIA from "@/assets/Corrugated photo.png";
import photoTX from "@/assets/Folding photo.png";
import photoFL from "@/assets/container photo.png";
import photoOH from "@/assets/Radiant photo.png";

const GlobeGL = lazy(() => import("react-globe.gl"));

interface Location {
  id: number;
  state: string;
  label: string;
  lat: number;
  lng: number;
  photo: string;
}

const LOCATIONS: Location[] = [
  { id: 1, state: "New York", label: "New York Headquarters", lat: 40.6782, lng: -73.9442, photo: photoNY },
  { id: 2, state: "New Jersey", label: "New Jersey Warehouse", lat: 40.7357, lng: -74.1724, photo: photoNJ },
  { id: 3, state: "Pennsylvania", label: "Pennsylvania Distribution Center", lat: 40.2737, lng: -76.8844, photo: photoPA },
  { id: 4, state: "Ohio", label: "Ohio Production Facility", lat: 39.9612, lng: -82.9988, photo: photoOH },
  { id: 5, state: "Georgia", label: "Georgia Manufacturing Plant", lat: 33.749, lng: -84.388, photo: photoGA },
  { id: 6, state: "Florida", label: "Florida Warehouse", lat: 27.9944, lng: -81.7603, photo: photoFL },
  { id: 7, state: "Iowa", label: "Iowa Distribution Hub", lat: 41.878, lng: -93.0977, photo: photoIA },
  { id: 8, state: "Texas", label: "Texas Manufacturing Plant", lat: 32.7767, lng: -96.797, photo: photoTX },
  { id: 9, state: "California", label: "California Warehouse", lat: 34.0522, lng: -118.2437, photo: photoCA },
];

const ACCENT = "hsl(205, 84%, 62%)";
const USA_POV = { lat: 39.5, lng: -97, altitude: 2.3 };
const COUNTRIES_URL = "https://globe.gl/example/datasets/ne_110m_admin_0_countries.geojson";

export default function GlobeSection() {
  const [active, setActive] = useState<Location | null>(null);
  const [countries, setCountries] = useState<object[]>([]);
  const [globeReady, setGlobeReady] = useState(false);
  const globeRef = useRef<any>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [wrapSize, setWrapSize] = useState({ w: 800, h: 720 });
  const returnTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    fetch(COUNTRIES_URL)
      .then((r) => r.json())
      .then((geo) => setCountries(geo.features))
      .catch(() => {});
  }, []);

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

  // Pill-style state markers on the globe
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

  const globeW = Math.round(wrapSize.w * 1.5);
  const globeH = Math.round(Math.max(wrapSize.h, globeW) * 1.15);

  return (
    <section className="px-3 py-8 md:px-6 bg-background">
      <ScrollReveal>
        <div
          className="relative mx-auto max-w-[1800px] rounded-3xl overflow-hidden lg:min-h-[88vh] flex"
          style={{
            background:
              "linear-gradient(115deg, hsl(212,75%,14%) 0%, hsl(208,80%,20%) 55%, hsl(205,84%,28%) 100%)",
          }}
        >
          {/* soft light sweep */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 55% 45% at 28% 22%, rgba(255,255,255,0.10) 0%, transparent 60%)",
            }}
          />

          <div className="grid grid-cols-1 lg:grid-cols-[44%_56%] items-stretch w-full">
            {/* ── Left: copy ── */}
            <div className="relative z-10 px-8 py-16 md:px-16 lg:py-28 flex flex-col justify-center">
              <p
                className="text-xs font-bold tracking-[0.28em] uppercase mb-12"
                style={{ color: "rgba(255,255,255,0.85)" }}
              >
                Our Locations
              </p>
              <h2 className="text-5xl md:text-7xl font-extrabold leading-[1.04] text-white mb-3">
                National reach.
              </h2>
              <h2
                className="text-5xl md:text-7xl font-extrabold leading-[1.04] mb-12"
                style={{ color: ACCENT }}
              >
                Local commitment.
              </h2>
              <p className="text-white/70 text-lg md:text-xl leading-relaxed max-w-md mb-14">
                Nine facilities across the United States, delivering
                packaging where you need it — and growing.
              </p>
              <div className="flex items-center gap-3">
                <Link
                  to="/divisions"
                  className="inline-flex items-center px-8 py-4 rounded-full bg-white text-sm font-bold transition-transform hover:scale-[1.03]"
                  style={{ color: "hsl(208,80%,20%)" }}
                >
                  Explore divisions
                </Link>
                <Link
                  to="/contact"
                  className="w-[52px] h-[52px] rounded-full bg-white flex items-center justify-center transition-transform hover:scale-[1.06]"
                  style={{ color: "hsl(208,80%,20%)" }}
                >
                  <ArrowRight size={18} />
                </Link>
              </div>
            </div>

            {/* ── Right: dotted globe bleeding off the edge ── */}
            <div ref={wrapRef} className="relative h-[460px] lg:h-auto lg:min-h-[760px]">
              <div className="absolute top-1/2 -translate-y-1/2" style={{ left: "2%" }}>
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

              {/* Photo card — just picture + label */}
              <AnimatePresence>
                {active && (
                  <motion.div
                    key={active.id}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 14 }}
                    transition={{ type: "spring", stiffness: 340, damping: 28 }}
                    className="absolute bottom-6 left-6 w-80 rounded-2xl overflow-hidden shadow-2xl z-20 bg-white"
                  >
                    <div className="relative h-48 bg-gray-100">
                      <img
                        src={active.photo}
                        alt={active.label}
                        className="w-full h-full object-cover"
                      />
                      <button
                        onClick={handleClose}
                        className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-black/40 hover:bg-black/60 flex items-center justify-center text-white transition-colors"
                      >
                        <X size={13} />
                      </button>
                    </div>
                    <div className="px-4 py-3.5 flex items-center gap-2">
                      <MapPin size={14} style={{ color: "#1076b8" }} className="flex-shrink-0" />
                      <h3 className="font-extrabold text-gray-900 text-sm">{active.label}</h3>
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
