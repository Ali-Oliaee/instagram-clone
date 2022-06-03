import { useQuery } from 'react-query'
import { PageWrapper, PostsWrapper } from '../../components'
import { getArchivedPosts } from '../../utils/api'
import './style.scss'

function SavedPage() {
  const { data: archivePosts, isLoading } = useQuery('archivePosts', getArchivedPosts)

  return (
    <PageWrapper className="saved-page" isLoading={isLoading}>
      <PostsWrapper posts={archivePosts?.post} />
    </PageWrapper>
  )
}

export default SavedPage
