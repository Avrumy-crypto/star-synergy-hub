import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import { Search, MapPin, Briefcase, Clock } from "lucide-react";

const jobs = [
  { title: "Production Manager", division: "Flexible Packaging", location: "Atlanta, GA", type: "Full-time" },
  { title: "Quality Assurance Engineer", division: "Containers", location: "Chicago, IL", type: "Full-time" },
  { title: "Graphic Designer — Packaging", division: "Folding Carton", location: "Dallas, TX", type: "Full-time" },
  { title: "Supply Chain Analyst", division: "Corrugated Boxes", location: "Los Angeles, CA", type: "Full-time" },
  { title: "Maintenance Technician", division: "Flexible Packaging", location: "Charlotte, NC", type: "Full-time" },
  { title: "Sales Account Executive", division: "Corporate", location: "Chicago, IL", type: "Full-time" },
  { title: "Sustainability Coordinator", division: "Corporate", location: "Remote", type: "Full-time" },
  { title: "Machine Operator", division: "Corrugated Boxes", location: "Phoenix, AZ", type: "Full-time" },
];

const Careers = () => {
  const [search, setSearch] = useState("");
  const [divisionFilter, setDivisionFilter] = useState("All");

  const divisions = ["All", ...Array.from(new Set(jobs.map(j => j.division)))];

  const filtered = jobs.filter(j => {
    const matchSearch = j.title.toLowerCase().includes(search.toLowerCase()) ||
      j.location.toLowerCase().includes(search.toLowerCase());
    const matchDiv = divisionFilter === "All" || j.division === divisionFilter;
    return matchSearch && matchDiv;
  });

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <section className="pt-32 pb-20 bg-primary">
          <div className="container-narrow px-6 lg:px-12">
            <ScrollReveal>
              <p className="text-primary-foreground/60 text-sm font-semibold tracking-widest uppercase mb-3">Careers</p>
              <h1 className="text-4xl md:text-5xl font-extrabold text-primary-foreground mb-6 max-w-2xl">
                Build Your Career With Us
              </h1>
              <p className="text-primary-foreground/70 text-lg max-w-xl">
                Join 5,000+ professionals shaping the future of packaging.
                We offer growth, innovation, and purpose.
              </p>
            </ScrollReveal>
          </div>
        </section>

        <section className="section-padding bg-background">
          <div className="container-narrow">
            {/* Filters */}
            <ScrollReveal>
              <div className="flex flex-col md:flex-row gap-4 mb-10">
                <div className="relative flex-1">
                  <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search by title or location..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 rounded-lg border border-border bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                  />
                </div>
                <select
                  value={divisionFilter}
                  onChange={e => setDivisionFilter(e.target.value)}
                  className="px-4 py-3 rounded-lg border border-border bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                >
                  {divisions.map(d => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>
            </ScrollReveal>

            {/* Job Cards */}
            <div className="space-y-4">
              {filtered.map((job, i) => (
                <ScrollReveal key={`${job.title}-${i}`} delay={i * 0.05}>
                  <div className="flex flex-col md:flex-row md:items-center justify-between p-6 rounded-xl bg-card border border-border hover:border-primary hover:shadow-md transition-all group cursor-pointer">
                    <div>
                      <h3 className="font-bold text-foreground group-hover:text-primary transition-colors">{job.title}</h3>
                      <div className="flex flex-wrap gap-4 mt-2 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1"><Briefcase size={14} /> {job.division}</span>
                        <span className="flex items-center gap-1"><MapPin size={14} /> {job.location}</span>
                        <span className="flex items-center gap-1"><Clock size={14} /> {job.type}</span>
                      </div>
                    </div>
                    <span className="mt-4 md:mt-0 text-sm font-semibold text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                      Apply Now →
                    </span>
                  </div>
                </ScrollReveal>
              ))}
              {filtered.length === 0 && (
                <p className="text-center text-muted-foreground py-12">
                  No positions match your search. Try adjusting your filters.
                </p>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Careers;
