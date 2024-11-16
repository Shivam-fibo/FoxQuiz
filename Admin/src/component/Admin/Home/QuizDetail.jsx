import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Loading from '../../Layout/Loading';

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
    return <Loading/>;
  }

  return (

    <div className="max-w-4xl mx-auto p-6 bg-white">
  <h1 className="text-3xl font-bold mb-4 text-blue-600">Quiz Detail</h1>
  <p className="text-2xl mb-6">
    <span className="font-semibold">Title:</span> {quiz.title}
  </p>

  {quiz.questions && quiz.questions.length > 0 ? (
    <div>
      <h2 className="text-2xl font-semibold mb-4 text-gray-700">Questions:</h2>
      <ul className="space-y-6">
        {quiz.questions.map((question, index) => (
          <li
            key={question._id}
            className="p-4 border border-gray-300 rounded-md bg-gray-50"
          >
            <p className="font-medium text-lg mb-2 text-gray-800">
              <strong>Question {index + 1}:</strong> {question.questionText}
            </p>
            <ul className="pl-4 flex  gap-4  list-none">
              <p className="font-medium text-gray-700 mb-2">Options</p>
              {question.options.map((option, optIndex) => (
                <li key={optIndex} className="text-gray-600 border-black rounded-xl  w-6">
                  {option.text}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-green-700 font-semibold">
              <strong>Correct Answer:</strong> {question.correctAnswer}
            </p>
          </li>
        ))}
      </ul>
    </div>
  ) : (
    <p className="text-red-500 mt-4">No questions available</p>
  )}
</div>


  );
};

export default QuizDetail;
