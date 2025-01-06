import {  useState } from "react";
import Layout from "../../components/Layout/Layout";
import { useNavigate } from "react-router";
import 'react-toastify/dist/ReactToastify.css';
import "./Auth.css";
import axios from "axios";
import { toast } from "react-toastify";
const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [answer, setAnswer] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://shopify-x-backend.onrender.com/api/v1/auth/register",
        { name, email, password, address, mobile, answer }
      );

      if (response.data.success) {
        toast.success(response.data.message || "success");
        navigate("/login");
      } else {
        toast.error(response.data.message || "Registration failed");
      }
    } catch (error) {
      toast.error("An unexpected error occurred. Please try again later.");
      console.error(error); // Log for debugging
    }
  };

  return (
    <Layout title={"Register"}>
    
      <div className="container-fluid my-5 custom-container">
        <form
          onSubmit={handleSubmit}
          className="shadow p-4 bg-white rounded custom-form"
        >
          <h4 className="text-center font-weight-bold mb-4">REGISTER</h4>

          <div className="mb-3">
            <input
              required
              onChange={(e) => setName(e.target.value)}
              type="text"
              autoComplete="on"
              className="form-control"
              placeholder="Enter your name"
              value={name}
              name="registerName" // Provide a unique name
            />
          </div>

          <div className="mb-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              placeholder="Enter Your Email"
              autoComplete="email" // Set to "email" for email suggestions
              name="registerEmail" // Provide a unique name
            />
          </div>

          <div className="mb-3">
            <input
              required
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              type="password"
              className="form-control"
              value={password}
              name="registerPassword" // Provide a unique name
            />
          </div>

          <div className="mb-3">
            <input
              required
              onChange={(e) => setMobile(e.target.value)}
              placeholder="Enter your mobile number"
              type="text"
              className="form-control"
              value={mobile}
              name="registerMobile" // Provide a unique name
            />
          </div>

          <div className="mb-3">
            <input
              required
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter your address"
              type="text"
              className="form-control"
              value={address}
              name="registerAddress" // Provide a unique name
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
              name="registerAnswer" // Provide a unique name
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Register
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Register;
