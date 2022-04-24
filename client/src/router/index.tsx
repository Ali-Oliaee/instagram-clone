/* eslint-disable prefer-arrow/prefer-arrow-functions */
import { useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import {
  HomePage, LoginPage, NotFoundPage, SignupPage,
} from '../pages'

function MainRouter() {
  const navigate = useNavigate()
  const isUserAuth = () => (localStorage.user ? !!JSON.parse(localStorage.user).token : false)
  const isAuth = isUserAuth()
  useEffect(() => {
    if (isAuth) navigate('/')
    else navigate('/auth/login')
  }, [])
  return (
    <Routes>
      {isAuth ? (
        <Route path="/">
          <Route index element={<HomePage />} />
        </Route>
      ) : (
        <Route path="/auth">
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<SignupPage />} />
        </Route>
      )}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default MainRouter
