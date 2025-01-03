import React, { useState } from 'react'
import { BrowserRouter as Router , Routes, Route, createBrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import Signup from './components/Signup/Signup'
import Login from './components/Login/Login'
import Dashboard from './components/Dashboard/Dashboard'
import Home from './components/Section/home/Home'
import Allcourse from './components/Section/courses/Allcourse'
import Addcourse from './components/Section/courses/Addcourse'
import Addstudent from './components/Section/student/Addstudent'
import Allstudent from './components/Section/student/Allstudent'
import Collectfee from './components/Section/fee/Collectfee'
import Paymenthistory from './components/Section/fee/Paymenthistory'
import CourseDetail from './components/Section/courses/CourseDetail';
import StudentDetails from './components/Section/student/StudentDetails';
import CourseEdit from './components/Section/courses/CourseEdit';
import StudentEdit from './components/Section/student/StudentEdit';


function App() {

  const [profile , setProfile] = useState([''])
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />}></Route>
        <Route
          exact path="/"
          element={
            profile && profile._id ? (
              <Dashboard profile={profile} setProfile={setProfile} />
            ) : (
              <Login setProfile={setProfile} />
            )
          }
        >
          <Route path="/" element={<Home profile={profile}></Home>}></Route>
          <Route
            path="/all-course"
            element={<Allcourse profile={profile}></Allcourse>}
          ></Route>
          <Route
            path="/add-course"
            element={<Addcourse profile={profile} />}
          ></Route>
          <Route
            path="/add-student"
            element={<Addstudent profile={profile} />}
          ></Route>
          <Route
            path="/all-student"
            element={<Allstudent profile={profile} />}
          ></Route>
          <Route
            path="/collect-fee"
            element={<Collectfee profile={profile} />}
          ></Route>
          <Route
            path="/payment-history"
            element={<Paymenthistory profile={profile} />}
          ></Route>
          <Route
            path="/course-detail/:id"
            element={<CourseDetail profile={profile} />}
          ></Route>
            <Route
            path="/student-detail/:id"
            element={<StudentDetails profile={profile} />}
          ></Route>
           <Route
            path="/edit-course/:id"
            element={<CourseEdit profile={profile} />}
          ></Route>
            <Route
            path="/edit-student/:id"
            element={<StudentEdit profile={profile} />}
          ></Route>
   
        </Route>
      </Routes>
      <ToastContainer />
    </Router>
  );
}

export default App
