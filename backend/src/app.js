import express from "express"
import cookie from 'cookie-parser'
import cors from "cors"
const app = express()


/*import routes */
import authRoute from './routes/auth.route.js'
import messgaeRoute from './routes/message.route.js'

/*middlewares*/
app.use(express.json())
app.use(cookie())
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))

/*use routes */
app.use('/api/auth',authRoute)
app.use('/api/message',messgaeRoute)

export default app