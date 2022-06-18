import { useTranslation } from 'react-i18next'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import {
  Button, Divider, Form, message,
} from 'antd'
import {
  FloatLabel, GoogleButton, Logo, SwitchLanguage,
} from '../../components'
import i18n from '../../utils/i18n'
import axios from '../../utils/axios'
import { LoggedInUser } from '../../interfaces'
import './style.scss'

function LoginPage() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const { t } = useTranslation()
  const [form] = Form.useForm()

  const handleSubmit = ({ email, password } : LoggedInUser) => {
    setLoading(true)
    return axios.post('users/login/', {
      email,
      password,
    })
      .then(({ data }) => {
        message.success(data.message)
        localStorage.setItem('user', JSON.stringify(data))
        i18n.changeLanguage(data.account.language.toLowerCase())
        navigate('/')
      })
      .finally(() => setLoading(false))
  }

  return (
    <div className="login-page">
      <div className="form-container">
        <Logo />
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
    </div>
  )
}

export default LoginPage
