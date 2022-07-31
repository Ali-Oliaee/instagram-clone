import { Link, useSearchParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import qs from 'query-string'
import {
  Avatar, Card, Dropdown, Menu, Popconfirm,
} from 'antd'
import {
  DeleteOutlined, EditOutlined, MoreOutlined, QuestionCircleOutlined,
} from '@ant-design/icons'
import { defaultImage } from '../../utils/constants'
import usePost from '../../hooks/use-post'
import './style.scss'

function CardMeta({ creator = {}, postId }: any) {
  const { Meta } = Card
  const { t } = useTranslation()
  const { deletePost } = usePost()
  const QS = qs.parse(window.location.search)
  const currentUser = JSON.parse(localStorage.getItem('user') || '{}')
  const [searchParams, setSearchParams] = useSearchParams()

  const postAdmin = (
    <Dropdown
      trigger={['click']}
      overlay={(
        <Menu items={[{
          key: 'edit',
          icon: <EditOutlined />,
          label: t('edit'),
          onClick: () => setSearchParams({ ...QS, edit: postId }),
        }, {
          key: 'delete',
          icon: <DeleteOutlined />,
          label: (
            <Popconfirm
              title={t('delete-confirm')}
              onConfirm={() => deletePost(postId)}
              okText={t('yes')}
              cancelText={t('no')}
              icon={<QuestionCircleOutlined />}
            >
              {t('delete')}
            </Popconfirm>
          ),
          danger: true,
        }]}
        />
      )}
    >
      <MoreOutlined />
    </Dropdown>
  )

  return (
    <div className="post-card-meta">
      <Link to={`/profile/${creator?.id}`}>
        <Meta title={creator?.user?.username} avatar={<Avatar src={creator?.photo ?? defaultImage} />} />
      </Link>
      {currentUser.id === creator.id && postAdmin}
    </div>
  )
}

export default CardMeta
