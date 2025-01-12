import i18n from "i18next"
import {initReactI18next} from"react-i18next"
import eng from "./locales/eng.json";
import bg from "./locales/bg.json";

// const resources = {
//     eng: {translation: en},
//     bg: {translation: bg},
// }

// i18n.use(initReactI18next).init({
//     debug: true,
//     fallbackLng: "en",
//     resources: {
//         eng: {
//             translation: {
//                 welcome: 'Welcome to vistglasses'
//             }
//         }
//     }
// })


const resources = {
    eng: { translation: eng },
    bg: { translation: bg }
  };
  
  i18n.use(initReactI18next).init({
    resources,
    lng: "en", // Начален език
    fallbackLng: "en", // Език по подразбиране
    interpolation: {
      escapeValue: false // React вече защитава от XSS
    }
  });

  i18n.use(initReactI18next).init({
    resources,
    lng: localStorage.getItem("language") || "en", // Запазване на езика
    fallbackLng: "en",
    interpolation: {
      escapeValue: false
    }
  });
  
  i18n.on("languageChanged", (lng) => {
    localStorage.setItem("language", lng); // Запис на текущия език
  });
  
export default i18n