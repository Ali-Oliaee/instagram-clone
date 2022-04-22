import { StrictMode, Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './utils/i18n'
import './index.scss'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
)
root.render(
  <StrictMode>
    <Suspense fallback={<h3>loading</h3>}>
      <App />
    </Suspense>
  </StrictMode>,
)
