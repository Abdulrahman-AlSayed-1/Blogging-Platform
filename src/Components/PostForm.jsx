import { Formik, Form, Field, ErrorMessage } from "formik";
import { memo } from "react";
import toast from "react-hot-toast";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { createPost, displayForm, updatePost } from "../Redux/Slices/CRUD";

const PostForm = () => {
  const createStatus = useSelector((state) => state.createStatus);
  const updateStatus = useSelector((state) => state.updateStatus);
  const errorMessage = useSelector((state) => state.errorMessage);
  const formState = useSelector((state) => state.formState);

  const dispatch = useDispatch();

  const add_editPost = (values) => {
    const date = new Date();
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    const formattedDate = date.toLocaleDateString("en-US", options);
    const { username } = JSON.parse(localStorage.getItem("user"));

    if (formState.type === "post") {
      try {
        dispatch(createPost({ ...values, username, date: formattedDate }));
        if (createStatus == "failed") throw errorMessage;
        toast.success("New Post Added Successfully");
      } catch (error) {
        toast.error(error);
        console.error("Error in Post Creation :" + error);
      }
    } else {
      try {
        dispatch(updatePost({updates:{ ...values, date: formattedDate },id:formState.postID}));
        if (updateStatus == "failed") throw errorMessage;
        toast.success("Post Updated Successfully");
      } catch (error) {
        toast.error(error);
        console.error("Error in Post Updation :" + error);
      }
    }
  };
  return (
    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <Formik
        initialValues={{ title: "", content: "", image: "" }}
        validationSchema={Yup.object({
          title: Yup.string().required("Title is Required"),
          content: Yup.string().required("content is Required"),
          image: Yup.string(),
        })}
        onSubmit={async(values, { resetForm }) => {
          add_editPost(values);
          resetForm();
          dispatch(displayForm({ display: false, postID: null, type: null }));
        }}
      >
        {({ isSubmitting }) => (
          <Form className="w-[350px] p-6 bg-storm-900/70 rounded-2xl">
            <div className="mb-4">
              <label
                htmlFor="title"
                className="block font-semibold mb-1 text-storm-400 "
              >
                Post Title:
              </label>
              <Field
                id="title"
                name="title"
                type="text"
                className="w-full border-b-1 border-storm-500 px-4 py-2 text-storm-500 focus:outline-none"
              />
              <ErrorMessage
                name="title"
                component="span"
                className="text-red-500 text-sm mt-1"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="content"
                className="block font-semibold mb-1 text-storm-400"
              >
                Post Content:
              </label>
              <Field
                type="text"
                id="content"
                name="content"
                className="w-full border-b-1 border-storm-500 px-4 py-2 text-storm-500 focus:outline-none"
              />
              <ErrorMessage
                name="content"
                component="span"
                className="text-red-500 text-sm mt-1"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="image"
                className="block font-semibold mb-1 text-storm-400"
              >
                Post Image URL:{" "}
                <small className="text-xs text-storm-600">optional</small>
              </label>
              <Field
                type="text"
                id="image"
                name="image"
                className="w-full border-b-1 border-storm-500 px-4 py-2 text-storm-500 focus:outline-none "
              />
              <ErrorMessage
                name="image"
                component="span"
                className="text-red-500 text-sm mt-1"
              />
            </div>
            <div className="flex justify-between">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-storm-800 text-white px-4 py-2 rounded hover:bg-storm-800/50"
              >
                {isSubmitting ? "is creating..." : "Create"}
              </button>
              <button
                type="button"
                onClick={() => {
                  dispatch(
                    displayForm({ display: false, postID: null, type: null })
                  );
                }}
                className="bg-amber-950 text-white px-4 py-2 rounded hover:bg-amber-950/50"
              >
                Close
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default memo(PostForm);
