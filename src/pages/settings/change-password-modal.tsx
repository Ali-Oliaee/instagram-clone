import { Button, Form, Modal } from 'antd'
import { useTranslation } from 'react-i18next'
import axios from '../../utils/axios'
import { FloatLabel } from '../../components'
import './style.scss'

function ChangePasswordModal({ visible, setVisible } : any) {
  const { t } = useTranslation()
  const [form] = Form.useForm()
  const changePassword = ({ newPassword, oldPassword } : any) => {
    axios.post('users/change-password', {
      newPassword,
      oldPassword,
    }).then((data) => console.log('data', data))
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
        <Button size="large" htmlType="submit" block type="primary">{t('confirm')}</Button>
      </Form>
    </Modal>
  )
}

export default ChangePasswordModal
