import { useEffect } from "react";
import { Main, PostCard, PostForm } from "../Components";
import { MdError } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../Redux/Slices/CRUD";
export default function Home() {
  const posts = useSelector((state) => state.posts);
  const fetchStatus = useSelector((state) => state.fetchStatus);
  const errorMessage = useSelector((state) => state.errorMessage);
  const formState = useSelector((state) => state.formState);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  if (fetchStatus === "loading") {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <div className="w-8 h-8 border-4 border-storm-500 border-y-transparent rounded-full animate-spin"></div>
      </div>
    );
  } else if (fetchStatus === "failed") {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <MdError className="md:text-2xl text-red-500 me-3" />
        <h3 className="md:text-2xl font-semibold text-storm-400">
          {errorMessage}
        </h3>
      </div>
    );
  }
  if (!posts.length && fetchStatus === "fulfilled") {
    return (
      <>
        <div
          className={`text-center py-10 ${formState.display ? " blur-xl" : ""}`}
        >
          <h3 className="text-xl text-storm-400">No posts found</h3>
        </div>
        {formState.display && <PostForm />}
      </>
    );
  }
  return (
    <main>
      <div className={`${formState.display ? " blur-lg" : ""}`}>
        <Main />
        <div className={`container mx-auto p-5`}>
          <h2 className="m-5 text-2xl md:text-3xl font-semibold text-storm-500">
            Recent Posts
          </h2>
          <div className="container mx-auto flex flex-wrap">
            {posts.map((post) => (
              <div
                key={post.id}
                className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_25%]"
              >
                <div className="p-2">
                  <PostCard post={post} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {formState.display && <PostForm />}
    </main>
  );
}
