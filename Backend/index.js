import express from "express";
import dotenv from "dotenv";
import {connect} from "mongoose";
import connectDB from "./model/DatabaseConnectionDriver.js";

dotenv.config()
let port = process.env.PORT || 6000 ;


let app = express();

app.get("/",(req,res)=>{
    res.send("hello");
})


app.listen(port , ()=>{
    connectDB()
    console.log("server started");
})

