/* eslint-disable no-nested-ternary */
import { Input } from 'antd'
import i18next from 'i18next'
import { useState } from 'react'
import './style.scss'

function FloatLabel({
  label,
  value,
  onChange,
  autoFocus = false,
  textarea = false,
  type = 'text',
  disabled = false,
}: any) {
  const [focus, setFocus] = useState(false)
  const labelClass = focus || (value && value.length) ? 'label label-float' : 'label'
  return (
    <div
      className={i18next.dir() === 'ltr' ? 'float-label-ltr' : 'float-label-rtl'}
      onBlur={() => setFocus(false)}
      onFocus={() => setFocus(true)}
    >
      {textarea ? (
        <Input.TextArea
          className="textarea"
          value={value}
          onChange={onChange}
          autoFocus={autoFocus}
        />
      )
        : type === 'password' ? (
          <Input.Password
            size="large"
            onChange={onChange}
            autoFocus={autoFocus}
            type="password"
          />
        ) : (
          <Input
            size="large"
            onChange={onChange}
            autoFocus={autoFocus}
            type={type}
            value={value}
            disabled={disabled}
          />
        )}
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label className={labelClass}>{label}</label>
    </div>
  )
}

export default FloatLabel
