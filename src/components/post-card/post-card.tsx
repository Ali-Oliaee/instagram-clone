/* eslint-disable camelcase */
import { Card } from 'antd'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import CardMeta from '../post/post-meta'
import PostOptions from '../post/options'
import PostContent from '../post/content'
import './style.scss'

function PostCard({
  id,
  file,
  title,
  caption,
  account,
  tags,
  account_likes,
  account_archives,
  created_at,
  updated_at,
  comment_status,
  refetch,
}: any) {
  dayjs.extend(relativeTime)

  return (
    <Card className="post-card">
      <CardMeta creator={account} postId={id} />
      <img src={file} alt={title} />
      <div className="post-info">
        <PostOptions
          refetch={refetch}
          likes={account_likes}
          id={id}
          enableComments={comment_status}
          archives={account_archives}
        />
        <PostContent
          title={title}
          caption={caption}
          tags={tags}
          updatedAt={updated_at}
          createdAt={created_at}
          username={account.user.username}
        />
      </div>
    </Card>
  )
}

export default PostCard
