import { useCms } from "@/contexts/CmsContext";
import { MessageCircle, ArrowUp } from "lucide-react";
import { useState, useEffect } from "react";

const WhatsAppButton = () => {
  const { settings } = useCms();
  const waNumber = settings.whatsapp.replace(/[^0-9]/g, "");
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* WhatsApp Button - Left */}
      <a
        href={`https://wa.me/${waNumber}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-20 left-4 lg:bottom-6 lg:left-6 z-50 w-12 h-12 lg:w-14 lg:h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
        aria-label="WhatsApp"
      >
        <MessageCircle className="w-6 h-6 lg:w-7 lg:h-7" />
      </a>

      {/* Back to Top Button - Right */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-20 right-4 lg:bottom-6 lg:right-6 z-50 w-12 h-12 lg:w-14 lg:h-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
          aria-label="Back to top"
        >
          <ArrowUp className="w-6 h-6 lg:w-7 lg:h-7" />
        </button>
      )}
    </>
  );
};

export default WhatsAppButton;
