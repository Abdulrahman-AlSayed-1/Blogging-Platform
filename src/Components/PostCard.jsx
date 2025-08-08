import { memo, useContext, useEffect, useState } from "react";
import defaultImage from "../../public/Imgs/image_placeholder.png"
import axios from "axios";
import { formContext } from "../App";
import { FaUser ,FaCalendar } from "react-icons/fa";
import toast from "react-hot-toast";

function PostCard({post , setPosts}) {
   const {showForm ,setShowForm} = useContext(formContext)
   const {id , userId ,title , content , image , date} = post
   const [username , setUsername] = useState("")
   useEffect(()=>{
      const fetchUsername = async()=>{
        try{
          const username = (await axios.get(`http://localhost:3000/users?id=${userId}`)).data[0].username
          setUsername(username)
        }catch(error)
        {
          console.error("Error in Fetching username")
        }
      }
      fetchUsername()
    },[userId])
  return (
    <div>
       <div className="bg-storm-800 rounded-xl overflow-hidden shadow-xl shadow-storm-700/50 relative">
          <div className="w-full h-[500px]">
            <img src={!image ? defaultImage : image} alt={title} className="w-full h-full object-cover" onError={(e)=> e.target.src = defaultImage}/>
            <div className="brightness-overlay"></div>
          </div>
          <div className="absolute bottom-4 left-2 right-4 flex flex-col gap-3">
            <h3 className="text-xl text-storm-400 font-bold">{title}</h3>
            <p className="text-storm-500 text-sm">{content}</p>
            <div className="flex justify-between">
                <span className="text-xs text-storm-500 flex gap-2"><FaCalendar/> {date}</span>
                <span className="text-xs text-storm-500 flex gap-2"><FaUser/> {username}</span>
            </div>
            { JSON.parse(localStorage.getItem("user")).id === userId &&
              <div className="mt-auto flex justify-end gap-3">
                  <button className="text-storm-500 text-xs md:text-sm md:px-4 px-3 py-2 bg-storm-800 rounded hover:bg-storm-900/70" onClick={()=>{
                      setShowForm({...showForm , postId:id , type:"patch" , show:true})
                  }}>Edit</button>
                  <button className="text-storm-500 text-xs  md:text-sm md:px-4 px-3 py-2 bg-red-900 rounded hover:bg-red-800" onClick={()=>{
                      const deletePost = async ()=>{
                        try{
                         await axios.delete(`http://localhost:3000/posts/${id}`)
                         toast.success("Post Deleted Successfully")
                         setPosts(oldPosts => oldPosts.filter(post=> post.id!==id))
                        } catch(error)
                        {
                          console.error("Post deletion Error "+ error)
                        }
                      }
                      deletePost()
                  }}>Delete</button>
              </div>
            }
          </div>
        </div> 
    </div>
  )
}
export default memo(PostCard)