module.exports = {
    pluginOptions: {
      quasar: {
        importStrategy: 'kebab',
        rtlSupport: false
      },
      i18n: {
        locale: 'en',
        fallbackLocale: 'en',
        localeDir: 'locales',
        enableInSFC: false
      }
    },

    transpileDependencies: [
      'quasar'
    ],

    publicPath: process.env.VUE_APP_PUBLIC_PATH,
    productionSourceMap: false
}
