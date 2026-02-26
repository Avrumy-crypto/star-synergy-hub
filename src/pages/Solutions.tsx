import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import { Building2, Users, Globe2, BadgeCheck, UserRound } from "lucide-react";
import { useI18n } from "@/lib/i18n";

const Solutions = () => {
  const { t } = useI18n();

  const leaders = [
    { name: "Avi Brach", role: "Chief Operating Officer" },
    { name: "Joel Spitz", role: "Office Manager" },
    { name: "Moses Fisher", role: "Chief Financial Officer" },
    { name: "Leiby Katz", role: "VP, Flexible Packaging" },
    { name: "David Kraus", role: "VP, Containers" },
    { name: "Avrumy Freilich", role: "Procurement Specialist" },
  ];

  const capabilities = [
    {
      icon: Building2,
      title: "Integrated Manufacturing",
      desc: "Unified planning and production across flexible, rigid, corrugated, and folding carton platforms.",
    },
    {
      icon: Users,
      title: "Cross-Division Expertise",
      desc: "Shared engineering, QA, and sourcing teams that speed up launches and reduce complexity.",
    },
    {
      icon: Globe2,
      title: "Scalable Supply Network",
      desc: "Regional coverage and multi-site continuity built for enterprise-grade fulfillment.",
    },
    {
      icon: BadgeCheck,
      title: "Quality & Compliance",
      desc: "Structured controls and process standards designed for reliable, repeatable outcomes.",
    },
  ];

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <section className="pt-32 pb-20 bg-primary">
          <div className="container-narrow px-6 lg:px-12">
            <ScrollReveal>
              <p className="text-primary-foreground/70 text-sm font-semibold tracking-widest uppercase mb-3">
                {t("about.label")}
              </p>
              <h1 className="text-4xl md:text-5xl font-extrabold text-primary-foreground mb-6 max-w-3xl">
                {t("about.title")}
              </h1>
              <p className="text-primary-foreground/80 text-lg max-w-2xl">
                {t("about.body")}
              </p>
            </ScrollReveal>
          </div>
        </section>

        <section className="section-padding bg-background">
          <div className="container-narrow px-6 lg:px-12">
            <ScrollReveal>
              <p className="text-sm font-semibold text-primary tracking-widest uppercase mb-3">Capabilities</p>
              <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-10">
                End-to-End Packaging Solutions
              </h2>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {capabilities.map((item, index) => (
                <ScrollReveal key={item.title} delay={index * 0.08}>
                  <div className="rounded-xl border border-border bg-card p-6">
                    <div className="w-11 h-11 rounded-lg bg-accent flex items-center justify-center mb-4">
                      <item.icon size={20} className="text-primary" />
                    </div>
                    <h3 className="font-bold text-foreground mb-1.5">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        <section className="section-padding bg-muted border-y border-border">
          <div className="container-narrow px-6 lg:px-12">
            <ScrollReveal>
              <p className="text-sm font-semibold text-primary tracking-widest uppercase mb-3">
                {t("about.leadership.label")}
              </p>
              <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-10">
                {t("about.leadership.title")}
              </h2>
            </ScrollReveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {leaders.map((leader, i) => (
                <ScrollReveal key={leader.name} delay={i * 0.08}>
                  <div className="p-6 rounded-xl bg-card border border-border h-full">
                    <div className="w-14 h-14 rounded-full bg-accent flex items-center justify-center mb-4">
                      <UserRound size={24} className="text-primary" />
                    </div>
                    <h3 className="font-bold text-foreground">{leader.name}</h3>
                    <p className="text-sm text-muted-foreground">{leader.role}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Solutions;
