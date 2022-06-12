import { Avatar, Skeleton } from 'antd'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import { getAccountInformation } from '../../utils/api'
import './style.scss'

function UserLink({ id }: any) {
  const { data: user, isLoading } = useQuery('user', () => getAccountInformation(id))

  if (isLoading) return <Skeleton avatar active />

  return (
    <Link to={`/profile/${id}/`} className="user-link">
      <Avatar size="large" icon="user" src={user && user[0].photo} />
      <div className="user-link-info">
        <h3>{user && user[0].user.username}</h3>
        <p>{user && user[0].bio}</p>
      </div>
    </Link>
  )
}

export default UserLink
