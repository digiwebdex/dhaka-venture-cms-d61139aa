import React, { createContext, useContext, useState, ReactNode } from "react";
import { bn } from "@/i18n/bn";
import { en } from "@/i18n/en";

type Lang = "bn" | "en";

interface LanguageContextType {
  lang: Lang;
  t: typeof bn;
  toggleLang: () => void;
  setLang: (l: Lang) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Lang>("bn");
  const t = lang === "bn" ? bn : en;
  const toggleLang = () => setLang((prev) => (prev === "bn" ? "en" : "bn"));

  return (
    <LanguageContext.Provider value={{ lang, t, toggleLang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLang = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang must be used within LanguageProvider");
  return ctx;
};
