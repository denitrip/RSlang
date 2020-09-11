import Vue from 'vue';
import VueI18n from 'vue-i18n';

Vue.use(VueI18n);

function loadLocaleMessages() {
  const locales = require.context('./locales', true, /[A-Za-z0-9-_,\s]+\.json$/i);
  const messages = {};
  locales.keys().forEach((key) => {
    const matched = key.match(/([A-Za-z0-9-_]+)\./i);
    if (matched && matched.length > 1) {
      const locale = matched[1];
      messages[locale] = locales(key);
    }
  });
  return messages;
}

function changeWordEndings(choice) {
  let result = 0;
  const isEndsInOne = choice % 10 === 1;
  const isNotEleven = (choice - 11) % 100 !== 0;
  const isFromTwoToFour = choice % 10 >= 2 && choice % 10 <= 4;
  const isFromTwelveToFourteen = choice % 100 >= 12 && choice % 100 <= 14;
  if (isEndsInOne && isNotEleven) {
    result = 1;
  } else if (isFromTwoToFour && !isFromTwelveToFourteen) {
    result = 2;
  }
  return result;
}

export default new VueI18n({
  locale: process.env.VUE_APP_I18N_LOCALE || 'ru',
  fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || 'ru',
  messages: loadLocaleMessages(),
  pluralizationRules: {
    ru: changeWordEndings,
  },
});
