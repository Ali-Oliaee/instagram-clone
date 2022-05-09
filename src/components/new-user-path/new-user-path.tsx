import { RightOutlined } from '@ant-design/icons'
import { Button, DatePicker, Steps } from 'antd'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import './style.scss'

function NewUserPath() {
  const { Step }  = Steps
  const {t} = useTranslation()
  const [step, setStep] = useState(0)

  function disabledDate(current: any) {
    // Can not select days before today and today
    return current 
  }

  return (
    <div className='new-user-path'>
      <Steps>
        <Step status={step ? 'finish' : 'process' as any} title={t('pick-birth-date')}  />
        <Step status={!step ? 'wait' : 'process' as any} title={t('choose-image')} />
      </Steps>
      <div className="content">
      {!step ? () => (
        <div className="birth-date">
          {/* <DatePicker status='error'  onChange={() => console.log('change')} picker="month" disabledDate={disabledDate} /> */}
        </div>
      ) : (
        <div className="image">
          <img src="https://picsum.photos/200/200" alt=""/>
        </div>
      )}
      </div>
      <div className="button-container">
        <Button type='primary' onClick={() => setStep(1)}>{t('next')}</Button>
        <Button type='link'>{t('skip')} <RightOutlined /></Button>
      </div>
    </div>
  )
}

export default NewUserPath