import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { SwitchLanguage } from '../../components'
import './style.scss'

function NotFoundPage() {
  const currentUser = localStorage.getItem('user')
  const { t } = useTranslation()

  return (
    <div className="not-found-page">
      <h1>{t('404.title')}</h1>
      <h3>{t('404.description')}</h3>
      <Link to={!currentUser ? '/auth/login' : '/'}>{t('404.back-home')}</Link>
      <SwitchLanguage />
    </div>
  )
}

export default NotFoundPage
