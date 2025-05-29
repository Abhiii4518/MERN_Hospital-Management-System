import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
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
    nic: {
        type: String,
        required: [true, "Message is required"],
        minLength: [4, "NIC must contain at least 4 digits!"],
        maxLength: [4, "NIC must contain at least 4 digits!"]
    },
    dob:{
        type:Date,
        required:[true,"DOB is required"]
    },
    gender:{
        type:String,
        required:true,
        enum:["Male","Female"]
    },
    password:{
        type:String,
        required:true,
        minLength: [8, "Password Must Conatain At Least 8 Characters!"],
        select:false  //use  ki detail aaye ge par password nhi
    },
    role:{
        type:String,
        required:true,
        enum:["Admin","Patient","Doctor"]
    },
    doctorDepartment:{
        type:String
    },
    docAvatar:{
        public_id:String,
        url:String
    },
    DoctorFees:{
    type:String,
    //  required:[true,"Fees is required"],
    // maxLength: [10, "Enter Valid Amount"] 
   },
});

userSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        next();
    }
    this.password=await bcrypt.hash(this.password,10);
});


userSchema.methods.comparePassword=async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);
}


userSchema.methods.generateJsonWebToken = function() {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRES,
    });
};


export const User = mongoose.model("User", userSchema);