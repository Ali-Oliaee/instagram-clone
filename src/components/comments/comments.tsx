import { Avatar, Comment } from 'antd'
import './style.scss'

interface CommentProps{
    id: string,
    author: string,
    avatar: string,
    content: string,
}

interface CommentsProps {
    comments: Array<CommentProps>
}

function Comments({ comments }: CommentsProps) {
  return (
    <div className="comments">
      {
        comments.map((comment: CommentProps) => (
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

    </div>
  )
}

export default Comments
