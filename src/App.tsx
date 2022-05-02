import {
  BrowserRouter as Router,
  Routes,
} from 'react-router-dom'
import MainRouter from './router'

function App() {
  return (
    <Router>
      <MainRouter />
    </Router>
  )
}

export default App
