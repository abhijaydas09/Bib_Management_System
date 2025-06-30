const mongoose = require('mongoose');

const organizerSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password_hash: { type: String, required: true },
  role: { type: String, enum: ['admin', 'staff', 'user'], default: 'user' },
  is_active: { type: Boolean, default: false },
  email: { type: String, required: true },
  name: { type: String, required: true },

  // Organiser profile fields
  org_description: { type: String },
  phone: { type: String },
  website: { type: String },
  social_links: {
    facebook: { type: String },
    instagram: { type: String },
    linkedin: { type: String },
    twitter: { type: String }
  },
  address: { type: String },
  logo_url: { type: String },
  org_type: { type: String, enum: ['company', 'non-profit', 'club', 'individual', 'other'] },
  public_profile_link: { type: String },

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