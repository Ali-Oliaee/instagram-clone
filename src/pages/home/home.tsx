import { useQuery } from 'react-query'
import { Spin } from 'antd'
import { fetchPosts } from '../../utils/api'
import {
  AddPostModal, Header, PostsWrapper,
} from '../../components'
import './style.scss'

function HomePage() {
  const { data: posts, isLoading } = useQuery('posts', fetchPosts)

  return (
    <div className="home-page">
      <Header />
      {isLoading ? <Spin size="large" className="home-spin" />
        : <PostsWrapper posts={posts} />}
      <AddPostModal />
    </div>
  )
}

export default HomePage
