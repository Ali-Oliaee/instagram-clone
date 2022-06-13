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
import qs from 'query-string'
import { useTranslation } from 'react-i18next'
import { useQueryClient } from 'react-query'
import { Link, useSearchParams } from 'react-router-dom'
import { useMediaQuery } from 'usehooks-ts'
import axios from '../../utils/axios'
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
  const { t } = useTranslation()
  const [searchParams, setSearchParams] = useSearchParams()
  const isMobile = useMediaQuery('(max-width: 500px)')
  const queryClient = useQueryClient()
  const { account } = JSON.parse(localStorage.getItem('user') ?? '{}')
  const QS = qs.parse(window.location.search)

  const timeSince = (date: any) => {
    const seconds = Math.floor((new Date() as any - date) / 1000)
    let interval = seconds / 31536000
    if (interval > 1) return `${Math.floor(interval)} years`
    interval = seconds / 2592000
    if (interval > 1) return `${Math.floor(interval)} months`
    interval = seconds / 86400
    if (interval > 1) return `${Math.floor(interval)} days`
    interval = seconds / 3600
    if (interval > 1) return `${Math.floor(interval)} hours`
    interval = seconds / 60
    if (interval > 1) return `${Math.floor(interval)} minutes`
    return `${Math.floor(seconds)} seconds`
  }

  const deletePost = () => axios.delete(`posts/list/post=${id}/`).then(() => {
    message.success('Post deleted successfully!')
    queryClient.invalidateQueries('posts')
    delete QS.post
    setSearchParams({ ...QS } as any)
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
  )

  const cardMeta = (
    <div className="creator">
      <Link to={`/profile/${creator?.id}`}>
        <Meta title={creator.user.username} avatar={<Avatar src={creator.photo} />} />
      </Link>
      {account.id === creator.id && postAdmin}
    </div>
  )

  const cardOptions = (
    <div className="card-operations">
      <h3>
        <Button
          className="like-button"
          onClick={likes.includes(account.id) ? unLikePost : likePost}
          size="large"
          icon={
                  likes.includes(account.id)
                    ? <HeartFilled style={{ color: 'red' }} /> : <HeartOutlined />
                }
        />
        <Button type="ghost" className="likes-number-button" onClick={() => likes?.length && setSearchParams({ ...QS, likes: 'true' })}>
          {`${likes.length} likes`}
        </Button>
      </h3>
      <span>
        {enableComments && (
        <Button
          size="large"
          onClick={() => setSearchParams({ post: id, comments: 'true' }as any)}
          icon={<MessageOutlined />}
          className="comment-button"
        />
        )}
        <Button
          size="large"
          onClick={archives.includes(account.id) ? unArchivePost : archivePost}
          icon={archives.includes(account.id) ? <DownSquareFilled style={{ color: 'green' }} /> : <DownSquareOutlined />}
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
            {caption.length > 100 && (
            <Button type="link" className="more-button">more...</Button>
            )}
          </span>
        </div>
      )}
      <div className="tags">
        {tags && tags.map((tag: any) => <Tag key={tag.name} className="tag">{tag.name}</Tag>)}
      </div>
      <span className="date">
        {timeSince(new Date(Date.now() as any - createdAt))}
        {' '}
        ago
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
            <Image src={image} alt={title} preview={false} width="100%" />
            <div className="post-info">
              {cardOptions}
              {cardContent}
            </div>
          </Card>
        ) : (
          <>
            <Image
              src={image}
              alt={title}
              preview={false}
              width="100%"
              className="post-image"
              onClick={() => setSearchParams({
                post: id as any,
              })}
            />
            <Modal
              visible={!!QS.post}
              closable={false}
              onCancel={() => setSearchParams({})}
              footer={null}
              width="80%"
              centered
              className="post-card-modal"
              destroyOnClose
            >
              <Image
                src={image}
                alt={title}
                height="100%"
                width="100%"
                preview={false}
              />
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
        )}
      </div>
      <Comments id={id} />
      <EditPostModal
        visible={!!QS.edit}
        post={{
          id, title, caption, tags, enableComments,
        }}
        onCancel={() => {
          delete QS.edit
          setSearchParams({ ...QS } as any)
        }}
      />
      <UsersList
        data={likes}
        visible={!!QS.likes}
        title="Likes"
        onCancel={() => {
          delete QS.likes
          setSearchParams({ ...QS } as any)
        }}
      />
    </>
  )
}

export default PostCard
