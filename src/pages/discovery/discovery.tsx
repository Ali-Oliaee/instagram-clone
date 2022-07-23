import { useQuery } from 'react-query'
import { PageWrapper, PostsWrapper } from '../../components'
import { getAllPosts } from '../../utils/api'

function DiscoveryPage() {
  const { data, isLoading } = useQuery('discoveryPosts', getAllPosts)

  return (
    <PageWrapper search isLoading={isLoading}>
      {!isLoading && <PostsWrapper posts={data} />}
    </PageWrapper>
  )
}

export default DiscoveryPage
