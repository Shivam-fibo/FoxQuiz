import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const hanlickClick = (e) => {
    e.preventDefault();
    navigate('/quiz');
  }
  

  return (
    <section className="relative h-screen bg-gray-100 flex items-center justify-center">
      <div className="text-center">
        {/* Section header */}
        <h1 className="text-4xl font-bold mb-6 text-gray-800">
          Welcome to the Quiz Application
        </h1>
        <p className="mb-8 text-lg text-gray-600">
          Test your knowledge with our engaging quizzes. Click the button below to get started!
        </p>
        <div className="flex justify-center space-x-4">
          <button
            onClick={hanlickClick}
            className="btn bg-gradient-to-t from-blue-600 to-blue-500 text-white px-6 py-3 rounded-md shadow-lg hover:bg-blue-400 transition"
          >
            Start Quiz
          </button>
          <button className="btn bg-white text-gray-800 border border-gray-300 px-6 py-3 rounded-md shadow hover:bg-gray-100 transition">
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
}

export default Home;
