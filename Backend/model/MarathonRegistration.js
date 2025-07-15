import mongoose from 'mongoose';
import AddressSchema from './Address.js';
import EmergencyContactSchema from './EmergencyContact.js';

const UploadedDocumentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  url: { type: String, required: true },
});

const ConsentFormSchema = new mongoose.Schema({
  name: { type: String, required: true },
  url: { type: String, required: true },
});

const arrayLimit = (val) => val.length <= 2;

const MarathonRegistrationSchema = new mongoose.Schema({
  participant: { type: mongoose.Schema.Types.ObjectId, ref: 'Player', required: true },
  event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
  category: { type: mongoose.Schema.Types.ObjectId, required: true },
  registrationDate: { type: Date, default: Date.now },
  bibNumber: { type: String },
  status: { type: String, enum: ['Confirmed', 'Pending', 'Cancelled'], default: 'Pending' },
  qrCode: { type: String, unique: true },

  bibCollectionStatus: {
    type: String,
    enum: ['Pending', 'Collected'],
    default: 'Pending'
  },
  bibCollectedBy: { type: String }, // Name of the staff who collected the bib
  attendanceStatus: {
    type: String,
    enum: ['Absent', 'Present'],
    default: 'Absent'
  },
  attendanceMarkedBy: { type: String }, // Name of the staff who marked attendance


  // Personal Info
  firstName: { type: String, required: true },
  middleName: { type: String },
  lastName: { type: String, required: true },
  dateOfBirth: { type: Date },
  gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
  nationality: { type: String },
  phoneNumber: { type: String, required: true },
  email: { type: String, required: true },
  address: AddressSchema,

  emergencyContacts: {
    type: [EmergencyContactSchema],
    validate: [arrayLimit, '{PATH} exceeds the limit of 2']
  },

  medicalConditions: { type: String },
  allergies: { type: String },
  currentMedications: { type: String },
  bloodGroup: { type: String },

  uploadedDocuments: [UploadedDocumentSchema],
  consentForm: ConsentFormSchema,

  kitSize: {
    type: String,
    enum: ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL'],
    required: true
  },

  paymentMethod: { type: String, required: true },
  paymentStatus: { type: String, enum: ['Pending', 'Completed', 'Failed'], default: 'Pending' },
  transactionId: { type: String },
}, { timestamps: true });

MarathonRegistrationSchema.index({ participant: 1, event: 1, category: 1 }, { unique: true });

const MarathonRegistration = mongoose.model('MarathonRegistration', MarathonRegistrationSchema);
export default MarathonRegistration;
