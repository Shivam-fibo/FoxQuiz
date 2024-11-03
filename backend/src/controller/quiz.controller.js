import { Quiz } from "../model/quiz.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { QuizResult } from "../model/quizResult.model.js";
// Admin only: Create a new quiz
const newQuizController = asyncHandler(async (req, res) => {
  const { title, questions } = req.body;

  const newQuiz = new Quiz({ title, questions });
  await newQuiz.save();
  res.status(200).json(new ApiResponse(200, newQuiz, "Quiz added successfully"));
});


// Fetch all quizzes
const getAllQuizzes = asyncHandler(async (req, res) => {
  const quizzes = await Quiz.find();
  res.status(200).json(new ApiResponse(200, quizzes, "Quizzes fetched successfully"));
});


// Admin only: Update a quiz
const updateQuizController = asyncHandler(async (req, res) => {
  const { title, questions } = req.body;
  const quiz = await Quiz.findByIdAndUpdate(
    req.params.id,
    { title, questions },
    { new: true }
  );

  if (!quiz) {
    throw new ApiError(404, "Quiz not found");
  }
  res.status(200).json(new ApiResponse(200, quiz, "Quiz updated successfully"));
});

// Admin only: Delete a quiz
const deleteQuizController = asyncHandler(async (req, res) => {
  const quiz = await Quiz.findByIdAndDelete(req.params.id);
  if (!quiz) {
    throw new ApiError(404, "Quiz not found");
  }
  res.status(200).json(new ApiResponse(200, quiz, "Quiz deleted successfully"));
});


const submitQuiz = asyncHandler(async (req, res) => {
  const { answers } = req.body;
  const quiz = await Quiz.findById(req.params.id);
  if (!quiz) {
    throw new ApiError(404, "Quiz not found");
  }

  let score = 0;
  quiz.questions.forEach((question, index) => {
    const correctAnswer = question.correctAnswer;
    if (answers[index] === correctAnswer) {
      score += 1;
    }
  });

  const result = await QuizResult.create({
    userId: req.user?._id, // Ensure user ID is available here
    quizId: req.params.id,
    score,
    answers,
  });

  res.status(200).json(new ApiResponse(200, score, "Quiz submitted successfully"));
});

const getQuizResults = asyncHandler(async (req, res) => {
  const results = await QuizResult.find().populate("quizId").populate("userId");
  res.status(200).json(new ApiResponse(200, results, "Quiz results fetched successfully"));
});
export {
  newQuizController,
  updateQuizController,
  deleteQuizController,
  submitQuiz,
  getAllQuizzes,
  getQuizResults
};
