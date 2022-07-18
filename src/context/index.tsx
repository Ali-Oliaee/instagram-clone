import { createContext, useContext, useState } from 'react'

export const CurrentUserContext: any = createContext(null)

export function CurrentUserProvider({ children }:any) {
  const [currentUser, setCurrentUser] = useState(null)

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </CurrentUserContext.Provider>
  )
}

export const useCurrentUser = () => useContext(CurrentUserContext)
