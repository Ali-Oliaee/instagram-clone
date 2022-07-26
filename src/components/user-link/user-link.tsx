import { Avatar } from 'antd'
import { Link } from 'react-router-dom'
import { defaultImage } from '../../utils/constants'
import './style.scss'

function UserLink({
  photo, id, bio, user,
}:any) {
  const avatarSrc = photo ? `http://127.0.0.1:8000${photo}` : defaultImage
  return (
    <Link to={`/profile/${id}/`} className="user-link">
      <Avatar size="large" icon="user" src={avatarSrc} />
      <div className="user-link-info">
        <h3>{user.username}</h3>
        <p>{bio}</p>
      </div>
    </Link>
  )
}

export default UserLink
