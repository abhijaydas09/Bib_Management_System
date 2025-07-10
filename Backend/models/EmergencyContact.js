const mongoose = require('mongoose');

const EmergencyContactSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  middleName: { type: String },
  lastName: { type: String, required: true },
  relationship: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  email: { type: String },
});

module.exports = EmergencyContactSchema; 