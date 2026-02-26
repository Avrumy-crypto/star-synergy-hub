import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import heroImg from "@/assets/hero-packaging.jpg";
import { useI18n } from "@/lib/i18n";

const HeroSection = () => {
  const { t } = useI18n();

  return (
    <section className="relative min-h-[76vh] border-b border-border flex items-center">
    <div className="absolute inset-0">
      <img
        src={heroImg}
        alt="Packaging manufacturing facility"
        className="w-full h-full object-cover brightness-95"
      />
      <div className="absolute inset-0 bg-black/25" />
      <div className="absolute inset-0 bg-primary/8 mix-blend-multiply" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/25 via-black/18 to-black/10" />
    </div>

    <div className="relative z-10 container-narrow px-6 lg:px-12 py-16 lg:py-20">
      <div className="max-w-2xl">
        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18 }}
          className="text-background text-4xl md:text-5xl lg:text-[3rem] font-bold leading-[1.1] text-balance"
        >
          {t("hero.title")}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.26 }}
          className="mt-5 text-background/80 text-base md:text-lg leading-relaxed"
        >
          {t("hero.subtitle")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.34 }}
          className="mt-8 flex flex-wrap gap-3"
        >
          <Link
            to="/about"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground text-sm font-semibold rounded-sm hover:brightness-110 transition-all"
          >
            {t("hero.explore")}
            <ArrowRight size={16} />
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 border border-background/25 bg-background/10 text-background text-sm font-semibold rounded-sm hover:bg-background/15 transition-all"
          >
            {t("hero.contact")}
          </Link>
        </motion.div>
      </div>
    </div>
  </section>
  );
};

export default HeroSection;
