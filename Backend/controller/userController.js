import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";
import { User } from "../models/userSchema.js";
import { generateToken } from "../utils/jwtToken.js";

import cloudinary from "cloudinary";


export const PatientRegister = catchAsyncErrors(async (req, res, next) => {
  const { firstName, lastName, email, phone, password, gender, dob, nic, role } = req.body;
  if (!firstName || !lastName || !email || !phone || !password || !gender || !dob || !nic || !role) {
    return next(new ErrorHandler("Please Fill Full Form!", 400));
  }
  let user = await User.findOne({ email });
  //Ager email exit kar te hai to
  if (user) {
    return next(new ErrorHandler("User Already Register!", 400));
  }

  const phonePattern = /^[6-9][\d]{9}$/;

  // Validate the phone number
  if (!phonePattern.test(phone)) {
    return next(new ErrorHandler("Invalid Phone Number!", 400));
  }


  user = await User.create({ firstName, lastName, email, phone, password, gender, dob, nic, role });
  generateToken(user, "Patient  Registered!", 200, res);
  //First Part 1
  /*res.status((200)).json({
      success:true,
      message:"user Registered!",
  })*/
})

export const login = catchAsyncErrors(async (req, res, next) => {
  const { email, password, confirmPassword, role } = req.body;
  if (!email || !password || !confirmPassword || !role) {
    return next((new ErrorHandler("Please Provide All Details!", 400)));
  }
  if (password !== confirmPassword) {
    return next((new ErrorHandler("Password And Confirm Password Do Not Match !", 400)));
  }
  const user = await User.findOne({ email }).select("+password");//select is false userSchema
  if (!user) {
    return next((new ErrorHandler("Invalid Password And Email!", 400)));
  }
  //Match Password hash passwordse compare
  const isPasswordMatched = await user.comparePassword((password));
  if (!isPasswordMatched) {
    return next((new ErrorHandler("Invalid Password And Email!", 400)));
  }
  if (role !== user.role) {
    return next((new ErrorHandler("User With This Role Not Found!", 400)));
  }

  generateToken(user, "User Logged In Successfully!", 200, res);

  /*res.status((200)).json({
      success:true,
      message:"User Logged In Successfully!",
  })*/
})

export const addNewAdmin = catchAsyncErrors(async (req, res, next) => {
  const { firstName, lastName, email, phone, nic, dob, gender, password } =
    req.body;
  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !nic ||
    !dob ||
    !gender ||
    !password
  ) {
    return next(new ErrorHandler("Please Fill Full Form!", 400));
  }

  const isRegistered = await User.findOne({ email });
  if (isRegistered) {
    return next(new ErrorHandler(`${isRegistered.role} With This Email Already Exists!`, 400));
  }

  const phonePattern = /^[6-9][\d]{9}$/;

  // Validate the phone number
  if (!phonePattern.test(phone)) {
    return next(new ErrorHandler("Invalid Phone Number!", 400));
  }

  
  const admin = await User.create({
    firstName,
    lastName,
    email,
    phone,
    nic,
    dob,
    gender,
    password,
    role: "Admin",
  });
  res.status(200).json({
    success: true,
    message: "New Admin Registered",

  });
});


//Docter ko get kare ge

export const getAllDoctors = catchAsyncErrors(async (req, res, next) => {
  const doctors = await User.find({ role: "Doctor" });
  res.status(200).json({
    success: true,
    doctors
  })
})


//all details get (admin,patient)
export const getUserDetails = catchAsyncErrors(async (req, res, next) => {
  const user = req.user;  //auth.js req.user se leha function is isPatient
  res.status(200).json({
    success: true,
    user //user ko bejege
  })
})

// Logout function for dashboard admin
export const logoutAdmin = catchAsyncErrors(async (req, res, next) => {
  res
    .status(201)
    .cookie("adminToken", "", {
      httpOnly: true,
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      message: "Admin Logged Out Successfully.",
    });
});


// Logout function for frontend patient
export const logoutPatient = catchAsyncErrors(async (req, res, next) => {
  res
    .status(201)
    .cookie("patientToken", "", {
      httpOnly: true,
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      message: "Patient Logged Out Successfully.",
    });
});

