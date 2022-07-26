import {
  Modal, Form, message, Select, Switch, Button,
} from 'antd'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'react-router-dom'
import { useQuery } from 'react-query'
import qs from 'query-string'
import usePost from '../../hooks/use-post'
import useValidation from '../../hooks/use-validation'
import { FloatLabel } from '../float-label'
import './style.scss'
import { getPost } from '../../utils/api'

function EditPostModal({ refetch }: any) {
  const { editPost } = usePost()
  const [searchParams, setSearchParams] = useSearchParams()
  const [loading, setLoading] = useState(false)
  const QS = qs.parse(window.location.search)
  const { t } = useTranslation()
  const [form] = Form.useForm()
  const { data: post, isLoading } = useQuery('post', () => getPost(Number(QS.post)))
  const { requiredTitle, maxTitleLength } = useValidation()
  console.log(post)

  form.setFieldsValue({ ...post })

  const handleSubmit = (formData: any) => {
    console.log(formData)

    setLoading(true)
    // eslint-disable-next-line no-param-reassign
    formData.id = post.id
    editPost(formData).then(() => {
      form.resetFields()
      delete QS.edit
      setSearchParams(QS as any)
      message.success('post edited successfully!')
      refetch()
    }).finally(() => setLoading(false))
  }

  return (
    <Modal
      visible={!!QS.edit}
      closable
      onCancel={() => {
        delete QS.edit
        setSearchParams(QS as any)
      }}
      title={t('edit-post')}
      footer={null}
      centered
      className="add-post-modal"
      destroyOnClose
    >
      <Form onFinish={handleSubmit} form={form}>
        <Form.Item name="title" rules={[requiredTitle, maxTitleLength]}>
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
