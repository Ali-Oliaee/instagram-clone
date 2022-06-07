import {
  Button, Form, message, Modal,
} from 'antd'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import axios from '../../utils/axios'
import { FloatLabel } from '../../components'
import './style.scss'

function ChangePasswordModal({ visible, setVisible } : any) {
  const { t } = useTranslation()
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const changePassword = ({ newPassword, oldPassword } : any) => {
    setLoading(true)
    return axios.post('/users/change-password/', {
      new_password: newPassword,
      old_password: oldPassword,
    }).then(({ data }) => {
      message.success(data.message)
      setVisible(false)
    })
      .catch(({ response }) => message.error(response.data.message))
      .finally(() => setLoading(false))
  }

  return (
    <Modal
      visible={visible}
      title={t('change-password')}
      closable
      footer={null}
      onCancel={() => setVisible(false)}
      destroyOnClose
    >
      <Form onFinish={changePassword}>
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
