import { Modal } from 'antd'
import { useQuery } from 'react-query'
import qs from 'query-string'
import { useSearchParams } from 'react-router-dom'
import { getFollowers } from '../../utils/api'
import { UserLink } from '../user-link'
import './style.scss'

function FollowersList() {
  const QS = qs.parse(window.location.search)
  const [searchParams, setSearchParams] = useSearchParams()
  const { data: followers, isLoading } = useQuery('followersList', () => getFollowers(Number(QS.follower)))

  return (
    <Modal
      visible={!!QS.follower}
      destroyOnClose
      onCancel={() => {
        delete QS.follower
        setSearchParams(QS as any)
      }}
      footer={null}
      title="Followers"
      centered
    >
      {!isLoading && followers?.map(({ account }: any) => (
        <UserLink key={account.id} id={account.id} photo={account.photo} user={account.user.username} bio={account.bio} />
      ))}
    </Modal>
  )
}

export default FollowersList
