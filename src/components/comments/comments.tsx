import {
  Avatar, Button, Comment, Form, Input, message, Modal, Skeleton,
} from 'antd'
import { useState } from 'react'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import { getComments } from '../../utils/api'
import { defaultImage } from '../../utils/constants'
import axios from '../../utils/axios'
import { CommentInterface } from '../../interfaces'
import './style.scss'

function Comments({ id, visible, onCancel } : any) {
  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm()
  const { data: comments, isLoading, refetch } = useQuery('comments', () => getComments(id))

  const sendComment = ({ commentContent }: any) => {
    setLoading(true)
    return commentContent && axios.post('/comments/create/', {
      content: commentContent,
      post: id,
    }).then(() => {
      message.success('comment added successfully!')
      refetch()
      form.resetFields()
    }).finally(() => setLoading(false))
  }

  return (
    <Modal
      visible={visible}
      footer={null}
      title="Comments"
      className="comments-modal"
      closable
      onCancel={onCancel}
      destroyOnClose
      centered
    >
      <div className="comments">
        {isLoading ? (
          <Skeleton active avatar title paragraph />
        ) : (
          comments && comments.map((comment: CommentInterface) => (
            <Comment
              author={<Link to={`profile/${comment.author.id}`}>{comment.author.user.username}</Link>}
              avatar={(
                <Avatar
                  src={`http://localhost:8000${comment.author.photo}` ?? defaultImage}
                  alt={comment.author.user.username}
                />
              )}
              content={<p>{comment.content}</p>}
            />
          ))
        )}
      </div>
      <Form form={form} onFinish={sendComment} layout="vertical">
        <Form.Item
          name="commentContent"
          rules={[{
            required: true,
            message: 'fill',
          }]}
        >
          <Input placeholder="write a comment..." />
        </Form.Item>
        <Button type="primary" htmlType="submit" loading={loading} onClick={sendComment}>Send</Button>
      </Form>
    </Modal>
  )
}

export default Comments
