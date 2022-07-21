import { EditOutlined } from '@ant-design/icons'
import { Avatar, Button } from 'antd'
import { Helmet } from 'react-helmet'
import { useTranslation } from 'react-i18next'
import { useQuery } from 'react-query'
import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'
import { PageWrapper, PostsWrapper, UsersList } from '../../components'
import { defaultImage, currentUser } from '../../utils/constants'
import { getUserPosts, getAccountInformation } from '../../utils/api'
import './style.scss'

function profilePage() {
  const location = useLocation()
  const { t } = useTranslation()
  const [followerListVisible, setFollowerListVisible] = useState(false)
  const [followingListVisible, setFollowingListVisible] = useState(false)
  const currentUserId = currentUser.id
  const userId = +location.pathname.split('/')[2]
  const { data: user, isLoading, refetch } = useQuery('getCurrentUser', () => getAccountInformation(userId))
  const { data: userPosts } = useQuery('posts', () => getUserPosts(userId))

  return (
    <>
      <Helmet>
        <title>{t('profile')}</title>
      </Helmet>
      <PageWrapper isLoading={isLoading} className="profile-page">
        <div className="profile-info">
          <Avatar src={(user?.[0].photo) ?? defaultImage} size="large" className="avatar" />
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
              <Button onClick={() => setFollowerListVisible(true)} type="ghost" className="follower">
                {`${user?.[0]?.follower.length} ${t('followers')}`}
              </Button>
              <Button onClick={() => setFollowingListVisible(true)} type="ghost" className="following">
                {`${user?.[0]?.following.length} ${t('following')}`}
              </Button>
            </div>
            <div className="bio">{user?.[0]?.bio}</div>
          </div>
        </div>
        <PostsWrapper posts={userPosts} />
      </PageWrapper>
      <UsersList
        data={followerListVisible ? user?.[0]?.follower : user?.[0]?.following}
        visible={followerListVisible || followingListVisible}
        onCancel={() => (followerListVisible ? setFollowerListVisible(false) : setFollowingListVisible(false))}
        title={followerListVisible ? t('follower') : t('following')}
      />
    </>
  )
}

export default profilePage
