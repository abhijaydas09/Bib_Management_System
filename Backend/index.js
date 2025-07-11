import express from "express";
import dotenv from "dotenv";
import {connect} from "mongoose";
import connectDB from "./config/db.js";
import authRouter from "./routes/auth.route.js"
import eventRouter from './routes/event.routes.js';
import cookieParser from "cookie-parser";
import cors from "cors";


dotenv.config()
let port = process.env.PORT || 6000 ;


let app = express();
app.use(express.json({ limit: '5mb' })); // or '10mb'
app.use(express.urlencoded({ extended: true, limit: '5mb' }));

app.use(cookieParser())
app.use(cors());

app.use("/api/auth",authRouter)
app.use('/api/events', eventRouter);

app.listen(port , ()=>{
    connectDB()
    console.log(`server started on ${port}`);
})

