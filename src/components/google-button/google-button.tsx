import { useState } from 'react'
import { Button, message } from 'antd'
import { useTranslation } from 'react-i18next'
import { GoogleLogin } from 'react-google-login'
import { GoogleOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import axios from '../../utils/axios'
import './style.scss'

function GoogleButton() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const onSuccess = (res: any) => {
    console.log(res)
    setLoading(true)
    axios.post('/users/login/', {
      googleId: res.googleId,
    })
      .then(({ data }) => {
        message.success(data.message)
        console.log(data)
        navigate('/')
      })
      .catch(({ response }) => message.error(response.data.message ?? response.data.email))
      .finally(() => setLoading(false))
  }

  const onFailure = (err: any) => {
    console.log('err', err)
  }

  return (
    <GoogleLogin
      clientId="1028978384739-u2f7gmkkcilpt78sl9qh4lhnnpk4hq4p.apps.googleusercontent.com"
      render={(renderProps) => (
        <Button loading={loading} disabled={renderProps.disabled} onClick={renderProps.onClick} icon={<GoogleOutlined />} size="large" block className="google-button">{t('google-signin')}</Button>
      )}
      cookiePolicy="single_host_origin"
      onSuccess={onSuccess}
      onFailure={onFailure}
    />
  )
}

export default GoogleButton
