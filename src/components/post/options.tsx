import {
  DownSquareFilled, DownSquareOutlined, HeartFilled, HeartOutlined, MessageOutlined,
} from '@ant-design/icons'
import { Button } from 'antd'
import { useTranslation } from 'react-i18next'
import qs from 'query-string'
import { useSearchParams } from 'react-router-dom'
import usePost from '../../hooks/use-post'
import { currentUser } from '../../utils/constants'
import { UsersList } from '../modals'

function PostOptions({
  id, likes = [1], enableComments, archives,
}: any) {
  const { t } = useTranslation()
  const QS = qs.parse(window.location.search)
  const [searchParams, setSearchParams] = useSearchParams()
  const {
    likePost, unLikePost, archivePost, unArchivePost,
  } = usePost()

  return (
    <div className="card-operations">
      <span>
        {likes?.includes(currentUser?.id) ? (
          <Button
            className="like-button"
            onClick={() => unLikePost(currentUser.id, id)}
            size="large"
            icon={<HeartFilled style={{ color: 'red' }} />}
          />
        ) : (
          <Button
            className="like-button"
            onClick={() => likePost(currentUser.id, id)}
            size="large"
            icon={<HeartOutlined />}
          />
        )}
        <Button type="ghost" className="likes-number-button" onClick={() => likes?.length && setSearchParams('likes=true')}>
          {`${likes?.length} ${t('likes')}`}
        </Button>
        <UsersList
          data={likes}
          visible={!!QS.likes}
          title="Likes"
          onCancel={() => {
            delete QS.likes
            setSearchParams(QS as any)
          }}
        />
      </span>
      <span>
        {enableComments && (
          <Button
            size="large"
            onClick={() => setSearchParams(`comments=true&id=${id}`)}
            icon={<MessageOutlined />}
            className="comment-button"
          />
        )}
        {archives?.includes(currentUser.id) ? (
          <Button
            size="large"
            onClick={() => unArchivePost(currentUser.id, id)}
            icon={<DownSquareFilled style={{ color: 'green' }} />}
            className="archive-button"
          />
        ) : (
          <Button
            size="large"
            onClick={() => archivePost(currentUser.id, id)}
            icon={<DownSquareOutlined />}
            className="archive-button"
          />
        )}
      </span>
    </div>
  )
}

export default PostOptions
