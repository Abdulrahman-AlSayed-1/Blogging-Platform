import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const RegisterSchema = Yup.object().shape({
  username: Yup.string().min(3, "Too short!").required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().min(6, "Too short!").required("Required"),
});

export default function Register() {
  const navigate = useNavigate();

  const handleRegister = async (values, { setSubmitting, setErrors }) => {
    try {
      const res = await axios.get(`http://localhost:3000/users?email=${values.email}`);
      if (res.data.length > 0) {
        setErrors({ email: "Email already registered" });
        setSubmitting(false);
        return;
      }

      await axios.post("http://localhost:3000/users", values);
      navigate("/login");
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-storm-900">
      <div className="bg-storm-800 p-8 rounded-4xl shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-storm-400 mb-6">Register</h2>
        <Formik
          initialValues={{ username: "", email: "", password: "" }}
          validationSchema={RegisterSchema}
          onSubmit={handleRegister}
        >
          <Form className="space-y-5">
            <div>
              <Field
                name="username"
                placeholder="Username"
                className="w-full px-4 py-2 bg-storm-700 text-storm-400 border border-storm-600 rounded focus:outline-none focus:ring-2 focus:ring-storm-500"
              />
              <ErrorMessage name="username" component="div" className="text-red-400 text-sm mt-1" />
            </div>

            <div>
              <Field
                name="email"
                type="email"
                placeholder="Email"
                className="w-full px-4 py-2 bg-storm-700 text-storm-400 border border-storm-600 rounded focus:outline-none focus:ring-2 focus:ring-storm-500"
              />
              <ErrorMessage name="email" component="div" className="text-red-400 text-sm mt-1" />
            </div>

            <div>
              <Field
                name="password"
                type="password"
                placeholder="Password"
                className="w-full px-4 py-2 bg-storm-700 text-storm-400 border border-storm-600 rounded focus:outline-none focus:ring-2 focus:ring-storm-500"
              />
              <ErrorMessage name="password" component="div" className="text-red-400 text-sm mt-1" />
            </div>

            <button
              type="submit"
              className="w-full bg-storm-500 hover:bg-storm-400 text-storm-900 font-semibold py-2 rounded transition duration-200"
            >
              Register
            </button>
          </Form>
        </Formik>

        <p className="mt-6 text-center text-sm text-storm-400">
          Already have an account?{" "}
          <Link to="/login" className="text-storm-300 underline hover:text-storm-100">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
