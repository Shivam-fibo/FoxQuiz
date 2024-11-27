import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { Context } from '../../main';
import toast from 'react-hot-toast';
import axios from 'axios';



const Feedback = () => {
  const location = useLocation();
  const score = location.state?.score;

  const { isAuthorized, setIsAuthorized, setUser, setUserToken } = useContext(Context);

  const navigate = useNavigate()

  const handleClick = () =>{
        navigate('/')
  }

  const handleLogout = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/user/logout",{},
        {
          withCredentials: true,
        }
      );
      console.log(response)
      toast.success(response.data.message);
      sessionStorage.removeItem("user");
    sessionStorage.removeItem("accessToken");
    setUser({});
    setUserToken("");
    setIsAuthorized(false);
    navigate("/login");
    } catch (error) {
      console.log(error)
      toast.error('error'), 
      setIsAuthorized(true);
    }
  };




  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-gray-50 text-center">
      <h2 className="text-2xl font-bold mb-4">Your Score</h2>
      {score !== undefined ? (
        <p className="text-lg"> <span className="font-semibold">{score}</span></p>
      ) : (
        <p className="text-lg">No score available.</p>
      )}
      <button className='bg-red-500 text-white py-3 mt-4 px-6 rounded-full text-lg font-semibold hover:bg-red-400' onClick={handleLogout}>logout</button>

      
    </div>
  );
};

export default Feedback;
