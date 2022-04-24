/* eslint-disable prefer-arrow/prefer-arrow-functions */
import {
  DeleteOutlined, HeartFilled, MoreOutlined, HeartOutlined,
} from '@ant-design/icons'
import {
  Avatar, Button, Dropdown, Menu, Tag,
} from 'antd'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import './style.scss'

interface Post{
    title: string,
    description: string,
    creator: string,
    tags: string[],
    likes: string[],
    image: string,
    createdAt: string,
    id: string,
}

function PostCard({
  title, description, creator, tags, likes, image, createdAt, id,
}: Post) {
  const [like, setLike] = useState(false)
  const { t } = useTranslation()
  const likePost = () => (like ? setLike(false) : setLike(true))

  return (
    <div className="post-card">
      <div className="creator">
        <div>
          <Avatar />
          {creator}
        </div>
        <Dropdown
          trigger={['click']}
          overlay={(
            <Menu>
              <Menu.Item danger icon={<DeleteOutlined />}>{t('delete')}</Menu.Item>
            </Menu>
                )}
        >
          <MoreOutlined />
        </Dropdown>
      </div>
      <img src={image} alt="post" />
      <div className="post-info">
        <h2>{title}</h2>
        <p>
          {creator}
          {description}
        </p>
        <div className="tags">
          {tags.length && tags.map((tag: string) => <Tag key={tag} className="tag">{tag}</Tag>)}
        </div>
        <p>{createdAt}</p>
        <h3>
          <Button icon={like ? <HeartFilled style={{ color: 'red' }} /> : <HeartOutlined />} onClick={likePost} className="like-button" />
          {` ${likes.length}likes`}
        </h3>
      </div>
    </div>
  )
}

export default PostCard
