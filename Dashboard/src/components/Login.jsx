import React, { useContext, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Context } from "../main";
import axios from "axios";

const Login=()=>{
    const { isAuthenticated, setIsAuthenticated } = useContext(Context);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
  
    const navigateTo = useNavigate();

    const handleLogin = async (e) => {  // e= e ka matlab hai ki login kar te samye page refrece nhi ho ga 
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:4000/api/v1/user/login", //Admin login vala hai
                { email, password, confirmPassword, role: "Admin" },
                {
                    withCredentials:true,
                   headers: { "Content-Type": "application/json" },
                }
            );
            
                toast.success(response.data.message);
                setIsAuthenticated(true);
                navigateTo("/");
               
        } catch (error) {
            toast.error(error.response.data.message);
        }


    }
    //user already  Authenticate hai vo vapas login nhi kar sakta
    if (isAuthenticated) {
        return <Navigate to={"/"} />;
    }



    return(
        <>
         <section className="container form-component">
        <img src="/logo.png" alt="logo" className="logo" />
        <h1 className="form-title">WELCOME TO TRUSTCARE</h1>
        <p>Only Admins Are Allowed To Access These Resources!</p>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <div style={{ justifyContent: "center", alignItems: "center" }}>
            <button type="submit">Login</button>
          </div>
        </form>
      </section>
        </>
    )
}


export default  Login