import dotenv from "dotenv"
import app from './src/app.js'
import connectDb from "./src/db/db.js"
dotenv.config()

const port = process.env.PORT
connectDb()

app.listen(port,() => {
    console.log(`server is running on port ${port}`);
})