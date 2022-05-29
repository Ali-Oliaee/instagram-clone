/* eslint-disable react/no-array-index-key */
import {
  Avatar, Button, Comment, Form, Input, message, Modal, Skeleton,
} from 'antd'
import qs from 'query-string'
import { useState } from 'react'
import { useQuery } from 'react-query'
import { Link, useSearchParams } from 'react-router-dom'
import { getComments } from '../../utils/api'
import axios from '../../utils/axios'
import './style.scss'

function Comments() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm()
  const QS = qs.parse(window.location.search)
  const { data: comments, isLoading, refetch } = useQuery('comments', () => getComments(Number(QS.post) || 0))
  const sendComment = ({ commentContent }: any) => {
    setLoading(true)
    return commentContent && axios.post('/comments/create/', {
      content: commentContent,
      post: Number(QS.post),
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
        setSearchParams({ ...QS as any })
      }}
      destroyOnClose
      centered
    >
      <div className="comments">
        {
         comments && comments.map((comment: any, index: any) => (
           <Comment
             key={index}
             author={<Link to={`profile/${comment.author.id}`}>{comment.author.user.username}</Link>}
             avatar={(
               <Avatar
                 src={comment.author.photo}
                 alt={comment.author.user.username}
               />
              )}
             content={<p>{comment.content}</p>}
           />
         ))
    }
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
