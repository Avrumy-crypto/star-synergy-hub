import ScrollReveal from "./ScrollReveal";
import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";

const StatsSection = () => {
  const { t } = useI18n();
  const stats = [
    { value: "25+", label: t("stats.facilities") },
    { value: "7", label: t("stats.divisions") },
    { value: "100%", label: t("stats.recyclable") },
    { value: "30+", label: t("stats.years") },
  ];

  return (
    <section className="section-padding bg-background">
    <div className="container-narrow">
      <ScrollReveal>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-extrabold text-primary mb-2">
                {s.value}
              </div>
              <div className="text-sm font-medium text-secondary">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </ScrollReveal>
    </div>
  </section>
  );
};

export default StatsSection;
