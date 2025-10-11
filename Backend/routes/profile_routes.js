const express = require('express');
const { getProfile, updateProfile } = require('../controllers/profile_controller');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/me', auth, getProfile);
router.put('/me', auth, updateProfile);

module.exports = router;
