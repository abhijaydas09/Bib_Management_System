const QRLog = require('../models/QRLog');
const MarathonRegistration = require('../models/MarathonRegistration');
const Staff = require('../models/Staff');

const scanQRCode = async (req, res) => {
  try {
    const { qrCode, action = 'Bib Collected' } = req.body;
    const user = req.user;
    if (!qrCode) return res.status(400).json({ message: 'qrCode required' });

    const reg = await MarathonRegistration.findOne({ qrCode });
    if (!reg) return res.status(404).json({ message: 'Registration not found for QR' });

    // if staff, ensure staff is assigned to the same event
    let staffId = null;
    if (user && user.type === 'staff') {
      staffId = user.id;
      const staff = await Staff.findById(user.id);
      if (!staff) return res.status(403).json({ message: 'Staff not found' });
      if (String(staff.event) !== String(reg.event)) return res.status(403).json({ message: 'Staff not authorized for this event' });
    } else if (user && user.type === 'organizer') {
      staffId = user.id; // organizer acting as staff
    }

    // Log action
    const log = await QRLog.create({
      event: reg.event,
      participant: reg.participant,
      staff: staffId,
      category: reg.category,
      bibNumber: reg.bibNumber,
      action,
    });

    return res.json({ message: 'QR scanned', registration: reg, log });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { scanQRCode };
