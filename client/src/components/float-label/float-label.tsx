/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable prefer-arrow/prefer-arrow-functions */
import { Input } from 'antd'
import i18next from 'i18next'
import { useState } from 'react'
import './style.scss'

function FloatLabel({
  label,
  value,
  onChange,
  autoFocus,
  type,
}: any) {
  const [focus, setFocus] = useState(false)
  const labelClass = focus || (value && value.length !== 0) ? 'label label-float' : 'label'
  return (
    <div
      className={i18next.dir() === 'ltr' ? 'float-label-ltr' : 'float-label-rtl'}
      onBlur={() => setFocus(false)}
      onFocus={() => setFocus(true)}
    >
      <Input
        size="middle"
        onChange={onChange}
        autoFocus={autoFocus}
        type={type}
      />
      <label className={labelClass}>{label}</label>
    </div>
  )
}

export default FloatLabel
