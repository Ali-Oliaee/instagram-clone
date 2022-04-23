/* eslint-disable prefer-arrow/prefer-arrow-functions */
import { Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import './style.scss'

function HomePage() {
  const navigate = useNavigate()
  return (
    <div>
      HomePage

      <Button onClick={() => {
        localStorage.clear()
        navigate('/')
      }}
      >
        logout
      </Button>
    </div>
  )
}

export default HomePage
