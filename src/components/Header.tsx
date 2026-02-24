import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, Menu, X } from "lucide-react";
import logo from "@/assets/five-star-logo.svg";

const divisions = [
  {
    name: "Flexible Packaging",
    description: "Stand-up pouches, rollstock, and barrier films for food & consumer goods.",
    href: "#",
  },
  {
    name: "Containers",
    description: "Rigid plastic containers, tubs, and lids for dairy, deli & foodservice.",
    href: "#",
  },
  {
    name: "Folding Carton",
    description: "Premium printed cartons for pharmaceutical, beauty, and retail packaging.",
    href: "#",
  },
  {
    name: "Corrugated Boxes",
    description: "Custom corrugated shipping and display solutions for e-commerce & retail.",
    href: "#",
  },
];

const navLinks = [
  { name: "Our Divisions", href: "/divisions", hasMega: true },
  { name: "Solutions", href: "/solutions" },
  { name: "Sustainability", href: "/sustainability" },
  { name: "Careers", href: "/careers" },
  { name: "Contact", href: "/contact" },
];

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setMegaOpen(false);
  }, [location]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-card/95 backdrop-blur-md shadow-sm border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="container-narrow flex items-center justify-between h-[72px] px-6 lg:px-12">
        {/* Logo */}
        <Link to="/" className="flex-shrink-0">
          <img src={logo} alt="Five Star Group" className="h-10 w-auto" />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) =>
            link.hasMega ? (
              <div
                key={link.name}
                className="relative"
                onMouseEnter={() => setMegaOpen(true)}
                onMouseLeave={() => setMegaOpen(false)}
              >
                <button
                  className={`flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                    megaOpen
                      ? "text-primary bg-accent"
                      : scrolled
                      ? "text-foreground hover:text-primary hover:bg-accent"
                      : "text-foreground hover:text-primary"
                  }`}
                >
                  {link.name}
                  <ChevronDown
                    size={14}
                    className={`transition-transform ${megaOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {/* Mega Menu */}
                {megaOpen && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2">
                    <div className="bg-card rounded-xl shadow-xl border border-border p-6 grid grid-cols-2 gap-4 w-[560px] animate-fade-in">
                      {divisions.map((div) => (
                        <a
                          key={div.name}
                          href={div.href}
                          className="group flex flex-col gap-1.5 p-4 rounded-lg hover:bg-accent transition-colors"
                        >
                          <span className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                            {div.name}
                          </span>
                          <span className="text-xs text-muted-foreground leading-relaxed">
                            {div.description}
                          </span>
                          <span className="text-xs font-semibold text-primary opacity-0 group-hover:opacity-100 transition-opacity mt-1">
                            Visit Site →
                          </span>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={link.name}
                to={link.href}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  location.pathname === link.href
                    ? "text-primary bg-accent"
                    : scrolled
                    ? "text-foreground hover:text-primary hover:bg-accent"
                    : "text-foreground hover:text-primary"
                }`}
              >
                {link.name}
              </Link>
            )
          )}
        </nav>

        {/* CTA */}
        <Link
          to="/contact"
          className="hidden lg:inline-flex px-5 py-2.5 bg-primary text-primary-foreground text-sm font-semibold rounded-lg hover:brightness-110 transition-all"
        >
          Get a Quote
        </Link>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden p-2 text-foreground"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-card border-t border-border animate-fade-in">
          <div className="px-6 py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.hasMega ? "/" : link.href}
                className="px-4 py-3 text-sm font-medium text-foreground hover:text-primary hover:bg-accent rounded-lg transition-colors"
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/contact"
              className="mt-2 px-5 py-2.5 bg-primary text-primary-foreground text-sm font-semibold rounded-lg text-center hover:brightness-110 transition-all"
            >
              Get a Quote
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
