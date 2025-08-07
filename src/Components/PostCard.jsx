import { useEffect, useState } from "react";
import defaultImage from "../../public/Imgs/image_placeholder.png"
import axios from "axios";
export default function PostCard({title , content , image ,date ,id ,showFormState}) {
   const [showForm ,setShowForm] = showFormState
   const [img ,setImg] = useState(null)   
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

  return (
    <div>
       <div className="grid grid-cols-9 md:min-h-56 bg-storm-800 rounded-3xl overflow-hidden shadow-xl shadow-storm-700/50">
          <div className="col-span-9 md:col-span-4 md:h-full bg-amber-200 card-rounded-custom">
            <img src={img} alt={title} className="w-full h-full object-cover"/>
          </div>
          <div className="col-span-9 md:col-span-5 px-4 py-6 flex flex-col gap-3">
            <h3 className="text-xl text-storm-400">{title}</h3>
            <p className="text-storm-500">{content}</p>
            <div className="flex justify-between">
                <span className="text-xs text-storm-600">{date}</span>
                <span className="text-xs text-storm-600">user: {JSON.parse(localStorage.getItem("user")).username}</span>
            </div>

            <div className="mt-auto flex justify-end gap-3">
                <button className="text-storm-500 text-xs md:text-sm md:px-4 px-3 py-2 bg-storm-900 rounded hover:bg-storm-900/70" onClick={()=>{
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
          </div>
        </div> 
    </div>
  )
}
