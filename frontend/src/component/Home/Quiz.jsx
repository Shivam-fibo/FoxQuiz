import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Context } from "../../main";
import { Navigate, useNavigate } from "react-router-dom";
import { slideInDown, slideOutUp } from 'react-animations';
import styled, { keyframes } from 'styled-components';



const modelInAnimation = keyframes`${slideInDown}`;
const modelOutAnimation = keyframes`${slideOutUp}`;

const ModelAnimationButtonIn = styled.div`animation: 0.9s ${modelInAnimation};`;
const ModelAnimationButtonOut = styled.div`animation: 0.9s ${modelOutAnimation};`;



const UserQuizViewer = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showModel, setShowModel] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [activeQuiz, setActiveQuiz] = useState(null);
  const { isAuthorized, userToken } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    fetchQuizzes();

  }, [activeQuiz]);

  const fetchQuizzes = async () => {
    try {
      const response = await axios.get("http://localhost:3000/quiz/allQuiz");
      setQuizzes(response.data.data);
    } catch (error) {
      console.error("Error fetching quizzes:", error);
      toast.error("Failed to load quizzes");
    }
  };

  const handleOptionSelect = (quizId, questionIndex, optionText) => {
    setSelectedAnswers((prevAnswers) => ({
      ...prevAnswers,
      [quizId]: {
        ...(prevAnswers[quizId] || {}),
        [questionIndex]: optionText,
      },
    }));
  };
  const submitQuiz = async (quizId) => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const {username, email } = storedUser || {};
  
    const answers = selectedAnswers[quizId];
  
    try {
      const response = await axios.post(
        `http://localhost:3000/quiz/quiz/${quizId}/submit`,
        { answers, username, email },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      
      console.log("Full Response:", response); 
      console.log("User Info from Response:", response.data.data); 
      toast.success(`Quiz submitted!`);

      const score = response.data.data.score;
     setTimeout(() => {

       navigate("/feedback", {state: {score}})

     }, 1000);
      
    } catch (error) {
      console.error("Error submitting quiz:", error);
      toast.error("Failed to submit quiz");
    }
  };
  
  const startQuiz = (quizId) => {
    setShowModel(true);
    setActiveQuiz(quizId);
  
  };

  const handleModalConfirm = () => {
    setShowModel(false);
  };

  const handleModalCancel = () => {
    setIsClosing(true);
    setTimeout(() => {
      setShowModel(false);
      setIsClosing(false);
    }, 900); 
  };



  if (!isAuthorized) {
    return <Navigate to="/login" />;
  }

  return (<>
  <div className="flex items-center justify-between  p-6 bg-gray-50">
  <div className="w-full ">
    <h2 className="text-2xl font-bold mb-6 text-center">Available Quizzes</h2>
    {quizzes.length > 0 ? quizzes.map((quiz) => (
      <div key={quiz._id} className="mb-6 p-4 bg-white  mx-auto">

        <h3 className="text-lg font-semibold">{quiz.title}</h3>
        {/* <div className="flex items-center justify-between mb-6 p-4 bg-white mx-auto"> */}
  
       
        {
        activeQuiz !== quiz._id ? (
          <button
          onClick={() => startQuiz(quiz._id)}
          className="mt-4 bg-green-500 hover:bg-green-600 text-white px-4 py-2"
          >
            Start Quiz
          </button>
      )
        
        : (
          <div>
            {quiz.questions.map((question, questionIndex) => (
              <div key={questionIndex} className="my-4">
                <span><b>Question</b></span>
                <p className="font-semibold">{question.questionText}</p>
                <div className="flex flex-col space-y-2">
                  <p>options</p>
                  {question.options.map((option, optionIndex) => (
                    <label key={optionIndex} className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name={`question-${questionIndex}`}
                        value={option.text}
                        checked={selectedAnswers[quiz._id]?.[questionIndex] === option.text}
                        onChange={() => handleOptionSelect(quiz._id, questionIndex, option.text)}
                        className="form-radio"
                      />
                      <span>{option.text}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
            <button
              onClick={() => submitQuiz(quiz._id)}
              className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2"
            >
              Submit Quiz
            </button>
          </div>
        )}
              </div>

    )) : <p>
            Loading....
      </p>}
  </div>


  {showModel && (
        (isClosing ? (
          <ModelAnimationButtonOut className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold mb-4">Important Notice</h2>
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
          </ModelAnimationButtonOut>
        ) : (
          <ModelAnimationButtonIn className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold mb-4">Important Notice</h2>
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
          </ModelAnimationButtonIn>
        ))
      )}


</div>

  </>);
};

export default UserQuizViewer;
