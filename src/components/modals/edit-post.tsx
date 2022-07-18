import {
  Modal, Form, message, Select, Switch, Button,
} from 'antd'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'react-router-dom'
import { useQueryClient } from 'react-query'
import { EditPost } from '../../interfaces'
import axios from '../../utils/axios'
import { FloatLabel } from '../float-label'
import './style.scss'

function EditPostModal({
  visible, setVisible, onCancel, post,
}:any) {
  const [searchParams, setSearchParams] = useSearchParams()
  const [loading, setLoading] = useState(false)
  const { t } = useTranslation()
  const [form] = Form.useForm()
  const queryClient = useQueryClient()

  form.setFieldsValue({ ...post })

  const editPost = ({ title, caption, tags } : EditPost) => {
    setLoading(true)
    return axios.patch(`/posts/list/post=${post.id}/`, {
      title,
      caption,
      tags,
      comment_status: post.enableComments,
    }).then(() => {
      setSearchParams({})
      queryClient.invalidateQueries('posts')
      form.resetFields()
      setVisible(false)
      message.success('post edited successfully!')
    }).finally(() => setLoading(false))
  }

  return (
    <Modal
      visible={visible}
      closable
      onCancel={() => {
        onCancel()
        form.resetFields()
      }}
      title={t('edit-post')}
      footer={null}
      centered
      className="add-post-modal"
      destroyOnClose
    >
      <Form onFinish={editPost} form={form}>
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
        <Form.Item label={t('allow-comments')} initialValue valuePropName="checked" name="enableComments">
          <Switch className="switch" />
        </Form.Item>
        <Button block type="primary" htmlType="submit" loading={loading}>
          {t('submit')}
        </Button>
      </Form>
    </Modal>
  )
}

export default EditPostModal
