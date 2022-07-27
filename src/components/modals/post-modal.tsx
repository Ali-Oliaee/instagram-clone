import {
  Card, Image, Modal, Skeleton,
} from 'antd'
import { useSearchParams } from 'react-router-dom'
import qs from 'query-string'
import { useQuery } from 'react-query'
import PostContent from '../post/content'
import PostOptions from '../post/options'
import CardMeta from '../post/post-meta'
import { getPost } from '../../utils/api'

function PostModal() {
  const [searchParams, setSearchParams] = useSearchParams()
  const QS = qs.parse(window.location.search)
  const { data: post, isLoading } = useQuery('post', () => getPost(Number(QS.post)))

  return (
    <Modal
      visible={!!QS.post}
      onCancel={() => setSearchParams({})}
      closable={false}
      footer={null}
      centered
      className="post-card-modal"
      destroyOnClose
    >
      {isLoading ? <Skeleton active title paragraph /> : (
        <>
          <Image
            preview={false}
            src={post?.file}
            alt={post?.title}
            className="post-modal-image"
          />
          <div className="post-info">
            <Card className="post-card">
              <CardMeta creator={post?.account} postId={post?.id} />
              <div className="post-info">
                <PostOptions id={post?.id} likes={post?.account_likes} archives={post?.account_archives} enableComments={post?.comment_status} />
                <PostContent title={post?.title} caption={post?.caption} tags={post?.tags} createdAt={post?.created_at} updatedAt={post?.updated_at} username={post?.account.user.username} />
              </div>
            </Card>
          </div>
        </>
      )}
    </Modal>
  )
}

export default PostModal
