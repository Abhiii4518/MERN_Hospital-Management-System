import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
//import { toast } from "react-toastify";
import { Context } from "../main";
import { Navigate } from "react-router-dom";

const Messages = () => {

    const [messages, setMessages] = useState([]);
    const { isAuthenticated } = useContext(Context)
    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const { data } = await axios.get(
                    "http://localhost:4000/api/v1/message/getall",
                    { withCredentials: true } //data true fir message send kare ga
                );
                setMessages(data.messages);
            } catch (error) {
              console.log("ERROR MESSAGES",error);
            }
        };
        fetchMessages();
    }, []);


    //Agar user Authenticate to Login page par bej Dega 
    if (!isAuthenticated) {
        return <Navigate to={"/login"} />;
      }

    return (
        <section className="page messages">
      <h1>MESSAGE</h1>
      <div className="banner">
        {messages && messages.length > 0 ? ( // Message rahe ga to message ka length 0 se jada rahe ga fir 2 condition check hoga 
          messages.map((element) => {
            return (
              <div className="card" >
                <div className="details">
                  <p>
                    First Name: <span>{element.firstName}</span>
                  </p>
                  <p>
                    Last Name: <span>{element.lastName}</span>
                  </p>
                  <p>
                    Email: <span>{element.email}</span>
                  </p>
                  <p>
                    Phone: <span>{element.phone}</span>
                  </p>
                  <p>
                    Message: <span>{element.message}</span>
                  </p>
                </div>
              </div>
            );
          })
        ) : (
          <h1>No Messages!</h1>
        )}
      </div>
    </section>
    )
}


export default Messages