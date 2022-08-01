import { Modal } from 'antd'
import { useQuery } from 'react-query'
import qs from 'query-string'
import { useSearchParams } from 'react-router-dom'
import { getFollowing } from '../../utils/api'
import { UserLink } from '../user-link'
import './style.scss'

function FollowingList() {
  const QS = qs.parse(window.location.search)
  const [searchParams, setSearchParams] = useSearchParams()
  const { data: followings, isLoading } = useQuery('followingList', () => getFollowing(Number(QS.following)))

  return (
    <Modal
      visible={!!QS.following}
      destroyOnClose
      onCancel={() => {
        delete QS.following
        setSearchParams(QS as any)
      }}
      footer={null}
      title="Followings"
      centered
    >
      {!isLoading && followings?.map(({ account }: any) => (
        <UserLink key={account.id} id={account.id} photo={account.photo} user={account.user.username} bio={account.bio} />
      ))}
    </Modal>
  )
}

export default FollowingList
