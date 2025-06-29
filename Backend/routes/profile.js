const express = require('express');
const validator = require('validator');
const UserProfile = require('../models/UserProfile');
const Organizer = require('../models/Organizer');

const router = express.Router();

// Middleware to validate JWT token (import from auth.js)
const { authenticateToken } = require('./auth');

// Get user profile
router.get('/', authenticateToken, async (req, res) => {
  try {
    const profile = await UserProfile.findOne({ organizer_id: req.user.id });
    
    if (!profile) {
      return res.status(404).json({ 
        error: 'Profile not found',
        needsProfileCreation: true 
      });
    }

    res.json({ profile });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create or update user profile
router.post('/', authenticateToken, async (req, res) => {
  try {
    const {
      full_name,
      gender,
      date_of_birth,
      nationality,
      email,
      mobile_number,
      mailing_address,
      emergency_contact,
      t_shirt_size,
      blood_group
    } = req.body;

    // Validation
    if (!full_name || !gender || !date_of_birth || !nationality || 
        !email || !mobile_number || !mailing_address || !emergency_contact || !t_shirt_size) {
      return res.status(400).json({ 
        error: 'Required fields missing',
        required_fields: ['full_name', 'gender', 'date_of_birth', 'nationality', 'email', 'mobile_number', 'mailing_address', 'emergency_contact', 't_shirt_size']
      });
    }

    // Validate email
    if (!validator.isEmail(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    // Validate date of birth (must be in the past and reasonable age)
    const dob = new Date(date_of_birth);
    const today = new Date();
    const age = today.getFullYear() - dob.getFullYear();
    
    if (dob > today) {
      return res.status(400).json({ error: 'Date of birth cannot be in the future' });
    }
    
    if (age < 5 || age > 100) {
      return res.status(400).json({ error: 'Invalid age range' });
    }

    // Validate mailing address structure
    if (!mailing_address.street_address || !mailing_address.city || 
        !mailing_address.state || !mailing_address.postal_code || !mailing_address.country) {
      return res.status(400).json({ 
        error: 'Complete mailing address required',
        required_address_fields: ['street_address', 'city', 'state', 'postal_code', 'country']
      });
    }

    // Validate emergency contact
    if (!emergency_contact.name || !emergency_contact.relationship || !emergency_contact.phone_number) {
      return res.status(400).json({ 
        error: 'Complete emergency contact information required',
        required_emergency_fields: ['name', 'relationship', 'phone_number']
      });
    }

    // Check if profile already exists
    let profile = await UserProfile.findOne({ organizer_id: req.user.id });

    if (profile) {
      // Update existing profile
      Object.assign(profile, {
        full_name,
        gender,
        date_of_birth: dob,
        nationality,
        email,
        mobile_number,
        mailing_address,
        emergency_contact,
        t_shirt_size,
        blood_group: blood_group || 'unknown'
      });
    } else {
      // Create new profile
      profile = new UserProfile({
        organizer_id: req.user.id,
        full_name,
        gender,
        date_of_birth: dob,
        nationality,
        email,
        mobile_number,
        mailing_address,
        emergency_contact,
        t_shirt_size,
        blood_group: blood_group || 'unknown'
      });
    }

    // Calculate completion percentage
    profile.profile_completion_percentage = profile.calculateCompletionPercentage();
    profile.is_profile_complete = profile.profile_completion_percentage >= 80;

    await profile.save();

    // Update organizer email if different
    if (email !== req.user.email) {
      await Organizer.findByIdAndUpdate(req.user.id, { email });
    }

    res.json({
      message: profile.is_profile_complete ? 'Profile completed successfully' : 'Profile updated successfully',
      profile,
      completion_percentage: profile.profile_completion_percentage,
      is_complete: profile.is_profile_complete
    });

  } catch (error) {
    console.error('Profile update error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update specific profile sections
router.patch('/section/:section', authenticateToken, async (req, res) => {
  try {
    const { section } = req.params;
    const updateData = req.body;

    const profile = await UserProfile.findOne({ organizer_id: req.user.id });
    
    if (!profile) {
      return res.status(404).json({ error: 'Profile not found' });
    }

    // Update specific section
    switch (section) {
      case 'basic':
        if (updateData.full_name) profile.full_name = updateData.full_name;
        if (updateData.gender) profile.gender = updateData.gender;
        if (updateData.date_of_birth) profile.date_of_birth = new Date(updateData.date_of_birth);
        if (updateData.nationality) profile.nationality = updateData.nationality;
        break;

      case 'contact':
        if (updateData.email) profile.email = updateData.email;
        if (updateData.mobile_number) profile.mobile_number = updateData.mobile_number;
        if (updateData.mailing_address) profile.mailing_address = updateData.mailing_address;
        break;

      case 'emergency':
        if (updateData.emergency_contact) profile.emergency_contact = updateData.emergency_contact;
        break;

      case 'marathon':
        if (updateData.t_shirt_size) profile.t_shirt_size = updateData.t_shirt_size;
        if (updateData.blood_group) profile.blood_group = updateData.blood_group;
        break;

      default:
        return res.status(400).json({ error: 'Invalid section' });
    }

    // Recalculate completion percentage
    profile.profile_completion_percentage = profile.calculateCompletionPercentage();
    profile.is_profile_complete = profile.profile_completion_percentage >= 80;

    await profile.save();

    res.json({
      message: 'Profile section updated successfully',
      profile,
      completion_percentage: profile.profile_completion_percentage,
      is_complete: profile.is_profile_complete
    });

  } catch (error) {
    console.error('Profile section update error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get profile completion status
router.get('/completion-status', authenticateToken, async (req, res) => {
  try {
    const profile = await UserProfile.findOne({ organizer_id: req.user.id });
    
    if (!profile) {
      return res.json({
        has_profile: false,
        completion_percentage: 0,
        is_complete: false,
        missing_fields: ['full_name', 'gender', 'date_of_birth', 'nationality', 'email', 'mobile_number', 'mailing_address', 'emergency_contact', 't_shirt_size']
      });
    }

    const completionPercentage = profile.calculateCompletionPercentage();
    const isComplete = completionPercentage >= 80;

    res.json({
      has_profile: true,
      completion_percentage: completionPercentage,
      is_complete: isComplete,
      profile: profile
    });

  } catch (error) {
    console.error('Completion status error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete profile
router.delete('/', authenticateToken, async (req, res) => {
  try {
    const profile = await UserProfile.findOneAndDelete({ organizer_id: req.user.id });
    
    if (!profile) {
      return res.status(404).json({ error: 'Profile not found' });
    }

    res.json({ message: 'Profile deleted successfully' });

  } catch (error) {
    console.error('Profile deletion error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router; 