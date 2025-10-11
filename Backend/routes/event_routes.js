const express = require('express');
const { createEvent, updateEvent, getEvent, listEvents } = require('../controllers/event_controller');
const auth = require('../middleware/auth');

const router = express.Router();

// organizer creates event (must be organizer)
router.post('/', auth, (req, res, next) => {
	if (!req.user || req.user.type !== 'organizer') return res.status(403).json({ message: 'Forbidden' });
	next();
}, createEvent);

// update event
router.put('/:id', auth, updateEvent);

// get event
router.get('/:id', getEvent);

// list events (public)
router.get('/', listEvents);

module.exports = router;
