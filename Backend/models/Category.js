const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  category_name: { type: String, required: true, maxlength: 100 },
  description: { type: String },
  age_group: { type: String, maxlength: 50 }
});

module.exports = mongoose.model('Category', categorySchema);
