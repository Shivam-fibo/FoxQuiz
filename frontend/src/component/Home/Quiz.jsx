import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from 'react-hot-toast';

const UserQuizViewer = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [activeQuiz, setActiveQuiz] = useState(null); 

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const fetchQuizzes = async () => {
    try {
      const response = await axios.get("http://localhost:3000/quiz/allQuiz");
      setQuizzes(response.data.data); // Adjust as per response structure
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
    const answers = selectedAnswers[quizId];

    try {
      const response = await axios.post(`http://localhost:3000/quiz/quiz/${quizId}/submit`, {
        answers,
      });
      console.log(response)
      toast.success(`Quiz submitted! Your score: ${response.data.data}`);
    } catch (error) {
      console.error("Error submitting quiz:", error);
      toast.error("Failed to submit quiz");
    }
  };

  const startQuiz = (quizId) => {
    setActiveQuiz(quizId); // Set the active quiz to show questions and options
  };

  return (
    <div className="p-6 bg-gray-50 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Available Quizzes</h2>
      {quizzes.length > 0 ? quizzes.map((quiz) => (
        <div key={quiz._id} className="mb-6 p-4 bg-white rounded-lg shadow-md">
          <h3 className="text-lg font-semibold">{quiz.title}</h3>
          
          {/* Show Start Button if the quiz is not active */}
          {activeQuiz !== quiz._id ? (
            <button
              onClick={() => startQuiz(quiz._id)}
              className="mt-4 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md"
            >
              Start Quiz
            </button>
          ) : (
            // Render Questions and Options if the quiz is active
            <div>
             
              {quiz.questions.map((question, questionIndex) => (
                <div key={questionIndex} className="my-4">
                   <span> <b>Question</b> </span>
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
                className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
              >
                Submit Quiz
              </button>
            </div>
          )}
        </div>
      )) : <p>No quizzes available.</p>}
    </div>
  );
};

export default UserQuizViewer;
