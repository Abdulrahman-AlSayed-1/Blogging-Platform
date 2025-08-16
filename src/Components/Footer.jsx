import { useLocation } from "react-router-dom";
import logo from "../../public/Imgs/LogoNoBg.png";
import { FaGithub, FaLinkedin } from "react-icons/fa";
function Footer() {
  const location = useLocation();
  return (
    <footer className={`${location.pathname === "/" && "fixed inset-x-0 bottom-0 z-20"} container gap-2 lg:gap-0 flex flex-wrap mx-auto p-3 text-xs text-storm-500`}>
      <div className="md:w-1/2 flex items-center">
        <img
          src={logo}
          alt="Website Logo"
          className="w-14 md:w-20 inline-block"
        />
        <span className="inline-block ms-3">
          &copy; BlogLoop 2025. All Rights Reserved
        </span>
      </div>
      <div className="w-full lg:w-1/2 flex flex-wrap items-center md:justify-end gap-2 md:gap-0">
        {/* Abdulrahman */}
        <div className="w-full md:w-1/2 flex justify-between lg:justify-end items-center">
          <p className="font-semibold mb-3 md:mb-0">Abdulrahman Al-Sayed:</p>
          <ul className="flex gap-3 ms-3">
            <li className="flex justify-center bg-storm-400 items-center w-8 h-8 rounded-full hover:rotate-360 transition-all duration-500 ">
              <a
                className="text-blue-700 text-lg"
                href="https://www.linkedin.com/in/abdulrahmanal-sayed/"
                rel="noopener noreferrer"
                target="_blank"
              >
                <FaLinkedin />
              </a>
            </li>
            <li className="flex justify-center items-center w-8 h-8  bg-storm-400 rounded-full hover:rotate-360 transition-all duration-500">
              <a
                className="text-lg text-gray-950"
                href="https://github.com/Abdulrahman-AlSayed-1?tab=repositories"
                rel="noopener noreferrer"
                target="_blank"
              >
                <FaGithub />
              </a>
            </li>
          </ul>
        </div>
        {/* Mohammed */}
        <div className="w-full md:w-1/2 ps-0 md:ps-3 lg:ps-0 flex justify-between lg:justify-end items-center">
          <p className="font-semibold  mb-3 md:mb-0">Mohammed Nasr:</p>
          <ul className="flex gap-3 ms-3">
            <li className="flex justify-center bg-storm-400 items-center w-8 h-8 rounded-full hover:rotate-360 transition-all duration-500 ">
              <a
                className="text-blue-700 text-lg"
                href="https://www.linkedin.com/in/mohamed-nasr-7730a7296/"
                rel="noopener noreferrer"
                target="_blank"
              >
                <FaLinkedin />
              </a>
            </li>
            <li className="flex justify-center items-center w-8 h-8  bg-storm-400 rounded-full hover:rotate-360 transition-all duration-500">
              <a
                className="text-lg text-gray-950"
                href="https://github.com/M7mednsr?tab=repositories"
                rel="noopener noreferrer"
                target="_blank"
              >
                <FaGithub />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
