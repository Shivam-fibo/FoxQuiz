import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { Context } from '../../main';
import toast from 'react-hot-toast';
import axios from 'axios';

const Feedback = () => {
  const [showFeedback, setShowFeedback] = useState(false);
  const location = useLocation();
  const score = location.state?.score;
  const totalQuestion = location.state?.totalQuestion;
  const feedbackData = location.state?.feedbackData;
  const { isAuthorized, setIsAuthorized, user, setUser, setUserToken } = useContext(Context);

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/user/logout",
        {},
        {
          withCredentials: true,
        }
      );
      toast.success(response.data.message);
      sessionStorage.removeItem("user");
      sessionStorage.removeItem("accessToken");
      setUser({});
      setUserToken("");
      setIsAuthorized(false);
      navigate("/login");
    } catch (error) {
      toast.error('Logout failed.');
      setIsAuthorized(true);
    }
  };

  const handleFeedback = () => {
    setShowFeedback(true);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-blue-400 p-6">
  <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-10 tracking-wide"> Report Card</h1>
  <div className="bg-white shadow-2xl rounded-3xl p-8 w-full max-w-2xl border-t-8 border-b-4 border-blue-500">
    <h2 className="text-xl md:text-2xl font-bold text-gray-700 mb-4">
      Name: <span className="text-gray-900">{user?.fullName || "Unknown"}</span>
    </h2>
    <h3 className="text-lg md:text-xl font-medium text-gray-700 mb-4">
      Total Questions: <span className="text-black">{totalQuestion}</span>
    </h3>
   
    <h3 className="text-lg md:text-xl font-medium text-gray-700 mb-4">
      Correct Answers: <span className="text-green-600 font-semibold">{score}</span>
    </h3>
    <h3 className="text-lg md:text-xl font-medium text-gray-700 mb-6">
      Wrong Answers: <span className="text-red-600 font-semibold">{totalQuestion - score}</span>
    </h3>

    <div className="flex flex-col md:flex-row justify-between gap-4">
    

      <button
        onClick={handleFeedback}
        className="bg-gradient-to-r from-blue-500 to-blue-700 text-white py-3 px-8 rounded-lg font-bold shadow-md hover:shadow-lg hover:from-blue-600 hover:to-blue-800 transition duration-300 w-full md:w-auto"
      >
        View Feedback
      </button>

      <button
        onClick={handleLogout}
        className="bg-gradient-to-r from-red-500 to-red-700 text-white py-3 px-8 rounded-lg font-bold shadow-md hover:shadow-lg hover:from-red-600 hover:to-red-800 transition duration-300 w-full md:w-auto"
      >
        Logout
      </button>
    </div>
  </div>

  {showFeedback && (
    <div className="mt-12 min-w-8 bg-white rounded-2xl p-10">
      <h1 className="text-3xl md:text-4xl font-extrabold text-center text-gray-800 mb-8">Quiz Feedback</h1>
      <div className="space-y-8 max-w-4xl mx-auto">
        {feedbackData.map((item, index) => (
          <div
            key={index}
            className="p-6 bg-gradient-to-r from-gray-50 to-gray-100 shadow-md rounded-lg border border-gray-200"
          >
            <p className="text-lg md:text-xl font-bold text-gray-900">
              Q{index + 1}: {item.questionText}
            </p>
            <p className="text-sm md:text-md text-green-700 mt-2">
              Correct Answer: <strong>{item.correctAnswer}</strong>
            </p>
            <p
              className={`text-sm md:text-md mt-2 ${
                item.correctAnswer === item.userAnswer ? "text-blue-600" : "text-red-600"
              }`}
            >
              Your Answer: <strong>{item.userAnswer}</strong>
            </p>
          </div>
        ))}
      </div>
    </div>
  )}
</div>

  );
};

export default Feedback;
