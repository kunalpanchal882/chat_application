import express  from 'express'
import {registerController,loginController,logoutController,updateProfileController,checkAuthController} from '../controllers/auth.controller.js'
import {authMiddleware} from '../middlewares/auth.moddleware.js'
const route = express()

route.post('/register',registerController)
route.post('/login',loginController)
route.get('/logout',logoutController)

route.purge('/uodate-profile',authMiddleware,updateProfileController)

route.get('/check',authMiddleware,checkAuthController)

export default route