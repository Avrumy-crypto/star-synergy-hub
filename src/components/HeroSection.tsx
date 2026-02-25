import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import heroImg from "@/assets/hero-packaging.jpg";

const HeroSection = () => (
  <section className="relative h-[75vh] min-h-[500px] flex items-center">
    {/* Background Image */}
    <div className="absolute inset-0">
      <img
        src={heroImg}
        alt="Packaging manufacturing facility"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-foreground/70" />
    </div>

    {/* Content */}
    <div className="relative z-10 container-narrow px-6 lg:px-12">
      <div className="max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="inline-block px-3 py-1 bg-primary/90 text-primary-foreground text-xs font-semibold tracking-widest uppercase rounded mb-6"
        >
          Five Star Group
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-4xl md:text-5xl lg:text-[3.5rem] font-extrabold text-background leading-[1.1] mb-5"
        >
          Integrated Packaging.{" "}
          <span className="text-background/80">Infinite Possibilities.</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-background/70 text-base md:text-lg leading-relaxed mb-8 max-w-lg"
        >
          Five Star Group unites world-class manufacturing divisions to solve your most
          complex packaging challenges.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex gap-3"
        >
          <Link
            to="/about"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-semibold rounded hover:brightness-110 transition-all text-sm"
          >
            Explore Our Divisions
            <ArrowRight size={16} />
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 border border-background/30 text-background font-semibold rounded hover:bg-background/10 transition-all text-sm"
          >
            Contact Us
          </Link>
        </motion.div>
      </div>
    </div>
  </section>
);

export default HeroSection;
