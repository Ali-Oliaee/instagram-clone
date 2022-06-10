import { Helmet } from 'react-helmet'
import { useQuery } from 'react-query'
import { PageWrapper, PostsWrapper } from '../../components'
import { getArchivedPosts } from '../../utils/api'
import './style.scss'

function SavedPage() {
  const { data: archivePosts, isLoading } = useQuery('archivePosts', getArchivedPosts)

  return (
    <>
      <Helmet>
        <title>Saved</title>
      </Helmet>
      <PageWrapper className="saved-page" isLoading={isLoading}>
        <PostsWrapper posts={archivePosts?.map(({ post }: any) => post)} />
      </PageWrapper>
    </>
  )
}

export default SavedPage
