import {
  Avatar,
  Button,
  Card,
  Dropdown,
  Image,
  Menu,
  Modal,
  Popconfirm,
  Tag,
} from 'antd'
import { Link, useSearchParams } from 'react-router-dom'
import qs from 'query-string'
import {
  DeleteOutlined,
  DownSquareFilled,
  DownSquareOutlined,
  EditOutlined,
  HeartFilled,
  HeartOutlined,
  MessageOutlined,
  MoreOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import { useQueryClient } from 'react-query'
import { AddPostModal } from '../add-post-modal'
import './style.scss'

function PostModal({
  visible,
  post,
  setVisible,
  editable,
  onDelete,
  onLike,
  onArchive,
  onRemoveLike,
  onRemoveArchive,
}: any) {
  const [params, setSearchParams] = useSearchParams()
  const { t } = useTranslation()
  const QS = qs.parse(window.location.search)
  const queryClient = useQueryClient()
  const { account } = JSON.parse(localStorage.getItem('user') ?? '{}')

  return (
    <Modal
      visible={visible}
      closable={false}
      onCancel={() => {
        setVisible(false)
        setSearchParams({})
      }}
      footer={null}
      width="80%"
      centered
      className="post-card-modal"
      destroyOnClose
    >
      <Image
        src={post.image}
        alt={post.title}
        height="100%"
        width="100%"
        preview={false}
      />
      <div className="post-info">
        <Card className="post-card">
          <div className="creator">
            <Link to={`/profile/${post.creator.id}`}>
              <Card.Meta
                title={post.creator.user.username}
                avatar={<Avatar src={post.creator.photo} />}
              />
            </Link>
            {editable && (
              <Dropdown
                trigger={['click']}
                overlay={(
                  <Menu>
                    <Menu.Item key="edit" onClick={() => setSearchParams(`edit=${5}`)} icon={<EditOutlined />}>{t('edit')}</Menu.Item>
                    <Menu.Item key="delete" danger icon={<DeleteOutlined />}>
                      <Popconfirm
                        title={t('delete-confirm')}
                        onConfirm={onDelete}
                        okText={t('yes')}
                        cancelText={t('no')}
                        icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                      >
                        {t('delete')}
                      </Popconfirm>
                    </Menu.Item>
                  </Menu>
              )}
              >
                <MoreOutlined />
              </Dropdown>
            )}
          </div>
          <div className="post-info">
            <div className="card-operations">
              <h3>
                <Button
                  size="large"
                  className="like-button"
                  onClick={post.likes.includes(account.id) ? onRemoveLike : onLike}
                  icon={
                  post.likes.includes(account.id)
                    ? <HeartFilled style={{ color: 'red' }} /> : <HeartOutlined />
                }
                />
                {`${post.likes?.length} likes` ?? 0}
              </h3>
              <span>
                {post.enableComments && (
                <Button
                  size="large"
                  onClick={() => {
                    setSearchParams({ ...QS, comments: 'true' })
                    queryClient.fetchQuery('comments')
                  }}
                  icon={<MessageOutlined />}
                  className="comment-button"
                />
                )}
                <Button
                  size="large"
                  onClick={post.archives.includes(account.id) ? onRemoveArchive : onArchive}
                  icon={post.archives.includes(account.id) ? <DownSquareFilled style={{ color: 'green' }} /> : <DownSquareOutlined />}
                  className="archive-button"
                />
              </span>
            </div>
            <h2 className="title">{post.title}</h2>
            {post.caption && (
            <div className="description-container">
              <span className="creator">
                {post.creator.user.username}
                :
                {' '}
              </span>
              <span className="description">
                {post.caption}
                {post?.caption?.length > 100 && (
                <Button type="link" className="more-button">more...</Button>
                )}
              </span>
            </div>
            )}
            <div className="tags">
              {post?.tags && post.tags.map((tag: any) => <Tag key={tag} className="tag">{tag.name}</Tag>)}
            </div>
            <span className="date">{new Date(post.createdAt * 1000).toUTCString()}</span>
            {post.updatedAt !== post.createdAt && (
            <EditOutlined />)}
          </div>
        </Card>
      </div>
      <AddPostModal post={post} />
    </Modal>
  )
}

export default PostModal
