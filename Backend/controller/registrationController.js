import MarathonRegistration from "../model/MarathonRegistration.js";
import Category from "../model/Category.js";

export const verifyQrCode = async (req, res) => {
  const { qrCode } = req.params;
  try {
    const registration = await MarathonRegistration.findOne({ qrCode }).populate('category');
    if (!registration) {
      return res.status(404).json({ valid: false, message: 'QR Code not found or invalid' });
    }
    return res.status(200).json({
      valid: true,
      ticket: {
        id: registration._id,
        qrCode: registration.qrCode,
        name: registration.firstName + ' ' + registration.lastName,
        email: registration.email,
        bibNumber: registration.bibNumber,
        bibCollectionStatus: registration.bibCollectionStatus,
        attendanceStatus: registration.attendanceStatus,
        eventName: registration.eventName || '',
        category: registration.category?.category_name || '',
        tShirtSize: registration.kitSize || '',
        eventDate: registration.eventDate || '',
        venue: registration.venue || '',
        // add more fields as needed
      }
    });
  } catch (err) {
    console.error('QR Verification failed:', err);
    return res.status(500).json({ valid: false, error: 'Server error' });
  }
};

export const verifyQrCodeJson = async (req, res) => {
  const { qrCode } = req.params;
  try {
    const registration = await MarathonRegistration.findOne({ qrCode }).populate('category');
    if (!registration) {
      return res.status(200).json({ valid: false });
    }
    return res.status(200).json({
      valid: true,
      ticket: {
        id: registration._id,
        qrCode: registration.qrCode,
        name: registration.firstName + ' ' + registration.lastName,
        email: registration.email,
        bibNumber: registration.bibNumber,
        bibCollectionStatus: registration.bibCollectionStatus,
        attendanceStatus: registration.attendanceStatus,
        eventName: registration.eventName || '',
        category: registration.category?.category_name || '',
        tShirtSize: registration.kitSize || '',
        eventDate: registration.eventDate || '',
        venue: registration.venue || '',
        // add more fields as needed
      }
    });
  } catch (err) {
    return res.status(500).json({ valid: false, error: 'Server error' });
  }
};

export const markBibCollected = async (req, res) => {
  const { qrCode } = req.params;
  const { staffName } = req.body;

  try {
    const registration = await MarathonRegistration.findOne({ qrCode });
    if (!registration) return res.status(404).send("QR Code not found");

    registration.bibCollectionStatus = "Collected";
    registration.bibCollectedBy = staffName; // if you have field
    await registration.save();

    res.send("Bib marked as collected by " + staffName);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};

export const markAttendance = async (req, res) => {
  const { qrCode } = req.params;
  const { staffName } = req.body;

  try {
    const registration = await MarathonRegistration.findOne({ qrCode });
    if (!registration) return res.status(404).send("QR Code not found");

    registration.attendanceStatus = "Present";
    registration.attendanceMarkedBy = staffName;
    await registration.save();

    res.send("Attendance marked by " + staffName);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};


export const getRegistrationsByEvent = async (req, res) => {
  const { eventId } = req.params;

  try {
    const registrations = await MarathonRegistration.find({ event: eventId });

    return res.status(200).json({
      success: true,
      data: registrations
    });
  } catch (err) {
    console.error("Error fetching registrations by event:", err);
    return res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};