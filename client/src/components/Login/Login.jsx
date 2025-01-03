import React, { useState } from "react";
import "./Login.css";
import axios from "axios";
import { toast } from 'react-toastify';
import { useNavigate , Link} from "react-router-dom";


function Login({setProfile}) {
  const navigate = useNavigate()
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')


  const handleLogin=(e)=>{
    e.preventDefault()
    axios.post("http://localhost:3011/login", {email,password})
    .then(result => {
      toast.success(result.data.message)
      setProfile(result.data)
      navigate("/")
    })
    .catch(err => toast.error(err))
  }

  


  return (
    <div className="login-wrapper d-flex align-items-center justify-content-center">
      <div className="login-box  d-flex flex-lg-row rounded  shadow-lg">
        <div className="login-left d-flex flex-column px-3 text-center align-items-center justify-content-center">
          <img
            src="./src/assets/image/loginimg.png"
            alt=""
            className=""
            style={{ width: "50%", height: "50%" }}
          />
          <h2 className="text-white">Time to start your journey!</h2>
        </div>

        <div className="login-right px-5">
          <h3 className="text-center mt-5">Login To Your Account</h3>
          <hr />
          <form action="" className="form-login mt-lg-5 py-5 px-3" onSubmit={handleLogin}>
            <div className=" form-input d-flex flex-column px-3 py-2">
              <label htmlFor="email">Email</label>
              <input type="email" placeholder="Enter Your Email" onChange={e => setEmail(e.target.value)}/>
            </div>
 
            <div className="form-input d-flex flex-column px-3 py-2">
              <label  htmlFor="password">Password</label>
              <input type="password" placeholder="Enter Your Password" onChange={e => setPassword(e.target.value)}/>
            </div>
      
            <div className="d-flex justify-content-center px-3 py-4">
              <button
                className="btn text-white"
                style={{ backgroundColor: "#3D3BF3" }}
              >
                Submit
              </button>
            </div>
            <div className="d-flex flex-column py-1 text-center">
              <p>Not have an account! <Link to="/signup" className="text-dark text-decoration-none">Register</Link></p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}


export default Login
