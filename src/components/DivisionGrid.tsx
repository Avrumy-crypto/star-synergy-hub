import ScrollReveal from "./ScrollReveal";
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
        <p className="text-sm font-semibold text-primary tracking-widest uppercase mb-3">
          Our Divisions
        </p>
        <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4">
          Four Divisions. One Vision.
        </h2>
        <p className="text-muted-foreground max-w-2xl mb-12">
          Each division is a specialist. Together, we deliver an integrated packaging ecosystem that
          covers every format and every stage of the supply chain.
        </p>
      </ScrollReveal>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {divisions.map((div, i) => (
          <ScrollReveal key={div.name} delay={i * 0.1}>
            <a
              href="#"
              className="group relative block overflow-hidden rounded-xl bg-card border border-border shadow-sm hover:shadow-lg hover:border-primary transition-all duration-300"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={div.img}
                  alt={div.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                  {div.name}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">{div.desc}</p>
                <span className="inline-block mt-3 text-sm font-semibold text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                  Learn More →
                </span>
              </div>
            </a>
          </ScrollReveal>
        ))}
      </div>
    </div>
  </section>
);

export default DivisionGrid;
