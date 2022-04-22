/* eslint-disable prefer-arrow/prefer-arrow-functions */
import { useTranslation } from 'react-i18next'
import {
  Button, Divider, Form, Input, message,
} from 'antd'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { GoogleButton, Logo, SwitchLanguage } from '../../components'
import axios from '../../utils/axios'
import './style.scss'

interface NewUser {
  username: String,
  email: String,
  password: String,
  confirmPassword: String
}

function SignupPage() {
  const [loading, setLoading] = useState(false)
  const { t } = useTranslation()
  const handleSubmit = ({
    username, email, password,
  } : NewUser) => {
    setLoading(true)
    return axios.post('/users/signup/', {
      username,
      email,
      password,
    })
      .then(({ data }) => {
        message.success(data.message)
        localStorage.setItem('user', JSON.stringify(data))
        setLoading(false)
      })
      .catch(({ response }) => message.error(response.data.message))
      .finally(() => setLoading(false))
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
              name="username"
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
            <Button loading={loading} htmlType="submit" type="primary" block>{t('submit')}</Button>
            <Divider>{t('or')}</Divider>
            <GoogleButton />
          </Form>
        </div>
        <h4 className="signin-link">
          {t('already-have-account')}
          {' '}
          <Link to="/">{t('signin')}</Link>
        </h4>
      </section>
    </div>
  )
}

export default SignupPage
