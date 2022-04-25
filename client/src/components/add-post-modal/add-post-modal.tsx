/* eslint-disable prefer-arrow/prefer-arrow-functions */
import { UploadOutlined } from '@ant-design/icons'
import {
  Button, Form, Input, Modal, Select, Upload,
} from 'antd'
import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'react-router-dom'
import './style.scss'

function AddPostModal({ visible }:any) {
  const [searchParams, setSearchParams] = useSearchParams()
  const { t } = useTranslation()
  const postFile = (values: any):any => {
    console.log('values', values)
  }
  return (
    <Modal
      visible={visible}
      closable
      onCancel={() => setSearchParams('')}
      title={t('add-post')}
      footer={null}
      className="add-post-modal"
    >
      <Form onFinish={postFile}>
        <Form.Item
          name="title"
          rules={[
            {
              required: true,
              message: t('requred-title'),
            },
          ]}
        >
          <Input placeholder={t('title')} />
        </Form.Item>
        <Form.Item name="content">
          <Input.TextArea placeholder={t('description')} />
        </Form.Item>
        <Form.Item
          name="post"
          rules={[
            {
              required: true,
              message: t('requred-post'),
            },
          ]}
        >
          <Upload>
            <Button icon={<UploadOutlined />}>{t('upload')}</Button>
            <span className="upload-description">{t('upload-description')}</span>
          </Upload>
        </Form.Item>
        <Form.Item name="tags">
          <Select mode="tags" placeholder={t('tags')} />
        </Form.Item>
        <Button block type="primary" htmlType="submit">
          {t('submit')}
        </Button>
      </Form>
    </Modal>
  )
}

export default AddPostModal
