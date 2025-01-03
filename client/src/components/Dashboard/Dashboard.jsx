import React from "react";
import Nav from "../Navbar/Nav";
import Sidebar from "../Sidebar/Sidebar";
import "./Dashboard.css";
import { Outlet } from "react-router-dom";


function Dashboard({setProfile,profile}) {
  return (
    <div className="dashboard">
      <div className="dashboardBox shadow-lg">
        <div className="side-box"><Sidebar profile={profile}></Sidebar></div>
        <div className="main-box">
          <div className="nav-box"><Nav setProfile={setProfile} profile={profile}/></div>
          <div className="section-box">{ <Outlet />}</div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
