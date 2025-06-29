const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validator = require('validator');
const Organizer = require('../models/Organizer');
const UserProfile = require('../models/UserProfile');

const router = express.Router();

// Temporary hardcoded JWT_SECRET for testing
const JWT_SECRET = process.env.JWT_SECRET || '2b586e39f8f1c43cf33364b7ddb7a42c130c3e7759dc220c2147ace19368811345ebf07a5a0a30bfc15d2d6dfc41c5ddbd1b72893532e1b024774b78b7acdc42';

// Middleware to validate JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
};

// Signup route
router.post('/signup', async (req, res) => {
  try {
    console.log('Signup request received:', req.body);
    console.log('JWT_SECRET:', JWT_SECRET ? 'Set' : 'Not set');
    
    const { username, email, password, name, role = 'user' } = req.body;

    // Validation
    if (!username || !email || !password || !name) {
      console.log('Missing required fields:', { username: !!username, email: !!email, password: !!password, name: !!name });
      return res.status(400).json({ error: 'All fields are required' });
    }

    if (!validator.isEmail(email)) {
      console.log('Invalid email format:', email);
      return res.status(400).json({ error: 'Invalid email format' });
    }

    if (password.length < 6) {
      console.log('Password too short:', password.length);
      return res.status(400).json({ error: 'Password must be at least 6 characters long' });
    }

    // Check if user already exists
    const existingUser = await Organizer.findOne({
      $or: [{ email }, { username }]
    });

    if (existingUser) {
      console.log('User already exists:', { email, username });
      return res.status(400).json({ error: 'User with this email or username already exists' });
    }

    // Hash password
    const saltRounds = 12;
    const password_hash = await bcrypt.hash(password, saltRounds);

    // Create new organizer
    const organizer = new Organizer({
      username,
      email,
      password_hash,
      name,
      role,
      is_active: true
    });

    await organizer.save();
    console.log('Organizer saved successfully:', organizer._id);

    // Generate JWT token
    const token = jwt.sign(
      { 
        id: organizer._id, 
        username: organizer.username, 
        email: organizer.email,
        role: organizer.role 
      },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Check if profile exists
    const profile = await UserProfile.findOne({ organizer_id: organizer._id });

    // Return success response (without password)
    const organizerResponse = {
      id: organizer._id,
      username: organizer.username,
      email: organizer.email,
      name: organizer.name,
      role: organizer.role,
      is_active: organizer.is_active
    };

    const response = {
      message: 'Organizer created successfully',
      organizer: organizerResponse,
      token,
      profile_status: {
        has_profile: !!profile,
        needs_profile_completion: !profile,
        completion_percentage: profile ? profile.profile_completion_percentage : 0
      }
    };

    console.log('Signup successful, sending response:', response);
    res.status(201).json(response);

  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Login route
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validation
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }

    // Find organizer by username or email
    const organizer = await Organizer.findOne({
      $or: [{ username }, { email: username }]
    });

    if (!organizer) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Check if account is active
    if (!organizer.is_active) {
      return res.status(401).json({ error: 'Account is deactivated' });
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, organizer.password_hash);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { 
        id: organizer._id, 
        username: organizer.username, 
        email: organizer.email,
        role: organizer.role 
      },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Check profile completion status
    const profile = await UserProfile.findOne({ organizer_id: organizer._id });

    // Return success response (without password)
    const organizerResponse = {
      id: organizer._id,
      username: organizer.username,
      email: organizer.email,
      name: organizer.name,
      role: organizer.role,
      is_active: organizer.is_active,
      admin_info: organizer.admin_info,
      staff_info: organizer.staff_info
    };

    res.json({
      message: 'Login successful',
      organizer: organizerResponse,
      token,
      profile_status: {
        has_profile: !!profile,
        needs_profile_completion: !profile,
        completion_percentage: profile ? profile.profile_completion_percentage : 0,
        is_complete: profile ? profile.is_profile_complete : false
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get current user profile
router.get('/profile', authenticateToken, async (req, res) => {
  try {
    const organizer = await Organizer.findById(req.user.id).select('-password_hash');
    
    if (!organizer) {
      return res.status(404).json({ error: 'Organizer not found' });
    }

    res.json({ organizer });
  } catch (error) {
    console.error('Profile error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Logout route (client-side token removal)
router.post('/logout', authenticateToken, (req, res) => {
  res.json({ message: 'Logout successful' });
});

module.exports = { router, authenticateToken }; 