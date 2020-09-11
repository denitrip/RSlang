module.exports = {
  pages: {
    index: {
      entry: 'src/main.js',
      title: 'RSlang',
    },
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: `
          @import "@/styles/variables.scss";
          @import "@/styles/typography.scss";
          @import "@/styles/base.scss";
          @import "@/styles/mixins.scss";
        `,
      },
    },
  },
  productionSourceMap: false,
  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: true,
    },
  },
};
