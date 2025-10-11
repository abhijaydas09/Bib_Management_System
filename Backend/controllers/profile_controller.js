const Participant = require('../models/Participants');

// GET /api/profile/me
const getProfile = async (req, res) => {
  try {
    const userId = req.user && req.user.id;
    if (!userId) return res.status(401).json({ message: 'Unauthorized' });

    const user = await Participant.findById(userId).select('-password');
    if (!user) return res.status(404).json({ message: 'Profile not found' });
    return res.json(user);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// PUT /api/profile/me
const updateProfile = async (req, res) => {
  try {
    const userId = req.user && req.user.id;
    if (!userId) return res.status(401).json({ message: 'Unauthorized' });

    // Allowed fields to update
    const updatable = [
      'firstName','middleName','lastName','dateOfBirth','gender','nationality','phoneNumber','email','profilePicture',
      'address','emergencyContacts','medicalConditions','allergies','currentMedications','bloodGroup'
    ];

    const payload = {};
    for (const key of updatable) {
      if (req.body[key] !== undefined) payload[key] = req.body[key];
    }

    const updated = await Participant.findByIdAndUpdate(userId, { $set: payload }, { new: true }).select('-password');
    return res.json(updated);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { getProfile, updateProfile };
