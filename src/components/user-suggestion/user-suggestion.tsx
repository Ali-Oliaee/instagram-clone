/* eslint-disable import/no-unresolved */
import { Avatar, Button } from 'antd'
import React from 'react'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import { UserSuggestionProps } from '../../interfaces'
import axios from '../../utils/axios'
import { defaultImage } from '../../utils/constants'
import './style.scss'

function UserSuggestion(): React.ReactElement {
  const { data: users } = useQuery('suggestedUsers', () => axios.get('/account/suggestion-account/').then(({ data }) => data))
  const currentUser = JSON.parse(localStorage.getItem('user') || '{}')
  const followUser = (id:number) => axios.post('/follows/following/create/', {
    account: id,
    following: currentUser.account.id,
  })

  return (
    <div className="user-suggestion">
      {users && users.map(({
        id, photo, user, bio,
      }: UserSuggestionProps) => (
        <div className="user-card">
          <Link to={`/profile/${id}`}>
            <Avatar size="large" src={photo ?? defaultImage} />
            <h3>{user.username}</h3>
            <p>{bio ?? '(without bio)'}</p>
          </Link>
          <Button type="primary" onClick={() => followUser(id)} block>Follow</Button>
        </div>
      ))}
    </div>
  )
}

export default UserSuggestion
