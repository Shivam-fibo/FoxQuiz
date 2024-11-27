import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typewriter } from 'react-simple-typewriter';
import FeaturesSection from './FeaturesSection';
import { rubberBand } from 'react-animations';
import styled, { keyframes } from 'styled-components';
import toast from 'react-hot-toast'
import { useContext } from 'react';
import axios from 'axios';
import { Context } from '../../main';

const slideInDownAnimation = keyframes`${rubberBand}`;
const AnimatedButton = styled.button`animation: 1s ${slideInDownAnimation};`;




const Card = ({ title, icon, background }) => {
  return (
    <div className={`flex  flex-col justify-between p-4 rounded-xl border border-black-200 shadow-sm ${background}`}>
      <div className="flex items-center mx-auto mb-4">
        <img src={icon} alt={`${title} icon`} className="w-12 h-12" />
      </div>
      <div className="text-lg font-semibold">{title}</div>
      <div className="mt-2 text-purple-600 font-medium">
      <span>Start Now →</span>
      </div>
    </div>
  );
};



const Home = () => {

  const {setIsAuthorized} = useContext(Context)

  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    
    navigate('/quiz');
  };



  
  const handleLogout = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/user/logout",{},
        {
          withCredentials: true,
        }
      );
      console.log(response)
      // toast.success(response.data.message);
      setIsAuthorized(false);
      // navigateTo("/login");
    } catch (error) {
      console.log(error)
      toast.error('error'), 
      setIsAuthorized(true);
    }
  };



  return  (

  <div>
    
    <div className="flex flex-col items-center justify-center  bg-orange-200 p-8 text-center">
    <div className='mt-32'>
    <li>
            <button onClick={handleLogout} className="log_btn bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition">Logout</button>
          </li>
    </div>
      
      {/* Heading */}
      <h1 className="text-4xl font-bold text-gray-900 mb-4">
        Welcome to QuizFox!
        <span className="text-pink-500"> challenge yourself </span>
        <span className="text-blue-500">compete with friends</span>
        <span role="img" aria-label="eyes"> 👀</span>
      </h1>

     
      <p className="text-lg text-black mb-6 ">
        <Typewriter
          words={['    Ready to test your knowledge? Start your quiz journey now!']}
          loop={1}
          typeSpeed={70}
          delaySpeed={1000}
        />
      </p>

      <AnimatedButton
        onClick={handleClick}
        className="bg-red-500 text-white py-3 px-6 rounded-full text-lg font-semibold hover:bg-red-600 focus:outline-none"
      >
        Start Quiz 🚀
      </AnimatedButton>


  
   


      {/* Modal */}

<div>


<div className=" grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
      <Card
        title="Daily Trivia"
        icon="/goals.png" // Replace with actual icon URL
        background="bg-white"
      />
      <Card
        title="Daily Play & Win"
        icon="/goal.png" // Replace with actual icon URL
        background="bg-red-500"
      />
      <Card
        title="Play Like King"
        icon="/suprise.png" // Replace with actual icon URL
        background="bg-white"
      />
    </div>
      <p className="text-sm text-gray-500 mt-4">No CC Required!</p>
    </div>

    </div>   
      <FeaturesSection />
    
  </div>
  )
};

export default Home;
