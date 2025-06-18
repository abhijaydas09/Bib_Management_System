const mongoose = require('mongoose');

const adminActionSchema = new mongoose.Schema({
  admin_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  action_type: { type: String, required: true },
  description: { type: String },
  action_timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('AdminAction', adminActionSchema);
