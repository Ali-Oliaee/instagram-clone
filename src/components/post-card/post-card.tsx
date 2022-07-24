import { Card, Image } from 'antd'
import { useSearchParams } from 'react-router-dom'
import { useMediaQuery } from 'usehooks-ts'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import CardMeta from '../post/post-meta'
import PostOptions from '../post/options'
import PostContent from '../post/content'
import './style.scss'

function PostCard({
  id,
  file: image,
  title,
  caption,
  account: creator,
  tags,
  account_likes: likes,
  account_archives: archives,
  created_at: createdAt,
  updated_at: updatedAt,
  comment_status: enableComments,
  refetch,
}: any) {
  const isMobile = useMediaQuery('(max-width: 500px)')
  const [searchParams, setSearchParams] = useSearchParams()
  dayjs.extend(relativeTime)

  return (
    <div>
      {isMobile ? (
        <Card className="post-card">
          <CardMeta creator={creator} postId={id} />
          <img src={image} alt={title} />
          <div className="post-info">
            <PostOptions likes={likes} id={id} enableComments={enableComments} archives={archives} />
            <PostContent title={title} caption={caption} tags={tags} updatedAt={updatedAt} createdAt={createdAt} username={creator.user.username} />
          </div>
        </Card>
      ) : (
        <Image
          src={image}
          alt={title}
          className="post-image"
          height={150}
          width={200}
          preview={false}
          onClick={() => setSearchParams(`post=${id}`)}
        />
      )}
    </div>
  )
}

export default PostCard
