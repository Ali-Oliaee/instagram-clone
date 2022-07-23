import {
  Button, Divider, Form, Statistic, Steps,
} from 'antd'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useNavigate } from 'react-router-dom'
import useUser from '../../hooks/useUser'
import useValidation from '../../hooks/use-validation'
import { FloatLabel } from '../../components'
import './style.scss'

function ForgotPasswordPage() {
  const { sendPasswordRecoveryEmail, sendPasswordRecoveryCode, resetPassword } = useUser()
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const { t } = useTranslation()
  const [loading, setLoading] = useState(false)
  const [resetButtonLoading, setResetButtonLoading] = useState(false)
  const [userEmail, setUserEmail] = useState('')
  const [step, setStep] = useState(0)
  const { Step } = Steps
  const {
    requiredEmail, invalidEmail, requiredCode,
    minLengthCode, requiredPassword, minLengthPassword, validatePasswords,
  } = useValidation()
  const { Countdown } = Statistic
  const deadline = Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30

  const sendEmail = (email :any) => {
    setUserEmail(email)
    setLoading(true)
    return sendPasswordRecoveryEmail(email).then(() => setStep(1)).finally(() => setLoading(false))
  }

  const sendCode = (code: any) => {
    setLoading(true)
    return sendPasswordRecoveryCode(userEmail, code).then(() => setStep(2)).finally(() => setLoading(false))
  }

  const resendEmail = () => {
    setResetButtonLoading(true)
    return sendPasswordRecoveryEmail(userEmail).then(() => setStep(1)).finally(() => setResetButtonLoading(false))
  }

  const handleSubmit = (password: any) => {
    setLoading(true)
    return resetPassword(password, userEmail).then(() => navigate('/auth/login')).finally(() => setLoading(false))
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
            <Form form={form} onFinish={sendEmail}>
              <div>
                <h1>{t('forgot-password-title')}</h1>
                <p>{t('forgot-password-description')}</p>
              </div>
              <Form.Item name="email" rules={[requiredEmail, invalidEmail]}>
                <FloatLabel
                  label={t('email')}
                  type="email"
                  value={form.getFieldValue('email')}
                  autoFocus
                />
              </Form.Item>
              <Button loading={loading} block type="primary" htmlType="submit">{t('submit')}</Button>
              <Divider>{t('or')}</Divider>
              <Link to="/auth/signup">{t('Create new account')}</Link>
            </Form>

          ) : step === 1 ? (
            <Form form={form} onFinish={sendCode}>
              <div>
                <h1>{t('confirm-code-description')}</h1>
              </div>
              <Form.Item name="code" rules={[requiredCode, minLengthCode]}>
                <FloatLabel
                  label={t('code')}
                  type="text"
                  value={form.getFieldValue('code')}
                  autoFocus
                />
              </Form.Item>
              <Button loading={loading} block type="primary" htmlType="submit">{t('submit')}</Button>
              <Button block loading={resetButtonLoading} type="ghost" onClick={resendEmail} className="resend-email-button">
                <Countdown title="Countdown" value={Date.now() + 10 * 1000} onFinish={() => setResetButtonLoading(false)} />
                resend Email
              </Button>
            </Form>
          ) : (
            <Form form={form} onFinish={handleSubmit}>
              <Form.Item rules={[requiredPassword, minLengthPassword]} name="newPassword">
                <FloatLabel autoFocus value={form.getFieldValue('newPassword')} type="password" label={t('new-password')} />
              </Form.Item>
              <Form.Item rules={[requiredPassword, minLengthPassword, validatePasswords]} name="confirmPassword">
                <FloatLabel value={form.getFieldValue('confirmPassword')} type="password" label={t('confirm-password')} />
              </Form.Item>
              <Button loading={loading} block type="primary" htmlType="submit">{t('submit')}</Button>
            </Form>
          )
        }
      </div>
    </div>
  )
}

export default ForgotPasswordPage
