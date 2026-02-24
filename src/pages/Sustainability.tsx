import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import { Recycle, Leaf, Droplets, Sun, ArrowRight } from "lucide-react";

const pillars = [
  { icon: Recycle, title: "Recyclable Materials", desc: "100% of our product lines offer recyclable alternatives. We're transitioning our entire portfolio to mono-material structures by 2030." },
  { icon: Leaf, title: "Reduced Carbon Footprint", desc: "Our facilities run on 40% renewable energy, with a roadmap to carbon neutrality by 2035 across all divisions." },
  { icon: Droplets, title: "Water Stewardship", desc: "Closed-loop water systems in all manufacturing facilities have reduced water consumption by 60% since 2018." },
  { icon: Sun, title: "Clean Energy", desc: "Solar installations across 12 facilities generate over 15MW of clean energy annually, powering our production lines." },
];

const Sustainability = () => (
  <div className="min-h-screen">
    <Header />
    <main>
      <section className="pt-32 pb-20 bg-primary">
        <div className="container-narrow px-6 lg:px-12">
          <ScrollReveal>
            <p className="text-primary-foreground/60 text-sm font-semibold tracking-widest uppercase mb-3">Sustainability</p>
            <h1 className="text-4xl md:text-5xl font-extrabold text-primary-foreground mb-6 max-w-2xl">
              Packaging a Circular Future
            </h1>
            <p className="text-primary-foreground/70 text-lg max-w-xl">
              Our commitment to the circular economy drives every decision —
              from material selection to end-of-life recyclability.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container-narrow">
          <ScrollReveal>
            <p className="text-sm font-semibold text-primary tracking-widest uppercase mb-3">Our Pillars</p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-12">
              Four Commitments Driving Change
            </h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pillars.map((p, i) => (
              <ScrollReveal key={p.title} delay={i * 0.1}>
                <div className="p-8 rounded-xl bg-card border border-border group hover:border-primary transition-colors">
                  <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center mb-5">
                    <p.icon size={22} className="text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">{p.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Circular Economy */}
      <section className="section-padding bg-muted">
        <div className="container-narrow text-center">
          <ScrollReveal>
            <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center mx-auto mb-6">
              <Recycle size={28} className="text-primary" />
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4">
              The Circular Economy
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8 text-lg">
              We design packaging with its entire lifecycle in mind. From sourcing post-consumer
              recycled content to engineering for easy recyclability, every product contributes
              to a closed-loop system.
            </p>
            <a
              href="#"
              className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
            >
              Download our Sustainability Report <ArrowRight size={16} />
            </a>
          </ScrollReveal>
        </div>
      </section>
    </main>
    <Footer />
  </div>
);

export default Sustainability;
