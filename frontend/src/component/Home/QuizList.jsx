import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loading from "../Layout/Loading";

const QuizList = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(false);
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

  if (loading) return <Loading />;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">Available Quizzes</h2>
      <div className="grid gap-4">
        {quizzes.map((quiz) => (
          <div key={quiz._id} className="p-4 bg-white shadow rounded">
            <h3 className="text-lg font-semibold">{quiz.title}</h3>
            <button
              onClick={() => navigate(`/quiz/${quiz._id}`)}
              className="mt-4 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
            >
              Start Quiz
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuizList;
