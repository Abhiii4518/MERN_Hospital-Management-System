import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import { Message } from "../models/messageSchema.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";
export const sendMessage = catchAsyncErrors(async (req, res, next) => {
   const { firstName, lastName, email, phone, message } = req.body;
   if (!firstName || !lastName || !email || !phone || !message) {
      //First part without ErrorHandler
      /*  return res.status(400).json({
                success:false,
                message:"Please Fill Full Form",
         });*/

      //Using ErrorHandler
      return next(new ErrorHandler("Please Fill Full Form!", 400));
   }
   const phonePattern = /^[6-9][\d]{9}$/;

   // Validate the phone number
   if (!phonePattern.test(phone)) {
     return next(new ErrorHandler("Invalid Phone Number!", 400));
   }

   await Message.create({ firstName, lastName, email, phone, message });
   res.status(200).json({
      success: true,
      message: "Message Send Successfully",
   });
});

export const getAllMessages = catchAsyncErrors(async (req, res, next) => {
   const messages = await Message.find();
   res.status(200).json({
     success: true,
     messages,
   });
 });
