import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { Context } from '../../main';
import toast from 'react-hot-toast';
import axios from 'axios';



const Feedback = () => {
  const location = useLocation();
  const score = location.state?.score;
  const totalQuestion = location.state?.totalQuestion

  const { isAuthorized, setIsAuthorized,user, setUser, setUserToken } = useContext(Context);

  const navigate = useNavigate()

  const handleClick = () =>{
        navigate('/')
  }
  console.log(user.username,score, totalQuestion )

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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
    <h1 className="text-3xl font-bold text-gray-800 mb-6">Report Card</h1>
    <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">
        Name: <span className="text-gray-900">{user?.fullName || "Unknown"}</span>
      </h2>
      <h3 className="text-xl font-semibold text-gray-700 mb-4">
        TotalQuestion: <span className="text-black-900">{totalQuestion}</span>
      </h3>

      <h3 className="text-xl font-semibold text-gray-700 mb-4">
        Correct Answer: <span className="text-green-500">{score}</span>
      </h3>
      <h3 className="text-xl font-semibold text-gray-700 mb-4">
        Wrong Answer: <span className="text-red-900">{totalQuestion-score}</span>
      </h3>
      {/* {score !== undefined ? (
        <p className="text-lg text-gray-700">
          Score: <span className="font-bold text-green-600">{score}</span> /{' '}
          <span className="font-bold text-gray-900">{totalQuestion}</span>
        </p>
      ) : (
        <p className="text-lg text-gray-700">No score available.</p>
      )} */}
      <button
        onClick={handleLogout}
        className="mt-6 bg-red-500 text-white py-2 px-6 rounded-full font-semibold hover:bg-red-400"
      >
        Logout
      </button>
  
  </div>

      
    </div>
  );
};

export default Feedback;
