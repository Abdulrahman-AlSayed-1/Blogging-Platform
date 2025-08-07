
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Landing, Home, Profile, Register, Login } from './Pages'
import WithAuth from "./HOC/WithAuth"
import { Footer, Navbar } from './Components'
import { Toaster } from 'react-hot-toast'
import { createContext, useState } from 'react'
export const formContext = createContext()
function App() {
   const ProtectedHome = WithAuth(Home)
   const ProtectedProfile= WithAuth(Profile)
   const [showForm , setShowForm] = useState({
    show:false,
    type:null,
    postId:null
   })

  return (
    <>
      <BrowserRouter>
        <div className='flex flex-col min-h-screen'>
          <formContext.Provider value={{showForm ,setShowForm}}>
            <Navbar/>
            <div className='grow'>
              <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/home" element={<ProtectedHome/>} />
                <Route path="/profile" element={<ProtectedProfile />} />
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
            <Footer/>
          </formContext.Provider>
        </div> 
      </BrowserRouter>
    </>
  )
}

export default App

