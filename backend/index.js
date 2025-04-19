import express from 'express';
import dotenv from 'dotenv';
import connectDB from './database/db.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import userRoute from './routes/user.route.js';
dotenv.config();

connectDB();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin : process.env.BACKEND_URL , 
    credentials : true
}))

app.use('api/v1/user' , userRoute);

app.listen(PORT , () => {
    console.log(`Server listening on port ${PORT}`);
})