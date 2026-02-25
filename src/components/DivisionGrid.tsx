import ScrollReveal from "./ScrollReveal";
import { ArrowRight } from "lucide-react";
import flexImg from "@/assets/division-flexible.jpg";
import containerImg from "@/assets/division-containers.jpg";
import cartonImg from "@/assets/division-carton.jpg";
import corrugatedImg from "@/assets/division-corrugated.jpg";

const divisions = [
  { name: "Flexible Packaging", desc: "Pouches, rollstock & barrier films", img: flexImg },
  { name: "Containers", desc: "Rigid tubs, lids & foodservice solutions", img: containerImg },
  { name: "Folding Carton", desc: "Premium printed cartons & retail packaging", img: cartonImg },
  { name: "Corrugated Boxes", desc: "Shipping, display & e-commerce solutions", img: corrugatedImg },
];

const DivisionGrid = () => (
  <section className="section-padding bg-background">
    <div className="container-narrow">
      <ScrollReveal>
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-xs font-semibold text-primary tracking-widest uppercase mb-2">
              Our Divisions
            </p>
            <h2 className="text-2xl md:text-3xl font-extrabold text-foreground">
              Four Divisions. One Vision.
            </h2>
          </div>
          <a href="#" className="hidden md:flex items-center gap-1 text-sm font-semibold text-primary hover:underline">
            View All <ArrowRight size={14} />
          </a>
        </div>
      </ScrollReveal>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {divisions.map((div, i) => (
          <ScrollReveal key={div.name} delay={i * 0.08}>
            <a
              href="#"
              className="group relative block overflow-hidden rounded-lg bg-card border border-border hover:border-primary hover:shadow-md transition-all duration-300"
            >
              <div className="aspect-[3/2] overflow-hidden">
                <img
                  src={div.img}
                  alt={div.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-4">
                <h3 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">
                  {div.name}
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5">{div.desc}</p>
              </div>
            </a>
          </ScrollReveal>
        ))}
      </div>
    </div>
  </section>
);

export default DivisionGrid;
