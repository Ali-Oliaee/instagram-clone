import { Avatar, Button } from 'antd'
import { ReactElement } from 'react'
import { useTranslation } from 'react-i18next'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import axios from '../../utils/axios'
import { defaultImage } from '../../utils/constants'
import './style.scss'

function UserSuggestion(): ReactElement {
  const { data: users } = useQuery('suggestedUsers', () => axios.get('/account/suggestion-account/').then(({ data }) => data))
  const { t } = useTranslation()

  return (
    <div className="user-suggestion">
      {users?.map(({
        id, photo, user, bio,
      }: any) => (
        <div className="user-card" key={id}>
          <Link to={`/profile/${id}`}>
            <Avatar size="large" src={photo ?? defaultImage} />
            <h3>{user.username}</h3>
            <p>{bio ?? t('utils.without-bio')}</p>
          </Link>
          <Button type="primary" block>{t('utils.follow')}</Button>
        </div>
      ))}
    </div>
  )
}

export default UserSuggestion
