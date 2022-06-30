import { Avatar, Skeleton } from 'antd'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import { getAccountInformation } from '../../utils/api'
import { defaultImage } from '../../utils/constants'
import './style.scss'

function UserLink({ id }: any) {
  const { data: user, isLoading } = useQuery('user', () => getAccountInformation(id))

  if (isLoading) return <Skeleton avatar title active />

  return (
    <Link to={`/profile/${id}/`} className="user-link">
      <Avatar size="large" icon="user" src={(user?.[0].photo) ?? defaultImage} />
      <div className="user-link-info">
        <h3>{user?.[0].user.username}</h3>
        <p>{user?.[0].bio}</p>
      </div>
    </Link>
  )
}

export default UserLink
