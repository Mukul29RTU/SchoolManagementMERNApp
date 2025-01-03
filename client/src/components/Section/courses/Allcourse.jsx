import axios from "axios";
import React, { useEffect, useState } from "react";
import Courselist from "./Courselist";
import './Allcourse.css'

function Allcourse({profile}) {

  const [list, setList] = useState([]);

  useEffect(() => {
    const getCourse = async () => {
      axios.get("http://localhost:3011/allcourse",{
          headers:{
            Authorization:'Bearer '+ profile.token
          }
        })
        .then((result) =>setList(result.data.course));
    };
    getCourse();
  }, []);

  return (
    <div className="main d-flex flex-wrap">
      {list.map((course) => {
        return (
          <Courselist
            course = {course}
            token={profile.token}
          />
        );
      })}
    </div>
  );
}

export default Allcourse;
