import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().required("Required"),
});

export default function Login() {
  const navigate = useNavigate();

  const handleLogin = async (values, { setSubmitting, setErrors }) => {
    try {
      const res = await axios.get(
        `http://localhost:3000/users?email=${values.email}&password=${values.password}`
      );
      if (res.data.length === 0) {
      const emailCheck =await axios.get(
        `http://localhost:3000/users?email=${values.email}`
      );
      if (emailCheck.data.length===0) {
        setErrors({email:"Email not found"});
      }else{
        setErrors({password:"Incorrect Password"});

      }
        setSubmitting(false);
        return;
      };

      const user = res.data[0];
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/home");
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-storm-900">
      <div className="bg-storm-800  p-8 rounded-4xl shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-storm-400 mb-6">Login</h2>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={LoginSchema}
          onSubmit={handleLogin}
        >
          <Form className="space-y-5">
            <div>
              <Field
                name="email"
                type="email"
                placeholder="Email"
                className="w-full px-4 py-2 bg-storm-700 text-storm-400 border border-storm-600 rounded focus:outline-none focus:ring-2 focus:ring-storm-500"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-400 text-sm mt-1"
              />
            </div>

            <div>
              <Field
                name="password"
                type="password"
                placeholder="Password"
                className="w-full px-4 py-2 bg-storm-700 text-storm-400 border border-storm-600 rounded focus:outline-none focus:ring-2 focus:ring-storm-500"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-400 text-sm mt-1"
              />
            </div>  

            <button
              type="submit"
              className="w-full bg-storm-500 hover:bg-storm-400 text-storm-900 font-semibold py-2 rounded transition duration-200"
            >
              Login
            </button>
          </Form>
        </Formik>

        <p className="mt-6 text-center text-sm text-storm-400">
          Don’t have an account?{" "}
          <Link to="/register" className="text-storm-300 underline hover:text-storm-100">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
