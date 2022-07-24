import {
  Avatar, Button, Comment, Form, Input, message, Modal, Skeleton,
} from 'antd'
import { useState } from 'react'
import { useQuery } from 'react-query'
import { Link, useSearchParams } from 'react-router-dom'
import qs from 'query-string'
import { getComments } from '../../utils/api'
import useValidation from '../../hooks/use-validation'
import { baseURL, defaultImage } from '../../utils/constants'
import axios from '../../utils/axios'
import './style.scss'

function Comments() {
  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm()
  const [searchParams, setSearchParams] = useSearchParams()
  const QS = qs.parse(window.location.search)
  const { data: comments, isLoading, refetch } = useQuery('comments', () => getComments(Number(QS.id)))
  const { requiredComment } = useValidation()

  const sendComment = ({ commentContent }: any) => {
    setLoading(true)
    return commentContent && axios.post('/comments/create/', {
      content: commentContent,
      post: QS.id,
    }).then(() => {
      message.success('comment added successfully!')
      refetch()
      form.resetFields()
    }).finally(() => setLoading(false))
  }

  return (
    <Modal
      visible={!!QS.comments}
      footer={null}
      title="Comments"
      className="comments-modal"
      closable
      onCancel={() => {
        delete QS.comments
        delete QS.id
        setSearchParams(QS as any)
      }}
      destroyOnClose
      centered
    >
      <div className="comments">
        {isLoading ? (
          <Skeleton active avatar title paragraph />
        ) : (
          comments?.map((comment: any) => (
            <Comment
              author={<Link to={`/profile/${comment.author.id}`}>{comment.author.user.username}</Link>}
              avatar={(
                <Avatar
                  src={baseURL + comment.author.photo ?? defaultImage}
                  alt={comment.author.user.username}
                />
              )}
              content={<p>{comment.content}</p>}
            />
          ))
        )}
      </div>
      <Form form={form} onFinish={sendComment} layout="vertical">
        <Form.Item name="commentContent" rules={[requiredComment]}>
          <Input placeholder="write a comment..." />
        </Form.Item>
        <Button type="primary" htmlType="submit" loading={loading} onClick={sendComment}>Send</Button>
      </Form>
    </Modal>
  )
}

export default Comments
