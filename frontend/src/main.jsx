import { createContext, StrictMode, useContext, useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

export const Context = createContext({isAuthorized: false})


window.addEventListener("blur", () => {
  document.title = "Come Back 🤦‍♂️🤦‍♂️";
});

// when the user's focus is back to your tab (website) again
window.addEventListener("focus", () => {
  document.title = "Quiz 😊😊";
});

const AppWrapper = () =>{
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user')
    return savedUser ? JSON.parse(savedUser) : {}
  })
  const [userToken, setUserToken] = useState('');

  useEffect(() =>{
    if(user && Object.keys(user).length > 0){
      localStorage.setItem('user', JSON.stringify(user))
      setIsAuthorized(true)
    }
    else{
      localStorage.removeItem('user');
      setIsAuthorized(false)
    }
  }, [user])


  return(
    <Context.Provider value={{isAuthorized, setIsAuthorized, user, setUser, userToken,setUserToken}}>
      <App/>
    </Context.Provider>
  )
}

createRoot(document.getElementById('root')).render(

    <AppWrapper />

)
