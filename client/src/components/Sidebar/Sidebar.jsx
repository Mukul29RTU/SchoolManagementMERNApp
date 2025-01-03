import React, { useState } from "react";
import "./Sidebar.css";
import { Link, useLocation } from "react-router-dom";

function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
    const sidebar = document.getElementById("sidebar");
    if (collapsed) {
      sidebar.classList.remove("collapsed");
    } else {
      sidebar.classList.add("collapsed");
    }
  };
  const location = useLocation();
  return (
 
    <div className="sidecontainer" role={"navigation"} id="sidebar">
    <div
        className="sidebar-items d-flex flex-column text-white">
        <div className="sidename mx-lg-3 py-lg-4">
          <h4>
            Dashboard
          </h4>
        <button className="sidebar-toggle" onClick={toggleSidebar}>☰</button>
        </div>
        <div className="sidelinks mx-lg-2 my-lg-3">
          <div className={location.pathname === "/" ? "link-active" : "link"}>
            <Link to="" className="text-decoration-none text-white mx-3">
              
              <i class="fa fa-home" aria-hidden="true"><span className="linkname"> Home</span></i>
            </Link>
          </div>
          <div
            className={
              location.pathname === "/all-course" ? "link-active" : "link"
            }
          >
            <Link
              to="/all-course"
              className="text-decoration-none text-white mx-3"
            >
             
              <i class="fa-solid fa-book"> <span className="linkname"> All Course</span></i>

            </Link>
          </div>
          <div
            className={
              location.pathname === "/add-course" ? "link-active" : "link"
            }
          >
            <Link
              to="/add-course"
              className="text-decoration-none text-white mx-3"
            >
              
              <i class="fa-solid fa-user-plus"><span className="linkname"> Add Course</span></i>
            </Link>
          </div>
          <div
            className={
              location.pathname === "/all-student" ? "link-active" : "link"
            }
          >
            <Link
              to="/all-student"
              className="text-decoration-none text-white mx-3"
            >
             
              <i class="fa-solid fa-people-group"> <span className="linkname"> All student</span></i>
            </Link>
          </div>
          <div
            className={
              location.pathname === "/add-student" ? "link-active" : "link"
            }
          >
            <Link
              to="/add-student"
              className="text-decoration-none text-white mx-3"
            >
              
              <i class="fa-solid fa-user-plus"><span className="linkname"> Add Student</span></i>
            </Link>
          </div>
          <div
            className={
              location.pathname === "/collect-fee" ? "link-active" : "link"
            }
          >
            <Link
              to="/collect-fee"
              className="text-decoration-none text-white mx-3"
            >
              <i class="fa-solid fa-file-invoice-dollar"><span className="linkname"> Collect Fee</span></i>
            </Link>
          </div>
          <div
            className={
              location.pathname === "/payment-history" ? "link-active" : "link"
            }
          >
            <Link
              to="/payment-history"
              className="text-decoration-none text-white mx-3"
            >
             
              <i class="fa-solid fa-circle-info"> <span className="linkname">Payment History</span></i>
            </Link>
          </div>
        </div>
        <div className="sidefooter mx-3">
          <p>
            <small>Developed by Mukul</small>
          </p>
          <figcaption className="blockquote-footer text-warning my-1">
            @copyright
          </figcaption>
        </div>
      </div>
    </div>
      

  );
}

export default Sidebar;
