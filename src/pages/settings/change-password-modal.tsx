import { Button, Form, Modal } from 'antd'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FloatLabel } from '../../components'
import useValidation from '../../hooks/use-validation'
import useUser from '../../hooks/use-user'
import './style.scss'

function ChangePasswordModal({ visible, setVisible } : any) {
  const { t } = useTranslation()
  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm()
  const { changePassword } = useUser()
  const { minLengthPassword, requiredPassword, validatePasswords } = useValidation()
  const handleSubmit = (formData: any) => {
    setLoading(true)
    return changePassword(formData).then(() => setVisible(false)).finally(() => setLoading(false))
  }

  return (
    <Modal
      visible={visible}
      title={t('change-password-modal.title')}
      closable={false}
      footer={null}
      onCancel={() => setVisible(false)}
      destroyOnClose
    >
      <Form onFinish={handleSubmit}>
        <Form.Item rules={[requiredPassword, minLengthPassword]} name="oldPassword">
          <FloatLabel label={t('label.old-password')} type="password" autoFocus value={form.getFieldValue('oldPassword')} />
        </Form.Item>
        <Form.Item rules={[requiredPassword, minLengthPassword]} name="password">
          <FloatLabel label={t('label.new-password')} type="password" value={form.getFieldValue('password')} />
        </Form.Item>
        <Form.Item rules={[requiredPassword, minLengthPassword, validatePasswords]} name="confirmPassword">
          <FloatLabel label={t('label.confirm-password')} value={form.getFieldValue('confirmPassword')} type="password" />
        </Form.Item>
        <Button loading={loading} size="large" htmlType="submit" block type="primary">{t('utils.confirm')}</Button>
      </Form>
    </Modal>
  )
}

export default ChangePasswordModal
