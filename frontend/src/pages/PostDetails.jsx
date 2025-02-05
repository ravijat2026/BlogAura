import { useNavigate, useParams } from "react-router-dom"
import Comment from "../components/Comment"
import {BiEdit} from 'react-icons/bi'
import {MdDelete} from 'react-icons/md'
import axios from "axios"
import { URL} from "../url.js"
import { useEffect, useState } from "react"
import { useAuthStore } from "../store/authStore.js"
import Loader from "../components/LoadingSpinner.jsx"


const PostDetails = () => {

  const postId=useParams().id
  const [post,setPost]=useState({})
  const {user}=useAuthStore();
  const [comments,setComments]=useState([])
  const [comment,setComment]=useState("")
  const [loader,setLoader]=useState(false)
  const navigate=useNavigate()
  

  const fetchPost=async()=>{
    try{
      const res= await axios.get(`${URL}/posts/${postId}`)
      // console.log(res.data)
      setPost(res.data)
    }
    catch(err){
      console.log(err)
    }
  }

  const handleDeletePost=async ()=>{

    try{
      const res=await axios.delete(`${URL}/posts/${postId}`,{withCredentials:true})
      console.log(res.data)
      navigate("/")

    }
    catch(err){
      console.log(err)
    }

  }

  useEffect(()=>{
    fetchPost()

  },[postId])

  const fetchPostComments=async()=>{
    setLoader(true)
    try{
      const res=await axios.get(`${URL}/comments/post/${postId}`)
      setComments(res.data)
      setLoader(false)

    }
    catch(err){
      setLoader(true)
      console.log(err)
    }
  }

  useEffect(()=>{
    fetchPostComments()

  },[postId])

  const postComment=async(e)=>{
    e.preventDefault()
    try{
      const res=await axios.post(`${URL}/comments/create`,
      {comment:comment,author:user.name,postId:postId,userId:user._id},
      {withCredentials:true})
      
      // fetchPostComments()
      // setComment("")
      window.location.reload(true)

    }
    catch(err){
         console.log(err)
    }

  }


  
  return (
    <div>
       
        {loader?<div className="bg-gradient-to-tl from-[#1f1f20] to-[#131f2e] h-[80vh] mt-[64px] py-2 flex justify-center items-center w-full md:ml-64"><Loader/></div>:<div className="bg-gradient-to-tl from-[#1f1f20] to-[#131f2e] mt-[64px] px-8 py-4 md:px-[200px] md:ml-64">
        <div className="flex justify-between items-center">
         <h1 className="text-2xl font-bold text-white md:text-3xl">{post.title}</h1>
         {user?._id===post?.userId && <div className="flex items-center justify-center space-x-2 text-gray-300">
            <p className="cursor-pointer" onClick={()=>navigate("/edit/"+postId)} ><BiEdit/></p>
            <p className="cursor-pointer" onClick={handleDeletePost}><MdDelete/></p>
         </div>}
        </div>
        <div className="flex items-center text-gray-400 justify-between mt-2 md:mt-4">
        <p>@{post.name}</p>
       <div className="flex space-x-2">
       <p>{new Date(post.updatedAt).toString().slice(0,15)}</p>
       <p>{new Date(post.updatedAt).toString().slice(16,24)}</p>
       </div>
        </div>
        <img src={post.photo} className="w-full h-80 object-cover mx-auto mt-8" alt=""/>
         <p className="mx-auto mt-8 text-white">{post.desc}</p>
         <div className="flex items-center text-teal-400 mt-8 space-x-4 font-semibold">
          <p>Categories:</p>
          <div className="flex justify-center items-center space-x-2">
          {post.categories?.map((c,i)=>(
            <>
            <div key={i} className="bg-gray-700 text-white rounded-lg px-3 py-1">{c}</div>
            </>
            
          ))}
            
          </div>
         </div>
         <div className="flex flex-col mt-4">
         <h3 className="mt-6 mb-4 font-semibold text-teal-400">Comments:</h3>
         {comments?.map((c)=>(
          <Comment key={c._id} c={c} post={post} />
         ))}
           
         </div>
         {/* write a comment */}
         <div className="w-full flex flex-col mt-4 gap-1 md:flex-row">
          <input onChange={(e)=>setComment(e.target.value)} type="text" placeholder="Write a comment" className="md:w-[80%] bg-gray-600 text-white outline-none py-2 px-4 mt-4 md:mt-0 border rounded-xl"/>
          <button onClick={postComment} className="bg-teal-400 text-sm text-white px-2 py-2 md:w-[20%] mt-4 md:mt-0 border rounded-xl">Add Comment</button>
         </div>
        </div>}

    </div>
  )
}

export default PostDetails