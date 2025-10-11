const { verifyToken } = require('../config/token');
const Participant = require('../models/Participants');
let Organizer;
let Staff;
try { Organizer = require('../models/Organizer'); } catch (e) { Organizer = null; }
try { Staff = require('../models/Staff'); } catch (e) { Staff = null; }

module.exports = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : (req.cookies && req.cookies.token);
    if (!token) return res.status(401).json({ message: 'Unauthorized: No token provided' });

    const payload = verifyToken(token);
    if (!payload || !payload.id) return res.status(401).json({ message: 'Unauthorized: Invalid token' });

    // attach minimal user info
    req.user = { id: payload.id };
    // optionally load user: try Participant, Organizer, Staff
    try {
      const user = await Participant.findById(payload.id).select('-password');
      if (user) {
        req.user.profile = user;
        req.user.type = 'participant';
        return next();
      }
    } catch (e) {}

    if (Organizer) {
      try {
        const org = await Organizer.findById(payload.id).select('-password');
        if (org) {
          req.user.profile = org;
          req.user.type = 'organizer';
          return next();
        }
      } catch (e) {}
    }

    if (Staff) {
      try {
        const staff = await Staff.findById(payload.id).select('-password');
        if (staff) {
          req.user.profile = staff;
          req.user.type = 'staff';
          return next();
        }
      } catch (e) {}
    }

    next();
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized', error: error.message });
  }
};
