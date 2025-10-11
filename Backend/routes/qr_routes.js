const express = require('express');
const { scanQRCode } = require('../controllers/qr_controller');
const auth = require('../middleware/auth');

const router = express.Router();

// staff/authorized scanning endpoint
router.post('/scan', auth, scanQRCode);

module.exports = router;
