import {
  Card, Image, Modal, Skeleton, Col, Row,
} from 'antd'
import { useSearchParams } from 'react-router-dom'
import qs from 'query-string'
import { useQuery } from 'react-query'
import { useMediaQuery } from 'usehooks-ts'
import PostContent from '../post/content'
import PostOptions from '../post/options'
import CardMeta from '../post/post-meta'
import { getPost } from '../../utils/api'
import './style.scss'

function PostModal() {
  const [searchParams, setSearchParams] = useSearchParams()
  const isMobile = useMediaQuery('(max-width: 500px)')
  const QS = qs.parse(window.location.search)
  const { data: post, isLoading } = useQuery('post', () => getPost(Number(QS.post)))

  return (
    <Modal
      visible={!!QS.post && !isMobile}
      onCancel={() => setSearchParams({})}
      closable={false}
      footer={null}
      centered
      className="post-card-modal"
      destroyOnClose
    >
      {isLoading ? <Skeleton active title paragraph /> : (
        <Row>
          <Col span={12}>
            <Image
              preview={false}
              src={post?.file}
              alt={post?.title}
              className="post-modal-image"
            />
          </Col>
          <Col span={12}>
            <div className="post-info">
              <Card className="post-card">
                <CardMeta creator={post?.account} postId={post?.id} />
                <div className="post-info">
                  <PostOptions id={post?.id} likes={post?.account_likes} archives={post?.account_archives} enableComments={post?.comment_status} />
                  <PostContent title={post?.title} caption={post?.caption} tags={post?.tags} createdAt={post?.created_at} updatedAt={post?.updated_at} username={post?.account.user.username} />
                </div>
              </Card>
            </div>
          </Col>
        </Row>
      )}
    </Modal>
  )
}

export default PostModal
