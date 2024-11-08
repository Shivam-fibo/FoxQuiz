import React from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useState, useEffect } from 'react'
const ExistingQuizzes = () => {
  const [quizzes, setQuizzes] = useState([])

  useEffect(() => {
    fetchQuizzes();
  }, []);
  const fetchQuizzes = async() =>{
    const response = await axios.get("http://localhost:3000/quiz/allQuiz");
    setQuizzes(response.data.data);
  };
  
  return (
    <div>
       
  <h3 className="text-lg font-semibold mt-8">Existing Quizzes</h3>
  <ul>
    {quizzes.length> 0 ? quizzes.map((quiz) => (
      <li key={quiz._id} className="border border-gray-300 p-4 rounded-md my-2 flex justify-between items-center bg-white shadow-sm">
        <span>{quiz.title}</span>
        <button
          onClick={() => deleteQuiz(quiz._id)}
          className="text-red-500 hover:underline transition duration-200"
        >
          Delete
        </button>
      </li>
    )) : <p>No quiz added</p>}
  </ul> 
    </div>
  )

}
export default ExistingQuizzes