import Vue from 'vue'
import VueI18n from 'vue-i18n'
import { languages } from '../locales/index'

const messages = Object.assign(languages)

Vue.use(VueI18n)


export default new VueI18n({
  locale:navigator.language.split('-')[0],
  fallbackLocale:  'en-us',
  messages
})
