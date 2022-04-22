/* eslint-disable prefer-arrow/prefer-arrow-functions */
import { useTranslation } from 'react-i18next'
import { Button, Form, Input } from 'antd'
import { Logo } from '../../components'
import './style.scss'

interface User {
  email: String,
  password: String,
}

function LoginPage() {
  const { t } = useTranslation()
  const handleSubmit = ({ email, password } : User) => {
    console.log('user')
  }
  return (
    <div className="login-page">
      <section>
        <div className="form-container">
          <Logo />
          <h4>{t('login-description')}</h4>
          <Form onFinish={handleSubmit}>
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
              <Input size="middle" placeholder={t('Email')} type="email" />
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
              <Input size="middle" placeholder={t('Password')} type="password" />
            </Form.Item>
            <Button htmlType="submit" type="primary" block>submit</Button>
            <h4>{t('privacy-rules')}</h4>
          </Form>
        </div>
        <h4 className="signup-link">
          {t('dont-have-account')}
          {'  '}
          <a href="/">{t('signup')}</a>
        </h4>
      </section>
    </div>
  )
}

export default LoginPage
