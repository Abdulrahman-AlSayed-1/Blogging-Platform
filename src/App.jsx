import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Landing, Home, Profile, Register, Login } from "./Pages";
import WithAuth from "./HOC/WithAuth";
import { Footer, Navbar } from "./Components";
import { Toaster } from "react-hot-toast";

function App() {
  const ProtectedHome = WithAuth(Home);
  const ProtectedProfile = WithAuth(Profile);
  return (
    <>
      <BrowserRouter>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <div className="grow relative">
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/home" element={<ProtectedHome />} />
              <Route path="/profile" element={<ProtectedProfile />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
            </Routes>
            <Toaster
              toastOptions={{
                style: {
                  background: "#11212D",
                  color: "#CCD0CF",
                },
                position: "top-right",
                duration: 1500,
              }}
            />
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
