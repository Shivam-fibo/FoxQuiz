import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loading from "../Layout/Loading";

import { slideInDown, slideOutUp } from "react-animations";
import styled, { keyframes } from "styled-components";

const modelInAnimation = keyframes`${slideInDown}`;
const modelOutAnimation = keyframes`${slideOutUp}`;

const ModelAnimationButtonIn = styled.div`
  animation: 0.9s ${modelInAnimation};
`;
const ModelAnimationButtonOut = styled.div`
  animation: 0.9s ${modelOutAnimation};
`;

const QuizList = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [selectedQuizId, setSelectedQuizId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const fetchQuizzes = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:3000/quiz/allQuiz");
      setQuizzes(response.data.data);
      setLoading(false);
      
    } catch (error) {
      console.error("Error fetching quizzes:", error);
      setLoading(false);
    }
  };

  const getRandomColor = () => {
    const colors = [
      "#F7D358",
      "#FF5E57",
      "#6C63FF",
      "#4CD964",
      "#3498DB",
      "#9B59B6",
      "#FF6FD8",
      "#5DADE2",
      "#D5AAFF",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  // Open modal with selected quiz ID
  const startQuiz = (quizId) => {
    setSelectedQuizId(quizId);
    setIsClosing(false);
    setShowModal(true);
  };

  // Handle modal actions
  const handleModalCancel = () => {
    setIsClosing(true);
    setTimeout(() => {
      setShowModal(false);
      setSelectedQuizId(null);
    }, 900); 
  };

  const handleModalConfirm = () => {
    setIsClosing(true);
    setTimeout(() => {
      setShowModal(false);
    navigate(`/quiz/${selectedQuizId}`);
    }, 900);
    
  };

  console.log(quizzes.length)

  if (loading) return <Loading />;

  return (
    <div className="p-6 ">
      <div className="text-4xl  font-bold mb-12 underline  text-center ">Available Quizzes</div>
      <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {quizzes.map((quiz) => (
          <div
            key={quiz._id}
            style={{ backgroundColor: getRandomColor() }}
            className="p-4 text-center bg-white border rounded shadow"
          >
            <div>

            <h3 className="text-lg font-semibold cursor-pointer">
              {quiz.title}
            </h3>
            <p className="sm:text-sm">total Question: {quiz.questions.length}</p>
            
            </div>

            <button
              onClick={() => startQuiz(quiz._id)}
              className="mt-4 bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-400"
            >
              Start Quiz
            </button>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <>
          {isClosing ? (
            <ModelAnimationButtonOut className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-xl font-semibold mb-4">Important Notice</h2>
                <p className="mb-6">
                <ul>
                  <li className="list-none">
                 1. Please be aware that cheating is not allowed during this quiz.
                  Make sure to answer honestly.
                  </li>
                  <li> 2. In order to get certificate you need to score 75%</li>
                  <li>3. All Question are <span className="text-red-500 uppercase">compulsory</span>   </li>
                </ul>
                </p>
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
            </ModelAnimationButtonOut>
          ) : (
            <ModelAnimationButtonIn className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-xl font-semibold mb-4">Rule</h2>
                <ul>
                  <li className="list-none">
                 1. Please be aware that<span className="text-red-500 uppercase"> cheating is not allowed </span>  during this quiz.
                  Make sure to answer honestly.
                  </li>
                  <li> 2. In order to get <span className="text-red-500 uppercase">  certificate</span>  you need to score 75%</li>
                  <li>3. All Question are <span className="text-red-500 uppercase">compulsory</span>   </li>
                </ul>
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
            </ModelAnimationButtonIn>
          )}
        </>
      )}
    </div>
  );
};

export default QuizList;
