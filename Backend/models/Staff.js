const mongoose = require('mongoose');

const StaffSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  userId: { type: String, required: true, unique: true }, // custom userId for login
  password: { type: String, required: true }, // hashed password
  event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
  activity: { type: String, enum: ['Online', 'Offline'], default: 'Offline' },
}, { timestamps: true });

module.exports = mongoose.model('Staff', StaffSchema); 