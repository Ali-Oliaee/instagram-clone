import { Spin } from 'antd'
import { useQuery } from 'react-query'
import { Header, PostsWrapper } from '../../components'
import { getArchivedPosts } from '../../utils/api'
import './style.scss'

function SavedPage() {
  const { data: archivePosts, isLoading } = useQuery('archivePosts', getArchivedPosts)

  return (
    <div className="saved-page">
      <Header />
      {isLoading ? <Spin /> : <PostsWrapper posts={archivePosts?.post} />}
    </div>
  )
}

export default SavedPage
