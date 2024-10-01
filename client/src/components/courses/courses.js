import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";
import "./Courses.css";
import { SingleCourse } from "../coursecards/coursecard2";
import './Courses.css'

function Courses() {
    const [coursesArray, setCourses] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()
    useEffect(() => {
      // fetch('http://localhost:3030/cours')
      //     .then(response => response.json()
      //     )
      //     .then(data => {
      //         setCourses(data);
      //         setLoading(true);
      //         console.log(data);
      //     }
      //     )
      //     .catch(error=>console.log(error))
      fetch("http://localhost:3030/courses")
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json(); // Return the promise from response.json()
        })
        .then((data) => {
          setCourses(data); // Update state with the fetched data
          setLoading(false); // Data is loaded, set loading to false
          console.log("Fetched Data:", data); // Log the data with a label
        })
        .catch((error) => {
          console.log("Fetch Error:", error); // Log any errors that occur
          setLoading(false); // Stop loading in case of an error
        });
    }, []);
  
    const handleViewDetails = (slash) => {
      navigate(slash)
    };
  
  
  
    return (
      <div className="courses-page">
        {loading ? (
          <div>Loading...</div>
        ) : (
          <>
            {window.location.pathname === "/Courses" ? (
              coursesArray.map((course) => (
                <SingleCourse
                  key={course.courseId}
                  url={course.url}
                  title={course.title}
                  price={course.price}
                  description={course.about}
                  id={course.courseId}
                  onViewDetails={()=>{handleViewDetails(course.courseId)}}
                />
              ))
            ) : (
              <>
                {coursesArray.length > 0 ? (
                  <>
                    <SingleCourse 
                      key={coursesArray[1].courseId}
                      url={coursesArray[1].url}
                      title={coursesArray[1].title}
                      price={coursesArray[1].price}
                      description={coursesArray[1].about}
                      id={coursesArray[1].courseId}
                      onViewDetails={() => handleViewDetails('Courses/1')}
                    />
                    <SingleCourse
                      key={coursesArray[0].courseId}
                      url={coursesArray[0].url}
                      title={coursesArray[0].title}
                      price={coursesArray[0].price}
                      description={coursesArray[0].about}
                      id={coursesArray[0].courseId}
                      onViewDetails={() => handleViewDetails('Courses/2')}
                    />
                    <SingleCourse
                      key={coursesArray[2].courseId}
                      url={coursesArray[2].url}
                      title={coursesArray[2].title}
                      price={coursesArray[2].price}
                      description={coursesArray[2].about}
                      id={coursesArray[2].courseId}
                      onViewDetails={() => handleViewDetails('Courses/3')}
                    />
                  </>
                ) : (
                  <>No courses available</>
                )}
              </>
            )}
          </>
        )}
      </div>
    );
  }  

  export default Courses;