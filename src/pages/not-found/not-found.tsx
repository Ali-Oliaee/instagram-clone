import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { SwitchLanguage } from '../../components'
import { useCurrentUser } from '../../context'
import './style.scss'

function NotFoundPage() {
  const { t } = useTranslation()
  const { currentUser }: any = useCurrentUser()
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
