import { useState } from 'react'
import { useQuery } from 'react-query'
import { useTranslation } from 'react-i18next'
import Fuse from 'fuse.js'
import { PageWrapper, PostsWrapper } from '../../components'
import { getAllPosts } from '../../utils/api'

function DiscoveryPage() {
  const { t } = useTranslation()
  const [searchKey, setSearchKey] = useState('')
  const { data, isLoading, refetch } = useQuery('postsWrapper', getAllPosts)

  const fuse = new Fuse(data ?? [], {
    keys: [
      'title', 'caption', 'tags', 'account.user.username',
    ],
  })
  const result = searchKey ? fuse.search(searchKey).map(({ item }) => item) : data

  return (
    <PageWrapper setSearchKey={setSearchKey} search isLoading={isLoading} title={t('utils.discovery')}>
      {!isLoading && <PostsWrapper refetch={refetch} posts={result} />}
    </PageWrapper>
  )
}

export default DiscoveryPage
