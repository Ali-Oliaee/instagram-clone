/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import {
  DeleteOutlined,
  HeartFilled,
  MoreOutlined,
  MessageOutlined,
  EditOutlined,
  QuestionCircleOutlined,
  DownSquareOutlined,
  HeartOutlined,
  DownSquareFilled,
} from '@ant-design/icons'
import {
  Avatar,
  Button,
  Card,
  Dropdown,
  Menu,
  message,
  Modal,
  Popconfirm,
  Tag,
} from 'antd'
import { useTranslation } from 'react-i18next'
import { useQueryClient } from 'react-query'
import { Link } from 'react-router-dom'
import { useMediaQuery } from 'usehooks-ts'
import { useState } from 'react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import axios from '../../utils/axios'
import { Comments } from '../comments'
import { defaultImage } from '../../utils/constants'
import { Post } from '../../interfaces/post'
import { EditPostModal, UsersList } from '../modals'
import './style.scss'

function PostCard({
  id,
  file: image,
  title,
  caption,
  account: creator,
  tags,
  account_likes: likes,
  account_archives: archives,
  created_at: createdAt,
  updated_at: updatedAt,
  comment_status: enableComments,
}: Post) {
  const { Meta } = Card
  const { t } = useTranslation()
  const isMobile = useMediaQuery('(max-width: 500px)')
  const queryClient = useQueryClient()
  const [modalVisible, setModalVisible] = useState(false)
  const [editModalVisible, setEditModalVisible] = useState(false)
  const [likesModalVisible, setLikesModalVisible] = useState(false)
  const [commentsModalVisible, setCommentsModalVisible] = useState(false)
  const account = JSON.parse(localStorage.getItem('user') || '{}')
  dayjs.extend(relativeTime)

  const deletePost = () => axios.delete(`posts/list/post=${id}/`).then(() => {
    message.success('Post deleted successfully!')
    queryClient.invalidateQueries('posts')
    setModalVisible(false)
  })

  const likePost = () => axios.post('/likes/create/', {
    account: account.id,
    post: id,
  }).then(() => queryClient.invalidateQueries('posts'))

  const archivePost = () => axios.post('/archives/create/', {
    account: account.id,
    post: id,
  }).then(() => queryClient.invalidateQueries('posts'))

  const unLikePost = () => axios.delete(`/likes/destroy/account=${account.id}/post=${id}/`).then(() => queryClient.invalidateQueries('posts'))
  const unArchivePost = () => axios.delete(`/archives/destroy/account=${account.id}/post=${id}/`).then(() => queryClient.invalidateQueries('posts'))

  const postAdmin = (
    <Dropdown
      trigger={['click']}
      overlay={(
        <Menu>
          <Menu.Item key="edit" onClick={() => setEditModalVisible(true)} icon={<EditOutlined />}>{t('edit')}</Menu.Item>
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
  )

  const cardMeta = (
    <div className="creator">
      <Link to={`/profile/${creator?.id}`}>
        <Meta title={creator?.user?.username} avatar={<Avatar src={creator?.photo ?? defaultImage} />} />
      </Link>
      {account.id === creator.id && postAdmin}
    </div>
  )

  const cardOptions = (
    <div className="card-operations">
      <span>
        <Button
          className="like-button"
          onClick={likes?.includes(account?.id) ? unLikePost : likePost}
          size="large"
          icon={
            likes?.includes(account?.id)
              ? <HeartFilled style={{ color: 'red' }} /> : <HeartOutlined />
          }
        />
        <Button type="ghost" className="likes-number-button" onClick={() => likes?.length && setLikesModalVisible(true)}>
          {`${likes?.length} ${t('likes')}`}
        </Button>
      </span>
      <span>
        {enableComments && (
        <Button
          size="large"
          onClick={() => setCommentsModalVisible(true)}
          icon={<MessageOutlined />}
          className="comment-button"
        />
        )}
        <Button
          size="large"
          onClick={archives?.includes(account.id) ? unArchivePost : archivePost}
          icon={archives?.includes(account.id) ? <DownSquareFilled style={{ color: 'green' }} /> : <DownSquareOutlined />}
          className="archive-button"
        />
      </span>
    </div>
  )

  const cardContent = (
    <>
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
          </span>
        </div>
      )}
      <div className="tags">
        {tags && tags?.map((tag: any) => <Tag key={tag?.name} className="tag">{tag?.name}</Tag>)}
      </div>
      <span className="date">
        {dayjs(createdAt * 1000).fromNow()}
        {' '}
        {updatedAt !== createdAt && (
        <EditOutlined />)}
      </span>
    </>
  )

  return (
    <>
      <div>
        {isMobile ? (
          <Card className="post-card">
            {cardMeta}
            <img src={image} alt={title} />
            <div className="post-info">
              {cardOptions}
              {cardContent}
            </div>
          </Card>
        ) : (
          <img
            src={image}
            alt={title}
            className="post-image"
            onClick={() => setModalVisible(true)}
          />
        )}
      </div>
      <Modal
        visible={modalVisible}
        closable={false}
        onCancel={() => setModalVisible(false)}
        footer={null}
        width="80%"
        centered
        className="post-card-modal"
        destroyOnClose
      >
        <div className="image-container">
          <img
            src={image}
            alt={title}
            height="100%"
            width="100%"
            className="post-modal-image"
          />
        </div>
        <div className="post-info">
          <Card className="post-card">
            {cardMeta}
            <div className="post-info">
              {cardOptions}
              {cardContent}
            </div>
          </Card>
        </div>
      </Modal>
      <Comments
        id={id}
        visible={commentsModalVisible}
        onCancel={() => setCommentsModalVisible(false)}
      />
      <EditPostModal
        visible={editModalVisible}
        setVisible={setEditModalVisible}
        post={{
          id, title, caption, tags, enableComments,
        }}
        onCancel={() => setEditModalVisible(false)}
      />
      <UsersList
        data={likes}
        visible={likesModalVisible}
        onCancel={() => setLikesModalVisible(false)}
        title="Likes"
      />
    </>
  )
}

export default PostCard
