const { genToken } = require('../config/token');
const bcrypt = require('bcryptjs');
const Participant = require('../models/Participants');

const signUp = async (req, res) => {
    try {
        const { firstName, lastName, gender, phoneNumber, email, password } = req.body;
        const profilePhoto = req.file ? req.file.path : '';

        const existing = await Participant.findOne({ $or: [{ email }, { phoneNumber }] });
        if (existing) return res.status(400).json({ message: 'Email or phone already registered' });

        const hashedPassword = await bcrypt.hash(password, 10);
        const participant = await Participant.create({
            firstName,
            lastName,
            profilePicture: profilePhoto,
            gender,
            phoneNumber,
            email,
            password: hashedPassword,
        });

        const token = genToken(participant._id);
        const secureFlag = process.env.NODE_ENV === 'production';
        res.cookie('token', token, {
            httpOnly: true,
            secure: secureFlag,
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        const out = participant.toObject();
        delete out.password;
        return res.status(201).json(out);
    } catch (error) {
        return res.status(500).json({ message: `signup error ${error.message}` });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) return res.status(400).json({ message: 'Email and password required' });

        const user = await Participant.findOne({ email });
        if (!user) return res.status(401).json({ message: 'Invalid credentials' });

        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(401).json({ message: 'Invalid credentials' });

        const token = genToken(user._id);
        const secureFlag = process.env.NODE_ENV === 'production';
        res.cookie('token', token, {
            httpOnly: true,
            secure: secureFlag,
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        const out = user.toObject();
        delete out.password;
        return res.json(out);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports = { signUp, login };