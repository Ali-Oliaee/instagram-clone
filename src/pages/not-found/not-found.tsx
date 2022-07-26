import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { SwitchLanguage } from '../../components'
import './style.scss'

function NotFoundPage() {
  const currentUser = localStorage.getItem('user')
  const { t } = useTranslation()

  return (
    <div className="not-found-page">
      <h1>{t('404')}</h1>
      <h3>{t('page-not-found')}</h3>
      <Link to={!currentUser ? '/auth/login' : '/'}>{t('back-home')}</Link>
      <SwitchLanguage />
    </div>
  )
}

export default NotFoundPage
