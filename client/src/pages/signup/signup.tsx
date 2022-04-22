/* eslint-disable prefer-arrow/prefer-arrow-functions */
import { useTranslation } from 'react-i18next'
import { Button, Form, Input } from 'antd'
import { Logo, SwitchLanguage } from '../../components'
import './style.scss'

interface NewUser {
  username: String,
  email: String,
  password: String,
  confirmPassword: String
}

function SignupPage() {
  const { t } = useTranslation()
  const handleSubmit = ({
    username, email, password, confirmPassword,
  } : NewUser) => {
    console.log('user')
  }
  return (
    <div className="signup-page">
      <SwitchLanguage />
      <section>
        <div className="form-container">
          <Logo />
          <h4>{t('signup-description')}</h4>
          <Form onFinish={handleSubmit}>
            <Form.Item
              name="userName"
              rules={[
                {
                  required: true,
                  message: t('require-username'),
                },
              ]}
            >
              <Input size="middle" placeholder={t('username')} />
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
              <Input size="middle" placeholder={t('email')} type="email" />
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
              <Input size="middle" placeholder={t('password')} type="password" />
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
              <Input size="middle" placeholder={t('confirm-password')} type="password" />
            </Form.Item>
            <Button htmlType="submit" type="primary" block>{t('submit')}</Button>
          </Form>
        </div>
        <h4 className="signin-link">
          {t('already-have-account')}
          {' '}
          <a href="/">{t('signin')}</a>
        </h4>
      </section>
    </div>
  )
}

export default SignupPage
