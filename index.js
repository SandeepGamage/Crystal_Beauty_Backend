import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import userRouter from './routes/userRouter.js';
import productRouter from './routes/productRouter.js';
import orderRouter from './routes/orderRouter.js';
import dotenv from "dotenv";
import verifyJWT from './middleware/auth.js';
import cors from 'cors';

dotenv.config();

const app = express();

app.use(cors());

app.use(bodyParser.json());

app.use(verifyJWT);

//mongodb+srv://admin:123@cluster0.usavwyy.mon
// godb.net/?retryWrites=true&w=majority&appName=Cluster0


mongoose.connect(process.env.MONGODB_URL).then(
    () => {
        console.log("Connected to the DB");
    }
).catch(
    () => {
        console.log("DB Connection Failed");
    }
)


app.use("/api/user",userRouter);

app.use("/api/products",productRouter);

app.use("/api/order", orderRouter);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

