import express from "express"
import { deleteAppointment, getAllAppointments, postAppointment, updateAppointmentStatus,UserPayment } from "../controller/appointmentController.js"; // all are the  function
import {isAdminAuthenticated,isPatientAuthenticated} from "../middlewares/auth.js";


const router=express.Router();

router.post("/post",isPatientAuthenticated,postAppointment);
router.get("/getall",isAdminAuthenticated,getAllAppointments);
router.put("/update/:id",isAdminAuthenticated,updateAppointmentStatus);
router.delete("/delete/:id",isAdminAuthenticated,deleteAppointment);
router.post("/payment",isPatientAuthenticated,UserPayment);


export default router;