import {
  DownSquareFilled, DownSquareOutlined, HeartFilled, HeartOutlined, MessageOutlined,
} from '@ant-design/icons'
import { Button } from 'antd'
import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'react-router-dom'
import qs from 'query-string'
import usePost from '../../hooks/use-post'

function PostOptions({
  id, likes, enableComments, archives, refetch,
}: any) {
  const { t } = useTranslation()
  const currentUser = JSON.parse(localStorage.getItem('user') || '{}')
  const [searchParams, setSearchParams] = useSearchParams()
  const QS = qs.parse(window.location.search)
  const {
    likePost, unLikePost, archivePost, unArchivePost,
  } = usePost()

  return (
    <div className="post-card-options">
      <span>
        {likes?.includes(currentUser?.id) ? (
          <Button
            className="like-button"
            onClick={() => unLikePost(currentUser.id, id).then(refetch)}
            size="large"
            icon={<HeartFilled style={{ color: 'red' }} />}
          />
        ) : (
          <Button
            className="like-button"
            onClick={() => likePost(currentUser.id, id).then(refetch)}
            size="large"
            icon={<HeartOutlined />}
          />
        )}
        <Button type="ghost" className="likes-number-button" onClick={() => likes?.length && setSearchParams({ ...QS as any, likes: 'true' })}>
          {`${likes?.length} ${t('likes')}`}
        </Button>
      </span>
      <span>
        {enableComments && (
          <Button
            size="large"
            onClick={() => setSearchParams({ ...QS, comments: id })}
            icon={<MessageOutlined />}
            className="comment-button"
          />
        )}
        {archives?.includes(currentUser.id) ? (
          <Button
            size="large"
            onClick={() => unArchivePost(currentUser.id, id).then(refetch)}
            icon={<DownSquareFilled style={{ color: 'green' }} />}
            className="archive-button"
          />
        ) : (
          <Button
            size="large"
            onClick={() => archivePost(currentUser.id, id).then(refetch)}
            icon={<DownSquareOutlined />}
            className="archive-button"
          />
        )}
      </span>
    </div>
  )
}

export default PostOptions
