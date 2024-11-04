// quiz.model.js
import mongoose from "mongoose";
const optionSchema = new mongoose.Schema({
  text: { type: String, required: true },
});

const questionSchema = new mongoose.Schema({
  questionText: { type: String, required: true },
  options: { type: [optionSchema], required: true },
  correctAnswer: { type: String, required: true }, 
});

const quizSchema = new mongoose.Schema({
  title: { type: String, required: true },
  questions: { type: [questionSchema], required: true }, 
});

export const Quiz = mongoose.model('Quiz', quizSchema)
