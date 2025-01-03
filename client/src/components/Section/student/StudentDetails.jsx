import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./StudentDetail.css";
import { toast } from "react-toastify";

function StudentDetails({ profile }) {
  const [data, setData] = useState([]);
  const [fee, setFee] = useState([]);
  const [course, setCourse] = useState([]);
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    const getDetail = () => {
      axios
        .get("http://localhost:3011/studentdetail/" + params.id, {
          headers: {
            Authorization: "Bearer " + profile.token,
          },
        })
        .then((result) => {
          setData(result.data.Student);
          setFee(result.data.Fee);
          setCourse(result.data.Course);
        });
    };

    getDetail();
  }, []);

  const handleDelete = () => {
    axios
      .delete("http://localhost:3011/delete/" + params.id, {
        headers: {
          Authorization: "Bearer " + profile.token,
        },
      })
      .then((result) => {
        toast.success(result.data.msg);
      });
  };

  return (
    <div className="studentDetail">
      <div
        className="myDetails bg-light shadow-sm" >
          <div className="maininfo">
          <div className=" myImage">
          <img src={data.imageUrl} className="rounded"/>
        </div>

        <div className="myInfo text-capitalize">
          <h1>{data.name}</h1>
          <p>{data.email}</p>
          <p>{data.phone} </p>
        </div>
          </div>
       

        <div className="myButtons">
          <div className="buton">
            <button className="btn btn-danger" onClick={handleDelete}>
              Delete
            </button>
            <button
              className="btn btn-warning mx-lg-3"
              onClick={() =>
                navigate("/edit-student/" + params.id, {
                  state: {
                    token: profile.token,
                    myName: data.name,
                    email: data.email,
                    phone: data.phone,
                    address: data.address,
                    img: data.imageUrl,
                  },
                })
              }
            >
              Edit
            </button>
          </div>
          <div className="adress mt-lg-4 overflow-y-auto">
            <b>Address:</b> {data.address}
          </div>
        </div>
      </div>

      {fee.length > 0 && (
        <div className="student px-lg-3 ">
          <table className="feeTable my-2">
            <thead className="">
              <th>Deposit On</th>
              <th>Ammount</th>
              <th>Remarks</th>
              <th>Course</th>
            </thead>

            <tbody className="">
              {fee.map((data) => {
                const matchingCourse = course.find(
                  (courseData) => courseData._id === data.courseId
                );
                return (
                  <tr className="shadow-sm">
                    <td>{data.createdAt.split("T")[0]}</td>
                    <td>&#8377;{data.ammount}</td>
                    <td>{data.remark}</td>
                    <td>
                      {matchingCourse ? matchingCourse.name : "No course found"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default StudentDetails;
