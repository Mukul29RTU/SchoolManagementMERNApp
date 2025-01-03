import React from 'react'
import "../Adddata.css"
import { useState } from 'react'
import {useNavigate, useParams}  from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify';

function CourseEdit({profile}) {
  const navigate = useNavigate()
  const params = useParams()
  const [name, setName] = useState([]);
  const [description, setDescription] = useState([]);
  const [price, setPrice] = useState([]);
  const [startdate, setStartdate] = useState([]);
  const [enddate, setEnddate] = useState([]);
  const [image, setImg] = useState(null);
  const [imgUrl, setImgurl] = useState(null);

  const updateCourse=(e)=>{
    
    const formData = new FormData();
    formData.append('name',name)
    formData.append('description',description)
    formData.append('price',price)
    formData.append('startdate',startdate)
    formData.append('enddate',enddate)
    formData.append('image',image)

    e.preventDefault()
    axios.put('http://localhost:3011/course/'+params.id, formData,{
      headers:{  Authorization:'Bearer '+ profile.token }
    })
    .then(result => {
      toast.success("Course Edit Succesfully")
      navigate('/course-detail/'+params.id)
      })  
    .catch(err => 
        alert("Error"))
  }
  
  const imgHandler=(e)=>{
    setImg(e.target.files[0])
    setImgurl(URL.createObjectURL(e.target.files[0]))
  }

  return (
    <div className='addstudent my-lg-5 px-lg-5'>
      <div className="addbox">
      <h3 className="text-center">Edit Course</h3>
       <form action="" onSubmit={updateCourse} className="addform px-lg-5 text-primary">
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
              {imgUrl && <img src={imgUrl} alt="" style={{width:"50px", height:"50px"}} />}
              
            </div>
            <div className="d-flex justify-content-center px-lg-3 py-4">
              <button
                className="btn text-white"
                style={{ backgroundColor: "#FF2929" }}
                onClick={updateCourse}
              >
                Update
              </button>
              <button
                className="btn btn-primary mx-2"
                style={{}}
                onClick={()=> {navigate('/course-detail/'+params.id)}}
              >
                Cancel
              </button>
            </div>
          </form>
      </div>
    </div>
  )
}

export default CourseEdit;
