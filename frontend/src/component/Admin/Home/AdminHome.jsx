// AdminQuizManager.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from 'react-hot-toast'

const AdminHome = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState([
    { questionText: "", options: [{ optionText: "" }] }
  ]);
  useEffect(() => {
    fetchQuizzes();
  }, []);

  // Fetch all quizzes
  const fetchQuizzes = async () => {
    const response = await axios.get("http://localhost:3000/quiz/allQuiz");
    setQuizzes(response.data.data);
  };

  // Add new quiz
  const addQuiz = async () => {
    try {
      const response = await axios.post("http://localhost:3000/quiz/quiz", { title, questions });

      toast.success("Quiz added successfully!")
      setQuizzes([...quizzes, response.data.data]);
    } catch (error) {
      console.error("Error adding quiz:", error);
    }
  };

  // Delete quiz
  const deleteQuiz = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/quiz/quiz/${id}`);
      setQuizzes(quizzes.filter((quiz) => quiz._id !== id));
    } catch (error) {
      console.error("Error deleting quiz:", error);
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-semibold text-center mb-8">Admin Quiz Manager</h2>

      {/* Form for Adding New Quiz */}
      <form
        onSubmit={(e) => e.preventDefault()}
        className="bg-white p-6 rounded-lg shadow-lg max-w-xl mx-auto mb-8"
      >
        <h3 className="text-xl font-medium mb-4">Create New Quiz</h3>

        <input
          type="text"
          placeholder="Quiz Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />

        {/* Questions and Options Management */}
        <div className="space-y-6">
          {questions.map((q, qIdx) => (
            <div key={qIdx} className="space-y-2">
              <input
                type="text"
                placeholder="Question Text"
                value={q.questionText}
                onChange={(e) => {
                  const newQuestions = [...questions];
                  newQuestions[qIdx].questionText = e.target.value;
                  setQuestions(newQuestions);
                }}
                className="w-full p-2 border border-gray-300 rounded mb-2"
              />

              {q.options.map((opt, oIdx) => (
               <input
               key={oIdx}
               type="text"
               placeholder="Option Text"
               value={opt.optionText}
               onChange={(e) => {
                 const newQuestions = [...questions];
                 newQuestions[qIdx].options[oIdx].optionText = e.target.value;
                 setQuestions(newQuestions);
               }}
             />
              ))}

              {/* Add Option Button */}
             <button
            type="button"
            onClick={() => {
              const newQuestions = [...questions];
              newQuestions[qIdx].options.push({ optionText: "" });
              setQuestions(newQuestions);
            }}
          >
            + Add Option
          </button>
            </div>
          ))}
        </div>

        {/* Add Quiz Button */}
        <button
          onClick={addQuiz}
          className="w-full bg-blue-500 text-white font-semibold p-2 rounded mt-6 hover:bg-blue-600"
        >
          Add Quiz
        </button>
      </form>

      {/* Quiz List */}
      <h3 className="text-2xl font-semibold text-center mb-4">Existing Quizzes</h3>
      <ul className="space-y-4 max-w-xl mx-auto">
        {quizzes.map((quiz) => (
          <li
            key={quiz._id}
            className="bg-white p-4 border border-gray-200 rounded flex justify-between items-center shadow-sm"
          >
            <span className="font-medium">{quiz.title}</span>
            <button
              onClick={() => deleteQuiz(quiz._id)}
              className="text-red-500 font-semibold hover:text-red-700"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminHome;
