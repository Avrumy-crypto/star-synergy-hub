import { Link } from "react-router-dom";
import ScrollReveal from "./ScrollReveal";
import { useI18n } from "@/lib/i18n";

const CTASection = () => {
  const { t } = useI18n();

  return (
    <section className="section-padding bg-primary">
    <div className="container-narrow text-center">
      <ScrollReveal>
        <h2 className="text-3xl md:text-4xl font-extrabold text-primary-foreground mb-4">
          {t("cta.title")}
        </h2>
        <p className="text-primary-foreground/70 max-w-xl mx-auto mb-8 text-lg">
          {t("cta.body")}
        </p>
        <Link
          to="/contact"
          className="inline-flex px-8 py-4 bg-card text-primary font-semibold rounded-lg hover:bg-card/90 transition-colors text-sm"
        >
          {t("cta.button")}
        </Link>
      </ScrollReveal>
    </div>
  </section>
  );
};

export default CTASection;
