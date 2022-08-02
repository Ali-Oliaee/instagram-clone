import { useState } from 'react'
import { useQuery } from 'react-query'
import Fuse from 'fuse.js'
import { useTranslation } from 'react-i18next'
import { getFollowersPosts } from '../../utils/api'
import { PageWrapper, PostsWrapper, UserSuggestion } from '../../components'
import './style.scss'

function HomePage() {
  const [searchKey, setSearchKey] = useState('')
  const { data: posts, isLoading, refetch } = useQuery('postsWrapper', getFollowersPosts)
  const { t } = useTranslation('common')

  const fuse = new Fuse(posts ?? [], {
    keys: [
      'title', 'caption', 'tags', 'account.user.username',
    ],
  })

  const result = searchKey ? fuse.search(searchKey).map(({ item }) => item) : posts

  return (
    <PageWrapper isLoading={isLoading} setSearchKey={setSearchKey} search>
      {!isLoading && <PostsWrapper refetch={refetch} posts={result} />}
      <h3 className="user-suggestion-text">{t('home-page.no-following')}</h3>
      <UserSuggestion />
    </PageWrapper>
  )
}

export default HomePage
