import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { Button, Divider, Form } from 'antd'
import { useState } from 'react'
import useValidation from '../../hooks/use-validation'
import useUser from '../../hooks/useUser'
import {
  FloatLabel, GoogleButton, Logo, SwitchLanguage,
} from '../../components'
import './style.scss'

function LoginPage() {
  const { t } = useTranslation()
  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm()
  const { login } = useUser()
  const {
    requiredEmail, invalidEmail, requiredPassword, minLengthPassword,
  } = useValidation()

  const handleSubmit = (formData: any) => {
    setLoading(true)
    return login(formData).finally(() => setLoading(false))
  }

  return (
    <div className="login-page">
      <section>
        <div className="form-container">
          <Logo />
          <Form onFinish={handleSubmit} form={form}>
            <Form.Item name="email" rules={[requiredEmail, invalidEmail]}>
              <FloatLabel type="email" autoFocus label={t('email')} value={form.getFieldValue('email')} />
            </Form.Item>
            <Form.Item name="password" rules={[requiredPassword, minLengthPassword]}>
              <FloatLabel type="password" label={t('password')} value={form.getFieldValue('password')} />
            </Form.Item>
            <Button loading={loading} htmlType="submit" type="primary" block>{t('submit')}</Button>
            <div className="forgot-password-link">
              <Link to="/auth/forgot-password">{t('forgot-password-link')}</Link>
            </div>
            <Divider>{t('or')}</Divider>
            <GoogleButton />
          </Form>
        </div>
        <h4 className="signup-link">
          {t('dont-have-account')}
          {'  '}
          <Link to="/auth/signup">{t('signup')}</Link>
        </h4>
        <SwitchLanguage />
      </section>
    </div>
  )
}

export default LoginPage
