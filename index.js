import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import StudentModel from './models/student.js';
import userRouter from './routes/userRouter.js';
import productRouter from './routes/productRouter.js';
import dotenv from "dotenv";
import verifyJWT from './middleware/auth.js';
dotenv.config();

let app = express();

app.use(bodyParser.json());

app.use(verifyJWT);

//mongodb+srv://admin:123@cluster0.usavwyy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

mongoose.connect(process.env.MONGODB_URL).then(
    () => {
        console.log("Connected to the DB");
    }
).catch(
    () => {
        console.log("DB Connection Failed");
    }
)



app.get("/" , (req, res) => {
    // console.log("Get request received");
    // console.log(req.body);
    // res.json({}
    //     message: "Hello, World!"
    // });

    StudentModel.find().then(
        (students) => {
            console.log("Students fetched successfully");
            res.json(students);
        }
    ).catch(
        (error) => {
            console.log("Error fetching students:", error);
            res.status(500).json({ message: "Error fetching students" });
        }
    );

});

app.post("/", (req, res) => {
    // console.log("Post request received");
    // console.log(req.body);
    // res.json({
    //     message: "Post request received"
    // });

    
    const Student = new StudentModel(req.body);
    Student.save().then(() => {
        console.log("Student saved successfully");
        res.json({
            message: "Student saved successfully"
        });
    }).catch(() => {
        console.log("Error saving student:");
    });

});

app.delete("/", (req, res) => {
    console.log("Delete request received");
    console.log(req.body);
    res.json({
        message: "Delete request received"
    });
});


app.use("/api/user",userRouter);

app.use("/api/product",productRouter);

app.use("/api/order", orderRouter);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

