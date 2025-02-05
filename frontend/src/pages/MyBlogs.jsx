import { Link, useLocation } from "react-router-dom"

import { useEffect, useState } from "react"
import axios from "axios"
import { URL } from "../url"
import HomePosts from "../components/HomePosts"
import Loader from "../components/LoadingSpinner"

import { useAuthStore } from "../store/authStore";


const MyBlogs = () => {
    const {search}=useLocation()
  // console.log(search)
  const [posts,setPosts]=useState([])
  const [noResults,setNoResults]=useState(false)
  const [loader,setLoader]=useState(false)
  const {user}= useAuthStore();
  // console.log(user)

  const fetchPosts=async()=>{
    setLoader(true)
    try{
      const res=await axios.get(`${URL}/posts/user/${user._id}`)
      // console.log(res.data)
      setPosts(res.data)
      if(res.data.length===0){
        setNoResults(true)
      }
      else{
        setNoResults(false)
      }
      setLoader(false)
      
    }
    catch(err){
      console.log(err)
      setLoader(true)
    }
  }

  useEffect(()=>{
    fetchPosts()

  },[search])

  return (


    <div>
        <div className="bg-gradient-to-tl from-[#1f1f20] to-[#131f2e] px-8 md:px-[200px] min-h-screen mt-[64px] py-1 md:ml-64">
        {loader?<div className="h-[40vh] flex justify-center items-center"><Loader/></div>:!noResults?
         posts.map((post)=>(
          <>
          <Link to={user?`/posts/post/${post._id}`:"/login"}>
          <HomePosts key={post._id} post={post}/>
          </Link>
          </>
          
        )):<h3 className="text-center font-bold mt-16">No posts available</h3>}
        </div>
      
    </div>

    
  )
}

export default MyBlogs