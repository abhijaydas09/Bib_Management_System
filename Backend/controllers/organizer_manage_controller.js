const Staff = require('../models/Staff');
const Event = require('../models/Event');
const MarathonRegistration = require('../models/MarathonRegistration');
const bcrypt = require('bcryptjs');
const { Parser } = require('json2csv');

// Create staff for an organizer's event
const createStaff = async (req, res) => {
  try {
    if (!req.user || req.user.type !== 'organizer') return res.status(403).json({ message: 'Forbidden' });
    const organizerId = req.user.id;
    const { firstName, lastName, phoneNumber, userId, password, eventId } = req.body;
    if (!firstName || !lastName || !phoneNumber || !userId || !password || !eventId) return res.status(400).json({ message: 'Missing fields' });

    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ message: 'Event not found' });
    if (String(event.organiser) !== String(organizerId)) return res.status(403).json({ message: 'Organizer not owner of event' });

    const existing = await Staff.findOne({ userId });
    if (existing) return res.status(400).json({ message: 'UserId already exists' });

    const hashed = await bcrypt.hash(password, 10);
    const staff = await Staff.create({ firstName, lastName, phoneNumber, userId, password: hashed, event: eventId });
    const out = staff.toObject(); delete out.password;
    return res.status(201).json(out);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// List staff for organizer's events
const listStaff = async (req, res) => {
  try {
    if (!req.user || req.user.type !== 'organizer') return res.status(403).json({ message: 'Forbidden' });
    const organizerId = req.user.id;
    // find events owned by organizer
    const events = await Event.find({ organiser: organizerId }).select('_id');
    const eventIds = events.map(e => e._id);
    const staff = await Staff.find({ event: { $in: eventIds } }).select('-password');
    return res.json(staff);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Delete staff
const deleteStaff = async (req, res) => {
  try {
    if (!req.user || req.user.type !== 'organizer') return res.status(403).json({ message: 'Forbidden' });
    const organizerId = req.user.id;
    const staffId = req.params.id;
    const staff = await Staff.findById(staffId);
    if (!staff) return res.status(404).json({ message: 'Staff not found' });
    const event = await Event.findById(staff.event);
    if (!event) return res.status(404).json({ message: 'Event not found' });
    if (String(event.organiser) !== String(organizerId)) return res.status(403).json({ message: 'Forbidden' });
    await Staff.findByIdAndDelete(staffId);
    return res.json({ message: 'Deleted' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Export participants for an event as CSV
const exportParticipantsCSV = async (req, res) => {
  try {
    if (!req.user || req.user.type !== 'organizer') return res.status(403).json({ message: 'Forbidden' });
    const organizerId = req.user.id;
    const eventId = req.params.eventId;
    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ message: 'Event not found' });
    if (String(event.organiser) !== String(organizerId)) return res.status(403).json({ message: 'Forbidden' });

    const regs = await MarathonRegistration.find({ event: eventId }).populate('participant');
    const rows = regs.map(r => ({
      firstName: r.firstName,
      lastName: r.lastName,
      phoneNumber: r.phoneNumber,
      email: r.email,
      bibNumber: r.bibNumber,
      category: r.category,
      status: r.status,
      registrationDate: r.registrationDate,
    }));

    const parser = new Parser();
    const csv = parser.parse(rows);
    res.header('Content-Type', 'text/csv');
    res.attachment(`participants_event_${eventId}.csv`);
    return res.send(csv);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { createStaff, listStaff, deleteStaff, exportParticipantsCSV };
