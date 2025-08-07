
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Landing, Home, Profile, Register, Login } from './Pages'
import WithAuth from "./HOC/WithAuth"
import { Navbar } from './Components'
import { Toaster } from 'react-hot-toast'
import { createContext, useState } from 'react'
// export const formContext = createContext()
function App() {
   const ProtectedHome = WithAuth(Home)
   const [showForm , setShowForm] = useState({
    show:false,
    type:null,
    postId:null
   })
  return (
    <>
      <BrowserRouter>
        <div className='flex flex-col min-h-screen'>
          <Navbar  showFormState={[showForm,setShowForm]}/>
          <div className='grow'>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/home" element={<ProtectedHome showFormState={[showForm,setShowForm]}/>} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
            </Routes>
            <Toaster
                toastOptions={{
                  style: {
                    background: '#11212D',
                    color: '#CCD0CF',
                  },
               }}
            />
          </div>
        </div> 
      </BrowserRouter>
    </>
  )
}

export default App

