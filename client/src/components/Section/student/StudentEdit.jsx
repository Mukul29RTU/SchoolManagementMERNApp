import React from 'react'
import { useState ,useEffect} from 'react'
import axios from 'axios'
import "../Adddata.css"
import {toast} from 'react-toastify' 
import { useLocation, useNavigate, useParams } from 'react-router-dom';

function StudentEdit() {
  const location = useLocation();
  const token = location.state?.token;

  const navigate = useNavigate()

  const [course , setCourse] = useState([])
  const [name, setName] = useState('');
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [courseId, setCourseId] = useState("");
  const [image, setImg] = useState(null);
  const [imgUrl, setImgurl] = useState(null);

  const params = useParams()
  const handleUpdate= (e)=>{
    const formData = new FormData();
    formData.append('name',name)
    formData.append('email',email)
    formData.append('phone',phone)
    formData.append('address',address)
    formData.append('courseId',courseId)
    formData.append('image',image)

    e.preventDefault()
    axios.put('http://localhost:3011/update/'+ params.id, formData,{
      headers:{
        Authorization:'Bearer '+ token
      }
    })
    .then(result => {
      navigate('/all-student')
      toast.success("Student Succesfully Edit")

      })
    .catch(err => alert("Error"))
            
  }

  useEffect(() => {
    const getCourse = () => {
      axios.get("http://localhost:3011/allcourse",{
          headers:{
            Authorization:'Bearer '+ token
          }
        })
        .then(result =>setCourse(result.data.course));
    };
    getCourse();

  }, []);
  
  const imgHandler=(e)=>{
    setImg(e.target.files[0])
    setImgurl(URL.createObjectURL(e.target.files[0]))
  }



  return (
    <div className='studentEdit my-lg-5 px-lg-5'>
      <div className="addbox">
      <h3 className="text-center">Edit Student Details</h3>
     <form action="" onSubmit={handleUpdate} className="addform px-lg-5 text-primary">
          <div className="d-flex flex-column px-lg-3 py-2">
            <label htmlFor="studentname">Student Name</label>
            <input type="text" placeholder="Enter student name"  onChange={e => setName(e.target.value)}/>
          </div>
          <div className="d-flex flex-column px-lg-3 py-2">
            <label htmlFor="email">Student Email</label>
            <input type="text"  placeholder="Enter student Email" onChange={e => setEmail(e.target.value)}/>
          </div>
          <div className="d-flex flex-column px-lg-3 py-2">
            <label htmlFor="phone"  >Student Phone</label>
            <input type="number" placeholder="Enter student phone" onChange={e => setPhone(e.target.value)}/>
          </div>
          <div className="d-flex flex-column px-lg-3 py-2">
            <label htmlFor="adress">Student Address</label>
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
            {imgUrl && <img src={imgUrl} alt="" style={{width:"50px", height:"50px"}} />}
            
          </div>
          <div className="d-flex justify-content-center px-lg-3 py-4">
            <button
              className="btn text-white"
              style={{ backgroundColor: "#FF2929" }}
                onClick={handleUpdate} 
            >
              Update
            </button>
            {/* <button
              className="btn btn-primary mx-3"
              onClick={()=>navigate('/all-student')}
            >
                Cancel
            </button> */}
          </div>
        </form>
      </div>
  </div>
  )
}

export default StudentEdit;
