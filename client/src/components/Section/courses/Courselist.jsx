import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CourseDetail from "./CourseDetail";
import './Allcourse.css';

function Courselist({course,token}) {
  const navigate = useNavigate()
  const [details ,setDetails]=useState(false)


  return (
    <div
      class="card-course my-lg-3 bg-light shadow-lg text-capitalize"
      onClick={() => {
        navigate("/course-detail/" + course._id);
      }}
    >
      <div class="card-body text-center">
        <img
          src={course.imageUrl}
          alt=""
        />
        <div className="py- 2">
          <h3 class="card-title">{course.name}</h3>
          <p class="card-text text-info">
            <span>&#8377;</span> {course.price}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Courselist;
