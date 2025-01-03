import React, { useEffect, useState } from 'react'
import './Home.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Home({profile}) {
  const [student , setStudent]=useState([])
  const [course , setCourse]=useState([])
  const [studentCount , setStudentCount]=useState([])
  const [courseLength , setCourseLength] = useState([])
  const [feeList , setFeeList] = useState([])

  const navigate = useNavigate()
  useEffect(()=>{
    axios.get("http://localhost:3011/lateststudents",{
      headers:{
        Authorization:"Bearer "+ profile.token
      }
    })
    .then(result =>{
      setStudent(result.data.data)
      
    })

    axios.get("http://localhost:3011/latestcourse",{
      headers:{
        Authorization:"Bearer "+ profile.token
      }
    })
    .then(result =>{
      setCourse(result.data.course)      
    })

    axios
    .get("http://localhost:3011/allstudent",{
      headers:{
        Authorization:'Bearer '+ profile.token
      }
    })
    .then((result) => setStudentCount(result.data.Students));

    axios.get("http://localhost:3011/allcourse",{
      headers:{
        Authorization:'Bearer '+ profile.token
      }
    })
    .then((result) => setCourseLength(result.data.course));

    axios.get("http://localhost:3011/fee-history",{
          headers:{
            Authorization:'Bearer '+ profile.token
          }
        })
        .then((result) => {
          const feeHistory = result.data.feeHistory
          const ammounts = feeHistory.map(fee => fee.ammount)
          setFeeList(ammounts)

    });
    

  },[])

  let sum = 0;
  for(let i=0;i<feeList.length;i++){
    sum = sum + Number(feeList[i])
  }

  return (
    <>
    <div className='home-main px-3 py-2'>
      <div className='home-top-box'>
        <div className='top-student text-white bg-warning text-center' onClick={()=>navigate('/all-student')}>
          <h5 className=' mt-5'>STUDENTS</h5>
          <h4 className=''>{studentCount.length}</h4>
        </div>
        <div className='top-course text-white bg-success text-center'  onClick={()=>navigate('/all-course')}>
          <h5 className=' mt-5'>COURSES</h5>
          <h4>{courseLength.length}</h4>
        </div>
        <div className='top-fee bg-danger text-white text-center'  onClick={()=>navigate('/payment-history')}>
          <h5 className='mt-5'>FEES</h5>
          <h4><span>&#8377;</span>{sum}</h4>
        </div>
      </div>
    </div>

    <div className='container mt-1'>
      <div className='row mx-lg-2'>
      <div className='col-md-6'>
      <table  className="studenttable hometable">
        <thead className=''>
          <th>Profile</th>
          <th>Name</th>
          <th>Phone</th>
        </thead>
      <tbody>
        {student.map((list) =>{ 
          
          return(
            <LatestStudent list={list}/> 
          )
          
        })}
        </tbody>
        </table>

           
        </div>
        <div className='col-md-6'>     
       <table className='coursetable hometable'>
        <thead>
          <th>Name</th>
          <th>Price</th>
          <th>Start on</th>
        </thead>
      <tbody>
        {course.map((data) =>{ 
          
          return(
            <LatestCourse data={data}/> 
          )
          
        })}
        </tbody>
        </table>

        </div>
      </div>
    </div>
</>
    
    
  );
}

function LatestStudent({list}) {
  return (
   
      <td className='shadow-sm my-1 px-lg-3'>
        <tr>
          <img src={list.imageUrl} alt="" style={{width:"50px",height:"50px" ,borderRadius:"50%"}}/>
        </tr>
        <tr>{list.name}</tr>
        <tr>{list.phone}</tr>
      </td>
   
  )
}

function LatestCourse({data}) {
  return (
    
      <td className='shadow-sm my-1 px-lg-3'>
       
        <tr>{data.name}</tr>
        <tr>{data.price}</tr>
        <tr>
          {data.startdate}
          </tr>
      </td>
   
  )
}

export default Home;

