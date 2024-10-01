import React, { useState ,useEffect} from 'react';
import './AdminAccess.css'

function AdminAccess(){

    const [images, setImages] = useState([]);
    const [coursesArray, setCourses] = useState([]);
    const [loading, setLoading] = useState(false);
    const [editcourse,setCourseEditable] = useState(false);
    const [editcoursevids,setCourseEditableVids] = useState(false);
    const [editcourseindex,seteditcourseindex] = useState(0);
    const [playvideo,setplayvideo] = useState(false)
    const [videoplay,setvideoplay] = useState(0)

    function handleclick(idx){
      document.getElementById(`fileInput-${idx}`).click();
    }
    function handleclick2(idx){
      setCourseEditable(true)
      seteditcourseindex(idx)
    }
    function handleclick3(idx){
      setCourseEditableVids(true)
      seteditcourseindex(idx)
    }
    function makeVidStructure(){
      return(
      <div className='editablevideocontainer'>
      <img style={{width:"25%",height:"100%",backgroundColor:"white"}}></img>
      <p>hehehehehehehhe</p>
      </div>)
    }
    function handleVideoClick(videoIdx){
      setplayvideo(true)
      setvideoplay(videoIdx)
    }
    async function handleChangeDetailsClick(textboxnum,newContent,idx){

      try{
        const body = {newContent,idx}
        const response = await fetch('https://course-management-system-wnlu.onrender.com/changeCourseDetails',{
          method:"POST",
          headers:{
            'Content-Type':'application/json'
          },
          
          body:JSON.stringify(body)
        })

        if(response.ok){
          alert("congrats")
        }else{
          const data = await response.json();
          alert("badluck")
        }

      }
      catch(error){
        alert("mai krra pnge"+error)
      }
    }


    function EditCoursePopup({idx}){
      return (
        <>
        <div className='blankscreen' onClick={()=>{setCourseEditable(false)}}></div>
        <div className='editcoursepopup'>
        <div className='imgs'>
          <img src={coursesArray[idx].url}  alt='Course Thumbnail' style={{width:"45%",height:"100%",borderRadius:"15px",marginLeft:"50%",transform:"translate(-50%)"}}></img>
          </div>

          <div className='editcourseelements'>

            <span style={{marginLeft:"10px",marginRight:"10px",fontFamily:"monospace",fontSize:"larger"}}>price:</span>
            <textarea id="textarea1" style={{width:"80%",height:"100%",transform:"translate(0%,50%)",fontSize:"0.85em"}} readOnly>{coursesArray[idx].price}</textarea>
            <button style={{width:"50px",height:"30px",borderRadius:"10px",marginLeft:"5px"}} onClick={()=>{
              const txtarea = document.getElementById("textarea1"); txtarea.readOnly=false
            }}>edit</button>
            <button style={{width:"50px",height:"30px",borderRadius:"10px",marginLeft:"5px"}} onClick={()=>{
              const txtarea = document.getElementById("textarea1"); txtarea.readOnly=true;handleChangeDetailsClick("textarea1",{price:txtarea.value},idx)
            }}>save</button>
          </div>
          <div className='coursedetailselement1'>
            <span style={{marginLeft:"10px",marginRight:"10px",fontFamily:"monospace",fontSize:"larger"}}>Title:</span>
            <textarea id="textarea2" style={{width:"80%",height:"100%",transform:"translate(0%,50%)",fontSize:"0.85em"}} readOnly>{coursesArray[idx].title}</textarea>
            <button style={{width:"50px",height:"30px",borderRadius:"10px",marginLeft:"5px"}} onClick={()=>{
              document.getElementById("textarea2").readOnly=false
            }}>edit</button>
            <button style={{width:"50px",height:"30px",borderRadius:"10px",marginLeft:"5px"}} onClick={()=>{
              const txtarea = document.getElementById("textarea2"); txtarea.readOnly=true;handleChangeDetailsClick("textarea1",{title:txtarea.value},idx)}}>save</button>
          </div>
          <div className='coursedetailselement1'>
            <span style={{marginLeft:"10px",marginRight:"10px",fontFamily:"monospace",fontSize:"larger"}}>About:</span>
            <textarea id="textarea3" style={{width:"80%",height:"100%",transform:"translate(0%,50%)",fontSize:"0.85em"}} readOnly>{coursesArray[idx].about}</textarea>
            <button style={{width:"50px",height:"30px",borderRadius:"10px",marginLeft:"5px"}} onClick={()=>{
              document.getElementById("textarea3").readOnly=false
            }}>edit</button>
            <button style={{width:"50px",height:"30px",borderRadius:"10px",marginLeft:"5px"}} onClick={()=>{
              const txtarea = document.getElementById("textarea3"); txtarea.readOnly=true;handleChangeDetailsClick("textarea1",{about:txtarea.value},idx)}}>save</button>
          </div>
          <div className='coursedetailselement2'>
            <span style={{marginLeft:"10px",marginRight:"10px",fontFamily:"monospace",fontSize:"larger"}}>Description:</span>
            <textarea id="textarea4" style={{width:"80%",height:"100%",transform:"translate(0%,50%)",fontSize:"0.85em"}} readOnly>{coursesArray[idx].description}</textarea>
            <button style={{width:"50px",height:"30px",borderRadius:"10px",marginLeft:"5px"}} onClick={()=>{
              document.getElementById("textarea4").readOnly=false
            }}>edit</button>
            <button style={{width:"50px",height:"30px",borderRadius:"10px",marginLeft:"5px"}} onClick={()=>{
              const txtarea = document.getElementById("textarea4"); txtarea.readOnly=true;handleChangeDetailsClick("textarea1",{description:txtarea.value},idx)}}>save</button>

          </div>

          {/*  <div className='coursetext'>
            <h2>{coursesArray[idx].title}</h2>
            <p>{coursesArray[idx].about}</p>
           {/* <p>{course.description}</p> */}
            {/* <p>{coursesArray[idx].price}</p>
          </div>  */}

        </div>
        </>
      )
      
    }
    
    function EditCoursePopup2({idx}){
      return (
        <>
        {true  ? (<>
          <div className='blankscreen' onClick={()=>{setCourseEditableVids(false);setplayvideo(false)}}></div>
        <div className='editcoursepopup'>
        <button style={{width:"100%",height:"10%"}} onClick={()=>{makeVidStructure()}}><h1>Add Video</h1></button>
        {playvideo && (
          <video style={{width:"100%"}} autoPlay controls preload='auto'>
             <source src={coursesArray[idx].videos.videos[videoplay]} >
            </source>
          </video>)
          }

{/*         
        {coursesArray.map((course,idx)=>{

          <div className='editablevideocontainer' key={idx}>
          <img src={course.videos.thumbnails[0]} style={{width:"250px",height:"100px",backgroundColor:"white"}} key={idx}></img>
          <p key={idx}>{course.videos.titles[0]}</p>
          </div>

        })} */}

{/* {coursesArray.map((course, idx) => (
  <div className='editablevideocontainer' key={idx}>
    {course.videos && course.videos.thumbnails && course.videos.thumbnails.length > 0 ? (
      <img 
        src={course.videos.thumbnails[0]} 
        style={{ width: "25%", height: "100%", backgroundColor: "white" }} 
        alt={course.videos.titles[0] || "Video Thumbnail"}
      />
    ) : (
      <p>No thumbnail available</p>
    )}
    {course.videos && course.videos.titles && course.videos.titles.length > 0 ? (
      <p>{course.videos.titles[0]}</p>
    ) : (
      <p>No title available</p>
    )}
  </div>
))} */}
  {coursesArray && coursesArray.length > 0 ? (
  

    
  coursesArray[idx].videos && coursesArray[idx].videos.videos && coursesArray[idx].videos.videos.length > 0 ? (
    coursesArray[idx].videos.videos.map((video, videoIdx) => (
      <div className='editablevideocontainer' key={videoIdx} onClick={()=>{handleVideoClick(videoIdx)}}>
        {coursesArray[idx].videos.thumbnails && coursesArray[idx].videos.thumbnails[videoIdx] ? (
          <img 
            src={coursesArray[idx].videos.thumbnails[videoIdx]} 
            style={{ width: "25%", height: "100%", backgroundColor: "white"}} 
            alt={coursesArray[idx].videos.titles[videoIdx] || "Video Thumbnail"}
          />
        ) : (
          <p>No thumbnail available</p>
        )}

        {coursesArray[idx].videos.titles && coursesArray[idx].videos.titles[videoIdx] ? (
          <h3 className='coursevideotitle'>{coursesArray[idx].videos.titles[videoIdx]}</h3>
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
        </>):(<>
        Loading vids...
        </>)}

        </>
      )
      
    }


    var handleFileChange = async (event,idx)=>{
      const file = event.target.files[0]
      const updatedimages = [...images]
      updatedimages[idx] = {imageUrl:URL.createObjectURL(file)}
      setImages(updatedimages)
      // alert("done")

      const formData = new FormData();
      formData.append('image',file)
      formData.append('idx',idx)

      try{

        const response = await fetch('https://course-management-system-wnlu.onrender.com/changeSliderImages',{
          method:'POST',
          body:formData
        })

        if(response.ok){
          const data = await response.json();
          alert(JSON.stringify(data))
        }else{
          const data = await response.json();
          alert(JSON.stringify(data))
        }

      }
      catch(error){
        console.error(error)
      }


    }




    useEffect(() => {
      fetch("https://course-management-system-wnlu.onrender.com/courses")
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
  

    useEffect(() => {
      // Fetch images from the back end
      fetch("https://course-management-system-wnlu.onrender.com/addSliderImages")
        .then((res) => res.json())
        .then((data) => setImages(data))
        .catch((err) => console.log(err));
    }, []);

    // useEffect(() => {
    //   // Fetch images from the back end
    //   fetch("http://localhost:3030/videos")
    //     .then((res) => res.json())
    //     .then((data) =>{  setVideos(data) ; console.log(data.videos[0])})
    //     .catch((err) => alert(err));
    // }, []);


    return(<>
      {editcourse && <EditCoursePopup idx={editcourseindex}/>}
      {editcoursevids && <EditCoursePopup2 idx={editcourseindex}/>}

      <div className='dashheader'>
      <h1 className='Welcome'>Admin Dashboard</h1>
      </div> 
        <div className='box'>
        <div className='dashsidebar'>
          {/* <b><h3 style={{padding:"10px",marginTop:"20px"}}>MANAGE SLIDERS</h3></b>
          <b><h3 style={{padding:"10px",marginTop:"20px"}}>MANAGE COURSES</h3></b> */}
        </div>
        <div className='dashcontent'>

 
  
        <h1 style={{padding:"20px",marginTop:"30px"}}>Manage Slider Images</h1>

          <div className='slidercontent'>
            <div className='sliderbox'>

          {images.map((image, idx) => (
            <div className='eachslide'>
            <img
              src={image.imageUrl}
              key={idx}
              alt={`Slide ${image.id}`}
              width="280px"
              height="200px"
            ></img>
            <div className='imgbuttons'>
            <button className='removebtn' onClick={ ()=> {handleclick(idx)} }>
              remove
            </button>
            
            <button className='changebtn' onClick={ ()=> {handleclick(idx)} }>
              change
            </button>
            <input
            id={`fileInput-${idx}`}
            type="file"
            style={{ display: "none" }}
            accept="image/*"
            onChange={ (e)=> {handleFileChange(e,idx)}}
            />
            </div>
            </div>
            
          ))}

          {/* <button >Add new</button> */}
          </div>
          </div>
          <h1 style={{padding:"20px", marginTop:"80px"}}>Manage Courses</h1>

            <div className='coursescontent'>
              <div className='coursesbox'>
                {coursesArray.map((course,idx) => (
                  
                  <div className='courselist'>
                    <div className='imgs'>
                    <img src={course.url} alt='Course Thumbnail'  ></img>
                    <button className='crsbtns'  onClick={()=>{handleclick2(idx)}}>Edit</button>
                    <button className='crsbtns' onClick={()=>{handleclick3(idx)}}>Videos</button>

                    </div>
                    <div className='coursetext'>
                      <h2>{course.title}</h2>
                      <p>{course.about}</p>
                      {/* <p>{course.description}</p> */}
                      <p>{course.price}</p>
                      </div>
                  </div>

              // <SingleCourse
              //   class="as"
              //   key={course.courseId}
              //   url={course.url}
              //   title={course.title}
              //   price={course.price}
              //   description={course.about}
              //   id={course.courseId}
              // />
            ))}
              </div>
            </div>
          </div> 
        
        </div>
        </>
    )
}

export default AdminAccess