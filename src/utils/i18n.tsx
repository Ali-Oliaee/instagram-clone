import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import Backend from 'i18next-http-backend'
import en from '../locales/en/common.json'
import fa from '../locales/fa/common.json'

i18n.use(initReactI18next).use(Backend).init({
  resources: {
    en: {
      common: en,
    },
    fa: {
      common: fa,
    },
  },
  debug: false,
  defaultNS: 'common',
  fallbackLng: 'en',
  ns: ['common'],
  lng: 'en',
  fallbackNS: 'common',
})

i18n.on('languageChanged', (lng: any) => {
  // eslint-disable-next-line no-unused-expressions
  lng === 'fa' ? (document.body.dir = 'rtl') : (document.body.dir = 'ltr')
})

export default i18n
