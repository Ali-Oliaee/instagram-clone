import { Steps } from 'antd'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { Step0, Step1, Step2 } from './steps'
import useUser from '../../hooks/useUser'
import './style.scss'

function ForgotPasswordPage() {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const [loading, setLoading] = useState(false)
  const [step, setStep] = useState(0)
  const { Step } = Steps
  const { sendPasswordRecoveryEmail, sendPasswordRecoveryCode, resetPassword } = useUser()

  const sendEmail = (email: any) => {
    setLoading(true)
    return sendPasswordRecoveryEmail(email).then(() => setStep(1)).finally(() => setLoading(false))
  }

  const sendCode = (code: any) => {
    setLoading(true)
    return sendPasswordRecoveryCode(code).then(() => setStep(2)).finally(() => setLoading(false))
  }

  const handleSubmit = (password: any) => {
    setLoading(true)
    return resetPassword(password).then(() => navigate('/auth/login')).finally(() => setLoading(false))
  }

  return (
    <div className="forgot-password-page">
      <div className="steps">
        <Steps>
          <Step status={!step ? 'process' : 'wait'} title={t('step-enter-email')} />
          <Step status={step === 1 ? 'process' : 'wait'} title={t('step-enter-code')} />
          <Step status={step < 2 ? 'wait' : 'process'} title={t('step-change-password')} />
        </Steps>
      </div>
      <div className="step-content">
        {
          // eslint-disable-next-line no-nested-ternary
          !step ? (
            <Step0 loading={loading} onFinish={sendEmail} />
          ) : step === 1 ? (
            <Step1 loading={loading} onFinish={sendCode} />
          ) : (
            <Step2 loading={loading} onFinish={handleSubmit} />
          )
        }
      </div>
    </div>
  )
}

export default ForgotPasswordPage
