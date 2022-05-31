import { useState } from 'react'
import { useQuery } from 'react-query'
import { Spin } from 'antd'
import Fuse from 'fuse.js'
import { fetchUserPosts } from '../../utils/api'
import { Header, PostsWrapper } from '../../components'
import './style.scss'

function HomePage() {
  const [searchKey, setSearchKey] = useState('')
  const { data: posts, isLoading } = useQuery('posts', fetchUserPosts)

  const fuse = new Fuse(posts ?? [], {
    keys: [
      'title', 'caption', 'tags', 'account.user.username',
    ],
  })
  const result = searchKey ? fuse.search(searchKey).map((post: any) => post.item) : posts

  return (
    <div className="home-page">
      <Header setSearchKey={setSearchKey} />
      {isLoading ? <Spin size="large" className="home-spin" />
        : <PostsWrapper posts={result} />}
    </div>
  )
}

export default HomePage
