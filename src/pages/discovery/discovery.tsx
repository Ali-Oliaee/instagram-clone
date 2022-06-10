import { useQuery } from 'react-query'
import { Helmet } from 'react-helmet'
import { PageWrapper, PostsWrapper } from '../../components'
import { getAllPosts } from '../../utils/api'

function DiscoveryPage() {
  const { data, isLoading } = useQuery('posts', getAllPosts)

  return (
    <>
      <Helmet>
        <title>Discovery</title>
      </Helmet>
      <PageWrapper search>
        <PostsWrapper posts={data} isLoading={isLoading} />
      </PageWrapper>
    </>
  )
}

export default DiscoveryPage
