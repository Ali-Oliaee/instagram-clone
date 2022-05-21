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
  const { data, isLoading } = useQuery('posts', fetchPosts)

  if (isLoading) return <Spin />
  return (
    <div className="home-page">
      <Header />
      {/* <PostsWrapper posts={[]} />
      <AddPostModal /> */}
    </div>
  )
}

export default HomePage
