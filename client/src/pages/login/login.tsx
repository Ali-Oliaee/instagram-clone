/* eslint-disable prefer-arrow/prefer-arrow-functions */
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import {
  Button, Divider, Form, Input,
} from 'antd'
import { GoogleButton, Logo, SwitchLanguage } from '../../components'
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
      <SwitchLanguage />
      <section>
        <div className="form-container">
          <Logo />
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
            <Button htmlType="submit" type="primary" block>{t('submit')}</Button>
            <Divider>{t('or')}</Divider>
            <GoogleButton />
            <h4>{t('privacy-rules')}</h4>
          </Form>
        </div>
        <h4 className="signup-link">
          {t('dont-have-account')}
          {'  '}
          <Link to="/signup">{t('signup')}</Link>
        </h4>
      </section>
    </div>
  )
}

export default LoginPage
