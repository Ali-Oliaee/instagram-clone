import { Trans, useTranslation } from 'react-i18next'
import { Button, Divider, Form } from 'antd'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import useUser from '../../hooks/use-user'
import useValidation from '../../hooks/use-validation'
import {
  FloatLabel, GoogleButton, Logo, SwitchLanguage,
} from '../../components'
import './style.scss'

function SignupPage() {
  const { t } = useTranslation()
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const { signUp, login } = useUser()
  const {
    requiredUsername, requiredEmail, invalidEmail, requiredPassword, minLengthPassword, validatePasswords,
  } = useValidation()

  const handleSubmit = (formData: any) => {
    setLoading(true)
    return signUp(formData).then(() => login(formData)).finally(() => setLoading(false))
  }

  return (
    <div className="signup-page">
      <section>
        <div className="form-container">
          <Logo />
          <h4 className="description">{t('signup-page.description')}</h4>
          <Form onFinish={handleSubmit} form={form}>
            <Form.Item name="username" rules={[requiredUsername]}>
              <FloatLabel autoFocus label={t('utils.username')} value={form.getFieldValue('username')} />
            </Form.Item>
            <Form.Item name="email" rules={[requiredEmail, invalidEmail]}>
              <FloatLabel label={t('utils.email')} value={form.getFieldValue('email')} type="email" />
            </Form.Item>
            <Form.Item name="password" rules={[requiredPassword, minLengthPassword]}>
              <FloatLabel label={t('utils.password')} value={form.getFieldValue('password')} type="password" />
            </Form.Item>
            <Form.Item name="confirmPassword" dependencies={['password']} rules={[requiredPassword, validatePasswords]}>
              <FloatLabel label={t('utils.confirm-password')} value={form.getFieldValue('confirmPassword')} type="password" />
            </Form.Item>
            <Button loading={loading} htmlType="submit" type="primary" size="middle" block>{t('utils.submit')}</Button>
            <Divider>{t('utils.or')}</Divider>
            <GoogleButton />
            <h4>
              <Trans i18nKey="signup-page.privacy-policy">
                By signing up, you agree to our
                <Link to="/terms">Terms</Link>
                ,
                <Link to="/data-policy">Data Policy</Link>
                and
                <Link to="/cookies">Cookie Policy</Link>
              </Trans>
            </h4>
          </Form>
        </div>
        <h4 className="signin-link">
          {t('signup-page.have-account')}
          <Link to="/auth/login">{t('utils.signin')}</Link>
        </h4>
        <SwitchLanguage />
      </section>
    </div>
  )
}

export default SignupPage
