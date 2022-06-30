import {
  Avatar, Button, Form, message, Upload,
} from 'antd'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useQuery } from 'react-query'
import { Helmet } from 'react-helmet'
import axios from '../../utils/axios'
import {
  FloatLabel, PageWrapper, SwitchLanguage,
} from '../../components'
import { getAccountInformation } from '../../utils/api'
import ChangePasswordModal from './change-password-modal'
import './style.scss'

function SettingsPage() {
  const [visible, setVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm()
  const { t } = useTranslation()
  // todo: fix that id
  const { data: user, isLoading, refetch } = useQuery('user', () => getAccountInformation(1))

  const handleSubmit = ({ username, bio }: any) => {
    setLoading(true)
    return axios.patch(`account/update-information/${user[0].id}/`, {
      username,
      bio,
    }).then(({ data }) => {
      message.success(data.message)
      refetch()
    }).finally(() => setLoading(false))
  }

  const uploadImage = ({ file, event }: any) => {
    const formData = new FormData()
    formData.append('photo', file.originFileObj)
    return event && axios.post('account/change-profile-photo/', formData).then(({ data }) => {
      message.success(data.message)
      refetch()
    })
  }

  form.setFieldsValue({
    username: user?.[0]?.user?.username,
    email: user?.[0]?.user?.email,
    bio: user?.[0]?.bio,
  })

  return (
    <>
      <Helmet>
        <title>{t('settings')}</title>
      </Helmet>
      <PageWrapper isLoading={isLoading} className="settings-page">
        <div className="settings">
          <div className="change-image">
            <Avatar src={user?.[0].photo} size="large" className="profile-image" />
            <Upload
              beforeUpload={(file) => {
                const isValid = file.type === 'image/png' || file.type === 'image/jpeg' || file.type === 'image/jpg'
                  || file.type === 'image/gif'
                  || file.type === 'image/webp'
                  || file.type === 'image/svg+xml'
                  || file.type === 'image/bmp'
                  || file.type === 'image/tiff'
                if (!isValid) message.error(`${file.name} is not a valid file`)
                return isValid || Upload.LIST_IGNORE
              }}
              showUploadList={false}
              onChange={uploadImage}
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
            <Button htmlType="submit" block type="primary">{t('save')}</Button>
          </Form>
          <Button loading={loading} block type="link" onClick={() => setVisible(true)}>{t('change password')}</Button>
          <SwitchLanguage />
        </div>
        <ChangePasswordModal visible={visible} setVisible={setVisible} />
      </PageWrapper>
    </>
  )
}

export default SettingsPage
