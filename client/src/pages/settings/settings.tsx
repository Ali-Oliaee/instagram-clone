/* eslint-disable global-require */
/* eslint-disable prefer-arrow/prefer-arrow-functions */
import {
  Avatar, Button, Form, Input, Modal, Upload,
} from 'antd'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Header } from '../../components'
import './style.scss'

function SettingsPage() {
  const [visible, setVisible] = useState(false)
  const { t } = useTranslation()
  const handleSubmit = (values : any) => {
    console.log(values)
  }
  const changePassword = ({ newPassword } : any) => {
    console.log(newPassword)
  }
  const uploadImage = (info : any) => {
    console.log(info)
  }

  return (
    <>
      <div className="settings-page">
        <Header />
        <div className="change-image">
          <Avatar src={require('../../assets/images/default-user.jpg')} size="large" className="profile-image" />
          <Upload showUploadList={false} onChange={uploadImage}>
            <Button type="text">change profile image</Button>
          </Upload>
        </div>
        <Form onFinish={handleSubmit}>
          <Form.Item name="username">
            <Input placeholder="username" size="large" />
          </Form.Item>
          <Form.Item name="email">
            <Input placeholder="email" size="large" />
          </Form.Item>
          <Form.Item name="bio">
            <Input.TextArea placeholder="bio" size="large" />
          </Form.Item>
          <Button htmlType="submit" block type="primary">save</Button>
        </Form>
        <Button block type="link" onClick={() => setVisible(true)}>change password</Button>
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
            <Input.Password size="large" autoFocus placeholder={t('old-password')} />
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
          <Button size="large" htmlType="submit" block type="primary">{t('confirm')}</Button>
        </Form>
      </Modal>
    </>
  )
}

export default SettingsPage
