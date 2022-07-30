/* eslint-disable no-unused-expressions */
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

i18n.use(initReactI18next).init({
  debug: false,
  defaultNS: 'common',
  fallbackLng: 'en',
  lng: 'en',
  interpolation: {
    escapeValue: false,
  },
})

i18n.on('languageChanged', (lng) => {
  lng === 'fa' ? (document.body.dir = 'rtl') : (document.body.dir = 'ltr')
})

export default i18n
