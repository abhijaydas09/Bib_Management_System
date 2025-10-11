const Organizer = require('../models/Organizer');
const bcrypt = require('bcryptjs');
const { genToken } = require('../config/token');

const signUp = async (req, res) => {
  try {
    const { firstName, lastName, gender, phoneNumber, email, password, organizationProfile } = req.body;
    if (!firstName || !lastName || !phoneNumber || !email || !password) return res.status(400).json({ message: 'Missing fields' });

    const existing = await Organizer.findOne({ $or: [{ email }, { phoneNumber }] });
    if (existing) return res.status(400).json({ message: 'Email or phone already registered' });

    const hashed = await bcrypt.hash(password, 10);
    const org = await Organizer.create({ firstName, lastName, gender, phoneNumber, email, password: hashed, organizationProfile });
    const token = genToken(org._id);
    const secureFlag = process.env.NODE_ENV === 'production';
    res.cookie('token', token, { httpOnly: true, secure: secureFlag, sameSite: 'strict' });
    const out = org.toObject(); delete out.password;
    return res.status(201).json(out);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'Email and password required' });

    const org = await Organizer.findOne({ email });
    if (!org) return res.status(401).json({ message: 'Invalid credentials' });

    const match = await bcrypt.compare(password, org.password);
    if (!match) return res.status(401).json({ message: 'Invalid credentials' });

    const token = genToken(org._id);
    const secureFlag = process.env.NODE_ENV === 'production';
    res.cookie('token', token, { httpOnly: true, secure: secureFlag, sameSite: 'strict' });
    const out = org.toObject(); delete out.password;
    return res.json(out);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { signUp, login };
