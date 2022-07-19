import { Button, Form, Modal } from 'antd'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FloatLabel } from '../../components'
import useUser from '../../hooks/useUser'
import './style.scss'

function ChangePasswordModal({ visible, setVisible } : any) {
  const { t } = useTranslation()
  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm()
  const { changePassword } = useUser()
  const handleSubmit = (formData: any) => {
    setLoading(true)
    return changePassword(formData).then(() => setVisible(false)).finally(() => setLoading(false))
  }

  return (
    <Modal
      visible={visible}
      title={t('change-password')}
      closable={false}
      footer={null}
      onCancel={() => setVisible(false)}
      destroyOnClose
    >
      <Form onFinish={handleSubmit}>
        <Form.Item
          rules={[{
            required: true,
            message: t('password-required'),
          },
          {
            min: 6,
            message: t('password-min'),
          }]}
          name="oldPassword"
        >
          <FloatLabel label={t('old-password')} type="password" autoFocus value={form.getFieldValue('oldPassword')} />
        </Form.Item>
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
          <FloatLabel label={t('new-password')} type="password" value={form.getFieldValue('password')} />
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
              if (!value || getFieldValue('newPassword') === value) { return Promise.resolve() }
              return Promise.reject(new Error(t('passwords-not-match')))
            },
          }),
          ]}
          name="confirmPassword"
        >
          <FloatLabel label={t('confirm-password')} value={form.getFieldValue('confirmPassword')} type="password" />
        </Form.Item>
        <Button loading={loading} size="large" htmlType="submit" block type="primary">{t('confirm')}</Button>
      </Form>
    </Modal>
  )
}

export default ChangePasswordModal
