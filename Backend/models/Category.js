const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  category_name: { type: String, required: true, maxlength: 100 },
  description: { type: String },
  age_group: { type: String, maxlength: 50 },
  start_time: { type: Date, required: true }, // e.g., 2025-12-15T06:30:00Z
  custom_fields: [
    {
      label: { type: String, required: true },       // e.g. "Passport Number"
      type: { type: String, required: true },         // e.g. "text", "number", "date", "file", "select"
      required: { type: Boolean, default: false },
      options: [String] // For dropdowns/select fields (optional)
    }
  ],
  registration_fee: {
    type: Number,
    required: true,
    min: 0
  },
  prizes: [
    {
      position: { type: String, required: true }, // e.g., "1st", "Runner-up"
      reward: { type: String, required: true }     // e.g., "₹10,000 + Trophy"
    }
  ]
});

module.exports = mongoose.model('Category', categorySchema);
