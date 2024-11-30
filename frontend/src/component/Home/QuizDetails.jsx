import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import Loading from "../Layout/Loading";
import { Context } from "../../main";

const QuizDetails = () => {
  const { id } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [loading, setLoading] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const { userToken } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    fetchQuizDetails();
  }, []);

  const fetchQuizDetails = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:3000/quiz/quiz/${id}`);
      setQuiz(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching quiz details:", error);
      setLoading(false);
    }
  };

  const handleOptionSelect = (optionText) => {
    setSelectedAnswers((prevAnswers) => ({
      ...prevAnswers,
      [id]: {
        ...(prevAnswers[id] || {}),
        [currentQuestionIndex]: optionText,
      },
    }));
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const submitQuiz = async () => {
    const storedUser = JSON.parse(sessionStorage.getItem("user"));
    const { username, email } = storedUser || {};

    const answers = selectedAnswers[id];
    if (!answers || Object.keys(answers).length < quiz.questions.length) {
      return toast.error("Please answer all questions before submitting");
    }

    try {
      const response = await axios.post(
        `http://localhost:3000/quiz/quiz/${id}/submit`,
        { answers, username, email },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      console.log(response)
      toast.success("Quiz submitted!");
      const score = response.data.data.score;
      const totalQuestion =quiz. questions.length
      setTimeout(() => {
        navigate("/feedback", { state: { score, totalQuestion } });
      }, 1000);
    } catch (error) {
      console.error("Error submitting quiz:", error);
      toast.error("Failed to submit quiz");
    }
  };

  if (loading) return <Loading />;

  const currentQuestion = quiz?.questions[currentQuestionIndex];

  return (

<div className="flex items-center justify-center min-h-screen bg-customBlue">
  <div className="bg-blue-200  p-8 w-full max-w-lg border  ">
    <div className="text-center mb-6">
      <h2 className="text-4xl font-bold text-whhite-700 mb-2">{String(currentQuestionIndex + 1).padStart(2, '0')}<span className="text-gray-400">/{quiz?.questions.length}</span></h2>
      <p className="text-lg font-semibold text-blue-800">{currentQuestion?.questionText}</p>
    </div>

    {currentQuestion && (
      <div className="space-y-4">
        {currentQuestion.options.map((option, index) => (
          <label
            key={index}
            className={`flex items-center py-3 px-4 border rounded-lg cursor-pointer ${
              selectedAnswers[id]?.[currentQuestionIndex] === option.text
                ? "border-red-500 bg-red-50"
                : "border-gray-200"
            }`}
          >
            <input
              type="radio"
              name={`question-${currentQuestionIndex}`}
              value={option.text}
              checked={
                selectedAnswers[id]?.[currentQuestionIndex] === option.text
              }
              onChange={() => handleOptionSelect(option.text)}
              className="hidden"
            />
            <span className="text-lg font-medium text-gray-700">{String.fromCharCode(65 + index)}. {option.text}</span>
          </label>
        ))}
      </div>
    )}

    <div className="flex justify-between mt-6">
 
      {currentQuestionIndex < quiz?.questions.length - 1 ? (
        <button
          onClick={nextQuestion}
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-purple-600 disabled:bg-gray-300"
          disabled={!selectedAnswers[id]?.[currentQuestionIndex]}
        >
          Next
        </button>
      ) : (
        <button
          onClick={submitQuiz}
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 disabled:bg-gray-300"
          disabled={!selectedAnswers[id]?.[currentQuestionIndex]}
        >
          Submit
        </button>
      )}
    </div>
  </div>
</div>

  );
};

export default QuizDetails;
