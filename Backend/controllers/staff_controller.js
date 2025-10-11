const Staff = require('../models/Staff');
const MarathonRegistration = require('../models/MarathonRegistration');
const bcrypt = require('bcryptjs');
const { genToken } = require('../config/token');

// Staff login: POST /api/staff/login
const login = async (req, res) => {
  try {
    const { userId, password } = req.body;
    if (!userId || !password) return res.status(400).json({ message: 'userId and password required' });

    const staff = await Staff.findOne({ userId });
    if (!staff) return res.status(401).json({ message: 'Invalid credentials' });

    const match = await bcrypt.compare(password, staff.password);
    if (!match) return res.status(401).json({ message: 'Invalid credentials' });

    const token = genToken(staff._id);
    const secureFlag = process.env.NODE_ENV === 'production';
    res.cookie('token', token, { httpOnly: true, secure: secureFlag, sameSite: 'strict' });
    const out = staff.toObject();
    delete out.password;
    return res.json(out);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// List registrations for staff's event: GET /api/staff/registrations
const listRegistrations = async (req, res) => {
  try {
    const user = req.user;
    if (!user || user.type !== 'staff') return res.status(403).json({ message: 'Forbidden' });

    const staff = await Staff.findById(user.id);
    if (!staff) return res.status(404).json({ message: 'Staff not found' });

    const { page = 1, limit = 20, search } = req.query;
    const q = { event: staff.event };
    if (search) {
      q.$or = [
        { firstName: { $regex: search, $options: 'i' } },
        { lastName: { $regex: search, $options: 'i' } },
        { phoneNumber: { $regex: search, $options: 'i' } },
        { bibNumber: { $regex: search, $options: 'i' } },
      ];
    }

    const regs = await MarathonRegistration.find(q)
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });

    const total = await MarathonRegistration.countDocuments(q);
    return res.json({ total, page: parseInt(page), limit: parseInt(limit), data: regs });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { login, listRegistrations };
