import { useNavigate } from 'react-router-dom'
import { message } from 'antd'
import { useQueryClient } from 'react-query'
import i18n from '../utils/i18n'
import axios from '../utils/axios'

const useUser = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const login = ({ email, password }: any) => axios.post('users/login/', {
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

  const signUp = ({ username, email, password } : any) => axios.post('/users/register/', {
    username,
    email,
    password,
  })

  const changeProfileInfo = ({ username, bio }: any) => axios.patch('/account/update-information/', {
    username, bio,
    // TODO: set message for add responses
  }).then(({ data }) => message.success('updated'))

  const changePassword = ({ newPassword, oldPassword } : any) => axios.post('/users/change-password/', {
    new_password: newPassword,
    old_password: oldPassword,
  }).then(({ data }) => message.success(data.message))

  const changeProfileImage = ({ file, event }: any) => {
    const formData = new FormData()
    formData.append('photo', file.originFileObj)
    return event && axios.patch('account/change-profile-photo/', formData).then(({ data }) => {
      message.success(data.message)
      queryClient.invalidateQueries('currentUser')
    })
  }

  const sendPasswordRecoveryEmail = (email : any) => axios.post('/users/forget-password/', { email }).then(() => message.success('Verify code send successfully!'))
  const sendPasswordRecoveryCode = ({ code, userEmail: email } : any) => axios.post('/users/verify-forget-password/', { code, email })
  const resetPassword = ({ password, userEmail: email }:any) => axios.post('/users/confirm-forget-password/', { password, email }).then(({ data }) => {
    message.success(data.message)
    navigate('/auth/login')
  })

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
