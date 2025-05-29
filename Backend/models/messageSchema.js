/*import mongoose from "mongoose";
import validator  from "validator";


const messageSchema=new mongoose.Schema({
    firstName:{
        typeof:String,
        required:true,
        minLength:[3,"First Name Must Contain At Least 3 Characters!"]
    },
    lastName:{
        typeof:String,
        required:true,
        minLength:[3,"Last Name Must Contain At Least 3 Characters!"]
    },
    email:{
        typeof:String,
        required:true,
        validator:[validator.isEmail,"Please Provide A Valid Email!"]
    },
    phone:{
        typeof:String,
        required:true,
        minLength:[11,"Phone Number Must Conatin Exact 11 Digits!"],
        maxLength:[11,"Phone Number Must Conatin Exact 11 Digits!"]
    },
    message:{
        typeof:String,
        required:true,
        minLength:[10,"Message  Must Conatin At Least 10 Characters!"]
    },
});

export const Message=mongoose.model("Message",messageSchema);*/

import mongoose from "mongoose";
import validator from "validator";

const messageSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "First Name is required"],
        minLength: [3, "First Name must contain at least 3 characters!"]
    },
    lastName: {
        type: String,
        required: [true, "Last Name is required"],
        minLength: [3, "Last Name must contain at least 3 characters!"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        validate: [validator.isEmail, "Please provide a valid email!"]
    },
    phone: {
        type: String,
        required: [true, "Phone Number is required"],
        minLength: [10, "Phone Number must contain exactly 10 digits!"],
        maxLength: [10, "Phone Number must contain exactly 10 digits!"]
    },
    message: {
        type: String,
        required: [true, "Message is required"],
        minLength: [10, "Message must contain at least 10 characters!"]
    },
});

export const Message = mongoose.model("Message", messageSchema);
