import jwt from 'jsonwebtoken'

export const genrateToken = (user,res) => {
    const token = jwt.sign({
        id:user._id
    },process.env.JWT_SECRATE,{
        expiresIn:"7d"
    })
    res.cookie('token',token,{
        maxAge:7 * 24 * 60 * 60 * 1000 ,
        httpOnly:true,
        secure:true,
        sameSite:"strict"
    })
    return token
}