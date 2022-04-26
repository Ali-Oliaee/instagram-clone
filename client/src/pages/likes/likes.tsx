/* eslint-disable prefer-arrow/prefer-arrow-functions */

import { Header, PostsWrapper } from '../../components'

const samplePosts = [{
  id: '1',
  title: 'Sample Post',
  description: 'Sample Describe lorem8  ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  creator: 'ali',
  tags: ['tag1', 'tag1', 'tag1', 'tag1', 'tag1', 'tag1', 'tag1', 'tag1'],
  likes: ['mmd', 'jafar'],
  image: 'https://picsum.photos/200/300',
  createdAt: '2020-01-01',
}]

function LikesPage() {
  return (
    <div className="likes-page">
      <Header />
      <PostsWrapper posts={samplePosts} />
    </div>
  )
}

export default LikesPage
