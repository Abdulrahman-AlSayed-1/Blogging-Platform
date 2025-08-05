
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Landing, Home, Profile, Register, Login } from './Pages'
import { Navbar } from './Components'
function App() {

  return (
    <>
      <BrowserRouter>
        <div className='flex flex-col min-h-screen'>
          <Navbar/>
          <div className='grow'>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/home" element={<Home />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </div>
        </div> 
      </BrowserRouter>
    </>
  )
}

export default App

