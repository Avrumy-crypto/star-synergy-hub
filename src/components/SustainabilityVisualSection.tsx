import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import ScrollReveal from "./ScrollReveal";
import { useI18n } from "@/lib/i18n";

const SustainabilityVisualSection = () => {
  const { t } = useI18n();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const clipPath = useTransform(
    scrollYProgress,
    [0, 0.65],
    [
      "inset(20% 14% 20% 14% round 1rem)",
      "inset(0% 0% 0% 0% round 0rem)",
    ]
  );
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.65], [0.42, 0.5]);

  return (
    <section ref={sectionRef} className="relative bg-background h-[220vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.div style={{ clipPath }} className="relative h-full w-full will-change-[clip-path]">
          <video
            src="/1394254-uhd_4096_2160_24fps.mp4"
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <motion.div style={{ opacity: overlayOpacity }} className="absolute inset-0 bg-primary" />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/75 via-foreground/45 to-transparent" />

          <div className="relative z-10 h-full p-6 md:p-10 lg:p-12 flex items-center justify-center">
            <ScrollReveal>
              <div className="max-w-2xl text-center">
                <p className="text-xs font-semibold text-background/80 tracking-widest uppercase mb-3">
                  {t("sustainVisual.label")}
                </p>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-background leading-tight mb-4">
                  {t("sustainVisual.title")}
                </h2>
                <p className="text-background/85 text-sm md:text-base leading-relaxed mb-6 max-w-xl mx-auto">
                  {t("sustainVisual.body")}
                </p>
                <Link
                  to="/sustainability"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-background text-foreground rounded text-sm font-semibold hover:brightness-95 transition-all mx-auto"
                >
                  {t("sustainVisual.cta")}
                  <ArrowRight size={15} />
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SustainabilityVisualSection;