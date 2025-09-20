import mongoose from 'mongoose'

async function connectDb() {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("connected to db");
    } catch (error) {
        console.log("can not connected to db",error);
    }
}

export default connectDb