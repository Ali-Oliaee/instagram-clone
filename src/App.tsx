import { BrowserRouter as Router } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import { CurrentUserData } from './context'
import MainRouter from './router'

function App() {
  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <CurrentUserData.Provider>
          <MainRouter />
        </CurrentUserData.Provider>
      </Router>
    </QueryClientProvider>
  )
}

export default App
