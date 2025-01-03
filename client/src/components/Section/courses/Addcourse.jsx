import React from 'react'
import "../Adddata.css"
import { useState } from 'react'
import {useNavigate}  from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify';

function Addcourse({profile}) {
  const navigate = useNavigate()
  const [name, setName] = useState([]);
  const [description, setDescription] = useState([]);
  const [price, setPrice] = useState([]);
  const [startdate, setStartdate] = useState([]);
  const [enddate, setEnddate] = useState([]);
  const [image, setImg] = useState(null);
  const [imgUrl, setImgurl] = useState(null);

  const handleAddcourse=(e)=>{
    
    const formData = new FormData();
    formData.append('name',name)
    formData.append('description',description)
    formData.append('price',price)
    formData.append('startdate',startdate)
    formData.append('enddate',enddate)
    formData.append('image',image)

    e.preventDefault()
    axios.post('http://localhost:3011/addcourse', formData,{
      headers:{  Authorization:'Bearer '+ profile.token }
    })
    .then(result => {
      toast.success("Course Added")
      navigate("/all-course")
      })  
    .catch(err => 
      alert("Error"))
  }
  
  const imgHandler=(e)=>{
    setImg(e.target.files[0])
    setImgurl(URL.createObjectURL(e.target.files[0]))
  }

  return (
    <div className='addcourse my-lg-5 px-lg-5'>
      <div className='addbox'> 
      <h3 className="text-center">Add New Course</h3>
       <form action="" onSubmit={handleAddcourse} className="addform px-lg-5 text-primary">
            <div className="d-flex flex-column px-lg-3 py-2">
              <label htmlFor="Course Name">Course Name</label>
              <input required type="text" placeholder="Enter course name" onChange={e => setName(e.target.value)}/>
            </div>
            <div className="d-flex flex-column px-lg-3 py-2">
              <label htmlFor="desc">Course Description</label>
              <input required type="text" placeholder="Enter course description" onChange={e => setDescription(e.target.value)}/>
            </div>
            <div className="d-flex flex-column px-lg-3 py-2">
              <label htmlFor="price">Course Price</label>
              <input required type="number" placeholder="Enter Course price" onChange={e => setPrice(e.target.value)}/>
            </div>
            <div className="d-flex flex-column px-lg-3 py-2">
              <label htmlFor="startdate">Course Start Date</label>
              <input required type="text" placeholder="Enter Course start date" onChange={e => setStartdate(e.target.value)}/>
            </div>
            <div className="d-flex flex-column px-lg-3 py-2">
              <label htmlFor="enddate">Course End Date</label>
              <input required type="text" placeholder="Enter Course end date" onChange={e => setEnddate(e.target.value)}/>
            </div>
            <div className="formfile d-flex flex-row px-lg-3 py-2">
              <input type="file" onChange={imgHandler} />
              {imgUrl && <img src={imgUrl} alt=""/>}
              
            </div>
            <div className="d-flex justify-content-center px-lg-3 py-4">
              <button
                className="btn text-white"
                style={{ backgroundColor: "#FF2929" }}
              >
                Add Course
              </button>
            </div>
          </form>
      </div>

    </div>
  )
}

export default Addcourse
