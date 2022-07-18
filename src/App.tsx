import { BrowserRouter as Router } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import { CurrentUserProvider } from './context'
import MainRouter from './router'

function App() {
  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <CurrentUserProvider>
          <MainRouter />
        </CurrentUserProvider>
      </Router>
    </QueryClientProvider>
  )
}

export default App
