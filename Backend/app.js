const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const app = express();
const db = require('./db/db');

const PORT = process.env.PORT || 5001;

// Import routes
const authRouter = require('./routes/auth_routes');
const organizerAuthRouter = require('./routes/organizer_auth_routes');
const registrationRouter = require('./routes/registration_routes');
const qrRouter = require('./routes/qr_routes');
const profileRouter = require('./routes/profile_routes');
const organizerRouter = require('./routes/organizer_routes');
const eventRouter = require('./routes/event_routes');
const staffRouter = require('./routes/staff_routes');
const organizerManageRouter = require('./routes/organizer_manage_routes');

// middlewares
app.use(express.json());
app.use(cors());
app.use(cookieParser());

// Routes
app.use('/api/auth', authRouter);
app.use('/api/organizer/auth', organizerAuthRouter);
app.use('/api/registration', registrationRouter);
app.use('/api/qr', qrRouter);
app.use('/api/profile', profileRouter);
app.use('/api/organizer', organizerRouter);
app.use('/api/event', eventRouter);
app.use('/api/staff', staffRouter);
app.use('/api/organizer/manage', organizerManageRouter);

app.get('/', (req, res) => {
  res.send('Hello world');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

if (require.main === module) {
  db();
  app.listen(PORT, () => {
    console.log('listening to port', PORT);
  });
}

module.exports = app;