import { EditOutlined } from '@ant-design/icons'
import { Avatar, Button, Empty } from 'antd'
import { useTranslation } from 'react-i18next'
import { useQuery } from 'react-query'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import qs from 'query-string'
import {
  PageWrapper, PostsWrapper, FollowersList, FollowingList,
} from '../../components'
import { defaultImage } from '../../utils/constants'
import { getUserPosts, getAccountInformation } from '../../utils/api'
import useUser from '../../hooks/use-user'
import './style.scss'

function profilePage() {
  const { t } = useTranslation()
  const { id } = useParams()
  const currentUserId = JSON.parse(localStorage.getItem('user') || '{}').id
  const [searchParams, setSearchParams] = useSearchParams()
  const { data: user, isLoading } = useQuery('getCurrentUser', () => getAccountInformation(Number(id)))
  const { data: userPosts, isLoading: postsLoading, refetch } = useQuery('postsWrapper', () => getUserPosts(Number(id)))
  const QS = qs.parse(window.location.search)
  const { followingUser } = useUser()

  function ProfileButton() {
    if (user?.[0].follower_list.includes(currentUserId)) {
      return (
        <Button type="primary" size="small" className="edit-button">
          { t('utils.followBack') }
        </Button>
      )
    }
    if (user?.[0].following_list.includes(currentUserId)) {
      return (
        <Button type="primary" size="small" className="edit-button">
          { t('utils.unFollow') }
        </Button>
      )
    }
    return (
      <Button type="primary" onClick={() => followingUser(id)} size="small" className="edit-button">
        { t('utils.follow') }
      </Button>
    )
  }

  return (
    <PageWrapper isLoading={isLoading} className="profile-page">
      <div className="profile-info">
        <Avatar src={user?.[0]?.photo ?? defaultImage} size="large" className="avatar" />
        <div>
          <div className="profile-header">
            <span className="username">{user?.[0]?.user?.username}</span>
            {Number(id) !== currentUserId ? <ProfileButton /> : (
              <Link to="/settings">
                <Button size="small" icon={<EditOutlined />} className="edit-button">{t('utils.edit-profile')}</Button>
              </Link>
            )}
          </div>
          <div className="report">
            <Button type="ghost" className="posts">
              {`${user?.[0]?.post_count} ${t('utils.posts')}`}
            </Button>
            <Button type="ghost" className="follower" onClick={() => setSearchParams(`follower=${id}`)}>
              {`${user?.[0]?.follower_count} ${t('utils.followers')}`}
            </Button>
            <Button type="ghost" className="following" onClick={() => setSearchParams(`following=${id}`)}>
              {`${user?.[0]?.following_count} ${t('utils.following')}`}
            </Button>
          </div>
          <div className="bio">{user?.[0]?.bio}</div>
        </div>
      </div>
      {!postsLoading ? <PostsWrapper posts={userPosts as any} refetch={refetch} /> : <Empty description="No posts" />}
      {QS.follower && <FollowersList />}
      {QS.following && <FollowingList />}
    </PageWrapper>
  )
}

export default profilePage
