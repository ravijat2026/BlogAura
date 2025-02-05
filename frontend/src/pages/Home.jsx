import axios from "axios"
import HomePosts from "../components/HomePosts"
import { URL } from "../url"
import { useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import LoadingSpinner from '../components/LoadingSpinner'
import { useAuthStore } from "../store/authStore"
 

const Home = () => {
  
  const {search}=useLocation()

  const [posts,setPosts]=useState([])
  const [noResults,setNoResults]=useState(false)
  const [loader,setLoader]=useState(false)
  const {user}=useAuthStore();
  

  const fetchPosts=async()=>{
    setLoader(true)
    try{
      const res=await axios.get(`${URL}/posts/${search}`)
  
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
    
    <>
    
<div className="px-8 py-1 md:ml-64 mt-[64px] bg-gradient-to-tl from-[#1f1f20] to-[#131f2e] min-h-screen">
        {loader?<div className="min-h-screen flex justify-center items-center w-full"><LoadingSpinner/></div>:!noResults?
        posts.map((post)=>(
          <>
          <Link to={user? `/posts/post/${post._id}` :"/login"}>
          <HomePosts key={post._id} post={post}/>
          </Link>
          </>
          
        )):<h3 className="text-center font-bold mt-16">No posts available</h3>}
    </div>
    
    </>
    
  )
}

export default Home