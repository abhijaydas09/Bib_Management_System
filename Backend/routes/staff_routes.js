const express = require('express');
const { login, listRegistrations } = require('../controllers/staff_controller');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/login', login);
router.get('/registrations', auth, listRegistrations);

module.exports = router;
