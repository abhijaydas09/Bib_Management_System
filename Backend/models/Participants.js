const mongoose = require('mongoose');
const AddressSchema = require('./Address');
const EmergencyContactSchema = require('./EmergencyContact');

const ParticipantSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  middleName: { type: String },
  lastName: { type: String, required: true },
  dateOfBirth: { type: Date },
  gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
  nationality: { type: String },
  phoneNumber: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profilePicture: { type: String }, // URL or file path
  address: AddressSchema,
  emergencyContacts: {
    type: [EmergencyContactSchema],
    validate: [arrayLimit, '{PATH} exceeds the limit of 2']
  },
  medicalConditions: { type: String },
  allergies: { type: String },
  currentMedications: { type: String },
  bloodGroup: { type: String },
}, { timestamps: true });

function arrayLimit(val) {
  return val.length <= 2;
}

module.exports = mongoose.model('Participant', ParticipantSchema); 