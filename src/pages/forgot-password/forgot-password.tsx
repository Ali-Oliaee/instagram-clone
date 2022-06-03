import { Steps } from 'antd'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { Step0, Step1, Step2 } from './steps'
import './style.scss'

function ForgotPasswordPage() {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { Step } = Steps
  const [step, setStep] = useState(0)

  const sendEmail = ({ email }: any) => {
    console.log(email)
    setStep(1)
  }
  const sendCode = ({ code }: any) => {
    console.log(code)
    setStep(2)
  }
  const resetPassword = ({ password }: any) => {
    console.log(password)
    navigate('/auth/login')
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
            <Step0 onFinish={sendEmail} />
          ) : step === 1 ? (
            <Step1 onFinish={sendCode} />
          ) : (
            <Step2 onFinish={resetPassword} />
          )
        }
      </div>
    </div>
  )
}

export default ForgotPasswordPage
