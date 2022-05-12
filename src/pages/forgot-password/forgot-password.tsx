/* eslint-disable no-nested-ternary */
import {
  Button, Form, Input, Steps,
} from 'antd'
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
  const sendCode = ({ code }: any) => {
    console.log(code)
    setStep(2)
  }
  const resetPassword = ({ password }: any) => {
    console.log(password)
    setStep(0)
  }

  return (
    <div className="forgot-password-page">
      <div className="steps">
        <Steps>
          <Step status={step === 0 ? 'process' : 'wait'} title={t('step-enter-email')} />
          <Step status={step === 1 ? 'process' : step === 0 ? 'wait' : 'wait'} title={t('step-enter-code')} />
          <Step status={step < 2 ? 'wait' : 'process'} title={t('step-change-password')} />
        </Steps>
      </div>
      <div className="step-content">
        {
          step === 0 ? (
            <Form form={form} onFinish={sendEmail}>
              <Form.Item
                name="email"
                rules={[{
                  required: true,
                  message: t('email-required'),
                },
                {
                  type: 'email',
                  message: t('email-invalid'),
                },
                ]}
              >
                <FloatLabel
                  label={t('email')}
                  type="email"
                  value={form.getFieldValue('email')}
                  autoFocus
                />
              </Form.Item>
              <Button block type="primary" htmlType="submit">{t('submit')}</Button>
            </Form>
          ) : step === 1 ? (
            <Form form={form} onFinish={sendCode}>
              <Form.Item
                name="code"
                rules={[{
                  required: true,
                  message: t('code-required'),
                },
                {
                  min: 6,
                  message: t('code-invalid'),
                },
                ]}
              >
                <FloatLabel
                  label={t('code')}
                  type="text"
                  value={form.getFieldValue('code')}
                  autoFocus
                />
              </Form.Item>
              <Button block type="primary" htmlType="submit">{t('submit')}</Button>
            </Form>
          ) : (
            <Form form={form} onFinish={resetPassword}>
              <Form.Item
                rules={[{
                  required: true,
                  message: t('password-required'),
                },
                {
                  min: 6,
                  message: t('password-min'),
                }]}
                name="oldPassword"
              >
                <Input.Password size="large" autoFocus placeholder={t('old-password')} />
              </Form.Item>
              <Form.Item
                rules={[{
                  required: true,
                  message: t('password-required'),
                },
                {
                  min: 6,
                  message: t('password-min'),
                }]}
                name="newPassword"
              >
                <Input.Password size="large" placeholder={t('new-password')} />
              </Form.Item>
              <Form.Item
                rules={[{
                  required: true,
                  message: t('password-required'),
                },
                {
                  min: 6,
                  message: t('password-min'),
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('newPassword') === value) {
                      return Promise.resolve()
                    }
                    return Promise.reject(new Error(t('passwords-not-match')))
                  },
                }),
                ]}
                name="confirmPassword"
              >
                <Input.Password size="large" placeholder={t('confirm-password')} />
              </Form.Item>
              <Button block type="primary" htmlType="submit">{t('submit')}</Button>
            </Form>
          )
}
      </div>
    </div>
  )
}

export default ForgotPasswordPage
