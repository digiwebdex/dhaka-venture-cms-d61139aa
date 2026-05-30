import { Link } from "react-router-dom";
import { useLang } from "@/contexts/LanguageContext";
import { useCms } from "@/contexts/CmsContext";
import { Phone, Mail, MapPin, Facebook, Instagram, Youtube } from "lucide-react";

const Footer = () => {
  const { t, lang } = useLang();
  const { settings, footerContent } = useCms();

  return (
    <footer className="bg-navy-gradient text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company info */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src="/logo_prime.png" alt="Logo" className="h-12 w-auto" />
            </div>
            <p className="text-sm text-primary-foreground/70 leading-relaxed">
              {lang === "bn" ? footerContent.descriptionBn : footerContent.descriptionEn}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-gold">{t.footer.quickLinks}</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-gold transition-colors">{t.nav.home}</Link></li>
              <li><Link to="/services/hajj-umrah" className="hover:text-gold transition-colors">{t.nav.hajjUmrah}</Link></li>
              <li><Link to="/services/tour-packages" className="hover:text-gold transition-colors">{t.nav.tourPackages}</Link></li>
              <li><Link to="/services/visa-processing" className="hover:text-gold transition-colors">{t.nav.visaProcessing}</Link></li>
              <li><Link to="/packages" className="hover:text-gold transition-colors">{t.nav.packages}</Link></li>
              <li><Link to="/about" className="hover:text-gold transition-colors">{t.nav.about}</Link></li>
              <li><Link to="/contact" className="hover:text-gold transition-colors">{t.nav.contact}</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-gold">{t.footer.contactInfo}</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 text-gold shrink-0" />
                <span>{lang === "bn" ? settings.addressBn : settings.address}</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-gold shrink-0" />
                <a href={`tel:${settings.phone}`} className="hover:text-gold transition-colors">{settings.phone}</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-gold shrink-0" />
                <a href={`mailto:${settings.email}`} className="hover:text-gold transition-colors">{settings.email}</a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-gold">{t.footer.followUs}</h3>
            <div className="flex gap-3">
              <a href={settings.facebook} target="_blank" rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-navy-light flex items-center justify-center hover:bg-gold hover:text-secondary-foreground transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href={settings.instagram} target="_blank" rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-navy-light flex items-center justify-center hover:bg-gold hover:text-secondary-foreground transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href={settings.youtube} target="_blank" rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-navy-light flex items-center justify-center hover:bg-gold hover:text-secondary-foreground transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-navy-light mt-10 pt-6 text-center text-sm text-primary-foreground/60">
          <p>© {new Date().getFullYear()} {lang === "bn" ? settings.companyNameBn : settings.companyName}. {lang === "bn" ? footerContent.copyrightBn : footerContent.copyrightEn}.</p>
          {footerContent.developerName && (
            <p className="mt-1">
              Design & Developed by{" "}
              <a href={footerContent.developerUrl} target="_blank" rel="noopener noreferrer" className="text-gold hover:underline font-medium">
                {footerContent.developerName}
              </a>
            </p>
          )}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
