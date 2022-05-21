import { useEffect, useState } from 'react'
import qs from 'query-string'
import {
  AddPostModal, Header, PostsWrapper,
} from '../../components'
import axios from '../../utils/axios'
import './style.scss'

function HomePage() {
  const QS = qs.parse(window.location.search)
  // TODO: use media query
  const [posts, setPosts] = useState()
  const getPosts = () => {
    axios.get('/posts/list/').then((res: any) => setPosts(res))
  }
  useEffect(() => {
    getPosts()
  }, [])
  return (
    <div className="home-page">
      <Header />
      <PostsWrapper posts={posts} />
      <AddPostModal />
    </div>
  )
}

export default HomePage
