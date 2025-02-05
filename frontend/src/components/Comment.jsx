import axios from "axios"
import { BiEdit } from "react-icons/bi"
import { MdDelete } from "react-icons/md"
import { URL } from "../url.js"
import { useAuthStore } from "../store/authStore.js"

const Comment = ({c,post}) => {

  const {user}= useAuthStore();
  const deleteComment=async(id)=>{
    try{
      await axios.delete(URL+"/comments/"+id,{withCredentials:true})
      window.location.reload(true)
    }
    catch(err){
      console.log(err)
    }
  }

  return (
    <div className="px-2 py-2 bg-gray-700 rounded-lg my-2">
           <div className="flex items-center justify-between">
            <h3 className="font-bold text-gray-400">@{c.author}</h3>
            <div className="flex justify-center items-center text-gray-400 space-x-4">
            <p>{new Date(c.updatedAt).toString().slice(0,15)}</p>
            <p>{new Date(c.updatedAt).toString().slice(16,24)}</p>
            {user?._id===c?.userId ?
              <div className="flex items-center justify-center text-teal-400 space-x-2">
                    <p className="cursor-pointer" onClick={()=>deleteComment(c._id)}><MdDelete/></p>
                </div>:""}
                
            </div>
           </div>
           <p className="px-4 mt-2 text-white">{c.comment}</p>

           </div>
  )
}

export default Comment