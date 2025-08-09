import { useContext, useEffect, useState } from "react";
import { PostCard, PostForm } from "../Components";
import axios from "axios";
import { MdError } from "react-icons/md";
import { formContext } from "../App";

export default function Home() {
  const {showForm} = useContext(formContext)
  const [posts , setPosts] = useState([])
  const [isLoading , setIsLoading] = useState(false)
  const [fetchError , setFetchError] = useState({
    isError:false,
    errorMessage:null
  })
  useEffect(()=>{
     let isMounted = true
     const fetchPosts = async()=>{
        try{
          setIsLoading(true)  
          const posts = (await axios.get("http://localhost:3000/posts")).data
          setPosts(posts)
        } catch (error){
            const cloned = {...fetchError}
            cloned.errorMessage = error
            cloned.isError = true
            setFetchError(cloned)
        } finally{
            setIsLoading(false)
        }
     }
     fetchPosts()
     return ()=>{
        isMounted = false  // cleanup purpose
     }
  },[])
   if(isLoading)
    {
        return (
            <div className="flex justify-center items-center h-[80vh]">
                <div className="w-8 h-8 border-4 border-storm-500 border-y-transparent rounded-full animate-spin"></div>
            </div>
        );
    }
    else if(fetchError.isError)
    {
        return (
              <div className="flex justify-center items-center h-[80vh]">
                <MdError className="md:text-2xl text-red-500 me-3" />
                <h3 className="md:text-2xl font-semibold text-storm-400">{fetchError.errorMessage}</h3>
              </div>
        );
    }

  return (
    <>
    
        <main className={`container mx-auto p-5 ${showForm.show ? " blur-xl" : ""}`}>
            <h2 className="m-5 text-2xl md:text-4xl font-semibold text-storm-500 text-center recent-posts">Recent Posts</h2>
            <div className="container mx-auto flex flex-wrap">
               {posts.map((post)=>(
                 <div key={post.id} className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33%]">
                    <div className="p-2">
                        <PostCard postData = {{image:post.image, title:post.title ,content:post.content , date:post.date , id:post.id ,userId:post.userId}}/>
                    </div>
                </div>
               ))}
            </div>
        </main>
        {showForm.show && <PostForm/>}
    </>
  )
}
