import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../../public/Imgs/LogoNoBg.png";
import { useDispatch } from "react-redux";
import { displayForm } from "../Redux/Slices/CRUD";
export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [buttons, setButtons] = useState(null);
  useEffect(() => {
    if (location.pathname === "/home") {
      setButtons(
        <div className="flex justify-end gap-2">
          <button 
            type="button"
            onClick={createPost}
            className="text-storm-500 border-b-1 text-sm px-4 py-2 rounded-xl hover:bg-storm-900/90"
          >
            Create Post
          </button>
          <button 
            type="button"
            onClick={() => navigate("/profile")}
            className="text-storm-500 border-b-1 text-sm px-4 py-2 rounded-xl hover:bg-storm-900/90"
          >
            Profile
          </button>
          <button 
            type="button"
            onClick={handleLogout}
            className="text-storm-500 border-b-1 text-sm px-4 py-2 rounded-xl hover:bg-storm-900/90"
          >
            Logout
          </button>
        </div>
      );
    } else if (location.pathname === "/profile") {
      setButtons(
        <div className="flex justify-end">
          <button 
            type="button"
            onClick={handleLogout}
            className="text-storm-500 border-b-1 text-sm px-4 py-2 rounded-xl hover:bg-storm-900/90"
          >
            Logout
          </button>
        </div>
      );
    } else {
      setButtons(null);
    }
  }, [location]);
  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };
  const createPost = () => {
    dispatch(displayForm({ type: "post", postID: null, display: true }));
  };
  return (
    <nav className={`${location.pathname === "/" ? "fixed" : "sticky"} z-20 inset-x-0 top-0 px-5 py-2`}>
      <div className="flex justify-between">
        <Link to="/home">
          <img src={logo} alt="BlogLoop Logo" className="w-16" />
        </Link>
        {buttons}
      </div>
    </nav>
  );
}
