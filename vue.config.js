module.exports = {
    pluginOptions: {
        quasar: {
            importStrategy: 'kebab',
            rtlSupport: false
        }
    },

    transpileDependencies: [
      'quasar',
      'vuetify'
    ],

    publicPath: process.env.VUE_APP_PUBLIC_PATH,
    productionSourceMap: false
}
