import React, { useState } from 'react';

import "./AdminLogin.css";
import AdminAccess from './AdminAccess'

function AdminLogin() {
  
  const [AdminAuthenticated,changeAuthentication] = useState(false)

  async function handleclick() {
    const inputuser = document.getElementById("inputuser");
    const inputpass = document.getElementById("inputpass");

    if (inputpass.value.length > 0 && inputuser.value.length > 0) {
      try{
        const creds = {inputuser:inputuser.value,inputpass:inputpass.value}
        const response = await fetch('http://localhost:3030/admin-login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(creds)
    });

    if(response.ok){
      const data = await response.json()  // Since you're sending a string response
      alert(data.message); 
      changeAuthentication(true)
    }else{
      alert("Wrong Credentials"); 
    }
    
    

      // alert(response.text())
    }catch(error){
      alert("some error throttled",error)
    }

    } else {
      alert("ja be lwde creds daal phle");
    }
  }

  // return (
  //   <>{AdminAuthenticated ?  (    <>
  //     <AdminAccess/>
  //     </>): 
  //     (
  //       <div className='box'>
  //       <div className="container">
  //         <h1>Admin Login</h1>
  //         <div className="input-group">
  //           <label htmlFor="username">Username</label>
  //           <input
  //             type="text"
  //             className="username"
  //             name="username"
  //             id="inputuser"
  //             required
  //           />
  //         </div>
  //         <div className="input-group">
  //           <label htmlFor="password">Password</label>
  //           <input
  //             type="password"
  //             className="password"
  //             name="password"
  //             id="inputpass"
  //             required
  //           />
  //         </div>
  //         <button type="submit" className="btn" onClick={handleclick}>
  //           Login
  //         </button>
  //       </div>
  //       </div>)
  //   }
    
  //   </>
  // );
  return(
    <AdminAccess/>
  )
}

export default AdminLogin;
