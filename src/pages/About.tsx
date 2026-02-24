import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import { Globe, Users, Award, Building } from "lucide-react";

const leaders = [
  { name: "James Mitchell", role: "Chief Executive Officer" },
  { name: "Sarah Chen", role: "Chief Operating Officer" },
  { name: "Robert Park", role: "VP, Flexible Packaging" },
  { name: "Maria Rodriguez", role: "VP, Containers Division" },
  { name: "David Kim", role: "VP, Folding Carton" },
  { name: "Lisa Thompson", role: "VP, Corrugated Division" },
];

const About = () => (
  <div className="min-h-screen">
    <Header />
    <main>
      {/* Hero */}
      <section className="pt-32 pb-20 bg-primary">
        <div className="container-narrow px-6 lg:px-12">
          <ScrollReveal>
            <p className="text-primary-foreground/60 text-sm font-semibold tracking-widest uppercase mb-3">About Us</p>
            <h1 className="text-4xl md:text-5xl font-extrabold text-primary-foreground mb-6 max-w-2xl">
              Building the Future of Packaging
            </h1>
            <p className="text-primary-foreground/70 text-lg max-w-xl">
              For over 50 years, Five Star Group has set the standard for integrated
              packaging manufacturing across North America and beyond.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-background">
        <div className="container-narrow">
          <ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: Building, title: "25+ Facilities", desc: "Strategically located to serve you nationwide." },
                { icon: Users, title: "5,000+ Team Members", desc: "Passionate packaging professionals." },
                { icon: Globe, title: "Global Reach", desc: "Serving brands across 30+ countries." },
                { icon: Award, title: "Industry Leaders", desc: "Award-winning innovation and quality." },
              ].map((item, i) => (
                <ScrollReveal key={item.title} delay={i * 0.1}>
                  <div className="p-6 rounded-xl bg-card border border-border text-center">
                    <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center mx-auto mb-4">
                      <item.icon size={22} className="text-primary" />
                    </div>
                    <h3 className="font-bold text-foreground mb-1">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Global Reach */}
      <section className="section-padding bg-muted">
        <div className="container-narrow text-center">
          <ScrollReveal>
            <p className="text-sm font-semibold text-primary tracking-widest uppercase mb-3">Global Reach</p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4">Serving Brands Worldwide</h2>
            <p className="text-muted-foreground max-w-xl mx-auto mb-12">
              Our strategically positioned facilities ensure fast turnaround and efficient logistics
              across North America, with export capabilities to 30+ countries.
            </p>
            <div className="bg-card rounded-xl border border-border p-8 shadow-sm">
              <div className="grid grid-cols-3 gap-8 text-center">
                <div>
                  <div className="text-3xl font-extrabold text-primary">12</div>
                  <div className="text-sm text-muted-foreground mt-1">US States</div>
                </div>
                <div>
                  <div className="text-3xl font-extrabold text-primary">3</div>
                  <div className="text-sm text-muted-foreground mt-1">Canadian Provinces</div>
                </div>
                <div>
                  <div className="text-3xl font-extrabold text-primary">30+</div>
                  <div className="text-sm text-muted-foreground mt-1">Export Countries</div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Leadership */}
      <section className="section-padding bg-background">
        <div className="container-narrow">
          <ScrollReveal>
            <p className="text-sm font-semibold text-primary tracking-widest uppercase mb-3">Leadership</p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-12">Our Executive Team</h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {leaders.map((leader, i) => (
              <ScrollReveal key={leader.name} delay={i * 0.08}>
                <div className="p-6 rounded-xl bg-card border border-border">
                  <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center mb-4">
                    <span className="text-xl font-bold text-primary">
                      {leader.name.split(" ").map(n => n[0]).join("")}
                    </span>
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

export default About;
