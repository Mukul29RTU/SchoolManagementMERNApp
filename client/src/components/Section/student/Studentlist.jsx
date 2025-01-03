import React, { useEffect, useState } from "react";
import "./Allstudent.css"
import axios from "axios";
import {toast} from 'react-toastify'
import { useNavigate, useParams } from "react-router-dom";

function Studentlist({list,token}) { 

  const navigate = useNavigate()
    const handleDelete=()=>{
        axios.delete('http://localhost:3011/delete/'+list._id,{
          headers:{
            Authorization:'Bearer '+ token
          }
        })
        .then(res =>{
          navigate('/all-student')
          toast.success("Student Deleted")
        })  
    };
    

  return  (
    <div
      className="studentlist"
     
    >
      <div className="studentcard shadow-lg" >
        <div className="studentdata"  onClick={() => navigate("/student-detail/" + list._id)}>
          <div className="listimage">
            <img src={list.imageUrl} alt="Student" />
          </div>
          <div className="listdata">
            <div>{list.name}</div>
            <div>{list.email}</div>
            <div>{list.phone}</div>
          </div>
        </div>

        <div className="listbuttons">
          <button className="btn text-danger" onClick={handleDelete}>
            <i className="fa-solid fa-trash"></i>
          </button>
        </div>
      </div>
    </div>
  );
  }

export default Studentlist;


