import  { useEffect, useState } from "react";

import axios from "axios";
import { Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import Spinner from "../../components/spinner/Spinner";

const AdminPrivateRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [auth] = useAuth();

  const checkAuthentication = async () => {
    try {
      const response = await axios.get(
        "https://shopify-x-backend.onrender.com/api/v1/auth/admin-auth"
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

  return isAuthenticated ? <Outlet /> : <Spinner path="/" />;
};

export default AdminPrivateRoute;
