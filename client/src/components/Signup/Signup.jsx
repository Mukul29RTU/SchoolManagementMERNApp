import React, { useState } from "react";
import "./Signup.css";
import axios from "axios";
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom'


function Signup() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [image, setImg] = useState(null)
  const [imgUrl , setImgurl] = useState(null)

  const handleSubmit=(e)=>{

    const formData = new FormData();
    formData.append('name',name)
    formData.append('email',email)
    formData.append('phone',phone)
    formData.append('password',password)
    formData.append('image',image)

    e.preventDefault()
    axios.post("http://localhost:3011/signup", formData)
    .then(result=> {
      toast.success(result.data.message)
      navigate('/') 
    })
    .catch(err => alert(err))
  }

  const fileHandler =   (e)=>{
    setImg(e.target.files[0])
    setImgurl(URL.createObjectURL(e.target.files[0]))
  }

  return (
    <div className="signup-wrapper  d-flex align-items-center justify-content-center">
      <div className="d-flex flex-lg-row rounded signup-box shadow-lg">
        <div className="signup-left d-flex flex-column px-3 text-center align-items-center justify-content-center">
          <img
            src="./src/assets/image/imgsignup.png"
            alt=""
            style={{ width: "50%", height: "50%" }}
          />
          <h2 className="text-white">Welcome to our classes</h2>
        </div>

        <div className="signup-right px-5">
          <h3 className="text-center mt-5">Register Your Account</h3>
          <hr />

          <form action="form-signin mt-5 py-5 px-3" onSubmit={handleSubmit}>
            <div className="form-input d-flex flex-column px-3 py-2">
              <label htmlFor="name">Institute Name</label>
              <input type="text" placeholder="Enter Your Institute" onChange={e => setName(e.target.value)}/>
            </div>
            <div className="form-input d-flex flex-column px-3 py-2">
              <label htmlFor="email">Email</label>
              <input type="email" placeholder="Enter Your Email" onChange={e => setEmail(e.target.value)}/>
            </div>
            <div className="form-input d-flex flex-column px-3 py-2">
              <label htmlFor="number">Phone</label>
              <input type="text" placeholder="Enter Your Phone" onChange={e => setPhone(e.target.value)}/>
            </div>
            <div className="form-input d-flex flex-column px-3 py-2">
              <label htmlFor="pwd">Password</label>
              <input type="password" id="pwd" placeholder="Enter Your Password" onChange={e => setPassword(e.target.value)}/>
            </div>
            <div className="form-input d-flex flex-row px-3 py-2">
              <input type="file" onChange={fileHandler} />
              {imgUrl && <img src={imgUrl} alt="" style={{width:"50px", height:"50px"}} />}
              
            </div>
            <div className="d-flex justify-content-center px-3 py-4">
              <button
                className="btn text-white"
                style={{ backgroundColor: "#FF2929" }}
              >
                Submit
              </button>
            </div>
            <div className="d-flex flex-column py-1 text-center">
              <p>Already have an account! <Link to="/" className="text-dark text-decoration-none">Login</Link></p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
