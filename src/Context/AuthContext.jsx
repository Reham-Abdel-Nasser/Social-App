import React, { createContext, useEffect, useState } from 'react'

export const authContext = createContext()
const AuthContextProvider = ({ children }) => {
const [token, setToken] = useState(null)   // rerender

  function insertUserToken (tkn) {
    setToken(tkn)
  }

  function logout() {
    // remove token from localStorage and state => setToken
    localStorage.removeItem("token")
    setToken(null)
  }

//   console.log(token , "context");
  

  useEffect(function (){
    if (localStorage.getItem("token") != null){
      setToken(localStorage.getItem("token"));
    }
  } , []);

  return (
    <authContext.Provider value={{ 
        token, 
        insertUserToken ,
        logout
        }}
        >
        {children}
    </authContext.Provider>
  )
}

export default AuthContextProvider
