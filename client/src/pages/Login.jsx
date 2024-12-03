import React, { useState } from "react";
import Navbar from "../components/Navbar.jsx/Navbar";
import { Link,  useNavigate } from "react-router-dom";
import PasswordInput from "../components/Input/PasswordInput";
import { validateEmail } from "../utils/helper";
import axiosInstance from "../utils/axiosInstance";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate()
  // form handle

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError("Please Enter vaild Email Address");
      console.log(error, "ok");
      return;
    }
    if (!password) {
      setError("Please Enter your Passwrod");
      return;
    }
    setError("");
    //
    try {
      const response = await axiosInstance.post("/login", {
        email:email,
        password:password,
      })
      // to handle response
      if(response.data && response.data.accessToken) {
        localStorage.setItem("token", response.data.accessToken)
        navigate("/dashboard")
      }

    } catch (error) {
      if(error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("An Un expected Error")
      }
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center mt-28">
        <div className="w-96 border rounded bg-white py-10 px-7">
          <form onSubmit={handleLogin}>
            <h4 className="text-2xl mb-7">Login</h4>
            <input
              type="text"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-box"
            />
            <PasswordInput
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && <p className="text-red-500 text-xs pb-1">{error}</p>}
            <button className="btn-primary">Login</button>
            <p className="text-sm text-center mt-4">
              Not registered yet?
              <Link to="/signup" className="font-medium text-primary underline">
                Create an Account
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
