import express from "express";
import dotenv from "dotenv";
import {connect} from "mongoose";
import connectDB from "./config/db.js";
import authRouter from "./routes/auth.route.js"
import eventRouter from './routes/event.routes.js';
import cookieParser from "cookie-parser";


dotenv.config()
let port = process.env.PORT || 6000 ;


let app = express();
app.use(express.json())
app.use(cookieParser())

app.use("/api/auth",authRouter)
app.use('/api/events', eventRouter);

app.listen(port , ()=>{
    connectDB()
    console.log(`server started on ${port}`);
})

