"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getLanguage = getLanguage;
exports.getTranslations = getTranslations;
exports.DEFAULT_LANGUAGE = void 0;
const DEFAULT_LANGUAGE = 'en';
exports.DEFAULT_LANGUAGE = DEFAULT_LANGUAGE;

function getLanguage(language, defaultLanguage = DEFAULT_LANGUAGE) {
  if (typeof language === 'string' && language.length === 2) {
    return language.toLowerCase();
  }

  return defaultLanguage;
}

function getTranslations(translations, mainLanguage) {
  if (Array.isArray(translations)) {
    return translations.reduce((acc, transl) => {
      const lang = getLanguage(transl);
      return lang !== mainLanguage ? [...acc, lang] : acc;
    }, []).sort();
  }

  return [];
}