import { StrictMode, Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { Spin } from 'antd'
import App from './App'
import './utils/i18n'
import './index.scss'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
)
root.render(
  <StrictMode>
    <Suspense fallback={<Spin />}>
      <App />
    </Suspense>
  </StrictMode>,
)
