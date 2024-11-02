import express from "express";
import {
  newQuizController,
  updateQuizController,
  deleteQuizController,
  submitQuiz,
} from "../controllers/quizController";
import { verifyToken } from "../middleware/auth";
import { checkRole } from "../middleware/checkRole";

const router = express.Router();

// Admin routes
router.post("/quiz", verifyToken, checkRole("admin"), newQuizController);
router.put("/quiz/:id", verifyToken, checkRole("admin"), updateQuizController);
router.delete("/quiz/:id", verifyToken, checkRole("admin"), deleteQuizController);

// User route
router.post("/quiz/:id/submit", verifyToken, checkRole("user"), submitQuiz);

export default router;
