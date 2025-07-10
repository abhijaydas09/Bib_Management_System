const mongoose = require('mongoose');
const AddressSchema = require('./Address');

const OrganizationProfileSchema = new mongoose.Schema({
  organisationName: { type: String, required: true },
  organisationType: { type: String },
  organiserFirstName: { type: String, required: true },
  organiserLastName: { type: String, required: true },
  description: { type: String },
  contact: {
    email: { type: String },
    phone: { type: String },
    website: { type: String },
    facebook: { type: String },
    instagram: { type: String },
    linkedin: { type: String },
    twitter: { type: String },
  },
  address: AddressSchema,
  publicProfileLink: { type: String },
});

const OrganizerSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
  phoneNumber: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profilePicture: { type: String }, // URL or file path
  organizationProfile: OrganizationProfileSchema,
}, { timestamps: true });

module.exports = mongoose.model('Organizer', OrganizerSchema); 