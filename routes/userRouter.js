import express from "express";
import {loginUser, saveUser} from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/",saveUser)
userRouter.post("/login",loginUser)
// userRouter.post("/google",googleLogin)
// userRouter.get("/current",getCurrentUser)
// userRouter.post("/sendMail", sendOTP)
// userRouter.post("/changePW", changePassword)

export default userRouter;