/* eslint-disable max-len */
import { RightOutlined } from '@ant-design/icons'
import {
  Avatar,
  Button, DatePicker, Steps, Upload,
} from 'antd'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import './style.scss'

function NewUserPath() {
  const { Step } = Steps
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [step, setStep] = useState(0)

  return (
    <div className="new-user-path">
      <section>
        <Steps>
          <Step status={step ? 'finish' : 'process' as any} title={t('pick-birth-date')} />
          <Step status={!step ? 'wait' : 'process' as any} title={t('choose-image')} />
        </Steps>
        <div className="content">
          {!step ? (
            <div className="birth-date">
              {/* <DatePicker picker="week" />
              <DatePicker picker="month" />
              <DatePicker picker="quarter" />
              <DatePicker picker="year" /> */}
            </div>
          ) : (
            <div className="upload-profile">
              <Avatar src={require('../../assets/images/default-user.jpg')} size="large" className="avatar" />
              <Upload>
                <Button className="upload-button">
                  {t('upload-image')}
                </Button>
              </Upload>
            </div>
          )}
        </div>
        <div className="button-container">
          <Button
            type="primary"
            onClick={() => (!step ? setStep(1) : navigate('/'))}
          >
            {t('next')}
          </Button>
          <Button type="link" onClick={() => navigate('/')}>
            {t('skip')}
            {' '}
            <RightOutlined />
          </Button>
        </div>
      </section>
    </div>
  )
}

export default NewUserPath
