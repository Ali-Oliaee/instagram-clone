import { useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import {
  LikesPage,
  HomePage,
  LoginPage,
  NotFoundPage,
  SavedPage,
  SignupPage,
  ProfilePage,
  SettingsPage,
  ForgotPasswordPage,
} from '../pages'

function MainRouter() {
  const navigate = useNavigate()
  // const isUserAuth = () => (localStorage.user ? !!JSON.parse(localStorage.user).token : false)
  // const isAuth = isUserAuth()
  // useEffect(() => {
  //   if (isAuth) navigate('/')
  //   else navigate('/auth/login')
  // }, [])
  return (
    <Routes>
      {/* {isAuth ? (
        <Route path="/"> */}
          <Route path='/' element={<HomePage />} />
          <Route path="/saved" element={<SavedPage />} />
          <Route path="/likes" element={<LikesPage />} />
          <Route path="/profile/:id" element={<ProfilePage />} />
          <Route path="/settings" element={<SettingsPage />} />
        {/* </Route>
      ) : ( */}
        {/* <Route path="/auth"> */}
          <Route path="/auth/login" element={<LoginPage />} />
          <Route path="/auth/signup" element={<SignupPage />} />
          <Route path="/auth/forgot-password" element={<ForgotPasswordPage />} />
        {/* </Route> */}
      {/* )} */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default MainRouter
