/* eslint-disable react/destructuring-assignment */
import { useMediaQuery } from 'usehooks-ts'
import {
  Avatar,
  Button,
  Card,
  Dropdown,
  Image,
  Input,
  Menu,
  Modal,
  Popconfirm,
  Skeleton,
  Tag,
} from 'antd'
import qs from 'query-string'
import { Link, useSearchParams } from 'react-router-dom'
import {
  DeleteOutlined,
  EditOutlined,
  EnvironmentFilled,
  EnvironmentOutlined,
  HeartFilled,
  HeartOutlined,
  MessageOutlined,
  MoreOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import { useQuery } from 'react-query'
import { Comments } from '../comments'
import { PostCard } from '.'
import './style.scss'
import { getPost } from '../../utils/api'

function PostModal(post:any) {
  const isMobile = useMediaQuery('(max-width: 500px)')
  const QS = qs.parse(window.location.search)
  const [params, setSearchParams] = useSearchParams()
  const { t } = useTranslation()
  const [like, setLike] = useState(false)
  const [archive, setArchive] = useState(false)
  const likePost = () => (like ? setLike(false) : setLike(true))
  const archivePost = () => (archive ? setArchive(false) : setArchive(true))

  const { data: modalPost, isLoading } = useQuery('getPost', () => getPost(1))
  return (
    <Modal
      visible={!!QS.postId}
      closable={false}
      onCancel={() => setSearchParams({})}
      footer={null}
      width="80%"
      centered
      className="post-card-modal"
    >
      <Image
        src={modalPost?.file}
        alt={modalPost?.title}
        height="100%"
        width="100%"
        preview={false}
      />
      <div className="post-info">
        <Card className="post-card">
          <div className="creator">
            <Link to={`/profile/${Math.floor(Math.random() * 80) + 1}`}>
              <Card.Meta title={post.creator} avatar={<Avatar src={require('../../assets/images/default-user.jpg')} />} />
            </Link>
            <Dropdown
              trigger={['click']}
              overlay={(
                <Menu>
                  <Menu.Item onClick={() => setSearchParams(`edit=${5}`)} icon={<EditOutlined />}>{t('edit')}</Menu.Item>
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
          <div className="post-info">
            <div className="card-operations">
              <h3>
                <Button size="large" icon={post ? <HeartFilled style={{ color: 'red' }} /> : <HeartOutlined />} onClick={likePost} className="like-button" />
                {post.likes?.length ?? 0}
              </h3>
              <span>
                <Button size="large" icon={<MessageOutlined />} className="comment-button" />
                <Button size="large" icon={archive ? <EnvironmentFilled /> : <EnvironmentOutlined />} onClick={archivePost} className="archive-button" />
              </span>
            </div>
            <h2 className="title">{post.title}</h2>
            {post.description && (
            <div className="description-container">
              <span className="creator">
                {post.creator}
                :
                {' '}
              </span>
              <span className="description">
                {post.description}
                {post.description.length > 100 && (
                <Button type="link" className="more-button">more...</Button>
                )}
              </span>
            </div>
            )}
            {/* <Comments comments={comments} /> */}
            {/* <Input.Group compact className="comment-input">
            <Input placeholder="write a comment..." />
            <Button type="ghost">send</Button>
          </Input.Group> */}
            <div className="tags">
              {post.tags.length && post.tags.map((tag: string) => <Tag key={tag} className="tag">{tag}</Tag>)}
            </div>
            <span className="date">{post.createdAt}</span>
            {/* eslint-disable-next-line no-self-compare */}
            {post.createdAt !== post.createdAt && (
            <EditOutlined />)}
          </div>
        </Card>
      </div>
    </Modal>
  )
}

export default PostModal
