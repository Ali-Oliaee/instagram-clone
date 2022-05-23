import { useTranslation } from 'react-i18next'
import { Link, useNavigate } from 'react-router-dom'
import {
  Button, Divider, Form, message,
} from 'antd'
import { useState } from 'react'
import axios from '../../utils/axios'
import {
  FloatLabel, GoogleButton, Logo, SwitchLanguage,
} from '../../components'
import './style.scss'

interface User {
  email: String,
  password: String,
}

function LoginPage() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const { t } = useTranslation()
  const [form] = Form.useForm()
  const handleSubmit = ({ email, password } : User) => {
    setLoading(true)
    axios.post('users/login/', {
      email,
      password,
    })
      .then(({ data }) => {
        message.success(data.message)
        localStorage.setItem('user', JSON.stringify(data))
        navigate('/new-user')
      })
      .catch(({ response }) => message.error(response.data.password ?? response.data.email))
      .finally(() => setLoading(false))
  }
  return (
    <div className="login-page">
      <section>
        <div className="form-container">
          <Logo />
          <h4>{t('signup-description')}</h4>
          <Form onFinish={handleSubmit} form={form}>
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
              <FloatLabel type="email" autoFocus label={t('email')} value={form.getFieldValue('email')} />
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
              <FloatLabel type="password" label={t('password')} value={form.getFieldValue('password')} />
            </Form.Item>
            <Button loading={loading} htmlType="submit" type="primary" block>{t('submit')}</Button>
            <Divider>{t('or')}</Divider>
            <GoogleButton />
            <div className="forgot-password-link">
              <Link to="/auth/forgot-password">{t('forgot-password-link')}</Link>
            </div>
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
