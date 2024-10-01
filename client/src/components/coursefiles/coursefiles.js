import React , {useState,useEffect} from 'react'
import { useParams } from 'react-router-dom';

import { SingleCourse } from '../coursecards/coursecard1';

export function CourseFiles(){

    const {CourseNumber} = useParams()
    const [coursesArray, setCourses] = useState([]);
    const [loadstatus,setloadstatus] = useState(false)
    const [playvideo,setplayvideo] = useState(false)
    const [videoplay,setvideoplay] = useState(0)
  
    useEffect(() => {
  
      fetch("http://localhost:3030/courses").then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json(); // Return the promise from response.json()
        })
        .then((data) => {
          setCourses(data); // Update state with the fetched data
    
          setloadstatus(true)
        })
        .catch((error) => {
          console.log("Fetch Error:", error); // Log any errors that occur
        });
    },[] )
    
    function handleVideoClick(videoIdx){
      setplayvideo(true)
      setvideoplay(videoIdx)
    }  
  
    return (
      <>
      {!loadstatus ? (<>
        Loading...
        <h1 style={{marginTop:"50%"}}>loading</h1>
      </>):(    <div className="coursecontainer">
        <div className="topblock">  
          <b className="topblocktitle">{coursesArray[CourseNumber].title} </b>
          {/* <div className="coursecard"> */}

          </div>
        {/* </div> */}
        <div className="coursecontent">

         
          {playvideo && (
            <>
            <div className='blankscreen' onClick={()=>{setplayvideo(false)}}></div>
            <div className='editcoursepopup' style={{height:"max-content"}}>
            <video style={{width:"100%"}} autoPlay controls preload="auto">
               <source src={coursesArray[CourseNumber].videos.videos[videoplay]} >
               </source>
            </video>
            </div>
            </>
              )}
        
        <div className="coursetext">
          {/* <p style={{ whiteSpace: "pre-line" }}>
            <h3><b>Overview</b></h3>
            <br></br>
            {
            (coursesArray[CourseNumber].description)}
          </p> */}
          <br></br>
          <br></br>
  
          <p>
          <h3><b style={{color:"rgb(74, 128, 238)",marginLeft:"10px"}}>Content</b>
          </h3>
          <br></br>
          <hr style={{width:"20%",backgroundColor:"rgb(74, 128, 238)",height:"9px"}}></hr>
          <hr style={{width:"70%"}}></hr>
          <br></br>
          <br></br>
         


  </p>
  
  {coursesArray && coursesArray.length > 0 ? (
  

    
    coursesArray[CourseNumber].videos && coursesArray[CourseNumber].videos.videos && coursesArray[CourseNumber].videos.videos.length > 0 ? (
      coursesArray[CourseNumber].videos.videos.map((video, videoIdx) => (
        <div className='editablevideocontainer' key={videoIdx} onClick={()=>{handleVideoClick(videoIdx)}}>
          {coursesArray[CourseNumber].videos.thumbnails && coursesArray[CourseNumber].videos.thumbnails[videoIdx] ? (
            <img 
              src={coursesArray[CourseNumber].videos.thumbnails[videoIdx]} 
              style={{ width: "25%", height: "100%", backgroundColor: "white"}} 
              alt={coursesArray[CourseNumber].videos.titles[videoIdx] || "Video Thumbnail"}
            />
          ) : (
            <p>No thumbnail available</p>
          )}

          {coursesArray[CourseNumber].videos.titles && coursesArray[CourseNumber].videos.titles[videoIdx] ? (
            <h3 className='coursevideotitle'>{coursesArray[CourseNumber].videos.titles[videoIdx]}</h3>
          ) : (
            <p>No title available</p>
          )}
        </div>
      ))
    ) : (
      <p>No videos available for this course.</p>
    )
  
) : (
  <p>No courses available.</p>
)}
  
        </div>
            
  
        </div>
  
      </div>)}
      </>)
  }
  
  