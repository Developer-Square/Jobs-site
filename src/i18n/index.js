import { initReactI18next } from "react-i18next";
import i18n from "i18next";
import resources from "./locales";

const languages = [
  {
    code: "ar",
    name: "Arabic (عربى)",
  },
  {
    code: "zh",
    name: "Chinese Simplified (简体中文)",
  },
  {
    code: "en",
    name: "English (US)",
  },
  {
    code: "fr",
    name: "French (Français)",
  },
  {
    code: "de",
    name: "German (Deutsche)",
  },
  {
    code: "swa",
    name: "Kiswahili (Swahili)",
  },
];

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  fallbackLng: "en",
});

export { languages };

export default i18n;
