import {
  Avatar, Button, Comment, Form, Input, message, Modal, Skeleton,
} from 'antd'
import { useState } from 'react'
import { useQuery } from 'react-query'
import { Link, useSearchParams } from 'react-router-dom'
import qs from 'query-string'
import { getComments } from '../../utils/api'
import useValidation from '../../hooks/use-validation'
import { defaultImage } from '../../utils/constants'
import axios from '../../utils/axios'
import './style.scss'

function Comments() {
  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm()
  const [searchParams, setSearchParams] = useSearchParams()
  const QS = qs.parse(window.location.search)
  const { data: comments, isLoading, refetch } = useQuery('comments', () => getComments(Number(QS.comments)))
  const { requiredComment } = useValidation()

  const sendComment = ({ commentContent }: any) => {
    setLoading(true)
    return commentContent && axios.post('/comments/create/', {
      content: commentContent,
      post: QS.comments,
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
        delete QS.comments
        setSearchParams(QS as any)
      }}
      destroyOnClose
      centered
    >
      <div className="comments">
        {isLoading ? (
          <Skeleton active avatar title paragraph />
        ) : (
          comments?.map((comment: any, index: any) => {
            const avatarSrc = comment.author.photo ? `http://127.0.0.1:8000${comment.author.photo}` : defaultImage
            return (
              <Comment
                // eslint-disable-next-line react/no-array-index-key
                key={index}
                author={<Link to={`/profile/${comment.author.id}`}>{comment.author.user.username}</Link>}
                avatar={(<Avatar src={avatarSrc} alt={comment.author.user.username} />)}
                content={<p>{comment.content}</p>}
              />
            )
          })
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
