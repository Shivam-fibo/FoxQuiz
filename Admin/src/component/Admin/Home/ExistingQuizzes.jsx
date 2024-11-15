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

  const  deleteQuiz =  async(quizId) => {
   try {
    await axios.delete(`http://localhost:3000/quiz/${quizId}`)
    toast.success("Quiz Deleted Successfully")
      fetchQuizzes();
   } catch (error) {
      toast.error("Something went wrong")
   }  

  }
  
  return (
    <div>
       
  <h3 className="text-lg font-semibold mt-8">Existing Quizzes</h3>
  <ul>
    {quizzes.length> 0 ? quizzes.map((quiz) => (
      <li key={quiz._id} className="border border-gray-300 p-4 rounded-md my-2 mx-2 flex justify-between items-center bg-white shadow-sm">
        <div>

     
        <span>{quiz.title}</span>
        </div>

        <div className=''>

   
        <button onClick={() => getQuizAllInfo(quiz._id)}  className='text-blue-500 hover:underline transition duration-250'>Get info </button>
        <button
          onClick={() => deleteQuiz(quiz._id)}
          className=" ml-4 text-red-500 hover:underline transition duration-200"
        >
          Delete
        </button>
        </div>
      </li>
    )) : <p>No quiz added</p>}
  </ul> 
    </div>
  )

}
export default ExistingQuizzes