import { EditOutlined } from '@ant-design/icons'
import { Avatar, Button, Spin } from 'antd'
import { useTranslation } from 'react-i18next'
import { useQuery } from 'react-query'
import { Link, useLocation } from 'react-router-dom'
import { Header, PostsWrapper } from '../../components'
import { getAccountInformation } from '../../utils/api'
import './style.scss'

function profilePage() {
  const location = useLocation()
  const { t } = useTranslation()
  const userId = +location.pathname.split('/')[2]
  const { data: currentUser, isLoading } = useQuery('getCurrentUser', getAccountInformation)

  if (isLoading) return <Spin size="large" className="settings-spin" />

  return (
    <div className="profile-page">
      <Header />
      <div className="profile-info">
        <Avatar src={require('../../assets/images/default-user.jpg')} size="large" className="avatar" />
        <div>
          <div className="profile-header">
            <span className="username">{currentUser[0]?.user?.username}</span>
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
          <div className="bio">{currentUser[0]?.user?.bio}</div>
        </div>
      </div>
      <PostsWrapper posts={[]} />
    </div>
  )
}

export default profilePage
