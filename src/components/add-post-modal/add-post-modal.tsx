import { UploadOutlined } from '@ant-design/icons'
import {
  Button, Form, Input, Modal, Select, Upload,
} from 'antd'
import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'react-router-dom'
import { FloatLabel } from '../float-label'
import qs from 'query-string'
import './style.scss'

function AddPostModal({ post, onFinish }:any) {
  const [searchParams, setSearchParams] = useSearchParams()
  const { t } = useTranslation()
  const [form] = Form.useForm()
  const QS = qs.parse(window.location.search)

  return (
    <Modal
      visible={!!QS.add || !!QS.edit}
      closable
      onCancel={() => setSearchParams({})}
      title={QS.edit ? t('edit-post') : t('add-post')}
      footer={null}
      className="add-post-modal"
    >
      <Form onFinish={onFinish} form={form}>
        {!post && (
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
            <Button block icon={<UploadOutlined />}>{t('upload')}</Button>
            <span className="upload-description">{t('upload-description')}</span>
          </Upload>
        </Form.Item>
        )}
        <Form.Item
          name="title"
          rules={[
            {
              required: true,
              message: t('requred-title'),
            },
          ]}
        >
          <FloatLabel label={t('title')} autoFocus value={form.getFieldValue('title')} />
        </Form.Item>
        <Form.Item name="content">
          <Input.TextArea placeholder={t('description')} />
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
