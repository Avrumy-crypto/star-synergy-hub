import { Link } from "react-router-dom";
import logo from "@/assets/five-star-logo.svg";

const Footer = () => (
  <footer className="bg-foreground text-background">
    <div className="container-narrow section-padding">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        <div className="lg:col-span-1">
          <img src={logo} alt="Five Star Group" className="h-10 brightness-0 invert mb-4" />
          <p className="text-sm text-background/60 leading-relaxed">
            Integrated packaging solutions from concept to shelf. Five Star Group unites
            world-class divisions to power your brand.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold mb-4 text-background/80">Divisions</h4>
          <ul className="space-y-2 text-sm text-background/50">
            <li><a href="#" className="hover:text-background transition-colors">Flexible Packaging</a></li>
            <li><a href="#" className="hover:text-background transition-colors">Containers</a></li>
            <li><a href="#" className="hover:text-background transition-colors">Folding Carton</a></li>
            <li><a href="#" className="hover:text-background transition-colors">Corrugated Boxes</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold mb-4 text-background/80">Company</h4>
          <ul className="space-y-2 text-sm text-background/50">
            <li><Link to="/about" className="hover:text-background transition-colors">About Us</Link></li>
            <li><Link to="/sustainability" className="hover:text-background transition-colors">Sustainability</Link></li>
            <li><Link to="/careers" className="hover:text-background transition-colors">Careers</Link></li>
            <li><Link to="/contact" className="hover:text-background transition-colors">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold mb-4 text-background/80">Contact</h4>
          <ul className="space-y-2 text-sm text-background/50">
            <li>info@fivestargroup.com</li>
            <li>+1 (800) 555-0199</li>
            <li>Corporate Headquarters<br />Chicago, IL 60601</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-background/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-xs text-background/40">
          © {new Date().getFullYear()} Five Star Group. All rights reserved.
        </p>
        <div className="flex gap-6 text-xs text-background/40">
          <a href="#" className="hover:text-background transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-background transition-colors">Terms of Use</a>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
