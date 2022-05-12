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
  Avatar,
  Button,
  Card,
  Dropdown,
  Image,
  Input,
  Menu,
  Popconfirm,
  Skeleton,
  Tag,
} from 'antd'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useSearchParams } from 'react-router-dom'
import { AddPostModal } from '../add-post-modal'
import { Comments } from '../comments'
import './style.scss'

interface Post{
    title: string,
    description: string,
    creator: string,
    tags: Array<string>,
    likes: Array<string>,
    image: string,
    createdAt: string,
    // eslint-disable-next-line react/require-default-props
    editedAt?: string,
    id: string,
}

const comments = [
  {
    id: '1',
    author: 'John',
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    content: 'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
  },
  {
    id: '2',
    author: 'Jim',
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    content: 'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
  },
]

function PostCard({
  title,
  description,
  creator,
  tags,
  likes,
  image,
  createdAt,
  id,
  editedAt,
}: Post) {
  const [like, setLike] = useState(false)
  const [archive, setArchive] = useState(false)
  const [loading, setLoading] = useState(false)
  const { Meta } = Card
  const { t } = useTranslation()
  const likePost = () => (like ? setLike(false) : setLike(true))
  const archivePost = () => (archive ? setArchive(false) : setArchive(true))
  const [searchParams, setSearchParams] = useSearchParams()

  return (
    <Card className="post-card">
      {loading ? (
        <Skeleton loading={loading} avatar active />
      ) : (
        <>
          <div className="creator">
            <Link to={`/profile/${Math.floor(Math.random() * 80) + 1}`}>
              <Meta title={creator} avatar={<Avatar src={require('../../assets/images/default-user.jpg')} />} />
            </Link>
            <Dropdown
              trigger={['click']}
              overlay={(
                <Menu>
                  <Menu.Item onClick={() => setSearchParams(`edit=${id}`)} icon={<EditOutlined />}>{t('edit')}</Menu.Item>
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

          <Image src={image} alt={title} preview={false} width="100%" />
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
            {description && (
            <div className="description-container">
              <span className="creator">
                {creator}
                :
                {' '}
              </span>
              <span className="description">
                {description}
                {description.length > 100 && (
                <Button type="link" className="more-button">more...</Button>
                )}
              </span>
            </div>
            )}
            <Comments comments={comments} />
            <Input.Group compact className="comment-input">
              <Input placeholder="write a comment..." />
              <Button type="ghost">send</Button>
            </Input.Group>
            <div className="tags">
              {tags.length && tags.map((tag: string) => <Tag key={tag} className="tag">{tag}</Tag>)}
            </div>
            <span className="date">{createdAt}</span>
            {createdAt !== editedAt && (
            <EditOutlined />)}
          </div>
        </>
      )}
      <AddPostModal post={{
        title,
        description,
        creator,
        tags,
        likes,
        image,
        createdAt,
        id,
        editedAt,
      }}
      />
    </Card>
  )
}

export default PostCard
