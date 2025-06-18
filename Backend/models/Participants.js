const mongoose = require('mongoose');

const participantSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  event_name: { type: String, required: true, maxlength: 200 },
  category: { type: String, required: true, maxlength: 100 },
  bib_number: { type: String, required: true, maxlength: 20 },
  qr_code: { type: String, maxlength: 500 },
  registration_date: { type: Date, default: Date.now },

  bib_assignments: [{
    assignment_id: { type: mongoose.Schema.Types.ObjectId },
    staff_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    assigned_at: { type: Date },
    picked_up_at: { type: Date },
    device_info: { type: String },
    location_info: { type: String }
  }],

  scan_logs: [{
    log_id: { type: mongoose.Schema.Types.ObjectId },
    scanned_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    scan_time: { type: Date },
    device_info: { type: String },
    location_info: { type: String }
  }]
});

module.exports = mongoose.model('Participant', participantSchema);
