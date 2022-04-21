/* eslint-disable prefer-arrow/prefer-arrow-functions */
import { useTranslation } from 'react-i18next'
import { Button } from 'antd'
import './style.scss'

function SignupPage() {
  const { t } = useTranslation()
  const handleSubmit = (values : any) => {
    console.log('user', values)
  }
  return (
    <div className="signup-page">
      <div className="form-container">
        <img src="../../assets/images/logo.svg" alt="logo" width={220} height={50} />
        <Button type="primary">submit</Button>
      </div>
    </div>
  )
}

export default SignupPage
