import { Input } from 'antd'
import i18next from 'i18next'
import { useState } from 'react'
import './style.scss'

interface InputProps{
  label: string,
  value: string,
  onChange?: any,
  autoFocus?: boolean,
  type?: 'text' | 'password' | 'email' | 'number' | 'tel' | 'url' | 'date' | 'datetime-local' | 'month' | 'time' | 'week',
}

function FloatLabel({
  label,
  value,
  onChange,
  autoFocus = false,
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
      {type === 'password' ? (
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
      <label className={labelClass}>{label}</label>
    </div>
  )
}

export default FloatLabel
