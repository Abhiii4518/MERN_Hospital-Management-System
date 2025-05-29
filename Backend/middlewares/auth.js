/*import { User } from "../models/userSchema.js";
import { catchAsyncErrors } from "./catchAsyncErrors.js";
import ErrorHandler from "./errorMiddleware.js";
import jwt, { decode } from "jsonwebtoken";


export const isAdminAuthenticated=catchAsyncErrors(async(req,res,next)=>{
    const token=req.cookies.adminToken;
    if(!token){
        return next(new ErrorHandler("Admin not Authenticated!", 400));
      }
      const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY);  //Verify Token in jwt_secret_key
      req.user=await User.findById(decode.id);//sign({ id: this._id } get id 
      if(req.user.role !== "Admin"){
        return next(new ErrorHandler(`${req.user.role} not authorized for this resource!`, 403));
      };
  next();
 });



 export const isPatientAuthenticated=catchAsyncErrors(async(req,res,next)=>{
    const token=req.cookies.patientToken;
    if(!token){
        return next(new ErrorHandler("patient not Authenticated!", 400));
      }
      const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY);  //Verify Token in jwt_secret_key
      req.user=await User.findById(decode.id);//sign({ id: this._id } get id 
      if(req.user.role !== "patient"){
        return next(new ErrorHandler(`${req.user.role} not authorized for this resource!`, 403));
      };
  next();
 });*/






 import { User } from "../models/userSchema.js";
import { catchAsyncErrors } from "./catchAsyncErrors.js";
import ErrorHandler from "./errorMiddleware.js";
import jwt from "jsonwebtoken";

export const isAdminAuthenticated = catchAsyncErrors(async (req, res, next) => {
    const token = req.cookies.adminToken;
    if (!token) {
        return next(new ErrorHandler("Admin not Authenticated!", 400));
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);  // Verify Token
    req.user = await User.findById(decoded.id); // Use decoded.id instead of decode.id
    if (req.user.role !== "Admin") {
        return next(new ErrorHandler(`${req.user.role} not authorized for this resource!`, 403));
    }
    next();
});


//Middleware to authenticate frontend users
export const isPatientAuthenticated = catchAsyncErrors(async (req, res, next) => {
    const token = req.cookies.patientToken;
    if (!token) {
        return next(new ErrorHandler("Patient not Authenticated!", 400));
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);  // Verify Token
    req.user = await User.findById(decoded.id); // Use decoded.id instead of decode.id
    if (req.user.role !== "Patient") {
        return next(new ErrorHandler(`${req.user.role} not authorized for this resource!`, 403));
    }
    next();
});

