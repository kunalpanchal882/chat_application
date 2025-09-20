import express from 'express'
import { authMiddleware } from '../middlewares/auth.moddleware.js'
import {getUserForSidebarController,getMessageController,sendMessgaeController} from '../controllers/message.controller.js'
const route = express()

route.get('/user',authMiddleware,getUserForSidebarController)
route.get("/:id",authMiddleware,getMessageController)
route.post("/send/:id",authMiddleware,sendMessgaeController)

export default route