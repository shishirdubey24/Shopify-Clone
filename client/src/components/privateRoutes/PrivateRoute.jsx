import  { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import { Outlet } from "react-router-dom";
import Spinner from "./../spinner/Spinner";

const PrivateRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [auth] = useAuth();

  const checkAuthentication = async () => {
    try {
      const response = await axios.get(
        "https://shopify-x-backend.onrender.com/api/v1/auth/user-auth"
      );
      const isOk = response.data.ok;
      setIsAuthenticated(isOk);
    } catch (error) {
      console.error("Error during authentication check:", error);
      // Handle the error, e.g., redirect to an error page
    }
  };

  useEffect(() => {
    if (auth?.token) {
      checkAuthentication();
    }
  }, [auth?.token]);

  return isAuthenticated ? <Outlet /> : <Spinner />;
};

export default PrivateRoute;
