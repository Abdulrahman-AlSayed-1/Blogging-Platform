import { memo, useState } from "react";
import defaultImage from "../../public/Imgs/image_placeholder.png";
import { FaUser, FaCalendar } from "react-icons/fa";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { deletePost, displayForm } from "../Redux/Slices/CRUD";

function PostCard({ post }) {
  const deleteStatus = useSelector((state) => state.deleteStatus);
  const errorMessage = useSelector((state) => state.errorMessage);

  const dispatch = useDispatch();
  const { id, username, title, content, date, image } = post;
  const [imgURL, setImgURL] = useState(image || defaultImage);
  return (
    <div>
      <div className="bg-storm-800 rounded-xl overflow-hidden shadow-xl shadow-storm-700/50 relative hover:scale-[1.05] transition-all duration-300">
        <div className="w-full h-[400px]">
          <img
            src={imgURL}
            alt={title}
            className={`w-full h-full object-cover ${
              imgURL === defaultImage ? "invert" : "invert-0"
            } `}
            onError={() => setImgURL(defaultImage)}
          />
          <div
            className={`brightness-overlay ${
              imgURL === defaultImage ? "hidden" : null
            }`}
          ></div>
        </div>
        <div className="absolute bottom-4 left-2 right-4 flex flex-col gap-3">
          <h3 className="text-storm-400 font-bold tracking-wide">{title}</h3>
          <p className="text-storm-500 text-xs">{content}</p>
          <div className="flex justify-between">
            <span className="text-xs text-storm-500 flex gap-2">
              <FaCalendar /> {date}
            </span>
            <span className="text-xs text-storm-500 flex gap-2">
              <FaUser /> {username}
            </span>
          </div>
          {JSON.parse(localStorage.getItem("user")).username === username && (
            <div className="mt-auto flex justify-end gap-3">
              <button
                type="button"
                className="text-storm-500 text-xs md:text-sm md:px-4 px-3 py-2 bg-storm-800 rounded hover:bg-storm-900/70"
                onClick={() => {
                  dispatch(displayForm({ type: "patch", postID: id , display:true}));
                }}
              >
                Edit
              </button>
              <button
                type="button"
                className="text-storm-500 text-xs  md:text-sm md:px-4 px-3 py-2 bg-red-900 rounded hover:bg-red-800"
                onClick={() => {
                  const removePost = () => {
                    try {
                      dispatch(deletePost(id));
                      if (deleteStatus === "failed") throw errorMessage;
                      toast.success("Post Deleted Successfully");
                    } catch (error) {
                      toast.error(error);
                      console.error("Error in Post Deletion :" + error);
                    }
                  };
                  removePost();
                }}
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export default memo(PostCard);
