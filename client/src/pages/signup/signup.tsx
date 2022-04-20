/* eslint-disable prefer-arrow/prefer-arrow-functions */
import { Typography } from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import './style.scss'

function SignupPage() {
  const { t } = useTranslation()
  return (
    <div className="signup-page">
      <div className="form-container">
        <img src="../../assets/images/logo.svg" alt="logo" width={220} height={50} />
        <Typography variant="h4">{t('signup-description')}</Typography>
      </div>
    </div>
  )
}

export default SignupPage
