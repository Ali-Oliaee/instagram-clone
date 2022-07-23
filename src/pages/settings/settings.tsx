import {
  Avatar, Button, Form, Upload,
} from 'antd'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useQuery } from 'react-query'
import useUser from '../../hooks/use-user'
import { FloatLabel, PageWrapper, SwitchLanguage } from '../../components'
import { getAccountInformation } from '../../utils/api'
import { currentUser, defaultImage } from '../../utils/constants'
import useValidation from '../../hooks/use-validation'
import ChangePasswordModal from './change-password-modal'
import './style.scss'

function SettingsPage() {
  const [visible, setVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm()
  const { validateUploadImage } = useValidation()
  const { t } = useTranslation()
  const { changeProfileInfo, changeProfileImage } = useUser()
  const { data: user, isLoading, refetch } = useQuery('user', () => getAccountInformation(currentUser.id))

  const handleSubmit = (formData: any) => {
    setLoading(true)
    return changeProfileInfo(formData).then(() => refetch()).finally(() => setLoading(false))
  }

  form.setFieldsValue({
    username: user?.[0]?.user?.username,
    email: user?.[0]?.user?.email,
    bio: user?.[0]?.bio,
  })

  return (
    <PageWrapper isLoading={isLoading} className="settings-page">
      <div className="settings">
        <div className="change-image">
          <Avatar src={user?.[0]?.photo ?? defaultImage} size="large" className="profile-image" />
          <Upload
            beforeUpload={validateUploadImage}
            showUploadList={false}
            onChange={changeProfileImage}
          >
            <Button type="text">{t('change profile image')}</Button>
          </Upload>
        </div>
        <Form onFinish={handleSubmit} form={form}>
          <Form.Item name="username">
            <FloatLabel label={t('username')} value={form.getFieldValue('username')} />
          </Form.Item>
          <FloatLabel label={t('email')} value={form.getFieldValue('email')} type="email" disabled />
          <Form.Item name="bio">
            <FloatLabel label={t('bio')} value={form.getFieldValue('bio')} textarea />
          </Form.Item>
          <Button loading={loading} htmlType="submit" block type="primary">{t('save')}</Button>
        </Form>
        <Button block type="link" onClick={() => setVisible(true)}>{t('change password')}</Button>
        <SwitchLanguage />
      </div>
      <ChangePasswordModal visible={visible} setVisible={setVisible} />
    </PageWrapper>
  )
}

export default SettingsPage
