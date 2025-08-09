import { FaCalendar, FaUser } from "react-icons/fa";
import homeImage from "../../public/Imgs/home_image.jpg";
export default function Main() {
  return (
    <div className="container p-3 md:min-h-[50vh] lg:min-h-screen my-3 flex flex-wrap-reverse mx-auto">
      <div className="w-full md:w-1/2 flex flex-col md:justify-center items-center text-center space-y-4">
        <h1 className="text-4xl lg:text-6xl text-storm-400">TRENDING POST</h1>
        <h3 className="text-2xl lg:text-4xl text-storm-500 home-title">
          TESLA THE FUTURE
        </h3>
        <p className="text-sm lg:text-lg text-storm-600 italic">
          Tesla’s innovations and expanding EV market lead transportation’s
          future. Government incentives, improved batteries, and autonomous tech
          accelerate electric vehicle adoption worldwide in 2025.
        </p>
        <div className="flex justify-between w-full p-3">
          <span className="text-xs text-storm-500 flex gap-2">
            <FaCalendar />
            08/05/2025
          </span>
          <span className="text-xs text-storm-500 flex gap-2">
            <FaUser />
            Abdulrahman Al-Sayed
          </span>
        </div>
      </div>
      <div className="w-full md:w-1/2 flex justify-center items-center">
        <img
          src={homeImage}
          alt="home image"
          className="max-w-full max-h-full object-cover animate-pulse"
        />
      </div>
    </div>
  );
}
