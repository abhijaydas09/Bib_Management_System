const MarathonRegistration = require('../models/MarathonRegistration');
const Participant = require('../models/Participants');
const Event = require('../models/Event');
const { nanoid } = require('nanoid');
const bcrypt = require('bcryptjs');

// helper to generate simple bib numbers: EVENTID-CATEGORY-XXXX
const generateBibNumber = async (eventId, categoryId) => {
  // count existing registrations for event+category and increment
  const count = await MarathonRegistration.countDocuments({ event: eventId, category: categoryId });
  const seq = count + 1;
  return `${eventId}-${categoryId}-${String(seq).padStart(4, '0')}`;
};

// register: accepts either participantId or participant details in body
const register = async (req, res) => {
  try {
    const { participantId, participant, eventId, categoryId, kitSize, paymentMethod } = req.body;

    if (!eventId || !categoryId || !kitSize || !paymentMethod) {
      return res.status(400).json({ message: 'Missing required fields: eventId, categoryId, kitSize, paymentMethod' });
    }

    let participantRecord = null;

    if (participantId) {
      participantRecord = await Participant.findById(participantId);
      if (!participantRecord) return res.status(404).json({ message: 'Participant not found' });
    } else if (participant) {
      // create participant record
      const { firstName, lastName, phoneNumber, email, gender, dateOfBirth, address, emergencyContacts } = participant;
      if (!firstName || !lastName || !phoneNumber || !email || !gender) {
        return res.status(400).json({ message: 'Participant details incomplete' });
      }

      // check duplicates
      const existing = await Participant.findOne({ $or: [{ email }, { phoneNumber }] });
      if (existing) return res.status(400).json({ message: 'Participant with this email or phone already exists' });

      // generate a random password for account (participant may set/reset later)
      const randomPassword = nanoid(10);
      const hashed = await bcrypt.hash(randomPassword, 10);

      participantRecord = await Participant.create({
        firstName,
        lastName,
        dateOfBirth,
        gender,
        phoneNumber,
        email,
        address,
        emergencyContacts: emergencyContacts || [],
        password: hashed,
      });
    } else if (req.user && req.user.id) {
      // authenticated user
      participantRecord = await Participant.findById(req.user.id);
      if (!participantRecord) return res.status(404).json({ message: 'Authenticated participant not found' });
    } else {
      return res.status(400).json({ message: 'No participant information provided' });
    }

    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ message: 'Event not found' });

    // validate category exists inside event
    const category = event.categories.id(categoryId);
    if (!category) return res.status(400).json({ message: 'Category not found for event' });

    // prevent duplicate registration for same participant/event/category
    const existingReg = await MarathonRegistration.findOne({ participant: participantRecord._id, event: eventId, category: categoryId });
    if (existingReg) return res.status(400).json({ message: 'Already registered for this category' });

    const bibNumber = await generateBibNumber(event.eventID || event._id.toString(), categoryId);
    const qrCode = nanoid(20);

    const reg = await MarathonRegistration.create({
      participant: participantRecord._id,
      event: eventId,
      category: categoryId,
      bibNumber,
      qrCode,
      status: 'Confirmed',
      firstName: participantRecord.firstName,
      lastName: participantRecord.lastName,
      dateOfBirth: participantRecord.dateOfBirth,
      gender: participantRecord.gender,
      phoneNumber: participantRecord.phoneNumber,
      email: participantRecord.email,
      address: participantRecord.address,
      emergencyContacts: participantRecord.emergencyContacts || [],
      kitSize,
      paymentMethod,
      paymentStatus: 'Completed',
    });

    return res.status(201).json({ registration: reg, participant: participantRecord });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { register };
