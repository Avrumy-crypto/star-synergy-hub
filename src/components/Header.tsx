import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, Menu, X, Globe, Phone, Mail } from "lucide-react";
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

const languages = [
  { code: "en", label: "English" },
  { code: "tr", label: "Türkçe" },
  { code: "es", label: "Español" },
];

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Divisions", href: "/divisions", hasMega: true },
  { name: "Solutions", href: "/solutions" },
  { name: "Sustainability", href: "/sustainability" },
  { name: "Careers", href: "/careers" },
];

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState("en");
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setMegaOpen(false);
    setLangOpen(false);
  }, [location]);

  const currentLangLabel = languages.find((l) => l.code === currentLang)?.label || "English";

  return (
    <>
      {/* Top Utility Bar */}
      <div className="bg-foreground text-background/70 text-xs relative z-50">
        <div className="container-narrow flex items-center justify-between h-9 px-6 lg:px-12">
          <div className="flex items-center gap-5">
            <a href="tel:+18005550199" className="flex items-center gap-1.5 hover:text-background transition-colors">
              <Phone size={11} />
              <span>+1 (800) 555-0199</span>
            </a>
            <a href="mailto:info@fivestargroup.com" className="hidden sm:flex items-center gap-1.5 hover:text-background transition-colors">
              <Mail size={11} />
              <span>info@fivestargroup.com</span>
            </a>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/contact" className="hover:text-background transition-colors font-medium">
              Contact Us
            </Link>
            <span className="w-px h-3.5 bg-background/20" />
            {/* Language Switcher */}
            <div className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-1.5 hover:text-background transition-colors"
              >
                <Globe size={12} />
                <span>{currentLangLabel}</span>
                <ChevronDown size={10} className={`transition-transform ${langOpen ? "rotate-180" : ""}`} />
              </button>
              {langOpen && (
                <div className="absolute right-0 top-full mt-1 bg-card border border-border rounded-md shadow-lg py-1 min-w-[120px] z-50">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setCurrentLang(lang.code);
                        setLangOpen(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 text-xs hover:bg-accent transition-colors ${
                        currentLang === lang.code ? "text-primary font-semibold" : "text-foreground"
                      }`}
                    >
                      {lang.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header
        className={`sticky top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? "bg-card/98 backdrop-blur-md shadow-sm border-b border-border"
            : "bg-card border-b border-border"
        }`}
      >
        <div className="container-narrow flex items-center justify-between h-16 px-6 lg:px-12">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <img src={logo} alt="Five Star Group" className="h-9 w-auto" />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-0.5">
            {navLinks.map((link) =>
              link.hasMega ? (
                <div
                  key={link.name}
                  className="relative"
                  onMouseEnter={() => setMegaOpen(true)}
                  onMouseLeave={() => setMegaOpen(false)}
                >
                  <button
                    className={`flex items-center gap-1 px-4 py-2 text-sm font-medium transition-colors ${
                      megaOpen
                        ? "text-primary"
                        : "text-foreground hover:text-primary"
                    }`}
                  >
                    {link.name}
                    <ChevronDown
                      size={13}
                      className={`transition-transform ${megaOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  {/* Mega Menu */}
                  {megaOpen && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-1">
                      <div className="bg-card rounded-lg shadow-xl border border-border p-5 grid grid-cols-2 gap-3 w-[520px] animate-fade-in">
                        {divisions.map((div) => (
                          <a
                            key={div.name}
                            href={div.href}
                            className="group flex flex-col gap-1 p-3 rounded-md hover:bg-accent transition-colors"
                          >
                            <span className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                              {div.name}
                            </span>
                            <span className="text-xs text-muted-foreground leading-relaxed">
                              {div.description}
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
                  className={`px-4 py-2 text-sm font-medium transition-colors ${
                    location.pathname === link.href
                      ? "text-primary"
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
            className="hidden lg:inline-flex px-5 py-2 bg-primary text-primary-foreground text-sm font-semibold rounded hover:brightness-110 transition-all"
          >
            Get a Quote
          </Link>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 text-foreground"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="lg:hidden bg-card border-t border-border animate-fade-in">
            <div className="px-6 py-4 flex flex-col gap-0.5">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.hasMega ? "/" : link.href}
                  className="px-4 py-2.5 text-sm font-medium text-foreground hover:text-primary hover:bg-accent rounded transition-colors"
                >
                  {link.name}
                </Link>
              ))}
              <div className="border-t border-border mt-2 pt-2">
                <Link
                  to="/contact"
                  className="block px-5 py-2.5 bg-primary text-primary-foreground text-sm font-semibold rounded text-center hover:brightness-110 transition-all"
                >
                  Get a Quote
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;
