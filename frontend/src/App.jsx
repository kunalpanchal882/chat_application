import React, { useEffect } from 'react'
import Navbar from './components/Navbar.jsx'
import { Routes,Route, Navigate } from 'react-router-dom'
import HomePage from './pages/HomePage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import ProfilePage from './pages/ProfilePage.jsx'
import SettingPage from './pages/SettingPage.jsx'
import SignupPage from './pages/SignupPage.jsx'
import { useAuthStore } from './store/useAuthStore.js'
import {Loader} from 'lucide-react'
import {Toaster} from 'react-hot-toast'
import{useThemeStore} from './store/useThemeStore.js'
const App = () => {


  const {authUser,checkAuth,isCheckingAuth} =useAuthStore()
  const {theme} = useThemeStore()
  useEffect(() => {
   checkAuth()
  }, [checkAuth])
  

  if(isCheckingAuth && !authUser)
    return(
  <div className='flex justify-center items-center h-screen'>
    <Loader className='size-10 animate-spin'/>
  </div>
  )
  
  

  return (
    <div data-theme={theme}>
      <Navbar />
      <Routes>
        <Route path='/' element={authUser ? <HomePage/> : <Navigate to={"/login"}/>}/>
        <Route path='/signup' element={<SignupPage/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/setting' element={<SettingPage/>}/>
        <Route path='/profile' element={authUser ? <ProfilePage/> : <Navigate to={"/login"}/>}/>
      </Routes>
      <Toaster position='top-center'/>
    </div>
  )
}

export default App