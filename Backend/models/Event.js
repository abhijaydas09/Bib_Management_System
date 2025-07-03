const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  event_name: { type: String, required: true, maxlength: 200 },
  event_start_date: { type: Date, required: true },
    event_end_date: {
    type: Date,
    default: function () {
      return this.event_start_date; // defaults to start date
    }
  },
  location: {
    full_address: { type: String, required: true },  // e.g. "MMRDA Grounds, BKC, Mumbai"
    city: { type: String, required: true },          // e.g. "Mumbai"
    state: { type: String, required: true },         // e.g. "Maharashtra"
    google_maps_link: { type: String, required: true } // e.g. "https://maps.google.com/?q=MMRDA+BKC"
  },
  prize_pool: {
    type: Number,
    default: 0,
    min: 0 // prize money can't be negative
  },
  status: {
    type: String,
    enum: ['planned', 'active', 'completed', 'cancelled'],
    default: 'planned'
  },
  category_ids: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Participant' }]
});

module.exports = mongoose.model('Event', eventSchema);
    