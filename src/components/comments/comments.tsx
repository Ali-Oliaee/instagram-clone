import {
  Avatar, Button, Comment, Input, Modal,
} from 'antd'
import qs from 'query-string'
import { useSearchParams } from 'react-router-dom'
import './style.scss'

function Comments({ comments }: any) {
  const [searchParams, setSearchParams] = useSearchParams()
  const QS = qs.parse(window.location.search)

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
      {
        comments.map((comment: any) => (
          <Comment
            key={comment.id}
            author={comment.author}
            avatar={(
              <Avatar
                src={comment.avatar}
                alt={comment.author}
              />
              )}
            content={<p>{comment.content}</p>}
          />
        ))
    }
      <Input.Group compact className="comment-input">
        <Input placeholder="write a comment..." />
        <Button type="primary">Send</Button>
      </Input.Group>
    </Modal>
  )
}

export default Comments
