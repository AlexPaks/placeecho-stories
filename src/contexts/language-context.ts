import { createContext, useContext } from "react";

import { Language, SiteContent } from "@/content/types";

export interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: SiteContent;
  isRTL: boolean;
}

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }

  return context;
};
