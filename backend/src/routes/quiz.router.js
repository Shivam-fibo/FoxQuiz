import express from "express";
import {
  newQuizController,
  updateQuizController,
  deleteQuizController,
  submitQuiz,
  getAllQuizzes,
  getQuizResults,
  quizTitleCount
} from "../controller/quiz.controller.js";
// import {verifyToken} from '../'

const router = express.Router();

// Admin routes
router.post("/quiz",   newQuizController);
router.put("/quiz/:id",  updateQuizController);
router.delete("/quiz/:id",  deleteQuizController);
router.get('/allQuiz', getAllQuizzes);
router.get('/result', getQuizResults);
router.get('/totalTitle', quizTitleCount)

// User route
router.post("/quiz/:id/submit", submitQuiz);




export default router;


// http://localhost:3000/quiz/allQuiz
// http://localhost:3000/quiz/quiz/:id
