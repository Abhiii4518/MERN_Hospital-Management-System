import mongoose from "mongoose";

export const dbConnection=()=>{
    mongoose.connect(process.env.MONGO_URI,{
        dbName:"HOSPITAL_MANAGEMENT_SYSTEM"
    }).then(()=>{
        console.log("Connected to database");
    }).catch(err=>{
        console.log(`Same error occured ${err}`);
    })
}