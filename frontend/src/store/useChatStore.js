import { create } from 'zustand'
import { axiosInstance } from '../libs/axios'
import toast from 'react-hot-toast'
export const useChatStore = create((set,get) => ({
  messages:[],
  users:[],
  selectedUser:null,
  isUserLoading:false,
  isMessageLoading:false,

    getUsers:async () => {
        set({isUserLoading:true})
        try {
            const res = await axiosInstance.get('/messages/users')
            set({users:res.data});
        } catch (error) {
            toast.error(error.response.data.message)
        }finally{
            set({isUserLoading:false})
        }
    },

    getMessages:async (userID) => {
        set({isMessageLoading:true})
        try {
            const res = await axiosInstance.get(`/messages/${userID}`)
            set({message:res.data})
        } catch (error) {
            toast.error(error.response.data.messgae)
        }finally{
            set({isMessageLoading:false})
        }
    },

    sendMessage:async (messagedata) => {
        const {selectedUser,messages} = get()
        try {
            const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`,messagedata)
            set({messages:[...messages,res.data]})
        } catch (error) {
            toast.error(error.response.data.message)
        }
    },

    setSelectedUser:(selectedUser) => set({selectedUser})
}))