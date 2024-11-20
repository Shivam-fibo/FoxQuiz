import { useContext, useEffect } from 'react';
import './App.css';
import { Context } from './main';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './component/Auth/Login';
import Home from './component/Home/Home';
import Register from './component/Auth/Register';
import QuizList from './component/Home/QuizList';
import QuizDetails from './component/Home/QuizDetails';
import { Toaster } from 'react-hot-toast';
import Feedback from './component/Home/Feedback';
import Loading from './component/Layout/Loading';

function App() {

 
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
 
        <Route path="/quiz" element={<QuizList />} />
        <Route path="/quiz/:id" element={<QuizDetails />} />
        <Route path='/feedback' element = {<Feedback/>} />
        <Route path = '/loading' element = {<Loading/>} />
      </Routes>
      <Toaster/>
    </BrowserRouter>
  );
}

export default App;
