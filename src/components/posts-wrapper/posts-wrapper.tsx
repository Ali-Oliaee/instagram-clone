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
import { Comments } from '../comments'
import { PostCard } from '../post-card'
import './style.scss'

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

function PostsWrapper({ posts }: PostProp) {
  const isMobile = useMediaQuery('(max-width: 500px)')
  const QS = qs.parse(window.location.search)
  const [params, setSearchParams] = useSearchParams()
  const { t } = useTranslation()
  const [like, setLike] = useState(false)
  const [archive, setArchive] = useState(false)
  const likePost = () => (like ? setLike(false) : setLike(true))
  const archivePost = () => (archive ? setArchive(false) : setArchive(true))

  return (
    <div className={isMobile ? 'posts-wrapper-mobile' : 'posts-wrapper-desktop'}>
      {isMobile ? posts.map((post : Post) => (
        <PostCard
          key={post.id}
          title={post.title}
          description={post.description}
          creator={post.creator}
          tags={post.tags}
          likes={post.likes}
          image={post.image}
          createdAt={post.createdAt ?? Date()}
          id={post.id}
        />
      )) : posts.map((post : Post) => (
        <Image
          key={post.id}
          src={post.image}
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
        {/* <Skeleton loading={false} avatar active/> */}
        <Image
          src={posts.find((post) => post.id === QS.postId)?.image}
          alt={posts.find((post) => post.id === QS.postId)?.title}
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
                  <Button size="large" icon={posts[1].likes ? <HeartFilled style={{ color: 'red' }} /> : <HeartOutlined />} onClick={likePost} className="like-button" />
                  {posts[1].likes.length}
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
              <Comments comments={comments} />
              <Input.Group compact className="comment-input">
                <Input placeholder="write a comment..." />
                <Button type="ghost">send</Button>
              </Input.Group>
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
      </Modal>
    </div>
  )
}
export default PostsWrapper
