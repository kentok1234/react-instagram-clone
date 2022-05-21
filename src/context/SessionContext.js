import { createContext, useState } from "react"

export const SessionContext = createContext({
  // TODO: answer here
  user: {
    name: 'Guest',
    email: '',
    image: '',
    id: '',
  },
  isLoggedIn: false,
  setUser: (value) => {},
  setIsLoggedIn: (value) => {}

})

export const SessionProvider = ({ children }) => {
  // TODO: answer here
  const [user, setUser] = useState({})

  return (
    <SessionContext.Provider value={user}>
      {children}
    </SessionContext.Provider>
  )
}
