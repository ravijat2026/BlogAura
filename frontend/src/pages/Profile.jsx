import { useEffect, useState } from "react"
import ProfilePosts from "../components/ProfilePosts"
import axios from "axios"
import { URL } from "../url"
import { useNavigate, useParams } from "react-router-dom"
import { useAuthStore } from "../store/authStore"


const Profile = () => {
  const param=useParams().id
  console.log(param);
  const [name,setName]=useState("")
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")

  const navigate=useNavigate()
  const [posts,setPosts]=useState([])
  const [updated,setUpdated]=useState(false)

 const {user} = useAuthStore()
  // console.log(user)

const fetchProfile=async ()=>{
  try{
     const res=await axios.get(`${URL}/users/${user._id}`)
     setName(res.data.name)
     setEmail(res.data.email)
     setPassword(res.data.password)
  }
  catch(err){
     console.log(err)
  }
}

const handleUserUpdate=async ()=>{
  setUpdated(false)
  try{
    const res=await axios.put(`${URL}/users/${user._id}`,{name,email,password},{withCredentials:true})
    // console.log(res.data)
    setUpdated(true)

  }
  catch(err){
    console.log(err)
    setUpdated(false)
  }

}

const handleUserDelete=async()=>{
  try{
    const res=await axios.delete(`${URL}/users/${user._id}`,{withCredentials:true})
    navigate("/")
    // console.log(res.data)

  }
  catch(err){
    console.log(err)
  }
}
// console.log(user)
const fetchUserPosts=async ()=>{
  try{
    const res=await axios.get(`${URL}/posts/user/${user._id}`)
    // console.log(res.data)
    setPosts(res.data)


  }
  catch(err){
    console.log(err)
  }
}

useEffect(()=>{
  fetchProfile()

},[param])

useEffect(()=>{
  fetchUserPosts()

},[param])

  return (
    <div>
      
      <div className="bg-gradient-to-tl from-[#1f1f20] to-[#131f2e] min-h-screen mt-[64px] px-8 md:px-[200px] py-1 md:ml-64 flex md:flex-row flex-col-reverse md:items-start items-start">
        <div className="flex flex-col md:w-[70%] w-full mt-8 md:mt-0">
          <h1 className="text-xl font-bold mb-4 text-teal-400">Your posts:</h1>
          {posts?.map((p)=>(
            <ProfilePosts key={p._id} p={p}/>
          ))}
        </div>
        <div className="md:sticky md:top-12  flex justify-start md:justify-end items-start md:w-[30%] w-full md:items-end ">
        <div className=" flex flex-col space-y-4 items-start">
        <h1 className="text-xl text-teal-400 font-bold mb-4">Profile</h1>
          <input onChange={(e)=>setName(e.target.value)} value={name} className="outline-none border border-gray-300 rounded-xl px-4 py-2 bg-gray-600 text-white" placeholder="Your name" type="text"/>
          <input onChange={(e)=>setEmail(e.target.value)} value={email} className="outline-none border border-gray-300 rounded-xl px-4 py-2 bg-gray-600 text-white" placeholder="Your email" type="email"/>
          {/* <input onChange={(e)=>setPassword(e.target.value)} value={password} className="outline-none px-4 py-2 text-gray-500" placeholder="Your password" type="password"/> */}
          <div className="flex items-center space-x-4 mt-8">
            <button onClick={handleUserUpdate} className="text-white font-semibold bg-teal-400 px-4 py-2">Update</button>
            <button onClick={handleUserDelete} className="text-white font-semibold bg-teal-400 px-4 py-2">Delete</button>
          </div>
          {updated && <h3 className="text-green-500 text-sm text-center mt-4">user updated successfully!</h3>}
        </div>
          
        </div>
      </div>
 
    </div>
  )
}

export default Profile