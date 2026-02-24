import { Link } from "react-router-dom";
import ScrollReveal from "./ScrollReveal";

const CTASection = () => (
  <section className="section-padding bg-primary">
    <div className="container-narrow text-center">
      <ScrollReveal>
        <h2 className="text-3xl md:text-4xl font-extrabold text-primary-foreground mb-4">
          Ready to Simplify Your Packaging?
        </h2>
        <p className="text-primary-foreground/70 max-w-xl mx-auto mb-8 text-lg">
          Let's discuss how Five Star Group can consolidate your packaging supply chain
          and deliver measurable results.
        </p>
        <Link
          to="/contact"
          className="inline-flex px-8 py-4 bg-card text-primary font-semibold rounded-lg hover:bg-card/90 transition-colors text-sm"
        >
          Contact Us Today
        </Link>
      </ScrollReveal>
    </div>
  </section>
);

export default CTASection;
