import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import styled, { keyframes } from 'styled-components';
import { slideInDown, slideOutUp } from 'react-animations';
import { useNavigate } from 'react-router-dom';

const modelInAnimation = keyframes`${slideInDown}`;
const modelOutAnimation = keyframes`${slideOutUp}`;

const ModelAnimation = styled.div`
  animation: 0.9s ${({ isClosing }) => (isClosing ? modelOutAnimation : modelInAnimation)};
`;

const ExistingQuizzes = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [showModel, setShowModel] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [handelQUizId, setHandleQuizId] = useState(null)

  const navigate = useNavigate();

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const fetchQuizzes = async () => {
    const response = await axios.get('http://localhost:3000/quiz/allQuiz');
    console.log(response)
    setQuizzes(response.data.data);
  };

  const handleModel = (quizId) => {
    setShowModel(true);
    setIsClosing(false);
    setHandleQuizId(quizId)
  };

  const handleModalCancel = () => {
    setIsClosing(true); 
    setTimeout(() => {
      setShowModel(false); 
      setHandleQuizId(null)
    }, 900); 
  };

  const handleGetInfo = (quizId) =>{
    navigate(`/quiz/${quizId}`)
  }

  const deleteQuiz = async () => {
    try {
      await axios.delete(`http://localhost:3000/quiz/quiz/${handelQUizId}`);
      toast.success('Quiz Deleted Successfully');
      fetchQuizzes();
      setShowModel(false);
    } catch (error) {
      toast.error('Something went wrong');
      console.log(error);
    }
  };

  return (
    <div>
      <h3 className="text-3xl font-bold my-8 ml-4 text-red-500">Existing Quizzes</h3>
      <ul>
        {quizzes.length > 0 ? (
          quizzes.map((quiz) => (
            <li
              key={quiz._id}
              className="border border-gray-300 p-4 rounded-md my-2 mx-2 flex justify-between items-center bg-white shadow-sm"
            >
              <div>
                <span>{quiz.title}</span>
              </div>
              <div>
                <button onClick={() => handleGetInfo(quiz._id)} className="text-blue-500 hover:underline transition duration-250">
                  Get info
                </button>
                <button
                  onClick={() => handleModel(quiz._id)}
                  className="ml-4 text-red-500 hover:underline transition duration-200"
                >
                  Delete
                </button>
              </div>
            </li>
          ))
        ) : (
          <p>No quiz added</p>
        )}
      </ul>

      {showModel && (
        <ModelAnimation isClosing={isClosing} className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Important Notice</h2>
            <p className="mb-6">Are you sure you want to delete this quiz?</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={handleModalCancel}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={deleteQuiz}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                I Understand
              </button>
            </div>
          </div>
        </ModelAnimation>
      )}
    </div>
  );
};

export default ExistingQuizzes;
