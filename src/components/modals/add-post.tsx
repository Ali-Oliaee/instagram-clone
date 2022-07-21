import { useState } from 'react'
import { InboxOutlined } from '@ant-design/icons'
import {
  Button, Form, message, Modal, Select, Switch, Upload,
} from 'antd'
import { useTranslation } from 'react-i18next'
import ImgCrop from 'antd-img-crop'
import { useSearchParams } from 'react-router-dom'
import qs from 'query-string'
import { useQueryClient } from 'react-query'
import { FloatLabel } from '../float-label'
import usePost from '../../hooks/usePost'
import './style.scss'

function AddPostModal() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [loading, setLoading] = useState(false)
  const [file, setFile] = useState({ originFileObj: '' })
  const { t } = useTranslation()
  const { addPost } = usePost()
  const [form] = Form.useForm()
  const QS = qs.parse(window.location.search)
  const { Dragger } = Upload
  const queryClient = useQueryClient()
  const [secondModalVisible, setSecondModalVisible] = useState(false)

  const handleSubmit = (data : any) => {
    setLoading(true)
    // eslint-disable-next-line no-param-reassign
    data.file = file
    addPost(data).then(() => {
      message.success('file uploaded successfully.')
      setSearchParams({})
      queryClient.invalidateQueries('posts')
      setSecondModalVisible(false)
    })
      .finally(() => (setLoading(false)))
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
          <Form.Item name="post">
            <ImgCrop
              rotate
              zoom
              modalTitle={t('crop-image')}
              modalOk={t('confirm')}
              modalCancel={t('cancel')}
              onModalOk={(post: any) => {
                setFile(post)
                setSecondModalVisible(true)
              }}
            >
              <Dragger
                name="file"
                maxCount={1}
                beforeUpload={({ type, name }) => {
                  const isValid = type === 'image/png' || type === 'image/jpeg' || type === 'image/jpg'
                 || type === 'image/gif'
                 || type === 'image/webp'
                 || type === 'image/svg+xml'
                 || type === 'image/bmp'
                 || type === 'image/tiff'
                  if (!isValid) message.error(`${name} is not a valid file`)
                  return isValid || Upload.LIST_IGNORE
                }}
              >
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">{t('dragger-title')}</p>
              </Dragger>
            </ImgCrop>
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
        <Form onFinish={handleSubmit} form={form}>
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
