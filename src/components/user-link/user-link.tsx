import { Avatar } from 'antd'
import { Link } from 'react-router-dom'
import { defaultImage } from '../../utils/constants'
import './style.scss'

function UserLink({
  photo, id, bio, user,
}:any) {
  return (
    <Link to={`/profile/${id}/`} className="user-link">
      <Avatar size="large" icon="user" src={photo} />
      <div className="user-link-info">
        <h3>{user.username}</h3>
        <p>{bio}</p>
      </div>
    </Link>
  )
}

export default UserLink
