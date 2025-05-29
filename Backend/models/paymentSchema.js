import mongoose from "mongoose";
import { Mongoose } from "mongoose";
// import validator from "validator";

const paymentSchema = new mongoose.Schema({
    cardNum: {
        type: String,
        required: [true, "Card Number Is Required!"],
        maxLength: [16, "Card Number Must Contain At Least 19 Digits!"],
    },
    expriyDate: {
        type: String,
        required: [true, "Last Name Is Required!"],
    },
    cvv: {
        type: String,
        required: [true, "CVV Is Required!"],
        minLength: [3, "CVV Must Contain Only 4 Digits!"],
        maxLength: [3, "CVV Must Contain Only 4 Digits!"],
        /* validate: [validator.isEmail, "Provide A Valid Email!"], */
    },
    cardholderName: {
        type: String,
        required: [true, "card holder Is Required!"],
        minLength: [5, "Phone Number Must Contain Exact 5 Characters!"],

    },
    dob: {
        type: Date,
        required: [true, "Date Is Required!"],
    },
    phone: {
        type: String,
        required: [true, "Phone Is Required!"],
        minLength: [10, "Phone Number Must Contain Exact 10 Digits!"],
        maxLength: [10, "Phone Number Must Contain Exact 10 Digits!"],
    },
    amount: {
        type: Number,
        required: true,
    },

});

export const Payment = mongoose.model("Payment", paymentSchema);