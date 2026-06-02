import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logoImg from "@/assets/logo_prime.png";
import { useLang } from "@/contexts/LanguageContext";
import { useCms } from "@/contexts/CmsContext";
import { useWhatsAppLink } from "@/hooks/useWhatsAppLink";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone, Globe, ChevronDown } from "lucide-react";

const Header = () => {
  const { t, toggleLang, lang } = useLang();
  const whatsappLink = useWhatsAppLink();
  const { settings } = useCms();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { path: "/", label: t.nav.home },
    { path: "/packages", label: t.nav.packages },
    { path: "/about", label: t.nav.about },
    { path: "/contact", label: t.nav.contact },
  ];

  const serviceLinks = [
    { path: "/services/hajj-umrah", label: t.nav.hajjUmrah },
    { path: "/services/tour-packages", label: t.nav.tourPackages },
    { path: "/services/air-ticket", label: t.nav.airTicket },
    { path: "/services/hotel-booking", label: t.nav.hotelBooking },
    { path: "/services/visa-processing", label: t.nav.visaProcessing },
  ];

  return (
    <>
      {/* Top bar */}
      <div className="bg-navy-dark text-primary-foreground text-sm py-2">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <a href={`tel:${settings.phone}`} className="flex items-center gap-1 hover:text-gold transition-colors">
              <Phone className="w-3 h-3" />
              <span>{settings.phone}</span>
            </a>
            <span className="hidden sm:inline text-muted-foreground">|</span>
            <a
              href={`https://wa.me/${settings.whatsapp.replace(/[^0-9]/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1 hover:text-gold transition-colors"
            >
              WhatsApp: {settings.whatsapp}
            </a>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleLang}
            className="text-primary-foreground hover:text-gold hover:bg-transparent gap-1 h-7 text-xs"
          >
            <Globe className="w-3 h-3" />
            {t.nav.switchLang}
          </Button>
        </div>
      </div>

      {/* Main navbar */}
      <header className="bg-white sticky top-0 z-50 shadow-lg border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3">
              <div className="rounded-xl p-1.5">
                <img src={logoImg} alt="Prime Sky International" className="h-12 w-auto" />
              </div>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.slice(0, 1).map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive(link.path)
                      ? "bg-primary text-primary-foreground"
                      : "text-foreground hover:bg-primary/10 hover:text-primary"
                  }`}
                >
                  {link.label}
                </Link>
              ))}

              {/* Services dropdown */}
              <div className="relative" onMouseEnter={() => setServicesOpen(true)} onMouseLeave={() => setServicesOpen(false)}>
                <button
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-1 ${
                    location.pathname.startsWith("/services")
                      ? "bg-primary text-primary-foreground"
                      : "text-foreground hover:bg-primary/10 hover:text-primary"
                  }`}
                >
                  {t.nav.services}
                  <ChevronDown className="w-3 h-3" />
                </button>
                {servicesOpen && (
                  <div className="absolute top-full left-0 bg-card border border-border rounded-lg shadow-xl py-2 min-w-[220px] z-50">
                    {serviceLinks.map((link) => (
                      <Link
                        key={link.path}
                        to={link.path}
                        onClick={() => setServicesOpen(false)}
                        className="block px-4 py-2 text-sm text-foreground hover:bg-muted hover:text-primary transition-colors"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {navLinks.slice(1).map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive(link.path)
                      ? "bg-primary text-primary-foreground"
                      : "text-foreground hover:bg-primary/10 hover:text-primary"
                  }`}
                >
                  {link.label}
                </Link>
              ))}

              <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                <Button variant="gold" className="ml-2">
                  {t.nav.bookNow}
                </Button>
              </a>
            </nav>

            {/* Mobile menu button */}
            <button
              className="lg:hidden text-foreground p-2"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden bg-navy-dark border-t border-navy-light">
            <div className="container mx-auto px-4 py-4 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileOpen(false)}
                  className={`block px-3 py-2 rounded-md text-sm font-medium ${
                    isActive(link.path) ? "bg-navy-light text-gold" : "text-primary-foreground hover:bg-navy-light"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="border-t border-navy-light pt-2 mt-2">
                <p className="text-gold text-xs px-3 mb-1 uppercase tracking-wider">{t.nav.services}</p>
                {serviceLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setMobileOpen(false)}
                    className="block px-5 py-2 rounded-md text-sm text-primary-foreground hover:bg-navy-light"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer" onClick={() => setMobileOpen(false)}>
                <Button variant="gold" className="w-full mt-2">
                  {t.nav.bookNow}
                </Button>
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;
