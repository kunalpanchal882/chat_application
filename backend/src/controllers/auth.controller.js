import userModel from "../models/user.model.js"
import bcrypt from "bcryptjs"
import {genrateToken} from '../utils/jwt.util.js'

async function registerController(req,res) {
    const {fullname,email,password} = req.body

    try {
        if(password.length<6){
           return res.status(400).json({message:"password  must be atlest 6 corrector"})
        }

        const userISAvilable = await userModel.findOne({email})

        if(userISAvilable){
            return res.status(400).json({message:"user is already register"})
        }

        const hashPassword = await bcrypt.hash(password,10)

        const user = await userModel.create({
            email,
            fullname,
            password:hashPassword
        })

       if (user) {
        genrateToken(user,res)

        res.status(201).json({
            message:"user register sucessfully",
            fullname:user.fullname,
            email:user.email,
            profilepic:user.profilepic,
            succes:true
        })
       } else {
        res.status(400).json({
            message:"invalid user data"
        })
       }

    } catch (error) {
        console.log("error in register controller");
        res.status(500).json({
            message:"inter server error"
        })
    }
}

async function loginController(req,res) {
    const {email,password} = req.body

  try {
      const user =await userModel.findOne({email})

    if(!user){
        return res.status(401).json({
            message:"invalid cridentiol and"
        })
    }

    const isPasswordCorrect =await bcrypt.compare(password,user.password)

    if(!isPasswordCorrect){
        return res.status(400).json({
            message:"invalid cridentiol"
        })
    }

    genrateToken(user,res)

    res.status(201).json({
        message:"user loged in succesfully",
        username:user.fullname,
        email:user.email,
        profilepic:user.profilepic
    })
  } catch (error) {
    console.log("inernal error occure in logincontrooler",error);
    res.status(500).json({message:"inernal server error"})
  }
}

async function logoutController(req,res) {
    try {
        res.clearCookie("token");
    res.status(201).json({message:"user logedout succesfully"})
    } catch (error) {
        console.log("error in loggedIn controller",error);
        res.status(500).json({message:"internall server error"})
    }
}

async function updateProfileController(req,res) {
    try {
        const {profilepic} = req.body
        const userId = req.user._id
    } catch (error) {
        
    }
}

async function checkAuthController(req,res) {
    try {
        res.status(200).json(req.user)
    } catch (error) {
        console.log("Error in CkeckAuth Controller",error.message);
        res.status(500).json({message:"Internal server error"})
    }
}

export { registerController, loginController, logoutController ,updateProfileController,checkAuthController}


