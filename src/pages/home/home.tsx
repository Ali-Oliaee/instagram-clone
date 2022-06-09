import { useState } from 'react'
import { useQuery } from 'react-query'
import Fuse from 'fuse.js'
import { getFollowersPosts } from '../../utils/api'
import { PageWrapper, PostsWrapper } from '../../components'
import './style.scss'

function HomePage() {
  const [searchKey, setSearchKey] = useState('')
  const { data: posts, isLoading } = useQuery('posts', getFollowersPosts)

  const fuse = new Fuse(posts ?? [], {
    keys: [
      'title', 'caption', 'tags', 'account.user.username',
    ],
  })
  const result = searchKey ? fuse.search(searchKey).map((post: any) => post.item) : posts

  return (
    <PageWrapper isLoading={isLoading} setSearchKey={setSearchKey} search>
      <PostsWrapper posts={result} />
    </PageWrapper>
  )
}

export default HomePage
