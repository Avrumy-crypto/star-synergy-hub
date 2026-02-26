import { useEffect, useRef, useState } from "react";
import ScrollReveal from "./ScrollReveal";
import { FlaskConical, Calculator, Truck, Cpu } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { AnimatePresence, motion, useSpring } from "framer-motion";

const RDSection = () => {
  const { t } = useI18n();

  const [activeCard, setActiveCard] = useState<number | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const magneticX = [useSpring(0, { stiffness: 240, damping: 22 }), useSpring(0, { stiffness: 240, damping: 22 }), useSpring(0, { stiffness: 240, damping: 22 })];
  const magneticY = [useSpring(0, { stiffness: 240, damping: 22 }), useSpring(0, { stiffness: 240, damping: 22 }), useSpring(0, { stiffness: 240, damping: 22 })];

  const focusAreas = [
    {
      icon: FlaskConical,
      title: t("rd.focus1"),
      code: "LAB-01",
      spec: t("rd.spec1"),
      blueprint: t("rd.blueprint1"),
    },
    {
      icon: Calculator,
      title: t("rd.focus2"),
      code: "LAB-02",
      spec: t("rd.spec2"),
      blueprint: t("rd.blueprint2"),
    },
    {
      icon: Truck,
      title: t("rd.focus3"),
      code: "LAB-03",
      spec: t("rd.spec3"),
      blueprint: t("rd.blueprint3"),
    },
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    let frame = 0;
    let animationId = 0;

    const getTokenColor = (token: string, alpha: number) => {
      const root = getComputedStyle(document.documentElement);
      const raw = root.getPropertyValue(token).trim();
      if (!raw) return `rgba(0,0,0,${alpha})`;
      return `hsla(${raw} / ${alpha})`;
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      context.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0);
    };

    const draw = () => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;

      context.clearRect(0, 0, width, height);

      const centerX = width * 0.52;
      const centerY = height * 0.52;
      const size = Math.min(width, height) * 0.3;
      const angle = frame * 0.004;

      const points3d = [
        [-1, -1, -1],
        [1, -1, -1],
        [1, 1, -1],
        [-1, 1, -1],
        [-1, -1, 1],
        [1, -1, 1],
        [1, 1, 1],
        [-1, 1, 1],
      ];

      const project = (x: number, y: number, z: number) => {
        const rx = x * Math.cos(angle) - z * Math.sin(angle);
        const rz = x * Math.sin(angle) + z * Math.cos(angle);
        const ry = y * Math.cos(angle * 0.8) - rz * Math.sin(angle * 0.8);
        const depth = 3.6 / (4.6 + rz);
        return {
          x: centerX + rx * size * depth,
          y: centerY + ry * size * depth,
        };
      };

      const projected = points3d.map(([x, y, z]) => project(x, y, z));
      const edges = [
        [0, 1], [1, 2], [2, 3], [3, 0],
        [4, 5], [5, 6], [6, 7], [7, 4],
        [0, 4], [1, 5], [2, 6], [3, 7],
      ];

      context.lineWidth = 1;
      context.strokeStyle = getTokenColor("--foreground", 0.22);
      edges.forEach(([start, end]) => {
        context.beginPath();
        context.moveTo(projected[start].x, projected[start].y);
        context.lineTo(projected[end].x, projected[end].y);
        context.stroke();
      });

      for (let i = 0; i < 380; i += 1) {
        const x = ((i * 37) % width) + Math.sin((frame + i) * 0.02) * 0.5;
        const y = ((i * 53) % height) + Math.cos((frame + i) * 0.02) * 0.5;
        const alpha = 0.02 + ((i % 7) / 7) * 0.03;
        context.fillStyle = getTokenColor("--foreground", alpha);
        context.fillRect(x, y, 1, 1);
      }

      frame += 1;
      animationId = requestAnimationFrame(draw);
    };

    resize();
    draw();

    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  const onCardMove = (index: number, event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const offsetX = event.clientX - rect.left - rect.width / 2;
    const offsetY = event.clientY - rect.top - rect.height / 2;
    magneticX[index].set(offsetX * 0.08);
    magneticY[index].set(offsetY * 0.08);
  };

  const onCardLeave = (index: number) => {
    magneticX[index].set(0);
    magneticY[index].set(0);
    setActiveCard(null);
  };

  const activeBlueprint = activeCard !== null ? focusAreas[activeCard].blueprint : t("rd.blueprintDefault");

  const tickerItems = [t("rd.status1"), t("rd.status2"), t("rd.status3"), t("rd.status4")];

  return (
    <section className="relative min-h-screen bg-background border-t border-border overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-foreground/[0.02]" />
      <div className="relative z-10 px-6 py-20 md:px-12 lg:px-20 xl:px-32 h-full">
        <ScrollReveal>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-5">
            <div className="lg:col-span-5 p-2 md:p-4">
                <p className="text-xs font-semibold text-primary tracking-[0.16em] uppercase mb-4">{t("rd.label")}</p>
                <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground leading-tight mb-4 text-balance">
                  {t("rd.title")}
                </h2>
                <p className="text-muted-foreground text-base leading-relaxed mb-7">
                  {t("rd.body")}
                </p>
                <div className="inline-flex items-center gap-2 border border-border/70 bg-background/70 backdrop-blur-[8px] px-3 py-2">
                  <Cpu size={16} className="text-primary" />
                  <span className="rd-mono text-xs text-foreground/80">{t("rd.blueprintTag")}</span>
                </div>
            </div>

            <div className="lg:col-span-7 border border-border/70 bg-foreground/[0.03] overflow-hidden relative min-h-[320px] lg:min-h-[46vh]">
                <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
                <div className="absolute inset-0 backdrop-blur-[2px]" />

                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeBlueprint}
                    initial={{ opacity: 0, y: 8, filter: "blur(3px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -8, filter: "blur(3px)" }}
                    transition={{ duration: 0.28, ease: "easeOut" }}
                    className={`absolute inset-0 flex items-end p-6 md:p-8 ${activeCard !== null ? "rd-glitch" : ""}`}
                  >
                    <div className="w-full border border-border/80 bg-card/45 backdrop-blur-[20px] p-4 md:p-5">
                      <p className="rd-mono text-[11px] tracking-[0.12em] text-muted-foreground uppercase mb-2">{t("rd.liveModel")}</p>
                      <p className="text-sm md:text-base font-semibold text-foreground">{activeBlueprint}</p>
                    </div>
                  </motion.div>
                </AnimatePresence>
            </div>

            <div className="lg:col-span-12 grid grid-cols-1 md:grid-cols-12 gap-4">
                {focusAreas.map((area, index) => (
                  <motion.div
                    key={area.title}
                    style={{ x: magneticX[index], y: magneticY[index] }}
                    onMouseMove={(event) => onCardMove(index, event)}
                    onMouseEnter={() => setActiveCard(index)}
                    onMouseLeave={() => onCardLeave(index)}
                    className="md:col-span-4 border border-border/70 bg-card/35 backdrop-blur-[20px] px-5 py-5"
                  >
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div className="w-10 h-10 bg-accent/80 flex items-center justify-center flex-shrink-0">
                        <area.icon size={18} className="text-primary" />
                      </div>
                      <span className="rd-mono text-xs text-muted-foreground">0{index + 1}</span>
                    </div>

                    <p className="text-sm md:text-base font-semibold text-foreground mb-2">{area.title}</p>
                    <p className="rd-mono text-[11px] text-muted-foreground uppercase tracking-[0.08em] mb-2">{area.code}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{area.spec}</p>
                  </motion.div>
                ))}
            </div>

            <div className="lg:col-span-12 border-y border-border bg-card/60 overflow-hidden">
                <div className="px-4 py-2 border-b border-border bg-foreground/[0.02]">
                  <p className="rd-mono text-[11px] tracking-[0.12em] uppercase text-muted-foreground">{t("rd.statusLabel")}</p>
                </div>
                <div className="relative h-10 overflow-hidden">
                  <div className="rd-marquee-track rd-mono text-xs text-foreground/75 h-full flex items-center whitespace-nowrap">
                    {[...tickerItems, ...tickerItems].map((item, index) => (
                      <span key={`${item}-${index}`} className="mx-5">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default RDSection;