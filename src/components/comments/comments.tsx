import { Avatar, Comment } from 'antd'
import './style.scss'

interface Comment{
    id: string,
    author: string,
    avatar: string,
    content: string,
}

interface Comments {
    comments: Array<Comment>
}

function Comments({comments}: Comments) {
  return (
    <div className='comments'>{
        comments.map((comment: Comment) => (
            <Comment
            key={comment.id}    
            author={comment.author}
            avatar={
                <Avatar
                src={comment.avatar}
                alt={comment.author}
                />
            }
            content={<p>{comment.content}</p>}
            />

        ))
    }</div>
  )
}

export default Comments