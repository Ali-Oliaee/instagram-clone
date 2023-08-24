import {
  Navigate, Route, Routes,
} from 'react-router-dom'
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

function ProtectedRoute({ path, element: Element, ...rest }: any) {
  const isAuth = () => !!localStorage.getItem('tokens')
  if (!isAuth()) return <Navigate to="/login" />
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Route path={path} element={<Element {...rest} />} />
}

function MainRouter() {
  return (
    <Routes>
      <Route path="/" element={<ProtectedRoute element={<HomePage />} />} />
      <Route path="/saved" element={<ProtectedRoute element={<SavedPage />} />} />
      <Route path="/profile/:id" element={<ProtectedRoute element={<ProfilePage />} />} />
      <Route path="/settings" element={<ProtectedRoute element={<SettingsPage />} />} />
      <Route path="/discovery" element={<ProtectedRoute element={<DiscoveryPage />} />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default MainRouter
