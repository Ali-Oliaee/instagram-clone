/* eslint-disable prefer-arrow/prefer-arrow-functions */
import { Route, Routes } from 'react-router-dom'
import {
  HomePage, LoginPage, NotFoundPage, SignupPage,
} from '../pages'

function MainRouter() {
  const isUserAuth = () => (localStorage.user ? !!JSON.parse(localStorage.user).token : false)
  const isAuth = isUserAuth()
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
