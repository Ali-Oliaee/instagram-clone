import { EditOutlined } from '@ant-design/icons'
import { Tag } from 'antd'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

function PostContent({
  title, caption, tags, createdAt, updatedAt, username,
}: any) {
  dayjs.extend(relativeTime)

  return (
    <div className="post-card-content">
      <h2 className="title">{title}</h2>
      {caption && (
      <div className="description-container">
        <span className="creator">
          {username}
          :
          {' '}
        </span>
        <span className="description">
          {caption}
        </span>
      </div>
      )}
      <div className="tags">
        {tags && tags?.map((tag: any) => <Tag key={tag?.name} className="tag">{tag?.name}</Tag>)}
      </div>
      <span className="date">
        {dayjs(createdAt * 1000).fromNow()}
        {' '}
        {updatedAt !== createdAt && <EditOutlined />}
      </span>
    </div>
  )
}

export default PostContent
