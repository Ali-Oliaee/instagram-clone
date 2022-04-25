/* eslint-disable global-require */
/* eslint-disable prefer-arrow/prefer-arrow-functions */
import {
  DeleteOutlined,
  HeartFilled,
  MoreOutlined,
  HeartOutlined,
  EnvironmentOutlined,
  EnvironmentFilled,
  MessageOutlined,
  EditOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons'
import {
  Avatar, Button, Dropdown, Menu, Popconfirm, Tag,
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
  const [archive, setArchive] = useState(false)
  const { t } = useTranslation()
  const likePost = () => (like ? setLike(false) : setLike(true))
  const archivePost = () => (archive ? setArchive(false) : setArchive(true))

  return (
    <div className="post-card">
      <div className="creator">
        <div>
          <Avatar src={require('../../assets/images/default-user.jpg')} />
          {creator}
        </div>
        <Dropdown
          trigger={['click']}
          overlay={(
            <Menu>
              <Menu.Item icon={<EditOutlined />}>{t('edit')}</Menu.Item>
              <Popconfirm
                title={t('delete-confirm')}
                onConfirm={() => console.log('ok')}
                okText={t('yes')}
                cancelText={t('no')}
                icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
              >
                <Menu.Item danger icon={<DeleteOutlined />}>{t('delete')}</Menu.Item>
              </Popconfirm>
            </Menu>
                )}
        >
          <MoreOutlined />
        </Dropdown>
      </div>
      <img src={image} alt="post" />
      <div className="post-info">
        <div className="card-operations">
          <h3>
            <Button size="large" icon={like ? <HeartFilled style={{ color: 'red' }} /> : <HeartOutlined />} onClick={likePost} className="like-button" />
            {likes.length}
          </h3>
          <span>
            <Button size="large" icon={<MessageOutlined />} className="comment-button" />
            <Button size="large" icon={archive ? <EnvironmentFilled /> : <EnvironmentOutlined />} onClick={archivePost} className="archive-button" />
          </span>
        </div>
        <h2 className="title">{title}</h2>
        <div className="description-container">
          <span className="creator">
            {creator}
            :
            {' '}
          </span>
          <span className="description">
            {description}
            <Button type="link" className="more-button">more...</Button>
          </span>
        </div>
        <div className="tags">
          {tags.length && tags.map((tag: string) => <Tag key={tag} className="tag">{tag}</Tag>)}
        </div>
        <span className="date">{createdAt}</span>
      </div>
    </div>
  )
}

export default PostCard
