import { Avatar, Button } from 'antd'
import { ReactElement } from 'react'
import { useTranslation } from 'react-i18next'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import { UserSuggestionProps } from '../../interfaces'
import axios from '../../utils/axios'
import { defaultImage, currentUser as account } from '../../utils/constants'
import './style.scss'

function UserSuggestion(): ReactElement {
  const { data: users } = useQuery('suggestedUsers', () => axios.get('/account/suggestion-account/').then(({ data }) => data))
  const { t } = useTranslation()
  const followUser = (id: number) => axios.post('/follows/following/create/', {
    account: id,
    following: account.id,
  })

  return (
    <div className="user-suggestion">
      {users?.map(({
        id, photo, user, bio,
      }: UserSuggestionProps) => (
        <div className="user-card" key={id}>
          <Link to={`/profile/${id}`}>
            <Avatar size="large" src={photo ?? defaultImage} />
            <h3>{user.username}</h3>
            <p>{bio ?? t('no-bio')}</p>
          </Link>
          <Button type="primary" onClick={() => followUser(id)} block>{t('follow')}</Button>
        </div>
      ))}
    </div>
  )
}

export default UserSuggestion
