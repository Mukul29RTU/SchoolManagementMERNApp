import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {toast} from 'react-toastify' 
import './Coursedetail.css'



function CourseDetail({profile}) {
    const params = useParams();
    const navigate = useNavigate()
    const [course, setCourse] = useState([])
    const [student, setStudent] = useState([])
    useEffect(()=>{
        const getData=()=>{
            axios.get('http://localhost:3011/course-detail/'+params.id,{
                headers:{
                    Authorization:'Bearer '+ profile.token
                }
            })
            .then(res =>{
                setCourse(res.data.course);
                setStudent(res.data.studentList)
            })
            .catch(err=>{
                alert("my error")
            })
        }
        getData()
    },[])

    const handleDelete=()=>{
      axios.delete('http://localhost:3011/'+params.id,{
        headers:{
            Authorization:'Bearer '+ profile.token
        }
    })
    .then(res =>{
      toast.success("Course Deleted")
      navigate('/')
    })
        
    }

  return (
    <div className="coursedetail">
      <div className="courseinfo py-lg-3 shadow-sm">
       <div className='coursedata'>
       <div className='imgdiv mx-lg-3'>
          <img
            src={course.imageUrl}
            alt=""
            className='profile rounded'
          />
        </div>

        
        <div className='details text-capitalize' style={{fontWeight:"700"}}>
          <h1>{course.name}</h1>
          <p>{course.description}</p>
          <p>Price: &#8377;{course.price} </p>
          <p>Starting Date: {course.startdate}</p>
          <p>Ending Date: {course.enddate}</p>
        </div>
       </div>

        <div className='coursebutton mx-lg-5 my-auto' >
          <button className='btn btn-warning my-lg-2' onClick={()=>{navigate('/edit-course/'+params.id)}}>Edit</button>
          <button className='btn btn-danger' onClick={handleDelete}>Delete</button>
        </div>
      </div>

      {student.length > 0 && 
      <div className="student px-lg-3 ">
        <table className="listtable mt-lg-4">
          <thead className="head d-flex">
            <th>Student Profile</th>
            <th>Student Name</th>
            <th>Student Email</th>
            <th>Student Phone</th>
            <th>Student Address</th>
          </thead>

          <tbody className="my-1">
            {student.map((data) => {
              return (
                <td className="my-1 shadow-sm">
                  <tr>
                    <div className="imgstudent">
                      <img
                        src={data.imageUrl}
                        alt=""
                       
                      />
                    </div>
                  </tr>
                  <tr>{data.name.toUpperCase()}</tr>
                  <tr>{data.email}</tr>
                  <tr>{data.phone}</tr>
                  <tr className='butn'>{data.address.toUpperCase()} <button className="btn text-danger"><i class="fa-solid fa-trash mx-lg-3"></i></button></tr>
                </td>
              );
            })}
          </tbody>
        </table>
      </div>}

    </div>
  );
}

export default CourseDetail
