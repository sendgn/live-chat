import i18n from '.';

const Trans = {
  get supportedLocales() {
    return import.meta.env.VITE_SUPPORTED_LOCALES.split(',');
  },

  get defaultLocale() {
    return import.meta.env.VITE_DEFAULT_LOCALE;
  },

  set currentLocale(newLocale) {
    i18n.global.locale.value = newLocale;
  },

  isLocaleSupported(locale) {
    return Trans.supportedLocales.includes(locale);
  },

  getUserLocale() {
    const locale = window.navigator.language ||
      window.navigator.userLanguage ||
      Trans.defaultLocale;
    return {
      locale: locale,
      // for the cases when locale is represented like 'en-US'
      localeNoRegion: locale.split('-')[0]
    };
  },

  getPersistedLocale() {
    const persistedLocale = localStorage.getItem('user-locale');
    if (Trans.isLocaleSupported(persistedLocale)) {
      return persistedLocale;
    } else {
      return null;
    }
  },

  // guess the default locale that should be set
  // in our app once the user opens the page
  guessDefaultLocale() {
    // if we have supported persisted locale
    const userPersistedLocale = Trans.getPersistedLocale();
    if (userPersistedLocale) {
      return userPersistedLocale;
    }
    // if there's no supported persisted locale, read it from the browser
    const { locale, localeNoRegion } = Trans.getUserLocale();
    if (Trans.isLocaleSupported(locale)) {
      return locale;
    }
    if (Trans.isLocaleSupported(localeNoRegion)) {
      return localeNoRegion;
    }
    // use default locale in other cases
    return Trans.defaultLocale;
  },

  async switchLanguage(newLocale) {
    Trans.currentLocale = newLocale;
    document.querySelector('html').setAttribute('lang', newLocale); 
    localStorage.setItem('user-locale', newLocale);
  },

  async routeMiddleware(to, from, next) {
    const paramLocale = to.params.locale;

    if (!Trans.isLocaleSupported(paramLocale)) {
      return next(Trans.guessDefaultLocale());
    }

    await Trans.switchLanguage(paramLocale);

    return next();
  }
};

export default Trans;
