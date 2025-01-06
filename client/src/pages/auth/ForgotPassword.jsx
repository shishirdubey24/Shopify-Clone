import  { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import Layout from "../../components/Layout/Layout";
import "./Auth.css"; // Import your custom CSS file
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [answer, setAnswer] = useState("");
  const navigate = useNavigate();

  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "https://shopify-x-backend.onrender.com/api/v1/auth/forgotpassword",
        {
          email,
          newpassword: newPassword,
          answer,
        }
      );

      if (res && res.data.success) {
        toast.success(res.data.message || "password updated ");
        navigate("/login");
      } else {
        toast.error(res.data.message || "Something went wrong");
      }
    } catch (error) {
      console.error("Password reset error:", error);

      if (error.response) {
        console.error("Server Response Data:", error.response.data);
        console.error("Status Code:", error.response.status);
        console.error("Headers:", error.response.headers);
      } else if (error.request) {
        console.error("No response received. Request details:", error.request);
      } else {
        console.error("Error details:", error.message);
      }

      toast.error("An unexpected error occurred. Please try again later.");
    }
  };

  return (
    <Layout title="Forgot Password - Ecommerce APP">
      <div className="container-fluid my-5 custom-container">
        <form
          onSubmit={handleSubmit}
          className="shadow p-4 bg-white rounded custom-form"
        >
          <h4 className="text-center font-weight-bold mb-4">RESET PASSWORD</h4>

          <div className="mb-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              placeholder="Enter Your Email"
              autoComplete="email" // Set to "email" for email suggestions
              name="forgetEmail"
            />
          </div>
          <div className="mb-3">
            <input
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Enter your favourite movie"
              type="text"
              className="form-control"
              value={answer}
              required
              name="forgetAnswer"
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="form-control"
              placeholder="Enter Your Password"
              required
              name="forgetPassword"
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-block custom-button"
          >
            RESET
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default ForgotPassword;
