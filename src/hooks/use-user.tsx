import { useNavigate } from 'react-router-dom'
import { message } from 'antd'
import i18n from '../utils/i18n'
import axios from '../utils/axios'
import {
  ChangePassword, ChangeProfile, Login, RecoveryCode, ResetPassword, SignUp,
} from '../types/user'

const useUser = () => {
  const navigate = useNavigate()
  const currentUser = JSON.parse(localStorage.getItem('user') || '{}')

  const login = ({ email, password }: Login) => axios.post('users/login/', {
    email,
    password,
  })
    .then(({ data }: any) => {
      message.success(data.message)
      localStorage.setItem('tokens', JSON.stringify(data.tokens))
      localStorage.setItem('user', JSON.stringify(data.account))
      window.dispatchEvent(new Event('storage'))
      i18n.changeLanguage(data.account.language.toLowerCase())
      navigate('/')
    })

  const signUp = ({ username, email, password } : SignUp) => axios.post('/users/register/', {
    username,
    email,
    password,
  })

  const changeProfileInfo = ({ username, bio }: ChangeProfile) => axios.patch(`/account/update-information/${currentUser.id}/`, {
    username,
    bio,
    // TODO: set message for add responses
  }).then(({ data }) => message.success('updated'))

  const changePassword = ({ newPassword, oldPassword } : ChangePassword) => axios.post('/users/change-password/', {
    new_password: newPassword,
    old_password: oldPassword,
  }).then(({ data }) => message.success(data.message))

  const changeProfileImage = ({ file, event }: any) => {
    const formData = new FormData()
    formData.append('photo', file.originFileObj)
    return event && axios.post('account/change-profile-photo/', formData).then(({ data }) => {
      message.success(data.message)
    })
  }

  const sendPasswordRecoveryEmail = ({ email }: {email:string}) => axios.post('/users/forget-password/', { email }).then(() => message.success('Verify code send successfully!'))
  const sendPasswordRecoveryCode = ({ email, code }: RecoveryCode) => axios.post('/users/verify-forget-password/', { code, email })
  const resetPassword = ({ newPassword, email }: ResetPassword) => axios.post('/users/confirm-forget-password/', { password: newPassword, email }).then(({ data }) => message.success(data.message))

  return {
    login,
    signUp,
    changeProfileInfo,
    changePassword,
    changeProfileImage,
    sendPasswordRecoveryEmail,
    sendPasswordRecoveryCode,
    resetPassword,
  }
}

export default useUser
