import { Modal } from 'antd'
import { useQuery } from 'react-query'
import qs from 'query-string'
import { useSearchParams } from 'react-router-dom'
import { getPostLikes } from '../../utils/api'
import { UserLink } from '../user-link'
import './style.scss'

function LikedUsersList() {
  const QS = qs.parse(window.location.search)
  const [searchParams, setSearchParams] = useSearchParams()
  const { data: likes, isLoading } = useQuery('postLikes', () => getPostLikes(Number(QS.likes)))

  return (
    <Modal
      visible={!!QS.likes}
      destroyOnClose
      onCancel={() => {
        delete QS.likes
        setSearchParams(QS as any)
      }}
      footer={null}
      title="likes"
      centered
    >
      {!isLoading && likes?.map(({ account }: any) => (
        <UserLink key={account.id} id={account.id} photo={account.photo} user={account.user.username} bio={account.bio} />
      ))}
    </Modal>
  )
}

export default LikedUsersList
