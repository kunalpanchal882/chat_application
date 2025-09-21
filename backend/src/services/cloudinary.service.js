import dotenv from "dotenv";
dotenv.config(); // ✅ add this
import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET
});

console.log("Cloudinary ENV:", {
  CLOUD_NAME: process.env.CLOUD_NAME,
  API_KEY: process.env.CLOUDINARY_API_KEY,
  API_SECRET: process.env.CLOUDINARY_API_SECRET ? "Loaded ✅" : "Missing ❌"
})


async function uploadImage(file) {
    return new Promise((resolve,reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            {
                folder:"chat_application",
                public_id:Date.now().toString(),
                resource_type:"auto"
            },
            (error,result) => {
                if(error){
                    console.error("Cloudinary Error:", error);
                    reject(error)
                }else{
                    console.log("Cloudinary Result:", result.secure_url);
                    resolve(result)
                }
            }
        )

        uploadStream.end(file.buffer)
    })
}

export {uploadImage}