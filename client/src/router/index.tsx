/* eslint-disable prefer-arrow/prefer-arrow-functions */
import { Route, Routes } from 'react-router-dom'
import { LoginPage, NotFoundPage, SignupPage } from '../pages'

function MainRouter() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default MainRouter
