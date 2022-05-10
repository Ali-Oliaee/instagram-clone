import {  DislikeOutlined, LikeOutlined } from '@ant-design/icons'
import { Avatar, Comment } from 'antd'
import './style.scss'

function Comments({comments}: any) {
  return (
    <div className='comments'>{
        comments.map((comment: any) => (
            <Comment
            key={comment.id}    
            author={comment.author}
            avatar={
                <Avatar
                src={comment.avatar}
                alt={comment.author}
                />
            }
            content={
                <p>
                    {comment.content}
                </p>
            }
            actions={[
                <LikeOutlined key='like-comment' />,
                <DislikeOutlined key='dislike-comment' />,
            ]}
            />

        ))
    }</div>
  )
}

export default Comments