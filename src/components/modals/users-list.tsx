import { Modal } from 'antd'
import { UserLink } from '../user-link'
import './style.scss'

function UsersList({
  data, visible, title, onCancel,
}: any) {
  return (
    <Modal
      visible={visible}
      destroyOnClose
      onCancel={onCancel}
      footer={null}
      title={title}
      centered
    >
      {data?.map((id: number) => (
        <UserLink key={id} id={id} />
      ))}
    </Modal>
  )
}

export default UsersList
