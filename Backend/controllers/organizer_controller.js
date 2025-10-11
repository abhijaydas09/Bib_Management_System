const Organizer = require('../models/Organizer');

const getProfile = async (req, res) => {
  try {
    const userId = req.user && req.user.id;
    if (!userId) return res.status(401).json({ message: 'Unauthorized' });

    const org = await Organizer.findById(userId).select('-password');
    if (!org) return res.status(404).json({ message: 'Organizer not found' });
    return res.json(org);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateProfile = async (req, res) => {
  try {
    const userId = req.user && req.user.id;
    if (!userId) return res.status(401).json({ message: 'Unauthorized' });

    const updatable = [
      'firstName','lastName','gender','phoneNumber','email','profilePicture','organizationProfile'
    ];

    const payload = {};
    for (const key of updatable) {
      if (req.body[key] !== undefined) payload[key] = req.body[key];
    }

    const updated = await Organizer.findByIdAndUpdate(userId, { $set: payload }, { new: true }).select('-password');
    return res.json(updated);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { getProfile, updateProfile };
