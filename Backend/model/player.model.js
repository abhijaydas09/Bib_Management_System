import mongoose from 'mongoose';
import AddressSchema from './Address.js';
import EmergencyContactSchema from './EmergencyContact.js';
// Helper validator
function arrayLimit(val) {
  return val.length <= 2;
}

const playerSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  middleName: { type: String },
  lastName: { type: String, required: true },
  dateOfBirth: { type: Date },
  gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
  nationality: { type: String },
  phoneNumber: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  profilePicture: { type: String },
  address: AddressSchema,
  emergencyContacts: {
    type: [EmergencyContactSchema],
    validate: [arrayLimit, '{PATH} exceeds the limit of 2']
  },
  medicalConditions: { type: String },
  allergies: { type: String },
  currentMedications: { type: String },
  bloodGroup: { type: String }
}, { timestamps: true });



const Player =  mongoose.model('Player', playerSchema);

export default Player