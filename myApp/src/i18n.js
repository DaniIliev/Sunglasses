import i18n from "i18next"
import {initReactI18next} from"react-i18next"
import eng from "./locales/eng.json";
import bg from "./locales/bg.json";

const resources = {
    eng: { translation: eng },
    bg: { translation: bg }
  };

  i18n.use(initReactI18next).init({
    resources,
    lng: localStorage.getItem("language") || "bg", // Запазване на езика
    fallbackLng: "bg",
    interpolation: {
      escapeValue: false
    }
  });
  
  i18n.on("languageChanged", (lng) => {
    localStorage.setItem("language", lng); // Запис на текущия език
  });
  
export default i18n