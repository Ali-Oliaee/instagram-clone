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
  Menu,
  Popconfirm,
  Tag,
} from 'antd'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useSearchParams } from 'react-router-dom'
import { useMediaQuery } from 'usehooks-ts'
import { AddPostModal } from '../add-post-modal'
import { Comments } from '../comments'
import PostModal from './post-modal'
import './style.scss'

function PostCard({
  title,
  caption,
  creator,
  tags,
  likes,
  image,
  createdAt,
  id,
  editedAt,
}: any) {
  const [modalVisible, setModalVisible] = useState(false)
  const { Meta } = Card
  const { t } = useTranslation()
  const [searchParams, setSearchParams] = useSearchParams()
  const isMobile = useMediaQuery('(max-width: 500px)')

  return (
    <div>
      {isMobile ? (
        <Card className="post-card">
          <div className="creator">
            <Link to={`/profile/${creator?.id}`}>
              <Meta title={creator.user.username} avatar={<Avatar src={require('../../assets/images/default-user.jpg')} />} />
            </Link>
            <Dropdown
              trigger={['click']}
              overlay={(
                <Menu>
                  <Menu.Item key="edit" onClick={() => setSearchParams(`edit=${id}`)} icon={<EditOutlined />}>{t('edit')}</Menu.Item>
                  <Popconfirm
                    title={t('delete-confirm')}
                    onConfirm={() => console.log('ok')}
                    okText={t('yes')}
                    cancelText={t('no')}
                    icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                  >
                    <Menu.Item key="delete" danger icon={<DeleteOutlined />}>{t('delete')}</Menu.Item>
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
                <Button size="large" icon={<HeartFilled style={{ color: 'red' }} />} className="like-button" />
                {`${likes.length} likes`}
              </h3>
              <span>
                <Button size="large" onClick={() => setSearchParams({ comments: 'true' })} icon={<MessageOutlined />} className="comment-button" />
                <Button size="large" icon={<EnvironmentFilled />} className="archive-button" />
              </span>
            </div>
            <h2 className="title">{title}</h2>
            {caption && (
              <div className="description-container">
                <span className="creator">
                  {creator.user.username}
                  :
                  {' '}
                </span>
                <span className="description">
                  {caption}
                  {caption.length > 100 && (
                  <Button type="link" className="more-button">more...</Button>
                  )}
                </span>
              </div>
            )}
            <div className="tags">
              {tags && tags.map((tag: string) => <Tag key={tag} className="tag">{tag}</Tag>)}
            </div>
            <span className="date">{createdAt}</span>
            {createdAt !== editedAt && (
              <EditOutlined />)}
          </div>
          <AddPostModal post={{
            title,
            caption,
            tags,
            id,
          }}
          />
        </Card>
      ) : (
        <>
          <Image
            src={image}
            alt={title}
            preview={false}
            width="100%"
            className="post-image"
            onClick={() => {
              setModalVisible(true)
              setSearchParams({
                post: id,
              })
            }}
          />
          <PostModal
            post={{
              title,
              caption,
              creator,
              tags,
              likes,
              image,
              createdAt,
              id,
              editedAt,
            }}
            visible={modalVisible}
            setVisible={setModalVisible}
          />
        </>
      )}
      <Comments comments={[]} />
    </div>
  )
}

export default PostCard
