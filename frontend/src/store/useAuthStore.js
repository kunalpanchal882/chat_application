import { create } from 'zustand'
import { axiosInstance } from '../libs/axios'
import toast from 'react-hot-toast'


export const useAuthStore = create((set) => ({
    authUser:null,
    isSigningUp:false,
    isLoggingIng:false,
    ISupdateProfile:false,

    isCheckingAuth:true,

    

    checkAuth: async () => { 
        try {
            const res = await axiosInstance.get('/auth/check')
            set({authUser:res.data});
            
        } catch (error) {
            set({authUser:null})
            console.log("error in checkAuth",error);
        }
        finally{
            set({isCheckingAuth:false})
        }
    },

    signup:async (data) => {
        set({isSigningUp:true})
        try {
           const res = await axiosInstance.post('/auth/register',data)
           set({authUser:res.data})
           toast.success("Account created succesfully")
           return { success: true, data: res.data }; // r
        } catch (error) {
            toast.error(error.response.data.message)
        }finally{
            set({isSigningUp:false})
        }
    },

    logout:async () => {
        try {
           await axiosInstance.get('auth/logout')
           set({authUser:null}) 
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }

}))