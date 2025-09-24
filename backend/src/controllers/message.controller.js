import userModel from "../models/user.model.js"
import messgaeModel from "../models/message.model.js"
import { v2 as cloudinary } from "cloudinary";
import mongoose from "mongoose";
// import { uploadImage } from "../services/cloudinary.service.js"
async function getUserForSidebarController(req,res) {
    try {
        const loggedInUSerId = req.user._id
        const filteredUsers = await userModel.find({_id:{$ne:loggedInUSerId}}).select('-password')

        res.status(200).json(filteredUsers)
    } catch (error) {
        console.error("Error in getUserForSidebar",error.message);
        res.status(500).json({error:"Internal server error"});
    }
}

async function getMessageController(req,res) {
    try {
        const {id: userToChatId} = req.params
        const myId = req.user._id

        const messages =await messgaeModel.find({
            $or:[
                {senderId:myId,receiverId:userToChatId},
                {senderId:userToChatId,receiverId:myId}
            ]
        })

        res.status(200).json(messages)

    } catch (error) {
        console.error("Error in getmessageCOntroller",error.message);
        res.status(500).json({error:"Internal server error"});
    }
}

const sendMessageController = async (req, res) => {
  try {
    console.log("REQ BODY:", req.body);
    console.log("REQ PARAMS:", req.params);
    console.log("REQ USER:", req.user);

    const { text, image } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user?._id;

    if (!senderId) {
      return res.status(400).json({ error: "SenderId missing" });
    }
    if (!receiverId) {
      return res.status(400).json({ error: "ReceiverId missing" });
    }

    let imageUrl = null;
    if (image) {
      try {
        const uploadResponse = await cloudinary.uploader.upload(image, {
          folder: "chat_application",
          resource_type: "auto",
        });
        imageUrl = uploadResponse.secure_url;
      } catch(err) {
        console.error("Cloudinary upload error:", err.message);
      }
    }

    const newMessage = new messgaeModel({
      senderId,
      receiverId: new mongoose.Types.ObjectId(receiverId),
      text,
      image: imageUrl,
    });

    const saved = await newMessage.save();
    console.log("Message saved:", saved);

    res.status(201).json(saved);
  } catch (error) {
    console.error("Error in sendMessageController:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
0



export {getUserForSidebarController,getMessageController,sendMessageController}