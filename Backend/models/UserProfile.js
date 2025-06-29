const mongoose = require('mongoose');

const userProfileSchema = new mongoose.Schema({
  // Reference to the Organizer account
  organizer_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Organizer', 
    required: true,
    unique: true 
  },

  // Basic Information
  full_name: { 
    type: String, 
    required: true, 
    maxlength: 100 
  },
  gender: { 
    type: String, 
    enum: ['male', 'female', 'other', 'prefer_not_to_say'], 
    required: true 
  },
  date_of_birth: { 
    type: Date, 
    required: true 
  },
  nationality: { 
    type: String, 
    required: true, 
    maxlength: 50 
  },

  // Contact Information
  email: { 
    type: String, 
    required: true, 
    maxlength: 100 
  },
  mobile_number: { 
    type: String, 
    required: true, 
    maxlength: 20 
  },
  mailing_address: {
    street_address: { type: String, required: true, maxlength: 200 },
    city: { type: String, required: true, maxlength: 50 },
    state: { type: String, required: true, maxlength: 50 },
    postal_code: { type: String, required: true, maxlength: 20 },
    country: { type: String, required: true, maxlength: 50 }
  },

  // Emergency Contact
  emergency_contact: {
    name: { type: String, required: true, maxlength: 100 },
    relationship: { type: String, required: true, maxlength: 50 },
    phone_number: { type: String, required: true, maxlength: 20 },
    email: { type: String, maxlength: 100 }
  },

  // Marathon Specific Information
  t_shirt_size: { 
    type: String, 
    enum: ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'], 
    required: true 
  },
  blood_group: { 
    type: String, 
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-', 'unknown'], 
    default: 'unknown' 
  },

  // Profile Status
  is_profile_complete: { 
    type: Boolean, 
    default: false 
  },
  profile_completion_percentage: { 
    type: Number, 
    default: 0, 
    min: 0, 
    max: 100 
  },

  // Timestamps
  created_at: { 
    type: Date, 
    default: Date.now 
  },
  updated_at: { 
    type: Date, 
    default: Date.now 
  }
});

// Update the updated_at field before saving
userProfileSchema.pre('save', function(next) {
  this.updated_at = new Date();
  next();
});

// Calculate profile completion percentage
userProfileSchema.methods.calculateCompletionPercentage = function() {
  const requiredFields = [
    'full_name', 'gender', 'date_of_birth', 'nationality',
    'email', 'mobile_number', 'mailing_address', 'emergency_contact',
    't_shirt_size'
  ];
  // Only blood_group is optional now
  const optionalFields = [
    'blood_group'
  ];
  let completedRequired = 0;
  let completedOptional = 0;
  requiredFields.forEach(field => {
    if (this[field] && 
        (typeof this[field] !== 'object' || 
         (Array.isArray(this[field]) && this[field].length > 0) ||
         (typeof this[field] === 'object' && Object.keys(this[field]).length > 0))) {
      completedRequired++;
    }
  });
  optionalFields.forEach(field => {
    if (this[field] && 
        (typeof this[field] !== 'object' || 
         (Array.isArray(this[field]) && this[field].length > 0) ||
         (typeof this[field] === 'object' && Object.keys(this[field]).length > 0))) {
      completedOptional++;
    }
  });
  const requiredWeight = 0.8; // 80% weight for required fields
  const optionalWeight = 0.2; // 20% weight for optional fields
  const requiredPercentage = (completedRequired / requiredFields.length) * requiredWeight;
  const optionalPercentage = (completedOptional / optionalFields.length) * optionalWeight;
  return Math.round((requiredPercentage + optionalPercentage) * 100);
};

module.exports = mongoose.model('UserProfile', userProfileSchema); 