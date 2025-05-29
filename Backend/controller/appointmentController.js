import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";
import { Appointment } from "../models/appointmentSchema.js";
import { User } from "../models/userSchema.js";
import { Payment } from "../models/paymentSchema.js";


export const postAppointment = catchAsyncErrors(async (req, res, next) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    nic,
    dob,
    gender,
    appointment_date,
    department,
    doctor_firstName,
    doctor_lastName,
    doctor_DoctorFees,
    hasVisited,
    address,
  } = req.body;
  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !nic ||
    !dob ||
    !gender ||
    !appointment_date ||
    !department ||
    !doctor_firstName ||
    !doctor_lastName ||
    !doctor_DoctorFees ||
    !address
  ) {
    return next(new ErrorHandler("Please Fill Full Form!", 400));
  }

  const phonePattern = /^[6-9][\d]{9}$/;

  // Validate the phone number
  if (!phonePattern.test(phone)) {
    return next(new ErrorHandler("Invalid Phone Number!", 400));
  }


  const isConflict = await User.find({
    firstName: doctor_firstName,
    lastName: doctor_lastName,
    DoctorFees: doctor_DoctorFees,
    role: "Doctor",
    doctorDepartment: department,
  });



  if (isConflict.length === 0) {
    return next(new ErrorHandler("Doctor not found", 404));
  }


  if (isConflict.length > 1) {
    return next(
      new ErrorHandler(
        "Doctors Conflict! Please Contact Through Email Or Phone!",
        400
      )
    );
  }
  const doctorId = isConflict[0]._id;  //Doctor ka data store hone par Doctor ki _id get kar sakte hai    
  const patientId = req.user._id;  //patient ki id get kare ke Jo Authenticated hai
  const appointment = await Appointment.create({
    firstName,
    lastName,
    email,
    phone,
    nic,
    dob,
    gender,
    appointment_date,
    department,
    doctor: {
      firstName: doctor_firstName,
      lastName: doctor_lastName,
    },
    doctor_DoctorFees,
    hasVisited,
    address,
    doctorId,
    patientId,
  });
  res.status(200).json({
    success: true,
    appointment,
    message: "Appointment Send! SuccessFully",
  });
});





export const getAllAppointments = catchAsyncErrors(async (req, res, next) => {
  const appointments = await Appointment.find();
  res.status(200).json({
    success: true,
    appointments,
  });
});



//status ko update kare ga use ka id ka use kar ke 
export const updateAppointmentStatus = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;   // http://localhost:4000/api/v1/user/login/id lagane par id use kar ta hai 
  let appointment = await Appointment.findById(id); //id find kare ke findById ka use kar ke jo id hoge
  //Appointment nhi hoga to
  if (!appointment) {
    return next(new ErrorHandler("Appointment Not Found", 404))
  }
  //Apointment mila jane par 
  appointment = await Appointment.findByIdAndUpdate(id, req.body, { //ose Appointment ki id use kare ga jise update kar na  , req.body ke ander ka data update ho jaye ga
    new: true,
    runValidators: true,
    useFindAndModify: false,
  })
  res.status(200).json({
    success: true,
    message: "Appointment Status Update",
    appointment,
  })
})


//status ko delete kare ga use ka id ka use kar ke 

export const deleteAppointment = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const appointment = await Appointment.findById(id);
  if (!appointment) {
    return next(new ErrorHandler("Appointment Not Found!", 404));
  }
  await appointment.deleteOne();
  res.status(200).json({
    success: true,
    message: "Appointment Deleted!",
  });
});


/*   ----           Payment  ----------             */

/*
export const UserPayment = catchAsyncErrors(async (req, res, next) => {
  const { cardNum, expriyDate, cvv, cardholderName, phone, amount } = req.body;

  if (!cardNum || !expriyDate || !cvv || !cardholderName || !phone || !amount) {
    return next(new ErrorHandler("Please Fill Full Form!", 400));
  }

  const phonePattern = /^[6-9][\d]{9}$/;

  if (!phonePattern.test(phone)) {
    return next(new ErrorHandler("Invalid Phone Number!", 400));
  }

  // Ensure card number and phone number are not the same
  if (cardNum === phone) {
    return next(new ErrorHandler("Card number and phone number cannot be the same!", 400));
  }

  // Check if the phone number is already associated with a different card number
  const existingPayment = await Payment.findOne({ phone });
  if (existingPayment && existingPayment.cardNum !== cardNum) {
    return next(new ErrorHandler("Phone number is already associated with a different card number!", 400));
  }

  // Check if the phone number exists in any appointment
  const appointmentcheckphonenum = await Appointment.findOne({ phone });

  if (!appointmentcheckphonenum) {
    return next(new ErrorHandler("Phone number does not match any appointment phone number!", 400));
  }



const amount23 = await Appointment.findOne({department});

if(amount23==amount){
  return next(new ErrorHandler("Phone number !", 400));
}
  





  await Payment.create({ cardNum, expriyDate, cvv, cardholderName, phone, amount });
  res.status(200).json({
    success: true,
    message: "Payment Is Processed",
  });
});
*/




export const UserPayment = catchAsyncErrors(async (req, res, next) => {
  const { cardNum, expriyDate, cvv, cardholderName,dob, phone, amount } = req.body;

  if (!cardNum || !expriyDate || !cvv || !cardholderName || !dob || !phone || !amount) {
    return next(new ErrorHandler("Please Fill Full Form!", 400));
  }

  const phonePattern = /^[6-9][\d]{9}$/;

  if (!phonePattern.test(phone)) {
    return next(new ErrorHandler("Invalid Phone Number!", 400));
  }

  // Ensure card number and phone number are not the same
  if (cardNum === phone) {
    return next(new ErrorHandler("Card number and phone number cannot be the same!", 400));
  }

  // Check if the phone number is already associated with a different card number
  const existingPayment = await Payment.findOne({ phone });
  if (existingPayment && existingPayment.cardNum !== cardNum) {
    return next(new ErrorHandler("Phone number is already associated with a different card number!", 400));
  }




  await Payment.create({ cardNum, expriyDate, cvv, cardholderName, dob, phone, amount });

  res.status(200).json({
    success: true,
    message: "Payment Is Processed",
    amount
  });
});