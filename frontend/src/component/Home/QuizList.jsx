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

  const getRandomColor = () =>{
    const color = [
     "#F7D358", 
    "#FF5E57", 
    "#6C63FF", 
    "#4CD964", 
    "#3498DB", 
    "#9B59B6", 
    "#FF6FD8",
    "#5DADE2", 
    "#D5AAFF"
    ]

    return color[Math.floor(Math.random() * color.length)]
  }

  if (loading) return <Loading />;

  return (

   <div className="p-6">
  <h2 className="text-2xl font-bold mb-6 text-center">Available Quizzes</h2>
  <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
    {quizzes.map((quiz) => (
      <div key={quiz._id}  style={{ backgroundColor: getRandomColor() }} className="p-4 bg-white border border-sky-600 ">
        <h3 className="text-lg font-semibold">{quiz.title}</h3>
        <button
        style={{ backgroundColor: getRandomColor() }}
          onClick={() => navigate(`/quiz/${quiz._id}`)}
          className="mt-4  text-white px-4 py-2 "
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
