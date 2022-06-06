import { Select } from 'antd'
import { useTranslation } from 'react-i18next'
import i18n from '../../utils/i18n'
import './style.scss'

function SwitchLanguage() {
  const { t } = useTranslation()
  const { Option } = Select
  const changeLanguage = (language : string) => i18n.changeLanguage(language)

  return (
    <div className="switch-language">
      <Select
        defaultValue="English"
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
