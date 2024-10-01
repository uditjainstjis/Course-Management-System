import React from 'react'
import { useNavigate } from 'react-router-dom';

export function SingleCourse({
  title,
  description,
  price,
  discountedprice,
  url,
  id
}) {

  const navigate = useNavigate();


  function handleViewContentClick(){
    navigate('Content-Files')
  }




  return (
    <div className="singleCourse"  style={{width:"100%",height:"100%"}}>
      <div className="singleCourseImage"  style={{height:"50%"}}>
        <img
          alt="Courses"
          src={url}
          style={{
            width: "100%",
            height: "100%",
            borderRadius: "17px 17px 0px 0px",
          }}
        ></img>
      </div>
      <div className="singleCourseText"  style={{height:"50%",backgroundColor: "rgb(225, 237, 249)",borderRadius:"0 0 20px 20px"}}>

        <br></br>
        {/* <span style={{fontSize:"1.3em",marginLeft:"5%"}}>₹{discountedprice}&nbsp; </span> */}
        <p style={{marginTop:"4%",marginLeft:"5%",marginBottom:"4%",color:"grey",fontSize:"small"}}>PRICE</p>
        <span style={{ marginLeft: "5%",fontWeight: "bold" ,fontSize:"1.4em"}}> {price}</span>
        <button
          style={{
            width: "90%",
            maxHeight: "50px",
            height:"48px",
            marginLeft: "5%",
            marginTop: "10%",
            marginBottom: "4%",
            fontSize: "1.6em",
            borderRadius: "30px",
            backgroundColor: "rgb(0, 132, 255)",
            color: "white",
          }}
          onClick={() => {
            handleViewContentClick()
          }}
        >
          {/* Buy Now */}
          View Content
        </button>
        
      </div>
    </div>
  );
}
