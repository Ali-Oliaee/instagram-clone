import { Button, Divider, Form } from 'antd'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { FloatLabel } from '../../components'
import './style.scss'

export function Step0({ onFinish, loading }: any) {
  const { t } = useTranslation()
  const [form] = Form.useForm()
  return (
    <Form form={form} onFinish={onFinish}>
      <div>
        <h1>{t('forgot-password-title')}</h1>
        <p>{t('forgot-password-description')}</p>
      </div>
      <Form.Item
        name="email"
        rules={[{
          required: true,
          message: t('require-email'),
        },
        {
          type: 'email',
          message: t('invalid-email'),
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
      <Button loading={loading} block type="primary" htmlType="submit">{t('submit')}</Button>
      <Divider>{t('or')}</Divider>
      <Link to="/auth/signup">{t('Create new account')}</Link>
    </Form>
  )
}

export function Step1({ onFinish, loading }: any) {
  const [form] = Form.useForm()
  const { t } = useTranslation()

  return (
    <Form form={form} onFinish={onFinish}>
      <div>
        <h1>{t('confirm-code-description')}</h1>
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
      <Button loading={loading} block type="primary" htmlType="submit">{t('submit')}</Button>
    </Form>
  )
}

export function Step2({ onFinish, loading }: any) {
  const [form] = Form.useForm()
  const { t } = useTranslation()
  return (
    <Form form={form} onFinish={onFinish}>
      <Form.Item
        rules={[{
          required: true,
          message: t('require-password'),
        },
        {
          min: 6,
          message: t('min-password'),
        }]}
        name="newPassword"
      >
        <FloatLabel autoFocus value={form.getFieldValue('newPassword')} type="password" label={t('new-password')} />
      </Form.Item>
      <Form.Item
        rules={[{
          required: true,
          message: t('require-password'),
        },
        {
          min: 6,
          message: t('min-password'),
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
        <FloatLabel value={form.getFieldValue('confirmPassword')} type="password" label={t('confirm-password')} />
      </Form.Item>
      <Button loading={loading} block type="primary" htmlType="submit">{t('submit')}</Button>
    </Form>
  )
}
