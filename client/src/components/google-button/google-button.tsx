/* eslint-disable prefer-arrow/prefer-arrow-functions */

import { Button } from 'antd'
import { useTranslation } from 'react-i18next'
import { GoogleLogin } from 'react-google-login'
import { GoogleOutlined } from '@ant-design/icons'
import './style.scss'

function GoogleButton() {
  const { t } = useTranslation()
  const onSuccess = (res: any) => {
    console.log('res', res)
  }
  const onFailure = (err: any) => {
    console.log('err', err)
  }
  return (
    <GoogleLogin
      clientId="1028978384739-u2f7gmkkcilpt78sl9qh4lhnnpk4hq4p.apps.googleusercontent.com"
      render={(renderProps) => (
        <Button disabled={renderProps.disabled} onClick={renderProps.onClick} icon={<GoogleOutlined />} size="large" block className="google-button">{t('google-signin')}</Button>
      )}
      cookiePolicy="single_host_origin"
      onSuccess={onSuccess}
      onFailure={onFailure}
    />
  )
}

export default GoogleButton
