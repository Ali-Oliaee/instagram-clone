import { Modal } from 'antd'
import { useQuery } from 'react-query'
import { getUsersByList } from '../../utils/api'
import { UserLink } from '../user-link'
import './style.scss'

function UsersList({
  data: users = [], visible, title, onCancel,
}: any) {
  const { data, isLoading } = useQuery('posts', () => getUsersByList(users))

  return (
    <Modal
      visible={visible}
      destroyOnClose
      onCancel={onCancel}
      footer={null}
      title={title}
      centered
    >
      {!isLoading && data?.map(({
        photo, id, bio, user,
      }: any) => (
        <UserLink key={id} id={id} photo={photo} user={user} bio={bio} />
      ))}
    </Modal>
  )
}

export default UsersList
