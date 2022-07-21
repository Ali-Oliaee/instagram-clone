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
  Image,
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
import { currentUser as account, defaultImage } from '../../utils/constants'
import usePost from '../../hooks/usePost'
import { Comments } from '../comments'
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
  const {
    deletePost, likePost, unLikePost, archivePost, unArchivePost,
  } = usePost()
  const { t } = useTranslation()
  const isMobile = useMediaQuery('(max-width: 500px)')
  const queryClient = useQueryClient()
  const [modalVisible, setModalVisible] = useState(false)
  const [editModalVisible, setEditModalVisible] = useState(false)
  const [likesModalVisible, setLikesModalVisible] = useState(false)
  const [commentsModalVisible, setCommentsModalVisible] = useState(false)
  dayjs.extend(relativeTime)

  const handleDelete = () => deletePost(id).then(() => {
    message.success('Post deleted successfully!')
    queryClient.invalidateQueries('posts')
    setModalVisible(false)
  })

  const postAdmin = (
    <Dropdown
      trigger={['click']}
      overlay={(
        <Menu>
          <Menu.Item key="edit" onClick={() => setEditModalVisible(true)} icon={<EditOutlined />}>{t('edit')}</Menu.Item>
          <Popconfirm
            title={t('delete-confirm')}
            onConfirm={handleDelete}
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
        {likes?.includes(account?.id) ? (
          <Button
            className="like-button"
            onClick={() => unLikePost(account.id, id)}
            size="large"
            icon={<HeartFilled style={{ color: 'red' }} />}
          />
        ) : (
          <Button
            className="like-button"
            onClick={() => likePost(account.id, id)}
            size="large"
            icon={<HeartOutlined />}
          />
        )}
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
        {archives?.includes(account.id) ? (
          <Button
            size="large"
            onClick={() => unArchivePost(account.id, id)}
            icon={<DownSquareFilled style={{ color: 'green' }} />}
            className="archive-button"
          />
        ) : (
          <Button
            size="large"
            onClick={() => archivePost(account.id, id)}
            icon={<DownSquareOutlined />}
            className="archive-button"
          />
        )}
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
          <Image
            src={image}
            alt={title}
            className="post-image"
            height={150}
            width={200}
            preview={false}
            onClick={() => setModalVisible(true)}
          />
        )}
      </div>
      <Modal
        visible={modalVisible}
        closable={false}
        onCancel={() => setModalVisible(false)}
        footer={null}
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
    </>
  )
}

export default PostCard
