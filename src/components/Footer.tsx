import { Link } from "react-router-dom";
import { Instagram, Linkedin, Youtube } from "lucide-react";
import logo from "@/assets/five-star-logo.svg";
import { useI18n } from "@/lib/i18n";

const Footer = () => {
  const { t } = useI18n();

  return (
    <footer className="bg-foreground text-background">
    <div className="container-narrow section-padding">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        <div className="lg:col-span-1">
          <img src={logo} alt="Five Star Group" className="h-10 brightness-0 invert mb-4" />
          <p className="text-sm text-background/60 leading-relaxed">
            {t("footer.about")}
          </p>
          <div className="mt-4 flex items-center gap-3 text-background/50">
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="hover:text-background transition-colors"
            >
              <Instagram size={16} />
            </a>
            <a
              href="https://x.com"
              target="_blank"
              rel="noreferrer"
              aria-label="X"
              className="h-4 w-4 inline-flex items-center justify-center text-[11px] font-semibold hover:text-background transition-colors"
            >
              X
            </a>
            <a
              href="https://www.linkedin.com/company/five-star-packaging-and-display/"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="hover:text-background transition-colors"
            >
              <Linkedin size={16} />
            </a>
            <a
              href="https://www.youtube.com"
              target="_blank"
              rel="noreferrer"
              aria-label="YouTube"
              className="hover:text-background transition-colors"
            >
              <Youtube size={16} />
            </a>
          </div>
        </div>
        <div>
          <h4 className="text-sm font-semibold mb-4 text-background/80">{t("footer.divisions")}</h4>
          <ul className="space-y-2 text-sm text-background/50">
            <li><a href="#" className="hover:text-background transition-colors">{t("footer.division.flexible")}</a></li>
            <li><a href="#" className="hover:text-background transition-colors">{t("footer.division.containers")}</a></li>
            <li><a href="#" className="hover:text-background transition-colors">{t("footer.division.carton")}</a></li>
            <li><a href="#" className="hover:text-background transition-colors">{t("footer.division.corrugated")}</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold mb-4 text-background/80">{t("footer.company")}</h4>
          <ul className="space-y-2 text-sm text-background/50">
            <li><Link to="/about" className="hover:text-background transition-colors">{t("footer.aboutUs")}</Link></li>
            <li><Link to="/sustainability" className="hover:text-background transition-colors">{t("footer.sustainability")}</Link></li>
            <li><Link to="/careers" className="hover:text-background transition-colors">{t("footer.careers")}</Link></li>
            <li><Link to="/contact" className="hover:text-background transition-colors">{t("footer.contactNav")}</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold mb-4 text-background/80">{t("footer.contact")}</h4>
          <ul className="space-y-2 text-sm text-background/50">
            <li>info@fivestargroup.com</li>
            <li>+1 (800) 555-0199</li>
            <li>Corporate Headquarters<br />Chicago, IL 60601</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-background/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-xs text-background/40">
          © {new Date().getFullYear()} Five Star Group. {t("footer.copyright")}
        </p>
        <div className="flex flex-wrap items-center gap-6 text-xs text-background/40">
          <a href="#" className="hover:text-background transition-colors">{t("footer.privacy")}</a>
          <a href="#" className="hover:text-background transition-colors">{t("footer.terms")}</a>
        </div>
      </div>
    </div>
  </footer>
  );
};

export default Footer;
