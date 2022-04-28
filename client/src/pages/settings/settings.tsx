/* eslint-disable global-require */
/* eslint-disable prefer-arrow/prefer-arrow-functions */
import {
  Avatar,
  Button,
  Form,
  Input,
  Modal,
  Select,
  Upload,
} from 'antd'
import i18next from 'i18next'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FloatLabel, Header } from '../../components'
import './style.scss'

function SettingsPage() {
  const [visible, setVisible] = useState(false)
  const [form] = Form.useForm()
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
  const changeLanguage = (language : string) => {
    console.log('language', language)
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
            <FloatLabel label={t('username')} value={form.getFieldValue('username')} />
          </Form.Item>
          <Form.Item name="email">
            <FloatLabel label={t('email')} value={form.getFieldValue('email')} type="email" />
          </Form.Item>
          <Form.Item name="bio">
            <Input.TextArea placeholder="bio" size="large" />
          </Form.Item>
          <Button htmlType="submit" block type="primary">save</Button>
        </Form>
        <Button block type="link" onClick={() => setVisible(true)}>change password</Button>
        <span className="language">
          <span>Language: </span>
          <Select defaultValue={i18next.language} suffixIcon={false} onChange={changeLanguage}>
            <Select.Option value="en">En</Select.Option>
            <Select.Option value="fa">Fa</Select.Option>
          </Select>
        </span>
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
