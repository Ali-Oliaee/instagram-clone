import { EditOutlined } from '@ant-design/icons'
import { Avatar, Button } from 'antd'
import { Helmet } from 'react-helmet'
import { useTranslation } from 'react-i18next'
import { useQuery } from 'react-query'
import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'
import axios from '../../utils/axios'
import { PageWrapper, PostsWrapper, UsersList } from '../../components'
import { defaultImage } from '../../utils/constants'
import { getUserPosts, getAccountInformation } from '../../utils/api'
import './style.scss'

function profilePage() {
  const location = useLocation()
  const { t } = useTranslation()
  const [followerListVisible, setFollowerListVisible] = useState(false)
  const [followingListVisible, setFollowingListVisible] = useState(false)
  const currentUserId = JSON.parse(localStorage.getItem('user') || '{}').account.id
  const userId = +location.pathname.split('/')[2]
  const { data: user, isLoading, refetch } = useQuery('getCurrentUser', () => getAccountInformation(userId))
  const { data: userPosts } = useQuery('posts', () => getUserPosts(userId))

  const isFollowed = () => {
    if (user && user[0].following?.find((follower:number) => follower === currentUserId)) return true
    return false
  }
  const follow = () => axios.post('/follows/follower/create/', {
    account: user && user[0].id,
    follower: currentUserId,
  }).then(() => refetch())
  const unFollow = () => axios.delete(`/follows/follower/retrieve-destroy/${currentUserId}/`).then(() => refetch())

  return (
    <>
      <Helmet>
        <title>{t('profile')}</title>
      </Helmet>
      <PageWrapper isLoading={isLoading} className="profile-page">
        <div className="profile-info">
          <Avatar src={(user && user[0].photo) ?? defaultImage} size="large" className="avatar" />
          <div>
            <div className="profile-header">
              <span className="username">{user && user[0]?.user?.username}</span>
              {userId !== currentUserId ? (
                <Button type="primary" size="small" className="edit-button" onClick={isFollowed() ? unFollow : follow}>
                  {isFollowed() ? t('unFollow') : t('follow')}
                </Button>
              ) : (
                <Link to="/settings">
                  <Button size="small" icon={<EditOutlined />} className="edit-button">Edit profile</Button>
                </Link>
              )}
            </div>
            <div className="report">
              <Button type="ghost" className="posts">
                {`${user && user[0]?.post.length} posts`}
              </Button>
              <Button onClick={() => setFollowerListVisible(true)} type="ghost" className="follower">
                {`${user && user[0]?.follower.length} follower`}
              </Button>
              <Button onClick={() => setFollowingListVisible(true)} type="ghost" className="following">
                {`${user && user[0]?.following.length} following`}
              </Button>
            </div>
            <div className="bio">{user && user[0]?.bio}</div>
          </div>
        </div>
        <PostsWrapper posts={userPosts} />
      </PageWrapper>
      <UsersList
        data={followerListVisible ? user && user[0]?.follower : user && user[0]?.following}
        visible={followerListVisible || followingListVisible}
        onCancel={() => (followerListVisible ? setFollowerListVisible(false) : setFollowingListVisible(false))}
        title={followerListVisible ? t('follower') : t('following')}
      />
    </>
  )
}

export default profilePage
