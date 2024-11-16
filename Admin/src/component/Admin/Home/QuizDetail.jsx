import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const QuizDetail = () => {
  const [quiz, setQuiz] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/quiz/quiz/${id}`);
        console.log(response.data.data); 
        setQuiz(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchQuiz();
  }, [id]);

  if (!quiz) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Quiz Detail</h1>
      <p><strong>Title:</strong> {quiz.title}</p>

     
      {quiz.questions && quiz.questions.length > 0 ? (
        <div>
          <h2>Questions:</h2>
          <ul>
            {quiz.questions.map((question, index) => (
              <li key={question._id}>
                <p><strong>Question {index + 1}:</strong> {question.questionText}</p>
                <p><strong>Options:</strong></p>
                <ul>
                  {question.options.map((option, optIndex) => (
                    <li key={optIndex}>{option.text}</li>
                  ))}
                </ul>
                <p><strong>Correct Answer:</strong> {question.correctAnswer}</p>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No questions available</p>
      )}
    </div>
  );
};

export default QuizDetail;
