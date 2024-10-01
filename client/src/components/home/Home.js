import "./Home.css";
// import { slide1, slide2, slide3 } from "./Web-Media";
import usp from "../../usp.png";
import Courses from "../courses/courses";
import { useEffect, useState } from "react";
// import { image } from "framer-motion/client";

export function Home() {
  const [images, setImages] = useState([]);
  const [imagesloaded,setImagesloading] = useState(0);
  useEffect(() => {
    // Fetch images from the back end
    fetch("https://course-management-system-wnlu.onrender.com/addSliderImages")
      .then((res) => res.json())
      .then((data) => setImages(data),setImagesloading(true))
      .catch((err) => console.log(err));
  }, []);

  return (

    <div className="dynamic-content">
      <div className="slideshow">
      {imagesloaded ?(<div className="slides">
      {images.map((image, idx) => (
        <img
          src={image.imageUrl}
          key={idx}
          alt={`Slide ${image.id}`}
          style={{ width: "100%", borderRadius: "20px" }}
        />
      ))}
      {/* <img src={slide1} style={{width:"100%"}}></img>
    <img src={slide2} style={{width:"100%"}}></img>
    <img src={slide3} style={{width:"100%"}}></img>
    <img src={slide1} style={{width:"100%"}}></img> */}
    </div>) : (<>Loading...</>)}
      </div>

      <h1 className="sidebar-below-text">Featured</h1>

      <div className="features-courses">
        <Courses />
      </div>

      {/* <h1 className="feature-courses-below-text">
        Unique Selling Propositions
      </h1> */}

      <div className="testimonials">
        <img alt="usps" src={usp} style={{ width: "100%", height: "100%" }}></img>
      </div>

      <h1 className="testimonials-below-text">About Preksha</h1>

      <div className="about" >

      </div>

      <div className="company">
        
      </div>
    </div>
  );
}

export default Home;
