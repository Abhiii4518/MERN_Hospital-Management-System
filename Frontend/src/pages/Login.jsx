import React, { useState, useContext } from "react";
import { Context } from "../main";
import { toast } from "react-toastify";
import { Link,Navigate,useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
    const { isAuthenticated, setIsAuthenticated, setUser } = useContext(Context);


    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const navigateTo = useNavigate();

    const handleLogin = async (e) => {  // e= e ka matlab hai ki login kar te samye page refrece nhi ho ga 
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:4000/api/v1/user/login", //patient login vala hai
                { email, password, confirmPassword, role: "Patient" },
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


    return (
        <>
            <div className="container form-component login-form">
                <h2>Login In</h2>
                <p>Please Login To Continue</p>
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
                    <div
                        style={{
                            gap: "10px",
                            justifyContent: "flex-end",
                            flexDirection: "row",
                        }}
                    >

                        <p style={{ marginBottom: 0 }}>Not Registered?</p>
                 <Link
                            to={"/register"}
                            style={{ textDecoration: "none", color: "#271776ca" }}
                        >
                            Register Now
                        </Link>
                    </div>
                    <div style={{ justifyContent: "center", alignItems: "center" }}>
                        <button type="submit">Login</button>
                    </div>
                </form>
            </div>

        </>
    )
}

export default Login