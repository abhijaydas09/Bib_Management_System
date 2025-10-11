const express = require('express');
const { register } = require('../controllers/registration_controller');
const auth = require('../middleware/auth');

const router = express.Router();

// Public registration: accepts participant details or participantId
router.post('/', register);

// Optionally: GET list of registrations for authenticated user (not implemented yet)
module.exports = router;
