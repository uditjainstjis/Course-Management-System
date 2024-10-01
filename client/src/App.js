// import logo from './prekshalogo.png'
import "./App.css";
import React,{useState} from 'react'
import Home from './components/home/Home.js'
import Courses from "./components/courses/courses.js";
import AdminLogin from "./admindashboard/AdminLogin.js";
import  {Header} from './components/header/header.js'
import {Sidebar} from './components/sidebar/sidebar.js'
import {CourseDetails} from './components/coursedetails/coursedetails.js'
import {CourseFiles} from './components/coursefiles/coursefiles.js'
// import {SingleCourse} from './components/coursecards/coursecard1.js'
import {BrowserRouter as Router,Route,Routes,} from "react-router-dom";

// import { PrimeReactProvider, PrimeReactContext } from "primereact/api";
// function signupclick(){
//     return(
//      <div style={{zIndex:4,backgroundColor:"green",width:"500px",height:"600px"}}>jjjjjlkjaj;fa</div>
//     )
//     //  alert("chl gya")
// }

// function CourseFiles(){
//   return (
//     <div className="coursecontainer"></div>
//   )

// }

function Content({ isOpen }) {

  return (
    <div className="mainContent">
      
      <Sidebar isOpen={isOpen}/>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Courses" element={<Courses />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          {/* <Route path="/Extra" element={<Extra />} />
      <Route path="/Faqs" element={<Faqs />} />
      <Route path="/Settings" element={<Settings />} />
      <Route path="/Blog" element={<Blog />} /> */}
          {/* <Route path="/Courses/:CourseNumber" element={<CourseFiles/>} /> */}
          <Route path="/Courses/:CourseNumber" element={<CourseDetails/>} />
          <Route path="/Courses/:CourseNumber/Content-Files" element={<CourseFiles/>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

const NotFound = () => (
  <div>
    <br></br>
    <br></br>
    <br></br>
    <br></br>
    <h1>404 - Not Found</h1>
    <p>The page you are looking for does not exist.</p>
    <a href="/">Go back to Home</a>
  </div>
);


function App() {

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Function to toggle sidebar state
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen); // Toggle the state
  };
  return (
    <>
      {window.location.pathname === "/admin-login" ? (
        <AdminLogin />
      ) : (
        <>
          <Header toggleSidebar={toggleSidebar}/>
          {/* <Sidebar/> */}
          <Content isOpen={isSidebarOpen}/>
        </>
      )}
    </>
  );
}

export default App;
