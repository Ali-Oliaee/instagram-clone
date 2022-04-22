/* eslint-disable prefer-arrow/prefer-arrow-functions */

import { Button } from 'antd'
import { useTranslation } from 'react-i18next'
import { GoogleOutlined } from '@ant-design/icons'
import './style.scss'

function GoogleButton() {
  const { t } = useTranslation()
  return (
    <Button icon={<GoogleOutlined />} size="large" block className="google-button">{t('google-signin')}</Button>
  )
}

export default GoogleButton
