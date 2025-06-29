const mongoose = require('mongoose');

const organizerSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password_hash: { type: String, required: true },
  role: { type: String, enum: ['admin', 'staff', 'user'], default: 'user' },
  is_active: { type: Boolean, default: false },
  email: { type: String, required: true },
  name: { type: String, required: true },

  admin_info: {
    admin_privileges: { type: String },
    dashboard_access: { type: Boolean, default: false }
  },

  staff_info: {
    scanner_access: { type: Boolean, default: false },
    location_assigned: { type: String }
  }
});

module.exports = mongoose.model('Organizer', organizerSchema); 