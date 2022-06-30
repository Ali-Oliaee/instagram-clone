import { useState } from 'react'
import { InboxOutlined } from '@ant-design/icons'
import {
  Button, Form, message, Modal, Select, Switch, Upload,
} from 'antd'
import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'react-router-dom'
import qs from 'query-string'
import { useQueryClient } from 'react-query'
import axios from '../../utils/axios'
import { FloatLabel } from '../float-label'
import { AddPost } from '../../interfaces'
import './style.scss'

function AddPostModal() {
  const [searchParams, setSearchParams] = useSearchParams()
  const { Dragger } = Upload
  const [loading, setLoading] = useState(false)
  const { t } = useTranslation()
  const [form] = Form.useForm()
  const QS = qs.parse(window.location.search)
  const queryClient = useQueryClient()
  const [secondModalVisible, setSecondModalVisible] = useState(false)

  const addPost = ({
    title, caption, tags, enableComments = true,
  } : AddPost) => {
    setLoading(true)
    const { file } = form.getFieldValue('post')
    const postImage = file.originFileObj
    const formData = new FormData()
    formData.append('file', postImage)
    formData.append('title', title)
    formData.append('caption', caption)
    formData.append('comment_status', enableComments)
    // eslint-disable-next-line no-unused-expressions
    tags && tags.length && tags.forEach((tag: any, i: number) => formData.append(`tags[${i}]`, tag))

    return axios.post(
      '/posts/create/',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    ).then(() => {
      setSecondModalVisible(false)
      queryClient.invalidateQueries('posts')
      form.resetFields()
      message.success('post added successfully!')
    }).finally(() => setLoading(false))
  }

  return (
    <>
      <Modal
        visible={!!QS.add}
        closable
        centered
        onCancel={() => setSearchParams({})}
        title={t('add-post')}
        footer={null}
        className="add-post-modal"
        destroyOnClose
      >
        <Form form={form}>
          <Form.Item
            name="post"
            rules={[
              {
                required: true,
                message: t('required-post'),
              },
            ]}
          >
            <Dragger
              name="file"
              maxCount={1}
              beforeUpload={(file) => {
                const isValid = file.type === 'image/png' || file.type === 'image/jpeg' || file.type === 'image/jpg'
                 || file.type === 'image/gif'
                 || file.type === 'image/webp'
                 || file.type === 'image/svg+xml'
                 || file.type === 'image/bmp'
                 || file.type === 'image/tiff'
                if (!isValid) message.error(`${file.name} is not a valid file`)
                return isValid || Upload.LIST_IGNORE
              }}
              onChange={({ event }: any) => {
                if (event) {
                  message.success('file uploaded successfully.')
                  setSearchParams({})
                  setSecondModalVisible(true)
                }
              }}
            >
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">{t('dragger-title')}</p>
            </Dragger>
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        visible={secondModalVisible}
        closable
        centered
        onCancel={() => setSecondModalVisible(false)}
        title={t('add-post')}
        footer={null}
        className="add-post-modal"
        destroyOnClose
      >
        <Form onFinish={addPost} form={form}>
          <Form.Item
            name="title"
            rules={[
              {
                required: true,
                message: t('required-title'),
              },
              {
                max: 50,
                message: t('max-title-length'),
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
    </>
  )
}

export default AddPostModal
