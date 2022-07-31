import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import Backend from 'i18next-xhr-backend'

i18n.use(initReactI18next).use(Backend).init({
  backend: {
    loadPath: '../../locales/{{lng}}/{{ns}}.json',
  },
  keySeparator: '.',
  debug: true,
  defaultNS: 'common',
  fallbackLng: 'en',
  ns: ['common'],
  lng: 'en',
  interpolation: {
    escapeValue: false,
  },
})

i18n.on('languageChanged', (lng: any) => {
  // eslint-disable-next-line no-unused-expressions
  lng === 'fa' ? (document.body.dir = 'rtl') : (document.body.dir = 'ltr')
})

export default i18n
