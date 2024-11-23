import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Navigate, useNavigate } from "react-router-dom";
import { Context } from "../../../main";
import AdminQuizSubmissions from "./AdminQuizSubmissions";
const AdminQuizManager = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [title, setTitle] = useState("");
  const [countValue, setCountValue] = useState(1);
  const [questions, setQuestions] = useState([
    { questionText: "", options: [""], correctAnswer: "" },
  ]);

  const navigate = useNavigate();

  const { isAuthorized } = useContext(Context);

  // if(!isAuthorized){
  //   return <Navigate to = {"/"} />
  // }

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const fetchQuizzes = async () => {
    const response = await axios.get("http://localhost:3000/quiz/allQuiz");
    setQuizzes(response.data.data);
  };
  const addQuiz = async () => {
    try {
      // a check to make sure that the correct ans should be from one of those options
      for (let i = 0; i < questions.length; i++) {
        let x = questions[i];
        if (!x.correctAnswer || !x.options.includes(x.correctAnswer)) {
          toast.error(
            `Question ${i + 1}: Correct answer must be one of the options.`
          );
          return;
        }
      }

      const formattedQuestions = questions.map((q) => ({
        questionText: q.questionText,
        options: q.options.map((opt) => ({ text: opt })),
        correctAnswer: q.correctAnswer,
      }));

      const response = await axios.post("http://localhost:3000/quiz/quiz", {
        title,
        questions: formattedQuestions,
      });

      toast.success("Quiz Added Successfully");

      setQuizzes([...quizzes, response.data.data]);

      navigate("/existingquiz");
    } catch (error) {
      console.error("Error adding quiz:", error);
    }
  };

  const addQuestion = () => {
    setCountValue(1);
    for (let i = 0; i < questions.length; i++) {
      const x = questions[i];
      if (!x.questionText || x.options.includes("") || !x.correctAnswer) {
        toast.error("Please fill all the field!");
        return;
      }
    }
    setQuestions([...questions, { questionText: "", options: [""] }]);
  };

  const addOption = (qIdx) => {
    if (!questions[qIdx].questionText) {
      toast.error("Please fill in the question text before adding an option");
      return;
    }

    setCountValue(countValue + 1);
    console.log(countValue);

    if (countValue > 3) {
      toast.error("You can not add more than 4 options");
      return;
    }
    const updatedQuestions = [...questions];
    updatedQuestions[qIdx].options.push(""); // Add a new option field

    setQuestions(updatedQuestions); // Update the state with the new options array
    console.log(`Added an option to question ${qIdx}`);
  };

  const deleteQuestion = (qIdx) => {
    // Filter out the question at the given index
    const updatedQuestions = questions.filter((_, index) => index !== qIdx);
    setQuestions(updatedQuestions);
    toast.success(`Question ${qIdx + 1} deleted successfully`);
  };

  return (
    <div className="p-6 bg-gray-50">
      <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
        <input
          type="text"
          placeholder="Quiz Title"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 border border-gray-300  bg-slate-300 focus:outline-none"
        />

        {questions.map((q, qIdx) => (
          <div
            key={qIdx}
            className="p-4 border border-gray-300 rounded-md bg-white shadow-sm"
          >
            <input
              type="text"
              placeholder="Question Text"
              required
              value={q.questionText}
              onChange={(e) => {
                const newQuestions = [...questions];
                newQuestions[qIdx].questionText = e.target.value;
                setQuestions(newQuestions);
              }}
              className="w-full p-2 border border-gray-300  bg-slate-200 rounded-md mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {q.options.map((opt, oIdx) => (
              <input
                key={oIdx}
                required
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

            <button
              onClick={() => addOption(qIdx)}
              className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 transition duration-200"
            >
              Add Option
            </button>

            <button
              type="button"
              onClick={() => deleteQuestion(qIdx)}
              className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 transition duration-200 ml-12"
            >
              Delete Question
            </button>

            <input
              type="text"
              placeholder="Correct Answer"
              value={q.correctAnswer}
              onChange={(e) => {
                const newQuestions = [...questions];
                newQuestions[qIdx].correctAnswer = e.target.value;
                setQuestions(newQuestions);
              }}
              className="w-full mt-4 p-2 border border-gray-300 bg-slate-100 rounded-md mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
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
    </div>
  );
};

export default AdminQuizManager;
