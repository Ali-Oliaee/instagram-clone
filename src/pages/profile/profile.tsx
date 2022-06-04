import { EditOutlined } from '@ant-design/icons'
import { Avatar, Button } from 'antd'
import { useTranslation } from 'react-i18next'
import { useQuery } from 'react-query'
import { Link, useLocation } from 'react-router-dom'
import { PageWrapper, PostsWrapper } from '../../components'
import { fetchUserPosts, getAccountInformation } from '../../utils/api'
import './style.scss'

function profilePage() {
  const location = useLocation()
  const { t } = useTranslation()
  const userId = +location.pathname.split('/')[2]
  const { data: currentUser, isLoading } = useQuery('getCurrentUser', getAccountInformation)
  const { data: userPosts } = useQuery('posts', fetchUserPosts)

  return (
    <PageWrapper isLoading={isLoading} className="profile-page">
      <div className="profile-info">
        <Avatar src={currentUser && currentUser[0].photo} size="large" className="avatar" />
        <div>
          <div className="profile-header">
            <span className="username">{currentUser && currentUser[0]?.user?.username}</span>
            {userId !== currentUser?.id ? (
              <Button type="primary" size="small" className="edit-button">
                {t('follow')}
              </Button>
            ) : (
              <Link to="/settings">
                <Button size="small" icon={<EditOutlined />} className="edit-button">Edit profile</Button>
              </Link>
            )}
          </div>
          <div className="report">
            <span className="posts">
              <strong>1200 </strong>
              posts
            </span>
            <span className="follower">
              <strong>125 </strong>
              followers
            </span>
            <span className="following">
              <strong>984 </strong>
              following
            </span>
          </div>
          <div className="bio">{currentUser && currentUser[0]?.bio}</div>
        </div>
      </div>
      <PostsWrapper editable posts={userPosts} />
    </PageWrapper>
  )
}

export default profilePage
