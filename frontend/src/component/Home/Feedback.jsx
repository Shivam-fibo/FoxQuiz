import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Feedback = () => {
  const location = useLocation();
  const score = location.state?.score;
  const navigate = useNavigate()

  const handleClick = () =>{
        navigate('/')
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-gray-50 text-center">
      <h2 className="text-2xl font-bold mb-4">Your Score</h2>
      {score !== undefined ? (
        <p className="text-lg"> <span className="font-semibold">{score}</span></p>
      ) : (
        <p className="text-lg">No score available.</p>
      )}
      <button onClick={handleClick}>Go back to HomePage</button>
    </div>
  );
};

export default Feedback;
