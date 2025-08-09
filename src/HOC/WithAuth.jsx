import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const WithAuth = (WrappedComponent) => {
  return (props) => {
    const navigate = useNavigate();
    const isAuthenticated = !!localStorage.getItem("user"); 

    if (!isAuthenticated) {
      toast.error("You must Login to access" ,{
          duration: 1500,
          position:"top-right",
      })
      setTimeout(()=>{
        navigate("/login");
      }, 2000)
      return null;
    }

    return <WrappedComponent {...props} />;
  };
};

export default WithAuth;
