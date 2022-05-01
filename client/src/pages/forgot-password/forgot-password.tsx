/* eslint-disable no-nested-ternary */
/* eslint-disable no-unused-expressions */
/* eslint-disable consistent-return */
/* eslint-disable prefer-arrow/prefer-arrow-functions */
import { Button, Form, Steps } from 'antd'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FloatLabel } from '../../components'
import './style.scss'

function ForgotPasswordPage() {
  const { t } = useTranslation()
  const { Step } = Steps
  const [form] = Form.useForm()
  const [step, setStep] = useState(0)

  const sendEmail = ({ email }: any) => {
    console.log(email)
    setStep(1)
  }

  return (
    <div className="forgot-password-page">
      <div className="steps">
        <Steps>
          <Step status="wait" title={t('step-enter-email')} tailContent="vfdvfd" />
          <Step status="wait" title={t('step-change-password')} />
          <Step status="wait" title={t('step-done')} />
        </Steps>
      </div>
      <div className="step-content">
        {
          step === 0 ? (
            <Form form={form} onFinish={sendEmail}>
              <Form.Item name="email">
                <FloatLabel
                  label={t('email')}
                  type="email"
                  value={form.getFieldValue('email')}
                />
                <Button type="primary" htmlType="submit">{t('submit')}</Button>
              </Form.Item>
            </Form>
          ) : step === 1 ? (
            <div>
              <p>{t('email-sent')}</p>
              <Button onClick={() => setStep(2)} type="primary">{t('next')}</Button>
            </div>
          ) : (
            <div>
              <p>{t('done')}</p>
              <Button type="primary">{t('next')}</Button>
            </div>
          )
}
      </div>
    </div>
  )
}

export default ForgotPasswordPage
