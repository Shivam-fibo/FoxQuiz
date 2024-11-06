import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Typewriter } from 'react-simple-typewriter'
import FeaturesSection from './FeaturesSection';
import { rubberBand } from 'react-animations';
import styled, { keyframes } from 'styled-components';

const Home = () => {
  const navigate = useNavigate();

  const hanlickClick = (e) => {
    e.preventDefault();
    navigate('/quiz');
  }

 const slideInDownAnimation = keyframes`${rubberBand}`;
const AnimatedButton = styled.button`

  animation: 1s ${slideInDownAnimation};
  }
`;

  

  return (

     <div className="flex flex-col items-center justify-center min-h-screen mt-48 bg-white p-8 text-center">
      {/* Heading */}
      <h1 className="text-4xl font-bold text-gray-900 mb-4">
      Welcome to QuizMaster!<span className="text-pink-500"> challenge yourself </span><span className="text-blue-500">compete with friends</span> 
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

      {/* Button */}
      <AnimatedButton onClick={hanlickClick} className="bg-red-500 text-white py-3 px-6 rounded-full text-lg font-semibold hover:bg-red-600 focus:outline-none">
      Start Quiz 🚀
      </AnimatedButton>

      {/* Small note */}
      <p className="text-sm text-gray-500 mt-4">No CC Required!</p>
      <FeaturesSection/>
    </div>

  );
}

export default Home;
