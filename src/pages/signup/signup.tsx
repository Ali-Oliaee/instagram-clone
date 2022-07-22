import { useTranslation } from 'react-i18next'
import { Button, Divider, Form } from 'antd'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import useUser from '../../hooks/useUser'
import {
  FloatLabel, GoogleButton, Logo, SwitchLanguage,
} from '../../components'
import './style.scss'

function SignupPage() {
  const { t } = useTranslation()
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const { signUp, login } = useUser()

  const handleSubmit = (formData: any) => {
    setLoading(true)
    return signUp(formData).then(() => login(formData)).finally(() => setLoading(false))
  }

  return (
    <div className="signup-page">
      <section>
        <div className="form-container">
          <Logo />
          <h4 className="description">{t('signup-description')}</h4>
          <Form onFinish={handleSubmit} form={form}>
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: t('require-username'),
                },
              ]}
            >
              <FloatLabel autoFocus label={t('username')} value={form.getFieldValue('username')} />
            </Form.Item>
            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  message: t('require-email'),
                },
                {
                  type: 'email',
                  message: t('invalid-email'),
                },
              ]}
            >
              <FloatLabel label={t('email')} value={form.getFieldValue('email')} type="email" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: t('require-password'),
                },
                {
                  min: 6,
                  message: t('min-password'),
                },
              ]}
            >
              <FloatLabel label={t('password')} value={form.getFieldValue('password')} type="password" />
            </Form.Item>
            <Form.Item
              name="confirmPassword"
              dependencies={['password']}
              rules={[{
                required: true,
                message: t('require-confirm-password'),

              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve()
                  }
                  return Promise.reject(new Error(t('passwords-not-match')))
                },
              })]}
            >
              <FloatLabel label={t('confirm-password')} value={form.getFieldValue('confirmPassword')} type="password" />
            </Form.Item>
            <Button loading={loading} htmlType="submit" type="primary" size="middle" block>{t('submit')}</Button>
            <Divider>{t('or')}</Divider>
            <GoogleButton />
            <h4>
              {t('privacy-rules')}
              {' '}
              <Link to="/terms">{t('terms')}</Link>
              ,
              {' '}
              <Link to="/data-policy">
                {t('data-policy')}
              </Link>
              {' '}
              {t('and')}
              {' '}
              <Link to="/cookies">{t('cookie')}</Link>
              .
            </h4>
          </Form>
        </div>
        <h4 className="signin-link">
          {t('already-have-account')}
          {' '}
          <Link to="/auth/login">{t('signin')}</Link>
        </h4>
        <SwitchLanguage />
      </section>
    </div>
  )
}

export default SignupPage
