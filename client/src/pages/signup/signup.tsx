/* eslint-disable prefer-arrow/prefer-arrow-functions */
import { useTranslation } from 'react-i18next'
import { Button, Form, Input } from 'antd'
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
      <div className="form-container">
        <img src="../../assets/images/logo.svg" alt="logo" width={220} height={50} />
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
            <Input placeholder={t('Username')} />
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
            <Input placeholder={t('Confirm Password')} type="password" />
          </Form.Item>
          <Button htmlType="submit" type="primary" block>submit</Button>
        </Form>
        <h4>
          {t('already-have-account')}
          {' '}
          <a href="/">{t('signin')}</a>
        </h4>

      </div>
    </div>
  )
}

export default SignupPage
