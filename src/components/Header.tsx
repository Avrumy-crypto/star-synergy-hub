import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, Menu, X, Globe, Phone, Mail } from "lucide-react";
import logo from "@/assets/five-star-logo.svg";
import { useI18n } from "@/lib/i18n";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const { lang, setLang, t } = useI18n();
  const location = useLocation();

  const languages = [
    { code: "en", label: t("lang.english") },
    { code: "tr", label: t("lang.turkish") },
    { code: "es", label: t("lang.spanish") },
  ] as const;

  const navLinks = [
    { name: t("header.nav.home"), href: "/" },
    { name: t("header.nav.divisions"), href: "/divisions" },
    { name: t("header.nav.solutions"), href: "/solutions" },
    { name: t("header.nav.sustainability"), href: "/sustainability" },
    { name: "News", href: "/careers" },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setLangOpen(false);
  }, [location]);

  const currentLangLabel = languages.find((l) => l.code === lang)?.label || t("lang.english");

  return (
    <>
      {/* Top Utility Bar */}
      <div className="bg-foreground text-background/70 text-xs relative z-50">
        <div className="container-narrow flex items-center justify-between h-9 px-6 lg:px-12">
          <div className="flex items-center gap-5">
            <a href="tel:+17188750022" className="flex items-center gap-1.5 hover:text-background transition-colors">
              <Phone size={11} />
              <span>+1 (718) 875-0022</span>
            </a>
            <a href="mailto:sales@fivestarcorr.com" className="hidden sm:flex items-center gap-1.5 hover:text-background transition-colors">
              <Mail size={11} />
              <span>sales@fivestarcorr.com</span>
            </a>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/contact" className="hover:text-background transition-colors font-medium">
              {t("header.contactUs")}
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
                  {languages.map((language) => (
                    <button
                      key={language.code}
                      onClick={() => {
                        setLang(language.code);
                        setLangOpen(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 text-xs hover:bg-accent transition-colors ${
                        lang === language.code ? "text-primary font-semibold" : "text-foreground"
                      }`}
                    >
                      {language.label}
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
        <div className="container-narrow relative flex items-center justify-between h-16 px-6 lg:px-12">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <img src={logo} alt="Five Star Group" className="h-9 w-auto" />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-0.5 absolute left-1/2 -translate-x-1/2">
            {navLinks.map((link) => (
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
            ))}
          </nav>

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
                  to={link.href}
                  className="px-4 py-2.5 text-sm font-medium text-foreground hover:text-primary hover:bg-accent rounded transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;
