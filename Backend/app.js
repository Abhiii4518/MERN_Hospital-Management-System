import express from "express";
import { config } from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import { dbConnection } from "./database/dbConnection.js";
import messageRouter from "./router/messageRouter.js";
import {errorMiddleware} from "./middlewares/errorMiddleware.js";
import userRouter from "./router/userRounter.js"
import appointmentRouter from "./router/appointmentRouter.js"

const app=express();

config({path:"./config/config.env"});

//Frontend ko connect kar ne ke liye use hota hai
app.use(cors({
    origin:[process.env.FRONTEND_URL,process.env.DASHBOARD_URL],
    methods:["GET","POST","PUT","DELETE"],
    credentials:true
}));

//Cookies ko get kare ge
app.use(cookieParser());
app.use(express.json()); //json format me data pass kare ga 
app.use(express.urlencoded({extended:true})); //Date ko format kar na  or Date  me convert kar na

app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:"/tmp/",
}));


app.use("/api/v1/message",messageRouter);
app.use("/api/v1/user",userRouter);
app.use("/api/v1/appointment",appointmentRouter);

dbConnection();


app.use(errorMiddleware);

export default app;

