import { useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import {
  HomePage,
  LoginPage,
  NotFoundPage,
  SavedPage,
  SignupPage,
  ProfilePage,
  SettingsPage,
  ForgotPasswordPage,
  DiscoveryPage,
} from '../pages'

function MainRouter() {
  const navigate = useNavigate()
  const isUserAuth = () => (localStorage.getItem('user'))
  const isAuth = isUserAuth()
  useEffect(() => {
    if (!isAuth) navigate('/auth/login')
  }, [])
  return (
    <Routes>
      {isAuth ? (
        <Route path="/">
          <Route index element={<HomePage />} />
          <Route path="saved" element={<SavedPage />} />
          <Route path="profile/:id" element={<ProfilePage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="discovery" element={<DiscoveryPage />} />
        </Route>
      ) : (
        <Route path="/auth">
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<SignupPage />} />
          <Route path="forgot-password" element={<ForgotPasswordPage />} />
        </Route>
      )}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default MainRouter
