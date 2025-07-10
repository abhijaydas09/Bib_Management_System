const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
  categoryName: { type: String, required: true },
  distance: { type: String, required: true },
  startTime: { type: String, required: true },
  registrationFees: { type: Number, required: true },
  minimumAge: { type: Number },
  maximumAge: { type: Number },
  maximumParticipants: {
    type: mongoose.Schema.Types.Mixed,
    validate: {
      validator: function(v) {
        return (
          typeof v === 'number' ||
          v === 'NA' ||
          v === 'Unlimited' ||
          v === null
        );
      },
      message: 'maximumParticipants must be a number, "NA", "Unlimited", or null.'
    },
    default: null
  },
});

const BibCollectionSchema = new mongoose.Schema({
  bibCollectionStartDate: { type: Date },
  bibCollectionEndDate: { type: Date },
  venue: { type: String },
  locationLink: { type: String },
  bibCollectionStartTime: { type: String },
  bibCollectionEndTime: { type: String },
});

const SponsorSchema = new mongoose.Schema({
  sponsorName: { type: String, required: true },
  sponsorTitle: { type: String },
  sponsorLogo: { type: String }, // URL or file path
});

const EventSchema = new mongoose.Schema({
  eventID: { type: String, required: true, unique: true },
  eventName: { type: String, required: true },
  organiser: { type: mongoose.Schema.Types.ObjectId, ref: 'Organizer', required: true },
  eventLogo: { type: String },
  eventBanner: { type: String },
  email: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  description: { type: String },
  registrationStartDate: { type: Date },
  registrationEndDate: { type: Date },
  paymentMethod1: { type: String },
  paymentMethod2: { type: String },
  upiId: { type: String },
  accountNumber: { type: String },
  ifscCode: { type: String },
  bankNameBranch: { type: String },
  eventDate: { type: Date },
  startTime: { type: String },
  venue: { type: String },
  locationLink: { type: String },
  city: { type: String },
  state: { type: String },
  district: { type: String },
  country: { type: String },
  categories: [CategorySchema],
  bibCollection: BibCollectionSchema,
  requiredDocuments: [String],
  kitSize: {
    type: [String],
    enum: ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL'],
    default: ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL']
  },
  consentForm: { type: String },
  rulesGuidelines: { type: String },
  sponsors: [SponsorSchema],
}, { timestamps: true });

module.exports = mongoose.model('Event', EventSchema); 