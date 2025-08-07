import { useContext, useEffect, useState } from "react";
import defaultImage from "../../public/Imgs/image_placeholder.png"
import axios from "axios";
import { formContext } from "../App";
export default function PostCard({postData}) {
   const {showForm ,setShowForm} = useContext(formContext)
   const {id , userId ,title , content , image , date} = postData
   const [img ,setImg] = useState(null) 
   const [username , setUsername] = useState("")
   useEffect(()=>{
    let isMounted = true;
    function isValidImageUrl(url) {
        return new Promise((resolve) => { //checking if image is valid
            const img = new Image();            
            img.src = url;
            img.onload = () => resolve(true);  
            img.onerror = () => resolve(false); 
        });
    }
    isValidImageUrl(image).then((isValid) => {
        if (isValid) {
         setImg(image)
        } else {
         setImg(defaultImage)
        }
     });
    return () => {
      isMounted = false; // cleanup purpose
     };
   },[image]) 
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
  },[])
  return (
    <div>
       <div className={"bg-storm-800 rounded-3xl overflow-hidden shadow-xl shadow-storm-700/50 relative"}>
          <div className="w-full h-[500px] md:h-[600px]">
            <img src={img} alt={title} className="w-full h-full object-cover brightness-50"
            />
          </div>
          <div className="absolute bottom-4 left-2 right-4 flex flex-col gap-3">
            <h3 className="text-xl text-storm-400">{title}</h3>
            <p className="text-storm-500">{content}</p>
            <div className="flex justify-between">
                <span className="text-xs text-storm-500">{date}</span>
                <span className="text-xs text-storm-500">user: {username}</span>
            </div>
            { JSON.parse(localStorage.getItem("user")).id === userId &&
              <div className="mt-auto flex justify-end gap-3">
                  <button className="text-storm-500 text-xs md:text-sm md:px-4 px-3 py-2 bg-storm-800 rounded hover:bg-storm-900/70" onClick={()=>{
                      const cloned = {...showForm}
                      cloned.show = true
                      cloned.type ="patch"
                      cloned.id = id
                      setShowForm(cloned)
                  }}>Edit</button>
                  <button className="text-storm-500 text-xs  md:text-sm md:px-4 px-3 py-2 bg-red-900 rounded hover:bg-red-800" onClick={()=>{
                      const deletePost = async ()=>{
                        try{
                        await axios.delete(`http://localhost:3000/posts/${id}`)
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
