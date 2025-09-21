// import themes from 'daisyui/theme/object'
import { create } from 'zustand'

export const useThemeStore = create((set) => ({
 theme:localStorage.getItem('chat-theme') || "dark",
 setTheme:(theme) =>{
    localStorage.setItem("chat-theme",theme);
    set({theme})
 }
}))