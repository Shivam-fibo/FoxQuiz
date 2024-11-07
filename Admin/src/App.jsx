
import './App.css'
import AdminLogin from './component/Admin/Auth/AdminLogin'
import AdminHome from './component/Admin/Home/AdminHome'

import { Toaster } from 'react-hot-toast'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {

  return (
   <>
  <BrowserRouter>

    <Routes>
    <Route path='/' element= {<AdminLogin/>} />
    <Route path='/admin' element= {<AdminHome/>}/>
    </Routes>
    <Toaster/>
  </BrowserRouter>
   </>
  )
}

export default App
