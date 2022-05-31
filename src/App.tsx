import { BrowserRouter as Router } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import { AddPostModal } from './components'
import MainRouter from './router'

function App() {
  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <MainRouter />
        <AddPostModal />
      </Router>
    </QueryClientProvider>
  )
}

export default App
