import ScrollReveal from "./ScrollReveal";
import { Building2, Users, Globe, TrendingUp } from "lucide-react";

const pillars = [
  { icon: Building2, title: "Unified Leadership", desc: "Strategic oversight and shared best practices across all four divisions ensure operational excellence at every level." },
  { icon: Users, title: "Shared Expertise", desc: "Our divisions benefit from centralized R&D, talent development, and cross-functional collaboration." },
  { icon: Globe, title: "Global Infrastructure", desc: "A common network of facilities, logistics, and supply chain resources that strengthens every division." },
  { icon: TrendingUp, title: "Sustainable Growth", desc: "Long-term investment in innovation and capacity expansion to support each division's continued success." },
];

const SynergySection = () => (
  <section className="section-padding bg-secondary">
    <div className="container-narrow">
      <ScrollReveal>
        <p className="text-xs font-semibold text-secondary-foreground/50 tracking-widest uppercase mb-2">
          The Group Advantage
        </p>
        <h2 className="text-2xl md:text-3xl font-extrabold text-secondary-foreground mb-3">
          One Group. Four Industry Leaders.
        </h2>
        <p className="text-secondary-foreground/65 max-w-2xl mb-12 text-base leading-relaxed">
          Five Star Group serves as the parent company behind four specialized packaging divisions.
          We provide the strategic direction, shared resources, and operational backbone that empowers
          each division to lead in its market.
        </p>
      </ScrollReveal>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {pillars.map((f, i) => (
          <ScrollReveal key={f.title} delay={i * 0.1}>
            <div className="flex gap-4 p-5 rounded-lg bg-secondary-foreground/5 border border-secondary-foreground/10">
              <div className="flex-shrink-0 w-10 h-10 rounded bg-primary/20 flex items-center justify-center">
                <f.icon size={18} className="text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-secondary-foreground mb-1">{f.title}</h3>
                <p className="text-xs text-secondary-foreground/55 leading-relaxed">{f.desc}</p>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  </section>
);

export default SynergySection;
