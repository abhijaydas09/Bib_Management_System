import MarathonRegistration from "../model/MarathonRegistration.js";

export const verifyQrCode = async (req, res) => {
  const { qrCode } = req.params;

  try {
    const registration = await MarathonRegistration.findOne({ qrCode });

    if (!registration) {
      return res.status(404).send("QR Code not found or invalid");
    }

    return res.render('verifyPage', {
      registration
    });

  } catch (err) {
    console.error("QR Verification failed:", err);
    return res.status(500).send("Server error");
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