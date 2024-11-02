// AdminQuizManager.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminHome = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState([{ questionText: "", options: [""] }]);

  useEffect(() => {
    fetchQuizzes();
  }, []);

  // Fetch all quizzes
  const fetchQuizzes = async () => {
    const response = await axios.get("/api/quizzes"); // Replace with your API route
    setQuizzes(response.data.data);
  };

  // Add new quiz
  const addQuiz = async () => {
    try {
      const response = await axios.post("/api/quizzes/add", { title, questions });
      alert("Quiz added successfully!");
      setQuizzes([...quizzes, response.data.data]);
    } catch (error) {
      console.error("Error adding quiz:", error);
    }
  };

  // Delete quiz
  const deleteQuiz = async (id) => {
    try {
      await axios.delete(`/api/quizzes/${id}`);
      setQuizzes(quizzes.filter((quiz) => quiz._id !== id));
    } catch (error) {
      console.error("Error deleting quiz:", error);
    }
  };

  return (
    <div>
      <h2>Admin Quiz Manager</h2>
      
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          placeholder="Quiz Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        
        {/* Questions and Options Management */}
        <div>
          {questions.map((q, qIdx) => (
            <div key={qIdx}>
              <input
                type="text"
                placeholder="Question Text"
                value={q.questionText}
                onChange={(e) => {
                  const newQuestions = [...questions];
                  newQuestions[qIdx].questionText = e.target.value;
                  setQuestions(newQuestions);
                }}
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
                />
              ))}
              {/* Add option to each question */}
              <button
                onClick={() => {
                  const newQuestions = [...questions];
                  newQuestions[qIdx].options.push("");
                  setQuestions(newQuestions);
                }}
              >
                Add Option
              </button>
            </div>
          ))}
        </div>

        <button onClick={addQuiz}>Add Quiz</button>
      </form>

      {/* Quiz List */}
      <h3>Existing Quizzes</h3>
      <ul>
        {quizzes.map((quiz) => (
          <li key={quiz._id}>
            {quiz.title}
            <button onClick={() => deleteQuiz(quiz._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminHome;
