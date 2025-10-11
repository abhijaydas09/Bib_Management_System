const express = require('express');
const { createStaff, listStaff, deleteStaff, exportParticipantsCSV } = require('../controllers/organizer_manage_controller');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/staff', auth, createStaff);
router.get('/staff', auth, listStaff);
router.delete('/staff/:id', auth, deleteStaff);
router.get('/export/participants/:eventId', auth, exportParticipantsCSV);

module.exports = router;
