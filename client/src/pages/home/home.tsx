/* eslint-disable prefer-arrow/prefer-arrow-functions */
import { Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import { Header } from '../../components'
import './style.scss'

function HomePage() {
  const navigate = useNavigate()
  return (
    <div>
      <Header />

      <Button onClick={() => {
        localStorage.clear()
        navigate('/')
        window.location.reload()
      }}
      >
        logout
      </Button>
    </div>
  )
}

export default HomePage
