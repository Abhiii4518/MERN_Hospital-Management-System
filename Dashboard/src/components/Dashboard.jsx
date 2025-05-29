/* import React, { useContext, useEffect, useState } from "react";
import { Context } from "../main";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

//React-icons  me use hota hai    ai or go icons hai
import { GoCheckCircleFill } from "react-icons/go";
import { AiFillCloseCircle } from "react-icons/ai";
//mport Doctors from "./Doctors";

const Dashboard = () => {

    const { isAuthenticated, user } = useContext(Context);
    const [appointments, setAppointments] = useState([]); //Jo bhi Appointment shai ue update or delete kare ge



     const [doctors, setDoctors] = useState([]);



     useEffect(() => {
        const fetchDoctors = async () => {
          try {
            const { data } = await axios.get(
              "http://localhost:4000/api/v1/user/doctors",
              { withCredentials: true }
            );
            setDoctors(data.doctors);
          } catch (error) {
            toast.error(error.response.data.message);
          }
        };
        fetchDoctors();
      }, []);










    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const { data } = await axios.get(
                    "http://localhost:4000/api/v1/appointment/getall",
                    { withCredentials: true }
                );
                setAppointments(data.appointments);  //appointment Hamare Backend se aa ra hai jo getAllAppointment function se

            } catch (error) {
                setAppointments([]); //koi error aaye ga to setAppointment Empty ho jaye ga
                console.log("Error Message", error)
            }
        };
        fetchAppointments();  //function call hoga 
    }, []);



    const handleUpdateStatus = async (appointmentId, status) => {
        try {
            const { data } = await axios.put(
                // appointmentid check kare ga or status condition ["Pending", "Accepted", "Rejected"] ye sab check kare ga 
                `http://localhost:4000/api/v1/appointment/update/${appointmentId}`,
                { status },
                { withCredentials: true }
            );
            setAppointments((prevAppointments) =>
                prevAppointments.map((appointment) =>
                    appointment._id === appointmentId
                        ? { ...appointment, status }
                        : appointment
                )
            );
            toast.success(data.message);
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    //Agar user Authenticate to Login page par bej Dega 
    if (!isAuthenticated) {
        return <Navigate to={"/login"} />;
    }







    return (
        <>
            <section className="dashboard page"> 
                <div className="banner">
                    <div className="firstBox">
                        <img src="/doc.png" alt="docImg" />
                        <div className="content">
                            <div>
                                <p>Hello ,</p>
                                <h5>
                                    {user &&
                                        `${user.firstName} ${user.lastName}`}{" "}
                                </h5>
                            </div>
                            <p>
                                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                                Facilis, nam molestias. Eaque molestiae ipsam commodi neque.
                                Assumenda repellendus necessitatibus itaque.
                            </p>
                        </div>
                    </div>
                    <div className="secondBox">
                        <p>Total Appointments</p>
                        <h3>{`${appointments.length}`}</h3>
                    </div>
                    <div className="thirdBox">
                        <p>Registered Doctors</p>
                        <h3>{`${doctors.length}`}</h3>
                    </div>
                </div>
                <div className="banner">
                    <h5>Appointments</h5>
                    <table>
                        <thead>
                            <tr>
                                <th>Patient</th>
                                <th>Date</th>
                                <th>Doctor</th>
                                <th>Department</th>
                                <th>Status</th>
                                <th>Visited</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                appointments && appointments.length > 0 ? (
                                    appointments.map(appointment => {
                                        return (
                                            <tr key={appointment._id}>
                                                <td>{`${appointment.firstName} ${appointment.lastName}`}</td>
                                                <td>{appointment.appointment_date.substring(0, 16)}</td>
                                                <td>{`${appointment.doctor.firstName} ${appointment.doctor.lastName}`}</td>
                                                <td>{appointment.department}</td>
                                                <td>
                                                    <select
                                                        className={
                                                            appointment.status === "Pending"
                                                                ? "value-pending"
                                                                : appointment.status === "Accepted"
                                                                    ? "value-accepted"
                                                                    : "value-rejected"
                                                        }
                                                        value={appointment.status}
                                                        onChange={(e) =>
                                                            handleUpdateStatus(appointment._id, e.target.value)
                                                        }
                                                    >
                                                        <option value="Pending" className="value-pending">
                                                            Pending
                                                        </option>
                                                        <option value="Accepted" className="value-accepted">
                                                            Accepted
                                                        </option>
                                                        <option value="Rejected" className="value-rejected">
                                                            Rejected
                                                        </option>
                                                    </select>
                                                </td>
                                                <td>{appointment.hasVisited === true ? <GoCheckCircleFill className="green"/> : <AiFillCloseCircle className="red"/>}</td>
                                            </tr>

                                        )
                                    })

                                )

                                    : (<h1>NO APPOINTMENT</h1>)
                            }
                        </tbody>
                    </table>


                </div>
            </section>
        </>
    )
}


export default Dashboard  */










import React, { useContext, useEffect, useState } from "react";
import { Context } from "../main";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

