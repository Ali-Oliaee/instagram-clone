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
      <span>
        {t('language')}
        {' '}
        :
        {' '}
      </span>
      <Select
        defaultValue="en"
        onChange={changeLanguage}
        className="language-select"
        suffixIcon={null}
      >
        <Option value="en">en</Option>
        <Option value="fa">fa</Option>
      </Select>
    </div>
  )
}

export default SwitchLanguage
