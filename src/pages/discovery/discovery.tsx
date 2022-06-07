import { useQuery } from 'react-query'
import { PageWrapper, PostsWrapper } from '../../components'
import { getAllPosts } from '../../utils/api'

function DiscoveryPage() {
  const { data, isLoading } = useQuery('posts', getAllPosts)

  return (
    <PageWrapper search>
      <PostsWrapper posts={data} isLoading={isLoading} />
    </PageWrapper>
  )
}

export default DiscoveryPage
