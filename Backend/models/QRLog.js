const mongoose = require('mongoose');

const QRLogSchema = new mongoose.Schema({
  event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
  participant: { type: mongoose.Schema.Types.ObjectId, ref: 'Participant', required: true },
  staff: { type: mongoose.Schema.Types.ObjectId, ref: 'Staff' },
  timestamp: { type: Date, default: Date.now },
  category: { type: mongoose.Schema.Types.ObjectId, required: true }, // references Event.categories
  bibNumber: { type: String },
  action: { type: String, required: true }, // e.g., 'Bib Collected', 'Attendance Marked'
}, { timestamps: true });

module.exports = mongoose.model('QRLog', QRLogSchema); 