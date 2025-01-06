import { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import UserMenue from "../../components/Layout/UserMenu";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UserProfile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  
  const navigate = useNavigate();
  const [auth,setAuth] = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const userData = { name, email, address, mobile };
      if (password.trim() !== "") {
        userData.password = password;
      }

      const response = await axios.put(
        'https://shopify-x-backend.onrender.com/api/v1/auth/user-profile',
        userData
      );

      if (response.data.success) {
        setAuth({...auth,user:userData})
        // Update user information in context or local storage if needed
        navigate("/dashboard/user"); // Redirect to the dashboard page
      } else {
        console.error(response.data.message || "Update failed");
      }
    } catch (error) {
      console.error("An unexpected error occurred:", error);
    }
  };

  // Get user data 
  useEffect(() => {
    if (auth?.user) {
      const { name, email, address, mobile } = auth.user;
      setName(name);
      setEmail(email);
      setMobile(mobile);
      setAddress(address);
    }
  }, [auth.user]);

  return (
    <Layout>
      <div className="container my-5">
        <div className="row">
          <div className="col-3">
            <UserMenue />
          </div>
          <div className="col-9">
            <h3 className="mb-4">Edit Profile</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  readOnly // Prevent editing email
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="mobile" className="form-label">Mobile</label>
                <input
                  type="text"
                  className="form-control"
                  id="mobile"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="address" className="form-label">Address</label>
                <input
                  type="text"
                  className="form-control"
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn btn-warning btn-lg">Update Profile</button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UserProfile;
