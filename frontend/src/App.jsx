import { Navigate,Route,Routes } from "react-router-dom"

import LoadingSpinner from "./components/LoadingSpinner"

import { Toaster } from "react-hot-toast"
import { useAuthStore } from "./store/authStore"
import SignUp from "./pages/SignUp"
import Login from "./pages/Login"
import Home from "./pages/Home"
import EmailVerification from './pages/EmailVerification'
import ForgotPassword from "./pages/ForgotPassword"
import ResetPassword from "./pages/ResetPassword"

import Navbar from "./components/Navbar"
import CreatePost from "./pages/CreatePost"
import PostDetails from "./pages/PostDetails"
import EditPost from "./pages/EditPost"
import MyBlogs from "./pages/MyBlogs"
import Profile from "./pages/Profile"

function App() {


  return (
    <>
    <Navbar/>

     <Routes>
        <Route path = '/' element = {<Home/>} />
        <Route path = '/signup' element = {<SignUp/>} />
        <Route path = '/login' element = {<Login/>} />
        <Route path = '/verify-email' element = {<EmailVerification/>} />
        <Route path = '/forgot-password' element = {<ForgotPassword/>} />
        <Route path = '/reset-password/:token' element = {<ResetPassword/>} />

      <Route path="/write" element={<CreatePost/>}/>
      <Route path="/posts/post/:id" element={<PostDetails/>}/>
      <Route exact path="/edit/:id" element={<EditPost/>}/>
      <Route exact path="/myblogs/:id" element={<MyBlogs/>}/>
      <Route exact path="/profile/:id" element={<Profile/>}/>
     </Routes>
     
     </>
  )
}

export default App
