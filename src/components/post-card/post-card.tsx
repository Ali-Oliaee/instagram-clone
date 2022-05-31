import {
  DeleteOutlined,
  HeartFilled,
  MoreOutlined,
  MessageOutlined,
  EditOutlined,
  QuestionCircleOutlined,
  DownSquareOutlined,
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
import { useQueryClient } from 'react-query'
import { Link, useSearchParams } from 'react-router-dom'
import { useMediaQuery } from 'usehooks-ts'
import axios from '../../utils/axios'
import { AddPostModal } from '../add-post-modal'
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
  updatedAt,
  editable,
}: any) {
  const [modalVisible, setModalVisible] = useState(false)
  const { Meta } = Card
  const { t } = useTranslation()
  const [searchParams, setSearchParams] = useSearchParams()
  const isMobile = useMediaQuery('(max-width: 500px)')
  const queryClient = useQueryClient()
  const deletePost = () => axios.delete(`posts/list/${id}/`).then(() => queryClient.invalidateQueries('posts'))

  return (
    <div>
      {isMobile ? (
        <Card className="post-card">
          <div className="creator">
            <Link to={`/profile/${creator?.id}`}>
              <Meta title={creator.user.username} avatar={<Avatar src={require('../../assets/images/default-user.jpg')} />} />
            </Link>
            {editable && (
              <Dropdown
                trigger={['click']}
                overlay={(
                  <Menu>
                    <Menu.Item key="edit" onClick={() => setSearchParams(`edit=${id}`)} icon={<EditOutlined />}>{t('edit')}</Menu.Item>
                    <Popconfirm
                      title={t('delete-confirm')}
                      onConfirm={deletePost}
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
            )}
          </div>
          <Image src={image} alt={title} preview={false} width="100%" />
          <div className="post-info">
            <div className="card-operations">
              <h3>
                <Button size="large" icon={<HeartFilled style={{ color: 'red' }} />} className="like-button" />
                {`${likes.length} likes`}
              </h3>
              <span>
                <Button
                  size="large"
                  onClick={() => setSearchParams({ post: id, comments: 'true' })}
                  icon={<MessageOutlined />}
                  className="comment-button"
                />
                <Button size="large" icon={<DownSquareOutlined />} className="archive-button" />
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
              {tags && tags.map((tag: any) => <Tag key={tag.name} className="tag">{tag.name}</Tag>)}
            </div>
            <span className="date">{new Date(createdAt * 1000).toUTCString()}</span>
            {updatedAt !== createdAt && (
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
              id,
              title,
              caption,
              creator,
              tags,
              likes,
              image,
              createdAt,
              updatedAt,
            }}
            visible={modalVisible}
            setVisible={setModalVisible}
            editable={editable}
          />
        </>
      )}
    </div>
  )
}

export default PostCard
