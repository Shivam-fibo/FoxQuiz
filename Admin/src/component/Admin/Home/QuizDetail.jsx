import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const QuizDetail = () => {
     const [quiz, setQuiz] = useState(null)
     const {id} = useParams()
     const navigate = useNavigate();

     const fetchQuiz = async() =>{
        const response = await axios.get(`http://localhost:3000/quiz/${id}`)
        setQuiz(response.data)
     }
  return (
    <div>

    </div>
  )
}

export default QuizDetail