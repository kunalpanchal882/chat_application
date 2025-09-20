import userModel from "../models/user.model.js"
import messgaeModel from "../models/message.model.js"

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

async function sendMessgaeController(params) {
    try {
        const {text,message} = req.body

        const {id:receiverId} = req.params
        const mydD = req.user._id

        let imageUrl;

        const newMessage = new messgaeModel({
            mydD,
            receiverId,
            text,
        })

         await newMessage.save()

         res.status(201).json(newMessage)

    } catch (error) {
        console.error("Error in senderMessageControler",error.message);
        res.status(500).json({error:"Internal server error"});
    }
}

export {getUserForSidebarController,getMessageController,sendMessgaeController}