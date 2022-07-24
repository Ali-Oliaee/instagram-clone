import { EditOutlined } from '@ant-design/icons'
import { Avatar, Button, Empty } from 'antd'
import { useTranslation } from 'react-i18next'
import { useQuery } from 'react-query'
import { Link, matchRoutes, useLocation } from 'react-router-dom'
import { PageWrapper, PostsWrapper } from '../../components'
import { defaultImage, currentUser } from '../../utils/constants'
import { getUserPosts, getAccountInformation } from '../../utils/api'
import './style.scss'

function profilePage() {
  const { t } = useTranslation()
  const location = useLocation()
  const route = matchRoutes([{ path: '/profile/:id' }], location)
  const userId = Number(route?.[0].params.id)
  const currentUserId = currentUser.id
  const { data: user, isLoading } = useQuery('getCurrentUser', () => getAccountInformation(userId))
  const { data: userPosts, isLoading: postsLoading, refetch } = useQuery('profilePosts', () => getUserPosts(userId))

  return (
    <PageWrapper isLoading={isLoading} className="profile-page">
      <div className="profile-info">
        <Avatar src={user?.[0].photo ?? defaultImage} size="large" className="avatar" />
        <div>
          <div className="profile-header">
            <span className="username">{user?.[0]?.user?.username}</span>
            {userId !== currentUserId ? (
              <Button type="primary" size="small" className="edit-button">
                { t('unFollow') }
              </Button>
            ) : (
              <Link to="/settings">
                <Button size="small" icon={<EditOutlined />} className="edit-button">{t('edit profile')}</Button>
              </Link>
            )}
          </div>
          <div className="report">
            <Button type="ghost" className="posts">
              {`${user?.[0]?.post.length} ${t('posts')}`}
            </Button>
            <Button type="ghost" className="follower">
              {`${user?.[0]?.follower.length} ${t('followers')}`}
            </Button>
            <Button type="ghost" className="following">
              {`${user?.[0]?.following.length} ${t('following')}`}
            </Button>
          </div>
          <div className="bio">{user?.[0]?.bio}</div>
        </div>
      </div>
      {!postsLoading ? <PostsWrapper posts={userPosts as any} refetch={refetch} /> : <Empty description="No posts" />}
    </PageWrapper>
  )
}

export default profilePage
