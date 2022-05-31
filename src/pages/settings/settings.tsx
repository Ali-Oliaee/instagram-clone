import {
  Avatar,
  Button,
  Form,
  Modal,
  Spin,
  Upload,
} from 'antd'
import i18next from 'i18next'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useQuery } from 'react-query'
import axios from '../../utils/axios'
import { FloatLabel, Header, SwitchLanguage } from '../../components'
import './style.scss'
import { getAccountInformation } from '../../utils/api'

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
  const changePassword = ({ newPassword, oldPassword } : any) => {
    axios.post('users/change-password', {
      newPassword,
      oldPassword,
    }).then((data) => console.log('data', data))
  }
  const uploadImage = ({ file } : any) => {
    const formData = new FormData()
    formData.append('file', file.originFileObj)
    axios.post('account/change-profile-photo', formData).then((data) => console.log('data', data))
  }

  if (isLoading) return <Spin size="large" className="settings-spin" />

  form.setFieldsValue({
    username: user[0]?.user?.username,
    email: user[0]?.user?.email,
    bio: user[0]?.bio,
  })

  return (
    <>
      <div className="settings-page">
        <Header />
        <div className="change-image">
          <Avatar src={user[0].photo ?? require('../../assets/images/default-user.jpg')} size="large" className="profile-image" />
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
    </>
  )
}

export default SettingsPage
