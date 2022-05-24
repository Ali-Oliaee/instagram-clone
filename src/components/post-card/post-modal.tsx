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
import axios from '../../utils/axios'
import { AddPostModal } from '../add-post-modal'
import './style.scss'
import { Comments } from '../comments'

function PostModal({ visible, post, setVisible }: any) {
  const [params, setSearchParams] = useSearchParams()
  const { t } = useTranslation()
  const [like, setLike] = useState(false)
  const [archive, setArchive] = useState(false)
  const likePost = () => (like ? setLike(false) : setLike(true))
  const archivePost = () => (archive ? setArchive(false) : setArchive(true))
  const QS = qs.parse(window.location.search)

  const deletePost = () => {
    axios.delete(`posts/list/${post.id}`).then((data) => {
      console.log('data', data)
      setVisible(false)
    })
  }

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
                    onConfirm={deletePost}
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
                <Button size="large" onClick={() => setSearchParams({ ...QS, comments: 'true' })} icon={<MessageOutlined />} className="comment-button" />
                <Button size="large" icon={archive ? <EnvironmentFilled /> : <EnvironmentOutlined />} onClick={archivePost} className="archive-button" />
              </span>
            </div>
            <h2 className="title">{post.title}</h2>
            {post.caption && (
            <div className="description-container">
              <span className="creator">
                {post.creator}
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
              {post?.tags && post.tags.map((tag: string) => <Tag key={tag} className="tag">{tag}</Tag>)}
            </div>
            <span className="date">{post.createdAt}</span>
            {post.createdAt !== post.editedAt && (
            <EditOutlined />)}
          </div>
        </Card>
      </div>
      <AddPostModal post={post} />
      <Comments comments={[]} />
    </Modal>
  )
}

export default PostModal
