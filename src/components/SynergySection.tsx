import ScrollReveal from "./ScrollReveal";
import { Package, Truck, ShieldCheck, Handshake } from "lucide-react";

const features = [
  { icon: Package, title: "Full Format Coverage", desc: "From flexible pouches to corrugated shipping — every packaging format under one roof." },
  { icon: Truck, title: "Supply Chain Simplicity", desc: "One partner, one purchase order, one point of accountability across your entire packaging needs." },
  { icon: ShieldCheck, title: "Quality Assurance", desc: "Consistent quality standards enforced across all divisions with unified SQF certification." },
  { icon: Handshake, title: "Dedicated Partnership", desc: "A single account team that understands your brand across every packaging touchpoint." },
];

const SynergySection = () => (
  <section className="section-padding bg-secondary">
    <div className="container-narrow">
      <ScrollReveal>
        <p className="text-sm font-semibold text-secondary-foreground/60 tracking-widest uppercase mb-3">
          The Five Star Advantage
        </p>
        <h2 className="text-3xl md:text-4xl font-extrabold text-secondary-foreground mb-4">
          Your One-Stop Packaging Partner
        </h2>
        <p className="text-secondary-foreground/70 max-w-2xl mb-14 text-lg">
          From primary flexible pouches to secondary corrugated shipping, we manage your entire
          supply chain — so you can focus on growing your brand.
        </p>
      </ScrollReveal>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {features.map((f, i) => (
          <ScrollReveal key={f.title} delay={i * 0.1}>
            <div className="flex gap-4 p-6 rounded-xl bg-secondary-foreground/5 border border-secondary-foreground/10">
              <div className="flex-shrink-0 w-11 h-11 rounded-lg bg-primary/20 flex items-center justify-center">
                <f.icon size={20} className="text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-bold text-secondary-foreground mb-1">{f.title}</h3>
                <p className="text-sm text-secondary-foreground/60 leading-relaxed">{f.desc}</p>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  </section>
);

export default SynergySection;
