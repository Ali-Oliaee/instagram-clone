import { Link, useSearchParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useQueryClient } from 'react-query'
import {
  Avatar, Card, Dropdown, Menu, message, Popconfirm,
} from 'antd'
import {
  DeleteOutlined, EditOutlined, MoreOutlined, QuestionCircleOutlined,
} from '@ant-design/icons'
import { currentUser, defaultImage } from '../../utils/constants'
import usePost from '../../hooks/use-post'
import './style.scss'

function CardMeta({ creator, postId }: any) {
  const { Meta } = Card
  const { t } = useTranslation()
  const { deletePost } = usePost()
  const [searchParams, setSearchParams] = useSearchParams()
  const queryClient = useQueryClient()

  const handleDelete = () => deletePost(postId).then(() => {
    message.success('Post deleted successfully!')
    queryClient.invalidateQueries('posts')
    setSearchParams({})
  })

  const postAdmin = (
    <Dropdown
      trigger={['click']}
      overlay={(
        <Menu>
          <Menu.Item key="edit" onClick={() => {}} icon={<EditOutlined />}>{t('edit')}</Menu.Item>
          <Popconfirm
            title={t('delete-confirm')}
            onConfirm={handleDelete}
            okText={t('yes')}
            cancelText={t('no')}
            icon={<QuestionCircleOutlined />}
          >
            <Menu.Item key="delete" danger icon={<DeleteOutlined />}>{t('delete')}</Menu.Item>
          </Popconfirm>
        </Menu>
      )}
    >
      <MoreOutlined />
    </Dropdown>
  )

  return (
    <div className="creator">
      <Link to={`/profile/${creator?.id}`}>
        <Meta title={creator?.user?.username} avatar={<Avatar src={creator?.photo ?? defaultImage} />} />
      </Link>
      {currentUser.id === creator.id && postAdmin}
    </div>
  )
}

export default CardMeta
