/* eslint-disable prefer-arrow/prefer-arrow-functions */
import { PostCard } from '../post-card'
import './style.scss'

function PostsWrapper({ posts }: any) {
  console.log('posts', posts)
  return (
    <div className="posts-wrapper">
      {posts.map(({
        id, title, description, createdAt, creator, likes, tags, image,
      } : any) => (
        <PostCard
          key={id}
          title={title}
          description={description}
          creator={creator}
          tags={tags}
          likes={likes}
          image={image}
          createdAt={createdAt}
          id={id}
        />
      ))}
    </div>
  )
}
export default PostsWrapper
