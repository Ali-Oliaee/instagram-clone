import { PostCard } from '../post-card'
import { useMediaQuery } from 'usehooks-ts'
import { Image, Modal } from 'antd'
import qs from 'query-string'
import { useSearchParams } from 'react-router-dom'
import './style.scss'

interface Post {
  title: string
  description: string
  creator: string,
  tags: Array<string>,
  likes: Array<string>,
  image: string,
  createdAt?: string,
  id: string,
}

interface PostProp {
  posts: Array<Post>
}

function PostsWrapper({ posts }: PostProp) {
  const isMobile = useMediaQuery('(max-width: 500px)')
  const QS = qs.parse(window.location.search)
  const [params, setParams] = useSearchParams()

  return (
    <div className={isMobile ? "posts-wrapper-mobile" : "posts-wrapper-desktop"}>
      {isMobile ? posts.map((post : Post) => (
        <PostCard
          key={post.id}
          title={post.title}
          description={post.description}
          creator={post.creator}
          tags={post.tags}
          likes={post.likes}
          image={post.image}
          createdAt={post.createdAt ?? Date()}
          id={post.id}
        />  
      )
      ) : posts.map((post : Post) => (
            <Image
              key={post.id}
              src={post.image}
              alt={post.title}
              height={200}
              preview={{
                destroyOnClose: true,
                onVisibleChange: (visible: boolean) => {
                  if (visible) {
                    setParams({ postId: post.id })
                  } else {
                    setParams({})
                  }
                },
                modalRender: (event: any) => 
{       
  return(
                  <Modal width={500} closable visible={!!QS.postId}>
                   <Image 
                    src={post.image}
                  />
                  </Modal> )
}              }}
              />
          ))
      }
    </div>
  )
}
export default PostsWrapper
