import { FaFeatherAlt, FaPenNib, FaRegNewspaper } from "react-icons/fa";
import { BsStars } from "react-icons/bs";
import { Link } from "react-router-dom";


export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-storm-900 via-storm-800 to-black text-white relative overflow-hidden">
      
      <div className="absolute inset-0 opacity-10 animate-pulse-slow pointer-events-none">
        <FaFeatherAlt className="absolute top-10 left-10 text-[180px] text-storm-500" />
        <FaPenNib className="absolute top-1/4 right-20 text-[160px] text-storm-600" />
        <BsStars className="absolute bottom-10 left-1/3 text-[220px] text-storm-400" />
        <FaRegNewspaper className="absolute bottom-24 right-10 text-[200px] text-storm-700" />
      </div>

      <main className="flex-1 flex items-center justify-center relative z-10 px-6 py-12">
        <div className="text-center max-w-2xl">
          <h1 className="text-5xl sm:text-6xl font-extrabold tracking-wide text-storm-500 mb-6 drop-shadow-lg">
            Welcome to <span className="text-storm-400 ">BlogLoop</span>
          </h1>
          <p className="text-lg sm:text-xl text-storm-300 mb-8">
            Write, share, and loop your thoughts in the most elegant blog platform ever built.
          </p>
          <Link
            to="/register"
            className="inline-block px-6 py-3 bg-storm-600 hover:bg-storm-500 text-white font-semibold rounded-full transition duration-300 shadow-md"
          >
            Get Started
          </Link>
        </div>
      </main>
        
...


    </div>
  );
}
