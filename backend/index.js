import express from 'express';
import dotenv from 'dotenv';
import connectDB from './database/db.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import userRoute from './routes/user.route.js';
import courseRoute from './routes/course.route.js';
dotenv.config();

connectDB();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin : process.env.FRONTEND_URL , 
    credentials : true
}))

app.use('/api/v1/user' , userRoute);
app.use('/api/v1/course' , courseRoute);

app.listen(PORT , () => {
    console.log(`Server listening on port ${PORT}`);
})