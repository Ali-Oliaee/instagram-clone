import { Helmet } from 'react-helmet'
import { useQuery } from 'react-query'
import { PageWrapper, PostsWrapper } from '../../components'
import { Post } from '../../interfaces'
import { getArchivedPosts } from '../../utils/api'
import './style.scss'

function SavedPage() {
  const { data: archivePosts, isLoading } = useQuery('posts', getArchivedPosts)

  return (
    <>
      <Helmet>
        <title>Saved</title>
      </Helmet>
      <PageWrapper className="saved-page" isLoading={isLoading}>
        <PostsWrapper posts={archivePosts?.map((post : Post) => post)} />
      </PageWrapper>
    </>
  )
}

export default SavedPage
