import { useState } from 'react'

function useLocal() {
  const [auth, setAuth] = useState(!!localStorage.getItem('tokens'))

  const isAuth = () => setAuth(!!localStorage.getItem('tokens'))

  return {
    auth,
    isAuth,
  }
}

export default useLocal
