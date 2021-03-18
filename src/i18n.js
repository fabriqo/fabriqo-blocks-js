export const DEFAULT_LANGUAGE = 'en';

export function getLanguage(language, defaultLanguage = DEFAULT_LANGUAGE) {
  if (typeof language === 'string' && language.length === 2) {
    return language.toLowerCase();
  }
  return defaultLanguage;
}

export function getTranslations(translations, mainLanguage) {
  if (Array.isArray(translations)) {
    return translations.reduce((acc, transl) => {
      const lang = getLanguage(transl);
      return lang !== mainLanguage ? [...acc, lang] : acc
    }, []).sort();
  }

  return [];
}
