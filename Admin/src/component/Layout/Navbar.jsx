import React from 'react'
import { Context } from '../../main';
import { useContext } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';


const Navbar = () => {

  const { isAuthorized } = useContext(Context);
  const navigate = useNavigate()

  // if(!isAuthorized){
  //   return <Navigate to = {"/"} />
  // }

    const handleClickResult = () => {
        navigate("/result");
      };
      const handleClickExistingQuiz = () => {
        navigate("/existingquiz");
      };
    
      const handleClickManager = () => {
        navigate('/')
      }
  return (
    <div className='mt-4 pl-2'>
        
<div className="flex flex-col md:flex-row mb-4 items-center justify-between mx-auto">
        <div>
          <button className="text-2xl font-bold mb-6 ml-2 " onClick={handleClickManager}>Admin Quiz Manager</button>
        </div>
        <div>
          <button
            className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
            onClick={handleClickResult}
          >
            Quiz Result
          </button>

          <button
            className="bg-transparent hover:bg-blue-500 ml-4 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded mr-2"
            onClick={handleClickExistingQuiz}
          >
            {" "}
            Exisitng Quiz
          </button>
        </div>
      </div>
    </div>
  )
}

export default Navbar