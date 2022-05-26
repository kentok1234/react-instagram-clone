import { createContext, useState } from "react"

export const PostContext = createContext([])

export const PostProvider = ({ children }) => {
  // TODO: answer here
  const [postList, setPostList] = useState([])
  return (
    <PostContext.Provider value={{postList, setPostList}}>
      {children}
    </PostContext.Provider>
  )
}
