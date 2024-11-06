
import mongoose from "mongoose";

const quizResultSchema = new mongoose.Schema({
  
  quizId: { type: mongoose.Schema.Types.ObjectId, ref: "Quiz", required: true },
  score: { type: Number, required: true },
  answers: { type: Object, required: true },
  username: {type: String, required: true},
  email: {type: String, required: true},
  submittedAt: { type: Date, default: Date.now },
});



export const QuizResult = mongoose.model("QuizResult", quizResultSchema);
