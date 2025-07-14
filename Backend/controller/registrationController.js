import MarathonRegistration from "../model/MarathonRegistration.js";

export const verifyQrCode = async (req, res) => {
  const { qrCode } = req.params;
  console.log("QR Code received:", qrCode);

  try {
    const registration = await MarathonRegistration.findOne({ qrCode });
    console.log("Found registration:", registration);

    if (!registration) {
      return res.status(404).json({
        success: false,
        message: "QR Code not found or invalid"
      });
    }

    if (registration.bibCollectionStatus === "Collected") {
      return res.status(200).json({
        success: true,
        message: `Bib already collected for ${registration.firstName} ${registration.lastName}`,
        data: registration
      });
    }

    registration.bibCollectionStatus = "Collected";
    await registration.save();

    return res.status(200).json({
      success: true,
      message: `Bib now marked as collected for ${registration.firstName} ${registration.lastName}`,
      data: registration
    });

  } catch (err) {
    console.error("QR Verification failed:", err);
    return res.status(500).json({
      success: false,
      message: "Server error"
    });
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