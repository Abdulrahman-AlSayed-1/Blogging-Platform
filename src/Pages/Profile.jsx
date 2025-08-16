import axios from "axios";
import { useRef } from "react"
import toast from "react-hot-toast";
import { FaEnvelope, FaLock, FaUserCheck,FaCheck, FaFacebook, FaGithub, FaLinkedin } from 'react-icons/fa';
import profilePicture from "../../public/Imgs/Profile_Picture_Placeholder.png"
export default function Profile() {
  const user = JSON.parse(localStorage.getItem("user"))
  const linkedin = useRef(null)
  const github = useRef(null)
  const facebook = useRef(null)

  const storeAccount = async (platform,accountLink)=>{
    const githubRegex =  /https?:\/\/(www\.)?github\.com\/[A-Za-z0-9_-]+(\/[A-Za-z0-9_.-]+)?/gi;
    const facebookRegex = /https?:\/\/(www\.)?facebook\.com\/[A-Za-z0-9_.-]+/gi;
    const linkedinRegex = /^https?:\/\/(www\.)?linkedin\.com\/in\/[a-zA-Z0-9-_]+\/?$/i;
  
    const regexMap = {
      github: githubRegex,
      facebook: facebookRegex,
      linkedin: linkedinRegex,
    };
    const selectedRegex = regexMap[platform];

    if (!accountLink.trim()) {
      toast.error("Please Fill Field First")
      return;
    }
    else if (!selectedRegex.test(accountLink.trim())) {
      toast.error(`Incorrect ${platform} URL Format`)
      return;
    }

    try{
      await axios.patch(`http://localhost:3000/users/${user.id}`, {[platform]:accountLink})
      toast.success(platform + " Account Saved Successfully")
      localStorage.setItem("user", JSON.stringify({...user , [platform]:accountLink }))
    }catch(error)
    {
      toast.error("Error in Storing Account Link")
      console.error("Error in Storing Account Link "+ error)
    }
  }
  return (
    <section className="container mt-15 md:mt-5 mx-auto min-h-[80vh] flex justify-center items-center">
       <div className="w-[90%] md:w-auto p-5 bg-storm-800/50 rounded-2xl relative">
          <h3 className="username-style">{user.username}</h3>
           <div className="flex flex-wrap-reverse text-storm-400 py-5 md:px-5">
             <ul className="space-y-2 w-full md:w-1/2">
              <li className="flex items-center flex-wrap">
                <FaEnvelope className="mr-2" />
                <strong className="mr-1">Email:</strong>
                <span className="text-sm text-storm-500">{user.email}</span>
              </li>
              <li className="flex items-center">
                <FaLock className="mr-2" />
                <strong className="mr-1">Password:</strong>
                <span className="text-sm text-storm-500">••••••••</span>
              </li>
              <li className="flex items-center">
                <FaUserCheck className="mr-2" />
                <strong className="mr-1">Status:</strong>
                <span className="text-sm text-green-400">Active</span>
              </li>
              <li className="flex items-center flex-wrap">
                <FaFacebook className="mr-2" />
                <strong className="mr-1">Facebook:</strong>
                {
                  user.facebook ? ( 
                  <a href={user.facebook} target="_blank" rel="noopener noreferrer" className="text-sm text-storm-500 underline">
                   Click here</a>) : (
                     <div className="relative">
                          <input type="text" ref={facebook} placeholder="Enter URL" className="text-sm border-b-1 ms-1 focus:outline-none max-w-full pe-5" />
                          <button className="absolute right-0 top-2 text-xs hover:text-storm-600"  onClick={()=>storeAccount("facebook" , facebook.current.value)} >
                            <FaCheck/>
                          </button>
                     </div>
                   )
                }
              </li>
              <li className="flex items-center flex-wrap">
                <FaGithub className="mr-2" />
                <strong className="mr-1">GitHub:</strong>
                 {
                  user.github ? ( 
                  <a href={user.github} target="_blank" rel="noopener noreferrer" className="text-sm text-storm-500 underline">
                    Click here</a>) :(
                     <div className="relative">
                          <input type="text" ref={github} placeholder="Enter URL" className="text-sm border-b-1 ms-1 focus:outline-none max-w-full pe-5" />
                          <button className="absolute right-0 top-2 text-xs hover:text-storm-600"  onClick={()=>storeAccount("github" , github.current.value)}>
                            <FaCheck/>
                          </button>
                     </div>
                   )
                }
              </li>
              <li className="flex items-center flex-wrap">
                <FaLinkedin className="mr-2" />
                <strong className="mr-1">LinkedIn:</strong>
                {
                  user.linkedin ? ( 
                  <a href={user.linkedin} target="_blank" rel="noopener noreferrer" className="text-sm text-storm-500 underline">
                    Click here </a>) :(
                     <div className="relative">
                          <input type="text" ref={linkedin} placeholder="Enter URL" className="text-sm border-b-1 ms-1 focus:outline-none max-w-full pe-5" />
                          <button className="absolute right-0 top-2 text-xs hover:text-storm-600"  onClick={()=>storeAccount("linkedin" , linkedin.current.value)}>
                            <FaCheck/>
                          </button>
                     </div>
                   )
                }
              </li>
            </ul>
            <div className="w-full md:w-1/2 md:ps-5 mb-3 md:mb-0 flex justify-center items-center">
                <span className="welcome-gradient">WELCOME</span>
            </div>
          </div>
          <div className="absolute -top-23 right-1/2 translate-x-1/2 md:translate-x-0 md:-right-15 md:-top-15">
              <div className="rounded-full bg-storm-400">
                <img src={profilePicture} alt="profile picture placeholder" className="w-28 h-28 object-cover" />
              </div>
          </div>
       </div>   
    </section>
  )
}
