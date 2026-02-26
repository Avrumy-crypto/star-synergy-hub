import { useState } from "react";
import { Link } from "react-router-dom";
import ScrollReveal from "./ScrollReveal";
import { useI18n } from "@/lib/i18n";

const SynergySection = () => {
  const { t } = useI18n();
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubscribed(true);
  };

  return (
    <section className="section-padding bg-secondary">
      <div className="container-narrow">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <ScrollReveal>
            <div className="h-full p-6 rounded-lg bg-secondary-foreground/5 border border-secondary-foreground/10">
              <p className="text-xs font-semibold text-secondary-foreground/50 tracking-widest uppercase mb-2">
                {t("connect.contact.label")}
              </p>
              <h2 className="text-2xl font-extrabold text-secondary-foreground mb-3">
                {t("connect.contact.title")}
              </h2>
              <p className="text-secondary-foreground/65 text-base leading-relaxed mb-6">
                {t("connect.contact.body")}
              </p>
              <Link
                to="/contact"
                className="inline-flex px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:opacity-90 transition-opacity text-sm"
              >
                {t("connect.contact.button")}
              </Link>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="h-full p-6 rounded-lg bg-secondary-foreground/5 border border-secondary-foreground/10">
              <p className="text-xs font-semibold text-secondary-foreground/50 tracking-widest uppercase mb-2">
                {t("connect.subscribe.label")}
              </p>
              <h2 className="text-2xl font-extrabold text-secondary-foreground mb-3">
                {t("connect.subscribe.title")}
              </h2>
              <p className="text-secondary-foreground/65 text-base leading-relaxed mb-6">
                {t("connect.subscribe.body")}
              </p>

              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  required
                  placeholder={t("connect.subscribe.placeholder")}
                  className="flex-1 h-11 rounded-md border border-secondary-foreground/20 bg-background px-3 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                />
                <button
                  type="submit"
                  className="h-11 px-5 bg-primary text-primary-foreground font-semibold rounded-md hover:opacity-90 transition-opacity text-sm"
                >
                  {t("connect.subscribe.button")}
                </button>
              </form>

              {subscribed && (
                <p className="text-xs text-secondary-foreground/70 mt-3">
                  {t("connect.subscribe.success")}
                </p>
              )}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default SynergySection;
