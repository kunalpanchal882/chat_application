import { create } from "zustand";
import { axiosInstance } from "../libs/axios";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  ISupdateProfile: false,
  onlineUser:[],
  isCheckingAuth: true,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data });
    } catch (error) {
      set({ authUser: null });
      console.log("error in checkAuth", error);
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/register", data);
      set({ authUser: res.data });
      toast.success("Account created succesfully");
      return { success: true, data: res.data }; // r
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({ authUser: res.data });
      toast.success("user logedin successfully");
      return { success: true, data: res.data };
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.get("auth/logout");
      set({ authUser: null });
      toast.success("User logedout sucessfully");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },

  updateProfile: async (file) => {
    try {
      const formData = new FormData();
      formData.append("profilepic", file); // 🔑 field name same as multer.single('profilepic')

      const res = await axiosInstance.put("/auth/update-profile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      set({ authUser: res.data });
      console.log("Profile updated:", res.data);
    } catch (err) {
      console.error("Update profile error:", err);
    }
  },
}));
