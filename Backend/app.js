const express = require('express');
const cors = require('cors');
require('dotenv').config()
const app = express()
const db = require('./db/db'); // correct relative path to db.js

const PORT = process.env.PORT || 5001

// Import routes
const { router: authRouter } = require('./routes/auth');
const profileRouter = require('./routes/profile');
const contactRouter = require('./routes/contact');
const eventCategoryRouter = require('./routes/eventCategory');


//middlewares
app.use(express.json())
app.use(cors())

// Routes
app.use('/api/auth', authRouter);
app.use('/api/profile', profileRouter);

app.use('/api/contact', contactRouter);
app.use('/api/eventCategory', eventCategoryRouter);

app.get('/' , (req,res)=>{
    res.send('Hello world')
})

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});
 
const server = () =>{
    db()
    app.listen(PORT ,()=>{
        console.log('listening to port',PORT)
    })
}

server()