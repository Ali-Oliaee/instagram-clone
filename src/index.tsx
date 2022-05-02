import { StrictMode, Suspense } from 'react'
import ReactDOM from 'react-dom'
import { Spin } from 'antd'
import App from './App'
import './utils/i18n'
import './index.scss'

ReactDOM.render(
  <StrictMode>
    <Suspense fallback={<Spin />}>
      <App />
    </Suspense>
  </StrictMode>,
  document.getElementById('root')
)
