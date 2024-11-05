import { useContext, useEffect } from 'react';
import './App.css';
import { Context } from './main';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './component/Auth/Login';
import Home from './component/Home/Home';
import Register from './component/Auth/Register';
import AdminLogin from './component/Admin/Auth/AdminLogin';
import AdminHome from './component/Admin/Home/AdminHome';
import Quiz from './component/Home/Quiz'
import { Toaster } from 'react-hot-toast';

function App() {

 
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path='/admin' element= {<AdminLogin/>} />
        <Route path='/admin/Home' element= {<AdminHome/>}/>
        <Route path = '/quiz' element = {<Quiz/>} />
      </Routes>
      <Toaster/>
    </BrowserRouter>
  );
}

export default App;
