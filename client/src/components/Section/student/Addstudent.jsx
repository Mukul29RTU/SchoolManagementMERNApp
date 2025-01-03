import React from 'react'
import "../Adddata.css"
import { useState ,useEffect} from 'react'
import {useNavigate}  from 'react-router-dom'
import axios from 'axios'
import {toast} from 'react-toastify' 

function Addstudent({profile}) {
  const [course , setCourse] =useState([])
  const navigate = useNavigate()
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [courseId, setCourseId] = useState("");
  const [image, setImg] = useState(null);
  const [imgUrl, setImgurl] = useState(null);

  const handleAddstudent=(e)=>{
    const formData = new FormData();
    formData.append('name',name)
    formData.append('email',email)
    formData.append('phone',phone)
    formData.append('address',address)
    formData.append('courseId',courseId)
    formData.append('image',image)

    e.preventDefault()
    axios.post('http://localhost:3011/addstudent', formData,{
      headers:{
        Authorization:'Bearer '+ profile.token
      }
    })
    .then(result => {
      toast.success(result.data.msg)
      navigate('/')
      })
    .catch(err => alert("error"))
  }
  
  const imgHandler=(e)=>{
    setImg(e.target.files[0])
    setImgurl(URL.createObjectURL(e.target.files[0]))
  }

  useEffect(() => {
    const getCourse = async () => {
      axios
        .get("http://localhost:3011/allcourse",{
          headers:{
            Authorization:'Bearer '+ profile.token
          }
        })
        .then(result =>setCourse(result.data.course));
    };
    getCourse();
  }, []);

  return (
    <div className="addstudent my-lg-5 px-lg-5">
      <div className='addbox'>
    <h3 className="text-center">Add New Student</h3>
     <form action="" onSubmit={handleAddstudent} className="addform px-lg-5 text-primary">
          <div className="d-flex flex-column px-lg-3 py-2">
            <label htmlFor="studentname">Student Name</label>
            <input type="text" placeholder="Enter student name" onChange={e => setName(e.target.value)}/>
          </div>
          <div className="d-flex flex-column px-lg-3 py-2">
            <label htmlFor="desc">Student Email</label>
            <input type="text" placeholder="Enter student Email" onChange={e => setEmail(e.target.value)}/>
          </div>
          <div className="d-flex flex-column px-lg-3 py-2">
            <label htmlFor="price">Student Phone</label>
            <input type="number" placeholder="Enter student phone" onChange={e => setPhone(e.target.value)}/>
          </div>
          <div className="d-flex flex-column px-lg-3 py-2">
            <label htmlFor="enddate">Student Address</label>
            <input type="text" placeholder="Enter Address" onChange={e => setAddress(e.target.value)}/>
          </div>

          <div className="d-flex flex-column px-lg-3 py-2">
          <select name="" id="" onChange={e=> setCourseId(e.target.value)}>
            <option value="">Select Course</option>
            {course.map(list=> <option value={list._id}>{list.name}</option>
            )}
          </select>
          </div>

          <div className="formfile d-flex flex-row px-lg-3 py-2">
            <input type="file" onChange={imgHandler} />
            {imgUrl && <img src={imgUrl} alt="" />}
            
          </div>
          <div className="d-flex justify-content-center px-lg-3 py-4">
            <button
              className="btn text-white"
              style={{ backgroundColor: "#FF2929" }}
            >
              Add Student
            </button>
          </div>
        </form>
  </div>
    </div>
    
  )
}

export default Addstudent
