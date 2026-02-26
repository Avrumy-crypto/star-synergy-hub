import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import {
  Recycle,
  Leaf,
  Droplets,
  Sun,
  ArrowRight,
  Package,
  Factory,
  Sprout,
} from "lucide-react";
import { useI18n } from "@/lib/i18n";
import iso14001Logo from "@/assets/ISO 14001 logo.png";
import fscLogo from "@/assets/FSC logo.jpg";
import grsLogo from "@/assets/global-recycled-standard-(grs).webp";

const Sustainability = () => {
  const { t } = useI18n();

  const pillars = [
    { icon: Recycle, title: t("sustainability.pillar1.title"), desc: t("sustainability.pillar1.desc") },
    { icon: Leaf, title: t("sustainability.pillar2.title"), desc: t("sustainability.pillar2.desc") },
    { icon: Droplets, title: t("sustainability.pillar3.title"), desc: t("sustainability.pillar3.desc") },
    { icon: Sun, title: t("sustainability.pillar4.title"), desc: t("sustainability.pillar4.desc") },
  ];

  const materials = [
    {
      icon: Package,
      title: "Mono-Material Structures",
      desc: "Designed for easier sorting and higher real-world recyclability across flexible and rigid formats.",
    },
    {
      icon: Recycle,
      title: "Post-Consumer Recycled Content",
      desc: "Increased PCR integration in eligible product families while preserving performance and safety standards.",
    },
    {
      icon: Sprout,
      title: "Responsible Fiber Sourcing",
      desc: "Paper-based packaging programs aligned with verified chain-of-custody and responsible forestry inputs.",
    },
    {
      icon: Factory,
      title: "Low-Impact Processing",
      desc: "Material and process selection guided by lifecycle data, waste minimization, and energy efficiency.",
    },
  ];

  const certifications = [
    { logo: iso14001Logo, title: "ISO 14001", subtitle: "Environmental Management Systems" },
    { logo: fscLogo, title: "FSC® Chain of Custody", subtitle: "Responsible Fiber Traceability" },
    { logo: grsLogo, title: "GRS", subtitle: "Global Recycled Standard Aligned" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <section className="pt-28 pb-16 border-b border-border relative overflow-hidden">
          <video
            src="/src/assets/3755023-uhd_3840_2160_25fps.mp4"
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-foreground/68" />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/78 via-foreground/62 to-foreground/50" />
          <div className="absolute inset-0 bg-primary/12" />
          <div className="container-narrow px-6 lg:px-12">
            <ScrollReveal>
              <p className="relative z-10 text-primary-foreground/75 text-sm font-semibold tracking-widest uppercase mb-3">{t("sustainability.label")}</p>
              <h1 className="text-4xl md:text-5xl font-extrabold text-primary-foreground mb-6 max-w-3xl">
                {t("sustainability.title")}
              </h1>
              <p className="text-primary-foreground/85 text-lg max-w-2xl leading-relaxed mb-10">
                {t("sustainability.body")}
              </p>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
                {[
                  { value: "100%", label: "Recyclable-ready options" },
                  { value: "40%", label: "Renewable energy usage" },
                  { value: "60%", label: "Water reduction since 2018" },
                  { value: "2035", label: "Carbon-neutral roadmap" },
                ].map((item) => (
                  <div key={item.label} className="rounded-lg border border-background/30 bg-primary-foreground/10 backdrop-blur-[1px] px-4 py-3">
                    <p className="text-xl md:text-2xl font-extrabold text-primary-foreground">{item.value}</p>
                    <p className="text-xs md:text-sm text-primary-foreground/70">{item.label}</p>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>

        <section className="section-padding bg-background">
          <div className="container-narrow px-6 lg:px-12">
            <ScrollReveal>
              <p className="text-sm font-semibold text-primary tracking-widest uppercase mb-3">{t("sustainability.pillars.label")}</p>
              <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-12">
                {t("sustainability.pillars.title")}
              </h2>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {pillars.map((pillar, index) => (
                <ScrollReveal key={pillar.title} delay={index * 0.08}>
                  <div className="p-7 md:p-8 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors">
                    <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center mb-5">
                      <pillar.icon size={22} className="text-primary" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-2">{pillar.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{pillar.desc}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>

          </div>
        </section>

        <section className="section-padding bg-muted border-y border-border relative overflow-hidden">
          <div className="absolute inset-0 opacity-40 pointer-events-none" style={{ background: "linear-gradient(135deg, hsl(var(--accent) / 0.4), transparent 45%)" }} />
          <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ background: "linear-gradient(220deg, hsl(var(--primary) / 0.16), transparent 55%)" }} />
          <div className="container-narrow px-6 lg:px-12">
            <ScrollReveal>
              <p className="text-sm font-semibold text-primary tracking-widest uppercase mb-3">Materials Strategy</p>
              <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4">
                Better Materials, Lower Impact Packaging
              </h2>
              <p className="text-muted-foreground max-w-3xl mb-10">
                We continuously evaluate resin, fiber, and structure choices to improve recyclability, reduce virgin input,
                and maintain packaging performance across all markets.
              </p>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {materials.map((material, index) => (
                <ScrollReveal key={material.title} delay={index * 0.08}>
                  <div className="rounded-xl border border-border bg-card p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-11 h-11 rounded-lg bg-accent flex items-center justify-center flex-shrink-0">
                        <material.icon size={20} className="text-primary" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-foreground mb-1.5">{material.title}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">{material.desc}</p>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        <section className="section-padding bg-background">
          <div className="container-narrow px-6 lg:px-12">
            <ScrollReveal>
              <p className="text-sm font-semibold text-primary tracking-widest uppercase mb-3">Certifications & Compliance</p>
              <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4">
                Verified Standards Across Our Sustainability Program
              </h2>
              <p className="text-muted-foreground max-w-3xl mb-10">
                Our teams align manufacturing, sourcing, and reporting practices with globally recognized frameworks
                to provide transparent and auditable sustainability performance.
              </p>
            </ScrollReveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {certifications.map((cert, index) => (
                <ScrollReveal key={cert.title} delay={index * 0.07}>
                  <div className="h-full rounded-xl border border-border bg-card p-5">
                    <div className="h-12 w-28 mb-4 flex items-center">
                      <img
                        src={cert.logo}
                        alt={`${cert.title} logo`}
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>
                    <h3 className="font-bold text-foreground text-sm mb-1">{cert.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{cert.subtitle}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        <section className="section-padding bg-muted">
          <div className="container-narrow px-6 lg:px-12 text-center">
            <ScrollReveal>
              <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center mx-auto mb-6">
                <Recycle size={28} className="text-primary" />
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-secondary-foreground mb-4">
                {t("sustainability.circular.title")}
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto mb-8 text-lg leading-relaxed">
                {t("sustainability.circular.body")}
              </p>
              <a
                href="#"
                className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
              >
                {t("sustainability.circular.download")} <ArrowRight size={16} />
              </a>
            </ScrollReveal>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Sustainability;
