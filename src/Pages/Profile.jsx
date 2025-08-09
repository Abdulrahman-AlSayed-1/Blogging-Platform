import axios from "axios";
import { useMemo, useRef } from "react"
import toast from "react-hot-toast";
import { FaEnvelope, FaLock, FaUserCheck,FaCheck, FaFacebook, FaGithub, FaLinkedin } from 'react-icons/fa';

export default function Profile() {
  const user = JSON.parse(localStorage.getItem("user"))
  const socialMedia = JSON.parse(localStorage.getItem("socialMedia"))||{}
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
      toast.error("Please Fill Field First", { position: "top-right" });
      return;
    }
    else if (!selectedRegex.test(accountLink.trim())) {
      toast.error(`Incorrect ${platform} URL Format`, { position: "top-right" });
      return;
    }

    try{
      await axios.patch(`http://localhost:3000/users/${user.id}`, {[platform]:accountLink})
      toast.success(platform + " Account Saved Successfully" , {position:"top-right" , duration:1000})
      localStorage.setItem("socialMedia", JSON.stringify({...socialMedia , [platform]:accountLink }))
    }catch(error)
    {
      toast.error("Error in Storing Account Link" , {position:"top-right" , duration:1000})
      console.error("Error in Storing Account Link "+ error)
    }
  }
  return (
    <div className="container mx-auto h-[80vh] flex justify-center items-center">
       <div className="w-[90%] md:w-[80%] lg:w-[50%] p-3 bg-storm-800 rounded-2xl">
          <h3 className="text-2xl font-semibold text-storm-400 text-center border-b-1">{user.username}</h3>
           <div className="flex flex-col text-storm-400 p-5">
             <ul className="space-y-2">
              <li className="flex items-center">
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
                <span className="text-sm text-storm-500">Active</span>
              </li>
              <li className="flex items-center">
                <FaFacebook className="mr-2" />
                <strong className="mr-1">Facebook:</strong>
                {
                  socialMedia.facebook ? ( 
                  <a href={socialMedia.facebook} target="_blank" rel="noopener noreferrer" className="text-sm text-storm-500 underline">
                   Click here</a>) : (
                     <div className="relative">
                          <input type="text" ref={facebook} placeholder="Enter URL" className="text-sm border-b-1 ms-1 focus:outline-none pe-5" />
                          <button className="absolute right-0 top-2 text-xs hover:text-storm-600"  onClick={()=>storeAccount("facebook" , facebook.current.value)} >
                            <FaCheck/>
                          </button>
                     </div>
                   )
                }
              </li>
              <li className="flex items-center">
                <FaGithub className="mr-2" />
                <strong className="mr-1">GitHub:</strong>
                 {
                  socialMedia.github ? ( 
                  <a href={socialMedia.github} target="_blank" rel="noopener noreferrer" className="text-sm text-storm-500 underline">
                    Click here</a>) :(
                     <div className="relative">
                          <input type="text" ref={github} placeholder="Enter URL" className="text-sm border-b-1 ms-1 focus:outline-none pe-5" />
                          <button className="absolute right-0 top-2 text-xs hover:text-storm-600"  onClick={()=>storeAccount("github" , github.current.value)}>
                            <FaCheck/>
                          </button>
                     </div>
                   )
                }
              </li>
              <li className="flex items-center">
                <FaLinkedin className="mr-2" />
                <strong className="mr-1">LinkedIn:</strong>
                {
                  socialMedia.linkedin ? ( 
                  <a href={socialMedia.linkedin} target="_blank" rel="noopener noreferrer" className="text-sm text-storm-500 underline">
                    Click here </a>) :(
                     <div className="relative">
                          <input type="text" ref={linkedin} placeholder="Enter URL" className="text-sm border-b-1 ms-1 focus:outline-none pe-5" />
                          <button className="absolute right-0 top-2 text-xs hover:text-storm-600"  onClick={()=>storeAccount("linkedin" , linkedin.current.value)}>
                            <FaCheck/>
                          </button>
                     </div>
                   )
                }
              </li>
            </ul>
           </div>
       </div>
    </div>
  )
}
