import React, { useState} from 'react'; // Add other hooks as needed
import logo from "../../logo.svg";
import { Sidebar } from '../sidebar/sidebar';
import bar from "../../three-line-bar.png";
import './header.css'

export function Header({toggleSidebar}) {
    const [isSignupOpen, setSignupOpen] = useState(0);
    const [isLoginOpen, setLoginOpen] = useState(0);
  
    function signupclick() {
      setSignupOpen(1);
    }
    function loginclick() {
      setLoginOpen(1);
    }
  
    function Otpscreen() {
      return (
        <>
          <div className="blankscreen" onClick={stopClick}></div>
          <div className="signuppopup">
            <h3 className="credent">Enter OTP</h3>
            <p>OTP</p>
            {/* <input className='credinp' type='number' id='inp' maxLength={5}></input> */}
            <div className="otp-container">
              {[...Array(5)].map((_, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength="1"
                  className="otp-input"
                  onChange={(e) => {
                    const { value } = e.target;
                    if (value.length === 1 && index < 4)
                      e.target.nextSibling?.focus();
                    if (value.length === 0 && index > 0)
                      e.target.previousSibling?.focus();
                  }}
                  onKeyDown={(e) => {
                    if (
                      e.key === "Backspace" &&
                      e.target.value === "" &&
                      index > 0
                    ) {
                      e.target.previousSibling?.focus();
                    }
                  }}
                />
              ))}
            </div>
  
            <button
              className="credbut"
              type="submit"
              onClick={async () => {
                const inp = document.getElementsByClassName("otp-input");
                const inpu = inp[0].value + inp[1].value + inp[2].value + inp[3].value+inp[4].value;
                const date = new Date();

                const otp = inpu;
                // const password = "";
  

                const sessionData = localStorage.getItem("sessionId");
                const parsedSessionData = sessionData
                console.log(parsedSessionData)
                // console.log(parsedSessionData.sessionId)
                // console.log(parsedSessionData.sessionId.sessionId)
                const sessionId = parsedSessionData

                console.log("Session ID:", sessionId);
  
                try {
                  const response = await fetch(
                    "https://course-management-system-wnlu.onrender.com/otp-check",
                    {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({ otp, sessionId, date }),
                    }
                  );
  
                  const data = await response.text();
                  console.log(data);
                  alert(data)
                } catch (error) {
                  console.error("Error:", error);
                }
              }}
            >
              Done
            </button>
            <p className="credtc">
              By signing up, you agree to our Terms & Conditions & Privacy Policy
            </p>
          </div>
        </>
      );
    }
  
    function stopClick() {
      setSignupOpen(0);
      setLoginOpen(0);
    }
  
    function Signup() {
      return (
        <>
          <div className="blankscreen" onClick={stopClick}></div>
          <div className="signuppopup">
            <h3 className="credent">Enter Your Email Id To Register</h3>
            <p>Phone number/Email ID</p>
            <input className="credinp" type="email" id="inp"></input>
            {/* <p>Password</p> */}
            {/* <input className='credinp' type='email' id='inpp'></input> */}
            <button
              className="credbut"
              type="sumbit"
              onClick={async () => {
                const inp = document.getElementById("inp");
                // const inpp = document.getElementById('inpp')
                const date = new Date();
                const email = inp.value;
                // const password = inpp.value
                // const password = "maihupassword"
  
                setSignupOpen(2);
  
                try {
                  const response = await fetch("https://course-management-system-wnlu.onrender.com/register", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ email, date }),
                  });
  
                  const data = await response.text();

                  console.log(data);

                  localStorage.setItem("sessionId", data);
                } catch (error) {
                  console.error("Error:", error);
                }
              }}
            >
              Next
            </button>
            <p className="credtc">
              By signing up, you agree to our Terms & Conditions & Privacy Policy
            </p>
          </div>
        </>
      );
    }
  
    function Login() {
      return (
        <>
          <div className="blankscreen" onClick={stopClick}></div>
          <div className="signuppopup">
            <h3 className="credent">Enter email/phone number</h3>
            <p>Phone number/Email ID</p>
            <input className="credinp" type="email" id="inp2"></input>
            <button
              className="credbut"
              type="sumbit"
              onClick={async () => {
                const inp2 = document.getElementById("inp2");
                const email = inp2.value;
                const date = new Date();
                const password = "";
                try {
                  const response = await fetch("https://course-management-system-wnlu.onrender.com/login", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ email, password, date }),
                  });
  
                  const data = await response.text();

                  alert(data);
                } catch (error) {
                  console.error("Error:", error);
                  alert(error);

                }
              }}
            >
              Next
            </button>
  
            <p className="credtc">
              By signing up, you agree to our Terms & Conditions & Privacy Policy
            </p>
          </div>
        </>
      );
    }
    return (
        <div className="header">
          {isSignupOpen === 1 && <Signup />}
          {isLoginOpen === 1 && <Login />}
          {isSignupOpen === 2 && <Otpscreen />}
          {isLoginOpen === 2 && <Otpscreen />}


          <div className='bar' onClick={toggleSidebar}> 
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
          </div>


          <img src={logo} className="logo" alt="React logo spinning"/>
          <div className="searchWrap">
            <input
              className="searchInput"
              type="text"
              placeholder="  Type here to search.."
            />
            <button className="searchButton">
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="magnifying-glass"
                className="searchIcon"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path
                  fill="currentColor"
                  d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"
                ></path>
              </svg>
            </button>
          </div>
          <button className="signupBtn" onClick={signupclick}>
            &nbsp;&nbsp;Signup&nbsp;&nbsp;
          </button>
          <button className="loginBtn" onClick={loginclick}>
            &nbsp;&nbsp;Login&nbsp;&nbsp;
          </button>
        </div>
        )
  }

//   export default Header;