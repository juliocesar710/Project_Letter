import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { enUS, ptBR, es } from "date-fns/locale";

import pt from "./i18n/pt.json";
import en from "./i18n/en.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      pt: { translation: pt },
      en: { translation: en },
    },
    fallbackLng: "pt",
    interpolation: {
      escapeValue: false,
    },
  });

const localeMap = {
  en: enUS,
  pt: ptBR,
  es: es,
};

export const getCurrentLocale = () => localeMap[i18n.language] || ptBR;

export default i18n;
