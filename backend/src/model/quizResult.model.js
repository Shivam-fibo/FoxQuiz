
import mongoose from "mongoose";

const quizResultSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, 
  
  quizId: { type: mongoose.Schema.Types.ObjectId, ref: "Quiz", required: true },
  score: { type: Number, required: true },
  answers: { type: Object, required: true },
  submittedAt: { type: Date, default: Date.now },
});



export const QuizResult = mongoose.model("QuizResult", quizResultSchema);
