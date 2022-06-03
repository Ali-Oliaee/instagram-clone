import {
  Button, Divider, Form, Input,
} from 'antd'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { FloatLabel } from '../../components'
import './style.scss'

export function Step0({ onFinish }: any) {
  const { t } = useTranslation()
  const [form] = Form.useForm()
  return (
    <Form form={form} onFinish={onFinish}>
      <div>
        <h1>Trouble Logging In?</h1>
        <p>
          Enter your email and we&apos;ll send you a link to get back into your account.
        </p>
      </div>
      <Form.Item
        name="email"
        rules={[{
          required: true,
          message: t('email-required'),
        },
        {
          type: 'email',
          message: t('email-invalid'),
        },
        ]}
      >
        <FloatLabel
          label={t('email')}
          type="email"
          value={form.getFieldValue('email')}
          autoFocus
        />
      </Form.Item>
      <Button block type="primary" htmlType="submit">{t('submit')}</Button>
      <Divider>{t('or')}</Divider>
      <Link to="/auth/signup">Create new account</Link>
    </Form>
  )
}

export function Step1({ onFinish }: any) {
  const [form] = Form.useForm()
  const { t } = useTranslation()

  return (
    <Form form={form} onFinish={onFinish}>
      <div>
        <h1>Confirm it&apos;s You to Login</h1>
      </div>
      <Form.Item
        name="code"
        rules={[{
          required: true,
          message: t('code-required'),
        },
        {
          min: 6,
          message: t('code-invalid'),
        },
        ]}
      >
        <FloatLabel
          label={t('code')}
          type="text"
          value={form.getFieldValue('code')}
          autoFocus
        />
      </Form.Item>
      <Button block type="primary" htmlType="submit">{t('submit')}</Button>
    </Form>
  )
}

export function Step2({ onFinish }: any) {
  const [form] = Form.useForm()
  const { t } = useTranslation()
  return (
    <Form form={form} onFinish={onFinish}>
      <Form.Item
        rules={[{
          required: true,
          message: t('password-required'),
        },
        {
          min: 6,
          message: t('password-min'),
        }]}
        name="newPassword"
      >
        <Input.Password size="large" placeholder={t('new-password')} />
      </Form.Item>
      <Form.Item
        rules={[{
          required: true,
          message: t('password-required'),
        },
        {
          min: 6,
          message: t('password-min'),
        },
        ({ getFieldValue }) => ({
          validator(_, value) {
            if (!value || getFieldValue('newPassword') === value) {
              return Promise.resolve()
            }
            return Promise.reject(new Error(t('passwords-not-match')))
          },
        }),
        ]}
        name="confirmPassword"
      >
        <Input.Password size="large" placeholder={t('confirm-password')} />
      </Form.Item>
      <Button block type="primary" htmlType="submit">{t('submit')}</Button>
    </Form>
  )
}
