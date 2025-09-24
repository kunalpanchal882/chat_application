import express from 'express'
import { authMiddleware } from '../middlewares/auth.moddleware.js'
import {getUserForSidebarController,getMessageController,sendMessageController} from '../controllers/message.controller.js'
const route = express()

route.get('/users',authMiddleware,getUserForSidebarController)
route.get("/:id",authMiddleware,getMessageController)
route.post("/send/:id",authMiddleware,sendMessageController)

export default route