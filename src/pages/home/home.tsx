import qs from 'query-string'
import { useQuery } from 'react-query'
import { Spin } from 'antd'
import {
  AddPostModal, Header, PostsWrapper,
} from '../../components'
import './style.scss'
import { fetchPosts } from '../../utils/api'

function HomePage() {
  const QS = qs.parse(window.location.search)
  const { data: posts, isLoading } = useQuery('posts', fetchPosts)

  return (
    <div className="home-page">
      <Header />
      {isLoading ? <Spin size="large" />
        : <PostsWrapper posts={posts} />}
      {/* <AddPostModal /> */}
    </div>
  )
}

export default HomePage
