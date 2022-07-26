import { Modal } from 'antd'
import { useQuery } from 'react-query'
import qs from 'query-string'
import { useSearchParams } from 'react-router-dom'
import { getPost } from '../../utils/api'
import { UserLink } from '../user-link'
import './style.scss'

function LikedUsersList() {
  const QS = qs.parse(window.location.search)
  const [searchParams, setSearchParams] = useSearchParams()
  const { data: post, isLoading } = useQuery('post', () => getPost(Number(QS.post)))

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
      {/* {!isLoading && post.account_likes?.map(({
        photo, id, bio, user,
      }: any) => (
        <UserLink key={id} id={id} photo={photo} user={user} bio={bio} />
      ))} */}
    </Modal>
  )
}

export default LikedUsersList
