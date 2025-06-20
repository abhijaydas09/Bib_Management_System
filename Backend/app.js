const express = require('express');
const cors = require('cors');
require('dotenv').config()
const app =express()
const db = require('./db/db'); // correct relative path to db.js

const PORT = process.env.PORT

//middlewares
app.use(express.json())
app.use(cors())

app.get('/' , (req,res)=>{
    res.send('Hello world')
})


const server = () =>{
    db()
    app.listen(PORT ,()=>{
        console.log('listening to port',PORT)
    })
}


server()