import { useState } from 'react'
import { useQuery } from 'react-query'
import { Spin } from 'antd'
import Fuse from 'fuse.js'
import { fetchPosts } from '../../utils/api'
import {
  AddPostModal, Header, PostsWrapper,
} from '../../components'
import './style.scss'

function HomePage() {
  const [searchKey, setSearchKey] = useState('')
  const { data: posts, isLoading } = useQuery('posts', fetchPosts)

  const fuse = new Fuse(posts ?? [], {
    keys: [
      'title', 'caption', 'tags', 'account.user.username',
    ],
  })
  const result = searchKey ? fuse.search(searchKey).map((post: any) => {
    /* eslint-disable no-param-reassign */
    delete post.refIndex
    return post.item
  }) : posts

  return (
    <div className="home-page">
      <Header setSearchKey={setSearchKey} />
      {isLoading ? <Spin size="large" className="home-spin" />
        : <PostsWrapper posts={result} />}
      <AddPostModal />
    </div>
  )
}

export default HomePage
