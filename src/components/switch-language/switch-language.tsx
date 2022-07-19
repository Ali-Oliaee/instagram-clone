import { message, Select } from 'antd'
import axios from '../../utils/axios'
import i18n from '../../utils/i18n'
import './style.scss'

function SwitchLanguage() {
  const { Option } = Select
  const currentUser = JSON.parse(localStorage.getItem('user') || '{}')
  const isLoggedIn = !!currentUser
  const changeLanguage = (language: string) => {
    if (isLoggedIn) {
      return axios.post('account/change-language/', {
        language,
      }).then(({ data }) => {
        message.success(data.message)
        i18n.changeLanguage(language)
      })
    }
    return i18n.changeLanguage(language)
  }

  return (
    <div className="switch-language">
      <Select
        defaultValue={i18n.language}
        onChange={changeLanguage}
        className="language-select"
        bordered={false}
      >
        <Option value="en">English</Option>
        <Option value="fa">Farsi</Option>
      </Select>
    </div>
  )
}

export default SwitchLanguage
