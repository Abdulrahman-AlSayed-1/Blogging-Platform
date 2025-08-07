import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import toast from "react-hot-toast";
import * as Yup from "yup";

const PostForm = ({showFormState}) => {
  const [showForm ,setShowForm] = showFormState
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
            <Form className="max-w-md mx-auto p-6 bg-white rounded shadow">
              <div className="mb-4">
                <label htmlFor="title" className="block font-semibold mb-1">
                  Post Title:
                </label>
                <Field
                  id="title"
                  name="title"
                  type="text"
                  className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring"
                />
                <ErrorMessage
                  name="title"
                  component="span"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="content" className="block font-semibold mb-1">
                  Post Content:
                </label>
                <Field
                  as="textarea"
                  id="content"
                  name="content"
                  className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring h-32 resize-none"
                />
                <ErrorMessage
                  name="content"
                  component="span"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="image" className="block font-semibold mb-1">
                  Post Image URL: <small className="text-xs text-storm-600">optional</small>
                </label>
                <Field
                  type="text"
                  id="image"
                  name="image"
                  className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring"
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
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
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
                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
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
