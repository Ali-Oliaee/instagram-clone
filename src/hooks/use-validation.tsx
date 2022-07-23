import { useTranslation } from 'react-i18next'

const useValidation = () => {
  const { t } = useTranslation()

  const requiredTitle = { required: true, message: t('required-title') }
  const maxTitleLength = { max: 50, message: t('max-title-length') }
  const requiredComment = { required: true, message: 'fill' }
  const requiredUsername = { required: true, message: t('require-username') }
  const requiredEmail = { required: true, message: t('require-email') }
  const invalidEmail = { type: 'email' as any, message: t('invalid-email') }
  const requiredCode = { required: true, message: t('code-required') }
  const minLengthCode = { min: 5, message: t('code-invalid') }
  const requiredPassword = { required: true, message: t('password-required') }
  const minLengthPassword = { min: 6, message: t('password-min') }
  const validatePasswords = ({ getFieldValue }: any) => ({
    validator(_ : any, value: any) {
      if (!value || getFieldValue('password') === value) return Promise.resolve()
      return Promise.reject(new Error(t('passwords-not-match')))
    },
  })

  return {
    requiredTitle,
    maxTitleLength,
    requiredComment,
    requiredEmail,
    invalidEmail,
    requiredCode,
    requiredUsername,
    minLengthCode,
    requiredPassword,
    minLengthPassword,
    validatePasswords,
  }
}

export default useValidation