//React-icons  me use hota hai    ai or go icons hai
import { GoCheckCircleFill } from "react-icons/go";
import { AiFillCloseCircle } from "react-icons/ai";
//mport Doctors from "./Doctors";

const Dashboard = () => {

    const { isAuthenticated, user } = useContext(Context);
    const [appointments, setAppointments] = useState([]); //Jo bhi Appointment shai ue update or delete kare ge



    
    const [doctors, setDoctors] = useState([]);
// Doctor Register  
    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const { data } = await axios.get(
                    "http://localhost:4000/api/v1/user/doctors",
                    { withCredentials: true }
                );
                setDoctors(data.doctors);
            } catch (error) {
                toast.error(error.response.data.message);
            }
        };
        fetchDoctors();
    }, []);


    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const { data } = await axios.get(
                    "http://localhost:4000/api/v1/appointment/getall",
                    { withCredentials: true }
                );
                setAppointments(data.appointments);  //appointment Hamare Backend se aa ra hai jo getAllAppointment function se

            } catch (error) {
                setAppointments([]); //koi error aaye ga to setAppointment Empty ho jaye ga
                console.log("Error Message", error)
            }
        };
        fetchAppointments();  //function call hoga 
    }, []);

    const handleUpdateStatus = async (appointmentId, status) => {
        try {
            const { data } = await axios.put(
                `http://localhost:4000/api/v1/appointment/update/${appointmentId}`,
                { status },
                { withCredentials: true }
            );
            setAppointments((prevAppointments) =>
                prevAppointments.map((appointment) =>
                    appointment._id === appointmentId
                        ? { ...appointment, status }
                        : appointment
                )
            );
            toast.success(data.message);
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    // Handle appointment deletion
    const handleDeleteAppointment = async (appointmentId) => {
        try {
            const { data } = await axios.delete(
                `http://localhost:4000/api/v1/appointment/delete/${appointmentId}`,
                { withCredentials: true }
            );
            setAppointments((prevAppointments) =>
                prevAppointments.filter((appointment) => appointment._id !== appointmentId)
            );
            toast.success(data.message);
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    //Agar user Authenticate to Login page par bej Dega 
    if (!isAuthenticated) {
        return <Navigate to={"/login"} />;
    }


    const capitalizeFirstWord = (value) => {
        return value.charAt(0).toUpperCase() + value.slice(1);
    };


    return (
        <>
            <section className="dashboard page">
                <div className="banner">
                    <div className="firstBox">
                        <img src="/doc.png" alt="docImg" />
                        <div className="content">
                            <div>
                                <p>Hello ,</p>
                                <h5>
                                    {user &&
                                        `${capitalizeFirstWord(user.firstName)} ${capitalizeFirstWord(user.lastName)}`}{" "}
                                </h5>
                            </div>
                        </div>
                    </div>
                    <div className="secondBox">
                        <p>Total Appointments</p>
                        <h3>{`${appointments.length}`}</h3>
                    </div>
                    <div className="thirdBox">
                        <p>Registered Doctors</p>
                        <h3>{`${doctors.length}`}</h3>
                    </div>
                </div>
                <div className="banner">
                    <h5>Appointments</h5>
                    <table>
                        <thead>
                            <tr>
                                <th>Patient</th>
                                <th>Date</th>
                                <th>Doctor</th>
                                <th>Department</th>
                                <th>Status</th>
                                <th>Visited</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                appointments && appointments.length > 0 ? (
                                    appointments.map(appointment => {
                                        return (
                                            <tr key={appointment._id}>
                                                <td>{`${appointment.firstName} ${appointment.lastName}`}</td>
                                                <td>{appointment.appointment_date.substring(0, 16)}</td>
                                                <td>{`${appointment.doctor.firstName} ${appointment.doctor.lastName}`}</td>
                                                <td>{appointment.department}</td>
                                                <td>
                                                    <select
                                                        className={
                                                            appointment.status === "Pending"
                                                                ? "value-pending"
                                                                : appointment.status === "Accepted"
                                                                    ? "value-accepted"
                                                                    : "value-rejected"
                                                        }
                                                        value={appointment.status}
                                                        onChange={(e) =>
                                                            handleUpdateStatus(appointment._id, e.target.value)
                                                        }
                                                    >
                                                        <option value="Pending" className="value-pending">
                                                            Pending
                                                        </option>
                                                        <option value="Accepted" className="value-accepted">
                                                            Accepted
                                                        </option>
                                                        <option value="Rejected" className="value-rejected">
                                                            Rejected
                                                        </option>
                                                    </select>
                                                </td>
                                                <td>{appointment.hasVisited === true ? <GoCheckCircleFill className="green" /> : <AiFillCloseCircle className="red" />}</td>
                                                <td>
                                                    <button
                                                        onClick={() => handleDeleteAppointment(appointment._id)}
                                                        className="delete-button"
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    })
                                )
                                    : (<h1>No Appointment</h1>)
                            }
                        </tbody>
                    </table>
                </div>
            </section>
        </>
    );
};

export default Dashboard;

