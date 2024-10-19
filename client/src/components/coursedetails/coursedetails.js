import React , {useState,useEffect} from 'react'
import { useParams } from 'react-router-dom';
import { ServerAddr } from '../../apilinks';
import { SingleCourse } from '../coursecards/coursecard1';

export function CourseDetails(){

    const {CourseNumber} = useParams()
    const [coursesArray, setCourses] = useState([]);
    const [loadstatus,setloadstatus] = useState(false)


    useEffect(() => {
  
      fetch(`${ServerAddr}/courses`).then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json(); // Return the promise from response.json()
        })
        .then((data) => {
          setCourses(data); // Update state with the fetched data
          console.log("Fetched Data hehe:", data); // Log the data with a label
    
          setloadstatus(true)
        })
        .catch((error) => {
          console.log("Fetch Error:", error); // Log any errors that occur
        });
    }, [])
   
  
  
    return (
      <>
      {!loadstatus ? (<>
        Loading...
        <h1 style={{marginTop:"50%"}}>loading</h1>
      </>):(    <div className="coursecontainer">
        <div className="topblock">  
          <b className="topblocktitle">{coursesArray[CourseNumber].title}</b>
          <div className="coursecard">
        <SingleCourse style={{width:"100%",height:"100%"}}
                  key={coursesArray[CourseNumber].courseId}
                  url={coursesArray[CourseNumber].url}
                  title={coursesArray[CourseNumber].title}
                  price={coursesArray[CourseNumber].price}
                  description={coursesArray[CourseNumber].about}
                  id={coursesArray[CourseNumber].courseId}
                  // onViewDetails={()=>{handleViewDetails(course.courseId)}}
                />
          </div>
        </div>
        <div className="coursecontent">
  
        <div className="coursetextt">
          {/* <p style={{ whiteSpace: "pre-line" }}>
            <h3><b>Overview</b></h3>
            <br></br>
            {
            (coursesArray[CourseNumber].description)}
          </p> */}
          <br></br>
          <br></br>
  
          <p>
          <h3><b style={{color:"rgb(74, 128, 238)"}}>Overview</b>
          </h3>
          <br></br>
          <hr style={{width:"20%",backgroundColor:"rgb(74, 128, 238)",height:"9px"}}></hr>
          <hr style={{width:"70%"}}></hr>
          <br></br>
          <br></br>
          <h4 style={{ whiteSpace: "pre-line" }}>
          {coursesArray[CourseNumber].about}

          </h4>
          <br></br>
          <br></br>

          <h3>Description</h3>
          <br></br>

    {coursesArray[CourseNumber].description.split('\n').map((line, index) => (
      <React.Fragment key={index}>
        {line}
        <br />
      </React.Fragment>
    ))}
  </p>
  
        </div>
  
  
        </div>
  
      </div>)}
      </>)
  }
  
  