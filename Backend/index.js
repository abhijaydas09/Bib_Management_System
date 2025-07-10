import express from "express";

let port = 3000;

let app = express();

app.get("/",(req,res)=>{
    res.send("hello");
})

app.listen(port , ()=>{
    console.log("server started");
})