import { Header, PostsWrapper } from '../../components'
import './style.scss'

function SavedPage() {
  return (
    <div className="saved-page">
      <Header />
      <PostsWrapper posts={[]} />
    </div>
  )
}

export default SavedPage
