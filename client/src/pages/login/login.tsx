/* eslint-disable prefer-arrow/prefer-arrow-functions */
import { useTranslation } from 'react-i18next'
import { Button, Form, Input } from 'antd'
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
      <div className="form-container">
        <img src="../../assets/images/logo.svg" alt="logo" width={220} height={50} />
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
            <Input placeholder={t('Email')} type="email" />
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
            <Input placeholder={t('Password')} type="password" />
          </Form.Item>
          <Button htmlType="submit" type="primary" block>submit</Button>
        </Form>
        <h4>
          {t('dont-have-account')}
          {' '}
          <a href="/">{t('login')}</a>
        </h4>

      </div>
    </div>
  )
}

export default LoginPage
