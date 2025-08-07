import { useContext, useEffect, useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import logo from "../../public/Imgs/LogoNoBg.png"
import { formContext } from "../App"
export default function Navbar() {
  const {showForm ,setShowForm} = useContext(formContext)
  const navigate  = useNavigate()  
  const location = useLocation()
  const [buttons , setButtons] = useState(null)
  useEffect(()=>{
    if (location.pathname === "/home"){
        setButtons(
            <div className="flex justify-end gap-2">
                <button onClick={createPost} className="text-storm-500 text-sm px-4 py-2 bg-storm-900 rounded-xl hover:bg-storm-900/70">Create Post</button>
                <button onClick={()=>navigate("/profile")} className="text-storm-500 text-sm px-4 py-2 bg-storm-900 rounded-xl hover:bg-storm-900/70">Profile</button>
                <button onClick={handleLogout} className="text-storm-500 text-sm px-4 py-2 bg-storm-900 rounded-xl hover:bg-storm-900/70">Logout</button>
            </div>)
    }
    else if (location.pathname === "/profile"){
        setButtons(
            <div className="flex justify-end">
                <button onClick={handleLogout} className="text-storm-500 text-sm px-4 py-2 bg-storm-900 rounded-xl hover:bg-storm-900/70">Logout</button>
            </div>)
    }
    else{
        setButtons(null)
    }
  }, [location])
  const handleLogout = ()=>{
        localStorage.removeItem("isLogged")
        navigate("/login")
  }
  const createPost = ()=>{
    const cloned = {...showForm}
    cloned.show = true
    cloned.type ="post"
    setShowForm(cloned)
   }
  return (
    <nav className="sticky top-0 bg-storm-800/60 px-5 py-2 shadow-md shadow-storm-600/40">
       <div className="flex justify-between">
          <Link to="/home">
            <img src={logo} alt="logo" className="w-16"/>
          </Link>
          {buttons}
       </div>
    </nav>
  )
}
