import { UploadOutlined } from '@ant-design/icons'
import {
  Button, Form, Modal, Select, Upload,
} from 'antd'
import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'react-router-dom'
import qs from 'query-string'
import axios from '../../utils/axios'
import { FloatLabel } from '../float-label'
import './style.scss'

function AddPostModal({ post }:any) {
  const [searchParams, setSearchParams] = useSearchParams()
  const { t } = useTranslation()
  const [form] = Form.useForm()
  const QS = qs.parse(window.location.search)

  const addPost = ({
    post: image, title, caption, tags,
  } : any) => {
    const postImage = image[0].originFileObj
    const formData = new FormData()
    formData.append('file', postImage)
    formData.append('title', title)
    formData.append('caption', caption)

    axios.post(
      '/posts/create/',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    )
  }

  const editPost = (values : any) => {
    console.log('post', post)
    console.log('values edit', values)
  }

  return (
    <Modal
      visible={!!QS.add || !!QS.edit}
      closable
      onCancel={() => setSearchParams({})}
      title={QS.edit ? t('edit-post') : t('add-post')}
      footer={null}
      className="add-post-modal"
    >
      <Form onFinish={post ? editPost : addPost} form={form}>
        {!!QS.add && (
        <Form.Item
          name="post"
          rules={[
            {
              required: true,
              message: t('requred-post'),
            },
          ]}
          valuePropName="fileList"
          getValueFromEvent={(e) => (Array.isArray(e) ? e : e && e.fileList)}
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
        <Form.Item name="caption">
          <FloatLabel textarea label={t('description')} value={form.getFieldValue('caption')} />
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
