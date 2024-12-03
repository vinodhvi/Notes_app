import React, { useState } from 'react'
import Navbar from '../components/Navbar.jsx/Navbar'
import { Link, useNavigate } from "react-router-dom";
import PasswordInput from "../components/Input/PasswordInput";
import { validateEmail } from '../utils/helper';
import axiosInstance from "../utils/axiosInstance";
const SignUp = () => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate()
  const handleSignUp = async(e) => {
    e.preventDefault();

  if(!name) {
    setError("Enter your name");
    return;
  }
  if(!validateEmail(email)) {
    setError("Enter your Email");
    return;
  }
  if(!password) {
    setError("Enter the Password")
    return;
  }
  setError("")
  //  signup API

  try {
    const response = await axiosInstance.post("/create-account", {
      fullName: name,
      email:email,
      password:password,
    })
    // to handle response
    if(response.data && response.data.error) {
     setError(response.data.message)
     return
    }

    if(response.data && response.data.accessToken) {
      localStorage.setItem("token", response.data.accessToken)
      navigate('/dashboard')
    }

  } catch (error) {
    if(error.response && error.response.data && error.response.data.message) {
      setError(error.response.data.message);
    } else {
      setError("An Un expected Error")
    }
  }

}
  return (
 
    <>    
    <Navbar />
    <div className="flex items-center justify-center mt-28">
      <div className="w-96 border rounded bg-white py-10 px-7">
        <form onSubmit={handleSignUp}>
          <h4 className="text-2xl mb-7">SignUp</h4>
          <input type="text" 
            placeholder="Name" 
            value={name}
            onChange={(e)=> setName(e.target.value)}
            className="input-box" 
            />
          <input type="text" 
            placeholder="Email" 
            value={email}
            onChange={(e)=> setEmail(e.target.value)}
            className="input-box" 
            />
              <PasswordInput 
            value={password}
            onChange={(e)=> setPassword(e.target.value)}/>
             {error && <p className="text-red-500 text-xs pb-1">{error}</p>}
            <button className="btn-primary">Sign Up</button>
            <p className="text-sm text-center mt-4">
             Already Have an Account {""}
               <Link
                to="/login"
                className="font-medium text-primary underline"
              >
                Login
              </Link>
            </p>
          </form>
          </div>
          </div>
          </>

  )
}

export default SignUp