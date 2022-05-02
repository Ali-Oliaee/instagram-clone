/* eslint-disable no-unused-expressions */
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from '../locales/en/common.json'
import fa from '../locales/fa/common.json'

i18n.use(initReactI18next).init({
  debug: false,
  defaultNS: 'common',
  fallbackLng: 'en',
  lng: 'en',
  resources: {
    en: {
      common: en,
    },
    fa: {
      common: fa,
    },
  },
  interpolation: {
    escapeValue: false,
  },
})

i18n.on('languageChanged', (lng) => {
  lng === 'fa' ? (document.body.dir = 'rtl') : (document.body.dir = 'ltr')
})

export default i18n
