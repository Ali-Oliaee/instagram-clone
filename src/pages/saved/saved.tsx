import React from 'react'
import { Helmet } from 'react-helmet'
import { useTranslation } from 'react-i18next'
import { useQuery } from 'react-query'
import { PageWrapper, PostsWrapper } from '../../components'
import { Post } from '../../interfaces'
import { getArchivedPosts } from '../../utils/api'
import './style.scss'

function SavedPage(): React.ReactElement {
  const { data: archivePosts, isLoading } = useQuery('posts', getArchivedPosts)
  const { t } = useTranslation()

  return (
    <>
      <Helmet>
        <title>{t('saved')}</title>
      </Helmet>
      <PageWrapper className="saved-page" isLoading={isLoading}>
        <PostsWrapper posts={archivePosts?.map(({ post } : any) => post)} />
      </PageWrapper>
    </>
  )
}

export default SavedPage
