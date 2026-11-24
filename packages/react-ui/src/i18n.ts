import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

export const initi18n = () => {
  const i18nextInstance = i18next.createInstance();
  return i18nextInstance
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
      lng: 'en', // if you're using a language detector, do not define the lng option
      fallbackLng: 'en',

      interpolation: {
        escapeValue: false, // react generally escapes by default, prevent double escape  => https://www.i18next.com/translation-function/interpolation#unescape
      },
    });
};
