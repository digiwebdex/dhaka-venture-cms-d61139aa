import { useCms } from "@/contexts/CmsContext";
import { useLang } from "@/contexts/LanguageContext";

export const useWhatsAppLink = (message?: string) => {
  const { settings } = useCms();
  const { lang } = useLang();
  const defaultMsg = lang === "bn"
    ? "আসসালামু আলাইকুম, আমি Prime Sky International এর সেবা সম্পর্কে জানতে চাই।"
    : "Hello, I'm interested in Prime Sky International services. Please share details.";
  const phone = settings.whatsapp.replace(/[^0-9]/g, "");
  return `https://wa.me/${phone}?text=${encodeURIComponent(message || defaultMsg)}`;
};
