import { EditOutlined } from '@ant-design/icons'
import { Avatar, Button } from 'antd'
import { Helmet } from 'react-helmet'
import { useTranslation } from 'react-i18next'
import { useQuery } from 'react-query'
import { Link, useLocation } from 'react-router-dom'
import axios from '../../utils/axios'
import { PageWrapper, PostsWrapper } from '../../components'
import {
  getUserPosts, getAccountInformation, getFollowers, getFollowing,
} from '../../utils/api'
import './style.scss'

function profilePage() {
  const location = useLocation()
  const { t } = useTranslation()
  const currentUserId = JSON.parse(localStorage.getItem('user') || '{}').account.id
  const userId = +location.pathname.split('/')[2]
  const { data: user, isLoading } = useQuery('getCurrentUser', () => getAccountInformation(userId))
  const { data: userPosts } = useQuery('posts', () => getUserPosts(userId))
  const { data: followers } = useQuery('followers', () => getFollowers(userId))
  const { data: following } = useQuery('following', () => getFollowing(userId))

  const isFollowed = () => {
    if (followers?.find((follower:number) => follower === currentUserId)) {
      return true
    }
    return false
  }
  const follow = () => axios.post('/follows/following/create/', {
    account: user && user[0].id,
    following: currentUserId,
  })
  const unFollow = () => axios.post('/follows/following/delete/', {})

  return (
    <>
      <Helmet>
        <title>{t('profile')}</title>
      </Helmet>
      <PageWrapper isLoading={isLoading} className="profile-page">
        <div className="profile-info">
          <Avatar src={user && user[0].photo} size="large" className="avatar" />
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
              <span className="posts">
                {`${user && user[0].count.post} posts`}
              </span>
              <span className="follower">
                {`${user && user[0].count.follower} follower`}
              </span>
              <span className="following">
                {`${user && user[0].count.following} following`}
              </span>
            </div>
            <div className="bio">{user && user[0]?.bio}</div>
          </div>
        </div>
        <PostsWrapper posts={userPosts} />
      </PageWrapper>
    </>
  )
}

export default profilePage
