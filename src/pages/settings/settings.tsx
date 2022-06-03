import {
  Avatar, Button, Form, Upload,
} from 'antd'
import i18next from 'i18next'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useQuery } from 'react-query'
import axios from '../../utils/axios'
import {
  FloatLabel, PageWrapper, SwitchLanguage,
} from '../../components'
import './style.scss'
import { getAccountInformation } from '../../utils/api'
import ChangePasswordModal from './change-password-modal'

function SettingsPage() {
  const [visible, setVisible] = useState(false)
  const [form] = Form.useForm()
  const { t } = useTranslation()
  const { data: user, isLoading } = useQuery('user', getAccountInformation)

  const handleSubmit = ({ username, bio } : any) => {
    axios.post('account/update-information/', {
      username,
      bio,
    }).then((data) => {
      console.log(data)
    })
  }

  const uploadImage = ({ file } : any) => {
    const formData = new FormData()
    formData.append('file', file.originFileObj)
    axios.post('account/change-profile-photo', formData).then((data) => console.log('data', data))
  }

  form.setFieldsValue({
    username: user && user[0]?.user?.username,
    email: user && user[0]?.user?.email,
    bio: user && user[0]?.bio,
  })

  return (
    <PageWrapper isLoading={isLoading} className="settings-page">
      <div className="settings">
        <div className="change-image">
          <Avatar src={require('../../assets/images/default-user.jpg')} size="large" className="profile-image" />
          <Upload showUploadList={false} onChange={uploadImage}>
            <Button type="text">change profile image</Button>
          </Upload>
        </div>
        <Form onFinish={handleSubmit} form={form}>
          <Form.Item name="username">
            <FloatLabel label={t('username')} value={form.getFieldValue('username')} />
          </Form.Item>
          <Form.Item name="email">
            <FloatLabel label={t('email')} value={form.getFieldValue('email')} type="email" disabled />
          </Form.Item>
          <Form.Item name="bio">
            <FloatLabel label={t('bio')} value={form.getFieldValue('bio')} textarea />
          </Form.Item>
          <Button htmlType="submit" block type="primary">save</Button>
        </Form>
        <Button block type="link" onClick={() => setVisible(true)}>change password</Button>
        <SwitchLanguage />
      </div>
      <ChangePasswordModal visible={visible} setVisible={setVisible} />
    </PageWrapper>
  )
}

export default SettingsPage
