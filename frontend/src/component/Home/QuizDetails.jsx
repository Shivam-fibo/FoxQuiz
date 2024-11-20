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
  const { isAuthorized, userToken } = useContext(Context);
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

  const handleOptionSelect = (questionIndex, optionText) => {
    setSelectedAnswers((prevAnswers) => ({
      ...prevAnswers,
      [id]: {
        ...(prevAnswers[id] || {}),
        [questionIndex]: optionText,
      },
    }));
  };

  const submitQuiz = async (quizId) => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const { username, email } = storedUser || {};

    const answers = selectedAnswers[quizId];
    if (!answers) {
      console.error("No answers selected for this quiz");
      return toast.error("Please answer all questions before submitting");
    }

    console.log("Selected Answers:", answers);

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
      toast.success(`Quiz submitted!`);
      const score = response.data.data.score;
      setTimeout(() => {
        navigate("/feedback", { state: { score } });
      }, 1000);
    } catch (error) {
      console.error("Error submitting quiz:", error);
      toast.error("Failed to submit quiz");
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">{quiz?.title}</h2>
      {quiz?.questions.map((question, questionIndex) => (
        <div key={questionIndex} className="mb-4">
          <p className="font-semibold">{question.questionText}</p>
          {question.options.map((option, optionIndex) => (
            <label key={optionIndex} className="flex items-center space-x-2">
              <input
                type="radio"
                name={`question-${questionIndex}`}
                value={option.text}
                checked={selectedAnswers[id]?.[questionIndex] === option.text}
                onChange={() => handleOptionSelect(questionIndex, option.text)}
              />
              <span>{option.text}</span>
            </label>
          ))}
        </div>
      ))}
      <button
        onClick={() => submitQuiz(id)}
        className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
      >
        Submit Quiz
      </button>
    </div>
  );
};

export default QuizDetails;
