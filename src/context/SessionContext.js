import { createContext, useState } from "react"

export const SessionContext = createContext({
  // TODO: answer here
    email: '',
    id: '',
    image: '',
    name: '',
})

export const SessionProvider = ({ children }) => {
  // TODO: answer here
  const [session, setSession] = useState({})
  return (
    <SessionContext.Provider value={{session, setSession}}>
      {children}
    </SessionContext.Provider>
  )
}
