import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import Loading from "../Layout/Loading";

const QuizDetails = () => {
  const { id } = useParams(); 
  const [quiz, setQuiz] = useState(null);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [loading, setLoading] = useState(false);
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
      [questionIndex]: optionText,
    }));
  };

  const submitQuiz = async () => {
    try {
      const response = await axios.post(
        `http://localhost:3000/quiz/quiz/${id}/submit`,
        { answers: selectedAnswers }
      );
      toast.success("Quiz submitted!");
      const score = response.data.data.score;
      navigate("/feedback", { state: { score } });
    } catch (error) {
      console.error("Error submitting quiz:", error);
      toast.error("Failed to submit quiz");
    }
  };

  if (loading) return <Loading/>;

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
                onChange={() => handleOptionSelect(questionIndex, option.text)}
              />
              <span>{option.text}</span>
            </label>
          ))}
        </div>
      ))}
      <button
        onClick={submitQuiz}
        className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
      >
        Submit Quiz
      </button>
    </div>
  );
};

export default QuizDetails;
