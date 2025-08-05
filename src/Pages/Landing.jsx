import { FaFeatherAlt, FaPenNib, FaRegNewspaper } from "react-icons/fa";
import { BsStars } from "react-icons/bs";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <section className="relative w-full h-screen overflow-hidden bg-gradient-to-br from-storm-900 via-storm-800 to-black text-white">
   
      <div className="absolute inset-0 animate-pulse-slow pointer-events-none opacity-10">
        <FaFeatherAlt className="absolute top-10 left-10 text-[180px] text-storm-500" />
        <FaPenNib className="absolute top-1/4 right-20 text-[160px] text-storm-600" />
        <BsStars className="absolute bottom-10 left-1/3 text-[220px] text-storm-400" />
        <FaRegNewspaper className="absolute bottom-24 right-10 text-[200px] text-storm-700" />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
        <h1 className="text-5xl text-storm-500 sm:text-6xl font-extrabold tracking-wide drop-shadow-lg mb-6">
          Welcome to <span className="text-storm-500">BlogLoop</span>
        </h1>
        <p className="max-w-xl text-lg sm:text-xl text-storm-500 mb-8">
          Write, share, and loop your thoughts in the most elegant blog platform ever built.
        </p>
        <Link to="/register" className="px-6 py-3 bg-storm-600 hover:bg-storm-500 text-white font-semibold rounded-full transition duration-300 shadow-md">
          Get Started
        </Link>
      </div>
    </section>
  );
}
