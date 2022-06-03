import { useState } from 'react'
import { UploadOutlined } from '@ant-design/icons'
import {
  Button, Form, message, Modal, Select, Switch, Upload,
} from 'antd'
import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'react-router-dom'
import qs from 'query-string'
import { useQueryClient } from 'react-query'
import axios from '../../utils/axios'
import { FloatLabel } from '../float-label'
import './style.scss'

function AddPostModal({ post }:any) {
  const [searchParams, setSearchParams] = useSearchParams()
  const [loading, setLoading] = useState(false)
  const { t } = useTranslation()
  const [form] = Form.useForm()
  const QS = qs.parse(window.location.search)
  const queryClient = useQueryClient()

  form.setFieldsValue({
    ...post,
  })

  const addPost = ({
    post: image, title, caption, tags, enableComments,
  } : any) => {
    setLoading(true)
    const postImage = image[0].originFileObj
    const formData = new FormData()
    formData.append('file', postImage)
    formData.append('title', title)
    formData.append('caption', caption)
    formData.append('comment_status', enableComments === 'checked' ? 'true' : 'false')

    return axios.post(
      '/posts/create/',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    ).then(() => {
      setSearchParams({})
      queryClient.invalidateQueries('posts')
      form.resetFields()
      message.success('post added successfully!')
    }).finally(() => setLoading(false))
  }

  const editPost = ({ title, caption, tags } : any) => {
    setLoading(true)
    return axios.patch(`/posts/list/${post.id}/`, {
      title,
      caption,
      tags,
    }).then(() => {
      setSearchParams({})
      queryClient.invalidateQueries('posts')
      form.resetFields()
      message.success('post edited successfully!')
    }).finally(() => setLoading(false))
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
          <Select open={false} mode="tags" placeholder={t('tags')} />
        </Form.Item>
        <Form.Item label={t('allow-comments')} initialValue="checked" name="enableComments" valuePropName="checked">
          <Switch className="switch" />
        </Form.Item>
        <Button block type="primary" htmlType="submit" loading={loading}>
          {t('submit')}
        </Button>
      </Form>
    </Modal>
  )
}

export default AddPostModal
