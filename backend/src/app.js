import express, { urlencoded } from "express";
import cors from 'cors'
import cookieParser from "cookie-parser";

import userRoute from "./routes/user.router.js"
import adminRoute from "./routes/admin.router.js"
import quizRoute from "./routes/quiz.router.js"


const app = express();
app.use(express.json());
app.use(cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true
}));

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());

// Define routes directly in `app.js`
app.use('/user', userRoute);
app.use('/admin', adminRoute);
app.use('/quiz', quizRoute);



app.get('/', (req, res) =>{
    res.status(200).json("Everything wokring fine!!!")
})


app.get("/", (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Max-Age", "1800");
    res.setHeader("Access-Control-Allow-Headers", "content-type");
    res.setHeader( "Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS" ); 
     });



export { app };
