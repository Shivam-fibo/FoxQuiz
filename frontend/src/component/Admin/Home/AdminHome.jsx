import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import toast from 'react-hot-toast'
import { Navigate } from "react-router-dom";
import { Context } from "../../../main";
const AdminQuizManager = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState([{ questionText: "", options: [""], correctAnswer: "" }]);



  const {isAuthorized} = useContext(Context)
  if(!isAuthorized){
    return <Navigate to = {"/admin"} />
  }


  useEffect(() => {
    fetchQuizzes();
  }, []);

  const fetchQuizzes = async () => {
    const response = await axios.get("http://localhost:3000/quiz/allQuiz");
    setQuizzes(response.data.data);
  };
  const addQuiz = async () => {
    try {
        const formattedQuestions = questions.map((q) => ({
            questionText: q.questionText,
            options: q.options.map(opt => ({ text: opt })), 
            correctAnswer: q.correctAnswer 
        }));

        const response = await axios.post("http://localhost:3000/quiz/quiz", {
            title,
            questions: formattedQuestions
        });

        alert("Quiz added successfully!");

        setQuizzes([...quizzes, response.data.data]);
    } catch (error) {
        console.error("Error adding quiz:", error);
    }
};

  const addQuestion = () => {
    setQuestions([...questions, { questionText: "", options: [""] }]);
  };

  const addOption = (qIdx) => {
    const updatedQuestions = [...questions];
    updatedQuestions[qIdx].options.push("");
    setQuestions(updatedQuestions);
  };

  const deleteQuiz = async (quizId) => {
    try {
       
        const response = await axios.delete(`http://localhost:3000/quiz/quiz/${quizId}`);
        
        // Assuming your server responds with the updated list of quizzes or success message
        if (response.status === 200) {
            // Remove the deleted quiz from the local state
            setQuizzes(quizzes.filter(quiz => quiz._id !== quizId));
            toast.success("Quiz deleted successfully!");
        }
    } catch (error) {
        console.error("Error deleting quiz:", error);
        alert("Failed to delete quiz.");
    }
};


  return (
<div className="p-6 bg-gray-50 rounded-lg shadow-md">
  <h2 className="text-2xl font-bold mb-6 text-center">Admin Quiz Manager</h2>

  <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
    <input
      type="text"
      placeholder="Quiz Title"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    />

    {questions.map((q, qIdx) => (
      <div key={qIdx} className="p-4 border border-gray-300 rounded-md bg-white shadow-sm">
        <input
          type="text"
          placeholder="Question Text"
          value={q.questionText}
          onChange={(e) => {
            const newQuestions = [...questions];
            newQuestions[qIdx].questionText = e.target.value;
            setQuestions(newQuestions);
          }}
          className="w-full p-2 border border-gray-300 rounded-md mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        
        {q.options.map((opt, oIdx) => (
          <input
            key={oIdx}
            type="text"
            placeholder="Option Text"
            value={opt}
            onChange={(e) => {
              const newQuestions = [...questions];
              newQuestions[qIdx].options[oIdx] = e.target.value;
              setQuestions(newQuestions);
            }}
            className="w-full p-2 border border-gray-300 rounded-md mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        ))}

        <input
          type="text"
          placeholder="Correct Answer"
          value={q.correctAnswer}
          onChange={(e) => {
            const newQuestions = [...questions];
            newQuestions[qIdx].correctAnswer = e.target.value;
            setQuestions(newQuestions);
          }}
          className="w-full p-2 border border-gray-300 rounded-md mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        
        <button
          onClick={() => {
            const newQuestions = [...questions];
            newQuestions[qIdx].options.push("");
            setQuestions(newQuestions);
          }}
          className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 transition duration-200"
        >
          Add Option
        </button>
      </div>
    ))}

    <button
      type="button"
      onClick={addQuestion}
      className="bg-gray-300 hover:bg-gray-400 mr-14 text-gray-800 px-4 py-2 rounded-md transition duration-200"
    >
      Add Another Question
    </button>

    <button
      type="button"
      onClick={addQuiz}
      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition duration-200"
    >
      Add Quiz
    </button>
  </form>

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

  );
};

export default AdminQuizManager;
