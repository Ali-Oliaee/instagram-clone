import { useQuery } from 'react-query'
import { PageWrapper, PostsWrapper } from '../../components'
import { getArchivedPosts } from '../../utils/api'
import './style.scss'

function SavedPage() {
  const { data: archivePosts, isLoading, refetch } = useQuery('archivePosts', getArchivedPosts)

  return (
    <PageWrapper className="saved-page" isLoading={isLoading}>
      <PostsWrapper refetch={refetch} posts={archivePosts?.map(({ post } : any) => post)} />
    </PageWrapper>
  )
}

export default SavedPage
