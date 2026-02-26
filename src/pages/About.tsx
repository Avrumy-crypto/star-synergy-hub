import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import { ArrowRight, CalendarDays, Newspaper, Megaphone } from "lucide-react";
import { useEffect, useState } from "react";
import { getNewsContent, type NewsContent } from "@/lib/newsContent";

const About = () => {
  const [content, setContent] = useState<NewsContent>(getNewsContent());

  useEffect(() => {
    const refresh = () => setContent(getNewsContent());
    window.addEventListener("storage", refresh);
    window.addEventListener("focus", refresh);

    return () => {
      window.removeEventListener("storage", refresh);
      window.removeEventListener("focus", refresh);
    };
  }, []);

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <section className="pt-32 pb-20 bg-primary">
          <div className="container-narrow px-6 lg:px-12">
            <ScrollReveal>
              <p className="text-primary-foreground/70 text-sm font-semibold tracking-widest uppercase mb-3">Newsroom</p>
              <h1 className="text-4xl md:text-5xl font-extrabold text-primary-foreground mb-6 max-w-3xl">
                News & Updates
              </h1>
              <p className="text-primary-foreground/80 text-lg max-w-2xl">
                Latest announcements, product updates, and operational milestones from across Five Star Group.
              </p>
            </ScrollReveal>
          </div>
        </section>

        <section className="section-padding bg-background">
          <div className="container-narrow">
            <ScrollReveal>
              <div className="rounded-2xl border border-border bg-card p-8 md:p-10">
                <div className="flex items-center gap-2 text-primary text-sm font-semibold mb-4">
                  <Newspaper size={16} />
                  Featured Story
                </div>
                <h2 className="text-2xl md:text-3xl font-extrabold text-foreground mb-4 max-w-4xl">
                  {content.featured.title}
                </h2>
                <p className="text-muted-foreground mb-6 max-w-3xl">{content.featured.excerpt}</p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CalendarDays size={14} />
                  {content.featured.date}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        <section className="section-padding bg-muted border-y border-border">
          <div className="container-narrow">
            <ScrollReveal>
              <p className="text-sm font-semibold text-primary tracking-widest uppercase mb-3">Latest News</p>
              <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-10">Recent Updates</h2>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {content.latest.map((item, i) => (
                <ScrollReveal key={item.title} delay={i * 0.08}>
                  <article className="h-full rounded-xl border border-border bg-card p-6">
                    <p className="text-xs font-semibold text-primary mb-3 uppercase tracking-wide">{item.category}</p>
                    <h3 className="font-bold text-foreground mb-3 leading-snug">{item.title}</h3>
                    <p className="text-sm text-muted-foreground mb-5">{item.excerpt}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <CalendarDays size={13} />
                      {item.date}
                    </div>
                  </article>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        <section className="section-padding bg-background">
          <div className="container-narrow">
            <ScrollReveal>
              <div className="rounded-2xl border border-border bg-card p-8 md:p-10">
                <div className="flex items-center gap-2 text-primary text-sm font-semibold mb-4 uppercase tracking-wide">
                  <Megaphone size={16} />
                  Press Releases
                </div>
                <ul className="space-y-4">
                  {content.press.map((headline) => (
                    <li key={headline} className="flex items-start justify-between gap-3 border-b border-border pb-4 last:border-0 last:pb-0">
                      <span className="text-foreground font-medium">{headline}</span>
                      <ArrowRight size={16} className="text-primary mt-1 flex-shrink-0" />
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
