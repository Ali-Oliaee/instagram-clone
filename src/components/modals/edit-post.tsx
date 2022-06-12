import {
  Modal, Form, message, Select, Switch, Button,
} from 'antd'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'react-router-dom'
import qs from 'query-string'
import { useQuery, useQueryClient } from 'react-query'
import axios from 'axios'
import './style.scss'
import { FloatLabel } from '../float-label'
import { getPost } from '../../utils/api'

function EditPostModal() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [loading, setLoading] = useState(false)
  const { t } = useTranslation()
  const [form] = Form.useForm()
  const QS = qs.parse(window.location.search)
  const { data: post, isLoading } = useQuery('post', () => getPost(Number(QS.edit)))
  const queryClient = useQueryClient()

  if (isLoading) return <div>Loading...</div>
  form.setFieldsValue({
    title: post?.title,
    caption: post?.caption,
    tags: post?.tags,
    enableComments: post?.enableComments,
  })

  const editPost = ({ title, caption, tags } : any) => {
    setLoading(true)
    return axios.patch(`/posts/list/post=${post.id}/`, {
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
      visible={!!QS.edit}
      closable
      onCancel={() => setSearchParams({})}
      title={t('edit-post')}
      footer={null}
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
