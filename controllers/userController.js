import bcrypt from "bcrypt"
import User from "../models/user.js"
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();


export function saveUser(req,res){
    
    const hashedPassword = bcrypt.hashSync(req.body.password, 10)
    const email = req.body.email
    console.log(email);
    

    // const user = new User({
    //     email : req.body.email,
    //     firstName : req.body.firstName,
    //     lastName : req.body.lastName,
    //     password : hashedPassword,
    //     phone : req.body.phone,
    //     role : req.body.role
    // });


    const user = new User({
        email: email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: hashedPassword,
        phone: req.body.phone,
        role: req.body.role
    });

    user.save().then(()=>{
        res.json({
            message: "user saved"
        })
    }).catch((err)=>{
        res.status(500).json({
            message: "Error saving user",
            error: err.message
        })
    })

}


export function loginUser(req,res){
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({
        email : email
    }).then((user)=>{
        if(user == null){
            res.status(404).json({
                message: "Invalid Email"
            })
        } else {
            const isPasswordCorrect = bcrypt.compareSync(password, user.password)

            if(isPasswordCorrect){
                
                const userData = {
                    email : user.email,
                    firstName : user.firstName,
                    lastName : user.lastName,
                    phone : user.phone,
                    role : user.role,
                    isDisable : user.isDisable,
                    isEmailVerified : user.isEmailVerified
                }

                const token = jwt.sign(userData,process.env.JWT_KEY)

                res.json({
                    message: "Login Success",
                    token : token
                })

            } else {
                res.status(403).json({
                    message: "Login fail. Try again"
                })
            }

        }
    })
}
