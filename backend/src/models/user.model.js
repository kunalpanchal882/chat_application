import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    fullname:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minlength:6
    },
    profilepic:{
        type:String,
        default:""
    }
},{timestamps:true})


const userModel = mongoose.model('user',userSchema)


export default userModel