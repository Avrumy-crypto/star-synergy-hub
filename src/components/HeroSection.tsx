import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import heroImg from "@/assets/hero-packaging.jpg";

const HeroSection = () => (
  <section className="relative min-h-[90vh] flex">
    {/* Left - Blue Content */}
    <div className="relative z-10 flex-1 flex items-center bg-primary">
      <div className="px-8 md:px-16 lg:px-20 py-32 max-w-2xl ml-auto">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-primary-foreground/70 text-sm font-semibold tracking-widest uppercase mb-6"
        >
          Five Star Group
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-primary-foreground leading-[1.1] mb-6"
        >
          Integrated Packaging.{" "}
          <span className="text-primary-foreground/80">Infinite Possibilities.</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-primary-foreground/70 text-lg leading-relaxed mb-10 max-w-lg"
        >
          Five Star Group unites world-class manufacturing divisions to solve your most
          complex packaging challenges.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Link
            to="/about"
            className="inline-flex items-center gap-2 px-8 py-4 bg-card text-primary font-semibold rounded-lg hover:bg-card/90 transition-colors text-sm"
          >
            Explore Our Divisions
            <span className="text-lg">→</span>
          </Link>
        </motion.div>
      </div>
    </div>

    {/* Right - Image */}
    <div className="hidden lg:block flex-1 relative overflow-hidden">
      <img
        src={heroImg}
        alt="Packaging manufacturing facility"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent" />
    </div>
  </section>
);

export default HeroSection;
