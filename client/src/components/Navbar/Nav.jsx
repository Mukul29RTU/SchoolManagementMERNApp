import React from 'react'
import "./Nav.css"
import { Navigate, useNavigate } from 'react-router-dom'

function Nav({setProfile,profile}) {
  const navigate = useNavigate()
  const handleLogout=()=>{
    setProfile([''])
    navigate('/')
  }
  return (
    <div className='navbar px-3'>
        <div className='text-danger'>
            <h3>{profile.name}</h3>
        </div>
        <div className='navbtn'>
            <button className='btn text-white mx-3' onClick={handleLogout} style={{backgroundColor:"#FF2929"}}>Logout</button>
            <img src={profile.imageUrl} alt=""  className="rounded-circle bg-light " style={{height:"45px",width:"45px"}}/>
        </div>
    </div>
  )
}

export default Nav
