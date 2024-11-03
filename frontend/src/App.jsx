import { useContext, useEffect } from 'react';
import './App.css';
import { Context } from './main';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './component/Auth/Login';
import Home from './component/Home/Home';
import Register from './component/Auth/Register';
import AdminLogin from './component/Admin/Auth/AdminLogin';
import AdminHome from './component/Admin/Home/AdminHome';
import { Toaster } from 'react-hot-toast';

function App() {
  const { isAuthorized, setIsAuthorized, setUser } = useContext(Context);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/user/getUser",
          {
            withCredentials: true,
          }
        );
        setUser(response.data.user);
        setIsAuthorized(true);
      } catch (error) {
        setIsAuthorized(false);
      }
    };
    fetchUser();
  }, [setIsAuthorized, setUser]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path='/admin' element= {<AdminLogin/>} />
        <Route path='/admin/Home' element= {<AdminHome/>}/>
      </Routes>
      <Toaster/>
    </BrowserRouter>
  );
}

export default App;
