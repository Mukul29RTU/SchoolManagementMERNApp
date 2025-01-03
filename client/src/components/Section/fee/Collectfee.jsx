import React, { useState ,useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify'
import '../Adddata.css'
import axios from 'axios';

function Collectfee({profile}) {

  const [course , setCourse] = useState([])
  const navigate = useNavigate()
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [remark, setRemark] = useState("");
  const [courseId,setCourseId] = useState("");
  const [ammount, setAmmount] = useState("");

  const handleAddFee=(e)=>{

    e.preventDefault()
    axios.post('http://localhost:3011/addfee', {name,email,phone,ammount,remark,courseId}, {
      headers:{
        Authorization:'Bearer '+ profile.token
      }
    })
    .then(result => {
      toast.success(result.data.msg)
      navigate('/payment-history')
      })
    .catch(err => {
        alert("No Student Registered")
    }
     )
  }


  useEffect(() => {
    const getCourse = () => {
      axios
        .get("http://localhost:3011/allcourse",{
          headers:{
            Authorization:'Bearer '+ profile.token
          }
        })
        .then(result => setCourse(result.data.course))
    }
    getCourse()
  }, []);

  return (
      <div className='addfee my-lg-5 px-lg-5'> 
        <div className='addbox'>
      <h3 className="text-center">Add Fee Details</h3>
       <form action="" onSubmit={handleAddFee} className="px-lg-5 text-primary addform">
            <div className="d-flex flex-column px-lg-3 py-2">
              <label htmlFor="Course Name">Student Name</label>
              <input required type="text" placeholder="Name" onChange={e => setName(e.target.value)}/>
            </div>
            <div className="d-flex flex-column px-lg-3 py-2">
              <label htmlFor="desc">Student Email</label>
              <input required type="text" placeholder="Email" onChange={e => setEmail(e.target.value)}/>
            </div>
            <div className="d-flex flex-column px-lg-3 py-2">
              <label htmlFor="price">Mobile Number</label>
              <input required type="number" placeholder="Phone" onChange={e => setPhone(e.target.value)}/>
            </div>
            <div className="d-flex flex-column px-lg-3 py-2">
              <label htmlFor="startdate">Deposit Ammount</label>
              <input required type="text" placeholder="Ammount" onChange={e => setAmmount(e.target.value)}/>
            </div>
         
            <div className="d-flex flex-column px-lg-3 py-2">
              <label htmlFor="enddate">Remarks</label>
              <input required type="text" placeholder="Remark" onChange={e => setRemark(e.target.value)}/>
            </div>
  
            <div className="formfile d-flex flex-column px-lg-3 py-2">
            <select name="" id="" onChange={e=> setCourseId(e.target.value)}>
              <option value="">Select Course</option>
              {course.map(list=> <option value={list._id}>{list.name}</option>
              )}
            </select>
            </div>
       
            <div className="d-flex justify-content-center px-lg-3 py-4">
              <button
                className="btn text-white"
                style={{ backgroundColor: "#FF2929" }}
              >
                Add Fee
              </button>
            </div>
          </form>
        </div></div>
   
  );
}

export default Collectfee;
