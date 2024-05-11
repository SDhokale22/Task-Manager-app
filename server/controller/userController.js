import { User } from "../models/user.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

//signup controller
export const Signup = async(req, res) => {
    try{
        const {username, email, password} = req.body; 
        if(!username || !email || !password){
            return res.status(401).json({
                message: "All Fields are required",
                success: false
            })
        }
        const user = await User.findOne({username});
        if(user){
            return res.status(401).json({
                message: "User already exist", 
                success: false
            })
        }

        const hashedPassword = await bcryptjs.hash(password, 10)

        await User.create({
            username, 
            email,
            password: hashedPassword
        });

        return res.status(201).json({
            message: "Account created successfully", 
            success:true
        })
        
    }catch(error){
        console.log(error);
    }
}

//login controller
export const Login = async(req, res) => {
    try{
        const {username, password} = req.body;
        if(!username || !password) {
            return res.status(401).json({
                message: "All Fields are required",
                success: false
            });
        }
        const user = await User.findOne({username});
        console.log(user);
        if(!user){
            return res.status(401).json({
                message: "Incorrect username or password",
                success: false
            });
        }
        const isMatch = await bcryptjs.compare(password, user.password);
        if(!isMatch){
            return res.status(401).json({
                message: "Incorrect username or password",
                success: false
            });
        }
        const tokenData = {
            userId:user._id
        }
    
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET,  {expiresIn:"1d"});
        return res.status(201).cookie("token", token, {expiresIn:"1d", httpOnly:true}).json({
            message: "Login successfully",
            user, 
            success:true
        }) 
    }catch(error){
        console.log(error);
    }
}

//logout
export const Logout = async(req, res) => {
    return res.cookie("token", "", {expiresIn:new Date(Date.now())}).json({
        message: "User Loggrd out successfully",
        success:true
    })
}

