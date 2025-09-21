import express  from 'express'
import {registerController,loginController,logoutController,updateProfileController,checkAuthController} from '../controllers/auth.controller.js'
import {authMiddleware} from '../middlewares/auth.moddleware.js'
import multer from 'multer'
 const route = express()

route.post('/register',registerController)
route.post('/login',loginController)
route.get('/logout',logoutController)

const upload = multer({storage:multer.memoryStorage()})

route.put('/update-profile',authMiddleware,upload.single('profilepic'),updateProfileController)

route.get('/check',authMiddleware,checkAuthController)

export default route