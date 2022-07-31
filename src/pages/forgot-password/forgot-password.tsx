import {
  Button, Divider, Form, Statistic, Steps,
} from 'antd'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import useUser from '../../hooks/use-user'
import useValidation from '../../hooks/use-validation'
import { FloatLabel } from '../../components'
import './style.scss'

function ForgotPasswordPage() {
  const { sendPasswordRecoveryEmail, sendPasswordRecoveryCode, resetPassword } = useUser()
  const [form] = Form.useForm()
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

  const sendEmail = ({ email } :any) => {
    setUserEmail(email)
    setLoading(true)
    return sendPasswordRecoveryEmail(email).then(() => setStep(1)).finally(() => setLoading(false))
  }

  const sendCode = ({ code }: any) => {
    setLoading(true)
    return sendPasswordRecoveryCode({ userEmail, code }).then(() => setStep(2)).finally(() => setLoading(false))
  }

  const resendEmail = () => {
    setResetButtonLoading(true)
    return sendPasswordRecoveryEmail(userEmail).finally(() => setResetButtonLoading(false))
  }

  const handleSubmit = ({ password }: any) => {
    setLoading(true)
    return resetPassword({ password, userEmail }).finally(() => setLoading(false))
  }

  return (
    <div className="forgot-password-page">
      <div className="steps">
        <Steps>
          <Step status={!step ? 'process' : 'wait'} title={t('forgot-password.step1')} />
          <Step status={step === 1 ? 'process' : 'wait'} title={t('forgot-password.step2')} />
          <Step status={step < 2 ? 'wait' : 'process'} title={t('forgot-password.step3')} />
        </Steps>
      </div>
      <div className="step-content">
        {
          // eslint-disable-next-line no-nested-ternary
          !step ? (
            <Form form={form} onFinish={sendEmail}>
              <div>
                <h1>{t('forgot-password.step1.title')}</h1>
                <p>{t('forgot-password.step1.description')}</p>
              </div>
              <Form.Item name="email" rules={[requiredEmail, invalidEmail]}>
                <FloatLabel
                  label={t('utils.email')}
                  type="email"
                  value={form.getFieldValue('email')}
                  autoFocus
                />
              </Form.Item>
              <Button loading={loading} block type="primary" htmlType="submit">{t('utils.submit')}</Button>
              <Divider>{t('utils.or')}</Divider>
              <Link to="/auth/signup">{t('auth.create-new-account')}</Link>
            </Form>
          ) : step === 1 ? (
            <Form form={form} onFinish={sendCode}>
              <div><h1>{t('forgot-password.step2.title')}</h1></div>
              <Form.Item name="code" rules={[requiredCode, minLengthCode]}>
                <FloatLabel
                  label={t('label.code')}
                  type="text"
                  value={form.getFieldValue('code')}
                  autoFocus
                />
              </Form.Item>
              <Button loading={loading} block type="primary" htmlType="submit">{t('utils.submit')}</Button>
              <Button block loading={resetButtonLoading} type="ghost" onClick={resendEmail} className="resend-email-button">
                <Countdown title="Countdown" value={Date.now() + 10 * 1000} onFinish={() => setResetButtonLoading(false)} />
                {t('forgot-password.resend-email')}
              </Button>
            </Form>
          ) : (
            <Form form={form} onFinish={handleSubmit}>
              <Form.Item rules={[requiredPassword, minLengthPassword]} name="password">
                <FloatLabel autoFocus value={form.getFieldValue('password')} type="password" label={t('label.new-password')} />
              </Form.Item>
              <Form.Item rules={[requiredPassword, minLengthPassword, validatePasswords]} name="confirmPassword">
                <FloatLabel value={form.getFieldValue('confirmPassword')} type="password" label={t('label.confirm-password')} />
              </Form.Item>
              <Button loading={loading} block type="primary" htmlType="submit">{t('utils.submit')}</Button>
            </Form>
          )
        }
      </div>
    </div>
  )
}

export default ForgotPasswordPage
