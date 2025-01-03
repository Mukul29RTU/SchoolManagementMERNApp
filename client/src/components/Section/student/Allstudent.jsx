import React from 'react'
import Studentlist from './Studentlist';
import { useState, useEffect} from 'react';
import axios from 'axios';
import "./Allstudent.css"

function Allstudent({profile}) {
  const [list, setList] = useState([]);
  
  useEffect(() => {
    const getStudents = async () => {
      axios
        .get("http://localhost:3011/allstudent",{
          headers:{
            Authorization:'Bearer '+ profile.token
          }
        })
        .then((result) => setList(result.data.Students));
    };
    getStudents();
  }, []);

  return (
    <div className='studentall'> 
 
  {list.map((student) => {
  
    return (
          <Studentlist
          key={student.email}
          list={student}
          token={profile.token}
        />
    );
  })}
</div>
  );
}

export default Allstudent
