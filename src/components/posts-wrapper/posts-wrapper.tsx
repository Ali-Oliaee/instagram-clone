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
import { PostCard } from '../post-card'
import './style.scss'
import { getPost } from '../../utils/api'

interface Post {
  title: string
  description: string
  creator: string,
  tags: Array<string>,
  likes: Array<string>,
  image: string,
  createdAt?: string,
  id: string,
}

interface PostProp {
  posts: Array<Post>
}

function PostsWrapper({ posts }: any) {
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
    <div className={isMobile ? 'posts-wrapper-mobile' : 'posts-wrapper-desktop'}>
      {isMobile ? posts.map((post : any) => (
        <PostCard
          key={post.id}
          id={post.id}
          title={post.title}
          caption={post.caption}
          creator={post.account.user.username}
          tags={post.tags}
          likes={post.likes ?? []}
          image={post.file}
          createdAt={post.created_at}
          updatedAt={post.updated_at}
        />
      )) : posts.map((post : any) => (
        <Image
          key={post.id}
          id={post.id}
          src={post.file}
          alt={post.title}
          height={200}
          preview={false}
          onClick={() => setSearchParams({ postId: post.id })}
          className="post-image"
        />
      ))}
      <Modal
        visible={!!QS.postId}
        closable={false}
        onCancel={() => setSearchParams({})}
        footer={null}
        width="80%"
        centered
        className="post-card-modal"
      >
        <Skeleton loading={isLoading} avatar active>
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
                  <Card.Meta title={posts[1].creator} avatar={<Avatar src={require('../../assets/images/default-user.jpg')} />} />
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
                    <Button size="large" icon={posts ? <HeartFilled style={{ color: 'red' }} /> : <HeartOutlined />} onClick={likePost} className="like-button" />
                    {posts[1].likes?.length ?? 0}
                  </h3>
                  <span>
                    <Button size="large" icon={<MessageOutlined />} className="comment-button" />
                    <Button size="large" icon={archive ? <EnvironmentFilled /> : <EnvironmentOutlined />} onClick={archivePost} className="archive-button" />
                  </span>
                </div>
                <h2 className="title">{posts[1].title}</h2>
                {posts[1].description && (
                <div className="description-container">
                  <span className="creator">
                    {posts[1].creator}
                    :
                    {' '}
                  </span>
                  <span className="description">
                    {posts[1].description}
                    {posts[1].description.length > 100 && (
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
                  {posts[1].tags.length && posts[1].tags.map((tag: string) => <Tag key={tag} className="tag">{tag}</Tag>)}
                </div>
                <span className="date">{posts[1].createdAt}</span>
                {/* eslint-disable-next-line no-self-compare */}
                {posts[1].createdAt !== posts[1].createdAt && (
                <EditOutlined />)}
              </div>
            </Card>
          </div>
        </Skeleton>
      </Modal>
    </div>
  )
}
export default PostsWrapper
