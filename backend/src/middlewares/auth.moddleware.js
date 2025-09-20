import jwt from 'jsonwebtoken'
import userModel from '../models/user.model.js'

async function authMiddleware(req,res,next) {
    try {
        const {token}  = req.cookies

    if(!token){
        return res.status(401).json({messgae:"Unauthorized -No token Provided"})
    }

    const decoded = jwt.verify(token,process.env.JWT_SECRATE)

    if(!decoded){
        return res.status(401).json({message:"Unauthorized - Invalid Token"})
    }

    const user = await userModel.findById(decoded.id).select('-password');

    if(!user){
        return res.status(404).json({messgae:"user not found"})
    }

    req.user = user

    next()
    } catch (error) {
        console.log("internal server error in middlewrae",error);
        res.status(500).json({message:"internal server error ",error})
    }
}

export {authMiddleware}