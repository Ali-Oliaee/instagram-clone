/* eslint-disable react/require-default-props */
/* eslint-disable no-nested-ternary */
import { Input } from 'antd'
import i18next from 'i18next'
import { useState } from 'react'
import './style.scss'

interface InputProps{
  label: string,
  value: string,
  onChange?: any,
  autoFocus?: boolean,
  textarea?: boolean,
  type?: 'text' | 'password' | 'email' | 'number' | 'tel' | 'url' | 'date' | 'datetime-local' | 'month' | 'time' | 'week',
}

function FloatLabel({
  label,
  value,
  onChange,
  autoFocus = false,
  textarea = false,
  type = 'text',
}: InputProps) {
  const [focus, setFocus] = useState(false)
  const labelClass = focus || (value && value.length !== 0) ? 'label label-float' : 'label'
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
            size="middle"
            onChange={onChange}
            autoFocus={autoFocus as any}
            type="password"
          />
        ) : (
          <Input
            size="middle"
            onChange={onChange}
            autoFocus={autoFocus as any}
            type={type}
          />
        )}
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label className={labelClass}>{label}</label>
    </div>
  )
}

export default FloatLabel
