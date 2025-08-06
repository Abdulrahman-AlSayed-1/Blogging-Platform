import { useNavigate } from "react-router-dom"

export default function Navbar() {
  const navigate  = useNavigate()  
  
  return (
    <nav className="sticky bg-storm-700/60 px-5 py-3 shadow-lg shadow-storm-600/40">
       <div className="flex justify-between">
          <div>
            <span className="text-storm-500">here we will put Logo</span>
            <img src="" alt="" className="w-32"/>
          </div>
          <div>
              <button className="text-storm-500 text-sm px-4 py-2 bg-storm-900 rounded hover:bg-storm-900/70 me-5">Create Post</button>
              <button onClick={()=>{
                /*localStorage.setItem("isLogged" , false)*/
                navigate("/login")
              }} className="text-storm-500 text-sm px-4 py-2 bg-storm-900 rounded hover:bg-storm-900/70">Login</button>
          </div>
       </div>
    </nav>
  )
}