/*
export const addNewDoctor = catchAsyncErrors(async (req, res, next) => {
  
  if (!req.files || Object.keys(req.files).length === 0) {
    return next(new ErrorHandler("Doctor Avatar Required!", 400));
  }
  const { docAvatar } = req.files;
  const allowedFormats = ["image/png", "image/jpeg", "image/webp"];
  if (!allowedFormats.includes(docAvatar.mimetype)) {
    return next(new ErrorHandler("File Format Not Supported!", 400));
  }
  const {
    firstName,
    lastName,
    email,
    phone,
    nic,
    dob,
    gender,
    password,
    doctorDepartment,
  } = req.body;
  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !nic ||
    !dob ||
    !gender ||
    !password ||
    !doctorDepartment ||
    !docAvatar
  ) {
    return next(new ErrorHandler("Please Fill Full Form!", 400));
  }
  const isRegistered = await User.findOne({ email });
  if (isRegistered) {
    return next(
      new ErrorHandler("Doctor With This Email Already Exists!", 400)
    );
  }
  const cloudinaryResponse = await cloudinary.uploader.upload(
    docAvatar.tempFilePath
  );
  if (!cloudinaryResponse || cloudinaryResponse.error) {
    console.error(
      "Cloudinary Error:",
      cloudinaryResponse.error || "Unknown Cloudinary error"
    );
    return next(
      new ErrorHandler("Failed To Upload Doctor Avatar To Cloudinary", 500)
    );
  }
  const doctor = await User.create({
    firstName,
    lastName,
    email,
    phone,
    nic,
    dob,
    gender,
    password,
    role: "Doctor",
    doctorDepartment,
    docAvatar: {
      public_id: cloudinaryResponse.public_id,
      url: cloudinaryResponse.secure_url,
    },
  });
  res.status(200).json({
    success: true,
    message: "New Doctor Registered",
    doctor,
  });
 
});

*/

export const addNewDoctor = catchAsyncErrors(async (req, res, next) => {
  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      return next(new ErrorHandler("Doctor Avatar Required!", 400));
    }
    const { docAvatar } = req.files;
    const allowedFormats = ["image/png", "image/jpeg", "image/webp"];
    if (!allowedFormats.includes(docAvatar.mimetype)) {
      return next(new ErrorHandler("File Format Not Supported!", 400));
    }
    const {
      firstName,
      lastName,
      email,
      phone,
      nic,
      dob,
      gender,
      password,
      doctorDepartment,
      DoctorFees,
    } = req.body;
    if (
      !firstName ||
      !lastName ||
      !email ||
      !phone ||
      !nic ||
      !dob ||
      !gender ||
      !password ||
      !doctorDepartment||
      !DoctorFees
    ) {
      return next(new ErrorHandler("Please Fill Full Form!", 400));
    }
    const isRegistered = await User.findOne({ email });
    if (isRegistered) {
      return next(new ErrorHandler("Doctor With This Email Already Exists!", 400));
    }
    const phonePattern = /^[6-9][\d]{9}$/;

    // Validate the phone number
    if (!phonePattern.test(phone)) {
      return next(new ErrorHandler("Invalid Phone Number!", 400));
    }

    const cloudinaryResponse = await cloudinary.uploader.upload(docAvatar.tempFilePath); //img ka url hame mile ga  
    if (!cloudinaryResponse || cloudinaryResponse.error) {
      console.error("Cloudinary Error:", cloudinaryResponse.error || "Unknown Cloudinary error");
      return next(new ErrorHandler("Failed To Upload Doctor Avatar To Cloudinary", 500));
    }
    const doctor = await User.create({
      firstName,
      lastName,
      email,
      phone,
      nic,
      dob,
      gender,
      password,
      role: "Doctor",
      doctorDepartment,
      docAvatar: {
        public_id: cloudinaryResponse.public_id,
        url: cloudinaryResponse.secure_url,
      },
      DoctorFees,
    });
    res.status(200).json({
      success: true,
      message: "New Doctor Registered",
      doctor,
    });
  } catch (error) {
    console.error("Error:", error);
    next(new ErrorHandler("Server Error", 500));
  }
});


