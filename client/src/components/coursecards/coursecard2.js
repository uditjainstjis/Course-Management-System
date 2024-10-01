
export function SingleCourse({
    title,
    description,
    price,
    discountedprice,
    url,
    id,
    onViewDetails,
  }) {
    return (
      <div className="singleCourse">
        <div className="singleCourseImage">
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
        <div className="singleCourseText">
          <h3  className="desyy">{title}</h3>
  
          <p style={{ color: "grey", fontSize: "0.85em" }} >{description}</p>
          <br></br>
          {/* <span style={{fontSize:"1.3em",marginLeft:"5%"}}>₹{discountedprice}&nbsp; </span> */}
          <span style={{ marginLeft: "5%", fontWeight: "bold" }}> {price}</span>
          <button
            style={{
              width: "90%",
              maxHeight: "40px",
              marginLeft: "5%",
              marginTop: "4%",
              marginBottom: "4%",
              fontSize: "1.6em",
              borderRadius: "20px",
              backgroundColor: "rgb(0, 132, 255)",
              color: "white",
            }}
            onClick={() => {
              onViewDetails(id);
            }}
          >
            View Details
          </button>
        </div>
      </div>
    );
  }
  