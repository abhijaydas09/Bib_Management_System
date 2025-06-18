const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  event_name: { type: String, required: true, maxlength: 200 },
  event_date: { type: Date, required: true },
  location: { type: String, maxlength: 300 },
  status: {
    type: String,
    enum: ['planned', 'active', 'completed', 'cancelled'],
    default: 'planned'
  },
  category_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Participant' }]
});

module.exports = mongoose.model('Event', eventSchema);
