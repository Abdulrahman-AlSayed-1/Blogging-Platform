import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useContext } from "react";
import toast from "react-hot-toast";
import * as Yup from "yup";
import { formContext } from "../App";

const PostForm = () => {
  const {showForm ,setShowForm} = useContext(formContext)
  const addPost = async(values)=>{
    const date = new Date();
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-US', options); 
    const user = JSON.parse(localStorage.getItem("user"))
    try{
      if(showForm.type ==="post") {
         await axios.post("http://localhost:3000/posts", {...values , userId: user.id , date:formattedDate });
         toast.success("New Post Added Successfully" ,{
            duration: 1000,
            position:"top-right",
          })
      }
       else  
       {
        await axios.patch(`http://localhost:3000/posts/${showForm.id}`, {...values})
        toast.success("Post Updated Successfully" ,{
            duration: 1000,
            position:"top-right",
          })
       }
    }catch(error){
       console.error("Posting error "+ error)
       toast.error("Failed to save post");
    }
  }  
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <Formik
          initialValues={{ title: "", content: "" , image:""}}
          validationSchema={Yup.object({
            title: Yup.string().required("Title is Required"),
            content: Yup.string().required("content is Required"),
            image: Yup.string()
          })}
          onSubmit={(values, { resetForm }) => {
            addPost(values)    
            resetForm();
            const cloned = {...showForm}
            cloned.show = false
            cloned.type =null
            setShowForm(cloned)
          }}
        >
          {({ isSubmitting }) => (
            <Form className="w-[350px] p-6 bg-storm-900 rounded-2xl shadow">
              <div className="mb-4">
                <label htmlFor="title" className="block font-semibold mb-1 text-storm-400 ">
                  Post Title:
                </label>
                <Field
                  id="title"
                  name="title"
                  type="text"
                  className="w-full border-b-1 border-storm-500 px-4 py-2 text-storm-500 focus:outline-none "
                />
                <ErrorMessage
                  name="title"
                  component="span"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="content" className="block font-semibold mb-1 text-storm-400">
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
                <label htmlFor="image" className="block font-semibold mb-1 text-storm-400">
                  Post Image URL: <small className="text-xs text-storm-600">optional</small>
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
                    onClick={()=>{
                         const cloned = {...showForm}
                         cloned.show = false
                         cloned.type =null
                         setShowForm(cloned)
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

export default PostForm;
