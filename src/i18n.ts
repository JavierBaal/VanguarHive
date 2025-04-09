import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpApi from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  // Carga traducciones usando http -> ver /public/locales
  // Aprende más: https://github.com/i18next/i18next-http-backend
  .use(HttpApi)
  // Detecta el idioma del usuario
  // Aprende más: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // Pasa la instancia de i18n a react-i18next.
  .use(initReactI18next)
  // Inicializa i18next
  // Aprende más: https://www.i18next.com/overview/configuration-options
  .init({
    fallbackLng: 'en', // Idioma por defecto si el detectado no está disponible
    debug: true, // Activa logs en la consola (útil para desarrollo)
    supportedLngs: ['en', 'es'], // Idiomas soportados
    interpolation: {
      escapeValue: false, // React ya escapa por defecto
    },
    backend: {
      loadPath: '/locales/{{lng}}/translation.json', // Ruta a los archivos de traducción
    },
    detection: {
      // Orden y desde dónde detectar el idioma
      order: ['localStorage', 'navigator', 'htmlTag', 'path', 'subdomain'],
      // Claves a buscar en localStorage
      caches: ['localStorage'],
      lookupLocalStorage: 'i18nextLng', // Clave para guardar el idioma seleccionado
    },
  });

export default i18n;
