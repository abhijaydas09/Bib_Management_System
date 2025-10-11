const Event = require('../models/Event');

// Create new event (organizer)
const createEvent = async (req, res) => {
  try {
    const organizerId = req.user && req.user.id;
    if (!organizerId) return res.status(401).json({ message: 'Unauthorized' });

    const payload = req.body;
    // ensure organiser field is set
    payload.organiser = organizerId;

    // generate a simple eventID if not provided
    if (!payload.eventID) payload.eventID = `EVT-${Date.now()}`;

    const ev = await Event.create(payload);
    return res.status(201).json(ev);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Update event (organizer)
const updateEvent = async (req, res) => {
  try {
    const organizerId = req.user && req.user.id;
    if (!organizerId) return res.status(401).json({ message: 'Unauthorized' });

    const eventId = req.params.id;
    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ message: 'Event not found' });
    if (String(event.organiser) !== String(organizerId)) return res.status(403).json({ message: 'Forbidden' });

    const updated = await Event.findByIdAndUpdate(eventId, { $set: req.body }, { new: true });
    return res.json(updated);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Get event by id
const getEvent = async (req, res) => {
  try {
    const ev = await Event.findById(req.params.id);
    if (!ev) return res.status(404).json({ message: 'Event not found' });
    return res.json(ev);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// List events for organizer or public list
const listEvents = async (req, res) => {
  try {
    const organizerId = req.user && req.user.id;
    if (organizerId && req.user.type === 'organizer') {
      const list = await Event.find({ organiser: organizerId });
      return res.json(list);
    }
    // public listing
    const list = await Event.find({}).limit(50);
    return res.json(list);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { createEvent, updateEvent, getEvent, listEvents };
