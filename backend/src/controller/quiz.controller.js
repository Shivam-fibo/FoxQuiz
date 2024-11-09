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
  const { answers, username, email } = req.body;
console.log(req.body)
  // Find the quiz
  const quiz = await Quiz.findById(req.params.id);
  if (!quiz) {
    throw new ApiError(404, "Quiz not found");
  }

  // Calculate score
  let score = 0;
  quiz.questions.forEach((question, index) => {
    const correctAnswer = question.correctAnswer;
    if (answers[index] === correctAnswer) {
      score += 1;
    }
  });

  // Save the quiz result to the database
  const result = await QuizResult.create({
    quizId: req.params.id,
    score,
    answers, 
    username,
    email
  });

  console.log("This is result", result);

  // Respond with user details along with the score
  res.status(200).json({
    success: true,
    message: "Quiz submitted successfully",
    data: {
      score,
      username,
      email,
    },
  });
})


const getQuizResults = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;

 
  const results = await QuizResult.find()
    .skip(skip) 
    .limit(limit) 
    .populate('quizId', 'title')
    .select('score answers fullName username email quizId');

 
  const totalResults = await QuizResult.countDocuments();
  const totalPages = Math.ceil(totalResults / limit);


  res.status(200).json(
    new ApiResponse(200, results, "Quiz results fetched successfully", {
      page,
      totalPages,
      totalResults,
    })
  );
});


export {
  newQuizController,
  updateQuizController,
  deleteQuizController,
  submitQuiz,
  getAllQuizzes,
  getQuizResults
};
