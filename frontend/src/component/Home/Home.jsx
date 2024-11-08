import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typewriter } from 'react-simple-typewriter'
import FeaturesSection from './FeaturesSection';
import { rubberBand, slideInDown } from 'react-animations';
import styled, { keyframes } from 'styled-components';

const slideInDownAnimation = keyframes`${rubberBand}`;
const AnimatedButton = styled.button`animation: 1s ${slideInDownAnimation};}`;

const modelDownAnimation = keyframes `${slideInDown}`
const ModelAnimationButton = styled.div`animation:0.9s ${modelDownAnimation}`

const Home = () => {

  const [showModel, setShowModel] = useState(false)

  const navigate = useNavigate();

    const hanlickClick = () =>{
      setShowModel(true);    
    }

  const handleModalConfirm = (e) => {
    e.preventDefault();
    navigate('/quiz');
  }

  const handleModalCancel = () =>{
    
    setShowModel(false)
  }


  

  return (

     <div className="flex flex-col items-center justify-center min-h-screen mt-48 bg-white p-8 text-center">
      {/* Heading */}
      <h1 className="text-4xl font-bold text-gray-900 mb-4">
      Welcome to QuizFox!<span className="text-pink-500"> challenge yourself </span><span className="text-blue-500">compete with friends</span> 
        <span role="img" aria-label="eyes"> 👀</span>
      </h1>
   

      {/* Subtitle */}
      <p className="text-lg text-gray-700 mb-6">
    
      <Typewriter
            words={['    Ready to test  your knowledge? Start your quiz journey now!']}
            loop={1}
          
            typeSpeed={70}  
            
      
            delaySpeed={1000}
         
          />

      </p>

      <AnimatedButton onClick={hanlickClick} className="bg-red-500 text-white py-3 px-6 rounded-full text-lg font-semibold hover:bg-red-600 focus:outline-none">
      Start Quiz 🚀
      </AnimatedButton>

    { 
    showModel && <ModelAnimationButton className="fixed  inset-0 flex items-center justify-center bg-gray-500 bg-opacity-10">
          <div className="bg-white h-72 p-6 rounded-lg shadow-lg">
            <h2 className="text-xl mt-12 font-semibold mb-4">Important Notice</h2>
            <p className="mb-6">Please be aware that cheating is not allowed during this quiz. Make sure to answer honestly.</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={handleModalCancel}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleModalConfirm}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                I Understand
              </button>
            </div>
          </div>
        </ModelAnimationButton>
}
      {/* Small note */}
      <p className="text-sm text-gray-500 mt-4">No CC Required!</p>
      <FeaturesSection/>
    </div>

  );
}

export default Home;
