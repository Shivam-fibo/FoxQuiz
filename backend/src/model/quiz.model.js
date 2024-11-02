import mongoose, {Schema} from 'mongoose'



const optionSchema = new mongoose.Schema({
    text: String,
    isCorrect: Boolean,  
  });
  
  const questionSchema = new mongoose.Schema({
    questionText: {
      type: String,
      required: true,
    },
    options: [optionSchema],
  });
  
  const quizSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true,
    },
    questions: [questionSchema],
  });


  export const Quiz = mongoose.model("Quiz", quizSchema)