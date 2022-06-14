import { Avatar, Button } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'
import { UserSuggestionProps } from '../../interfaces'
import './style.scss'

function UserSuggestion(): React.ReactElement {
  const users = [] as any
  return (
    <div className="user-suggestion">
      {users && users.map(({
        id, avatar, name, bio,
      }: UserSuggestionProps) => (
        <div className="user-card">
          <Link to={`/profile/${id}`}>
            <Avatar size="large" src={avatar} />
            <h3>{name}</h3>
            <p>{bio}</p>
          </Link>
          <Button type="primary" block>Follow</Button>
        </div>
      ))}
    </div>
  )
}

export default UserSuggestion
