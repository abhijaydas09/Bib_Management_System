import MarathonRegistration from '../model/MarathonRegistration.js';
import crypto from 'crypto';

export const createMarathonRegistration = async (req, res) => {
  try {
    const {
      participant,
      event,
      category,
      bibNumber,
      firstName,
      middleName,
      lastName,
      dateOfBirth,
      gender,
      nationality,
      phoneNumber,
      email,
      address,
      emergencyContacts,
      medicalConditions,
      allergies,
      currentMedications,
      bloodGroup,
      uploadedDocuments,
      consentForm,
      kitSize,
      paymentMethod,
      paymentStatus,
      transactionId
    } = req.body;

    // Generate unique QR code string
    const qrCode = crypto.randomBytes(8).toString('hex');

    const newRegistration = new MarathonRegistration({
      participant,
      event,
      category,
      bibNumber,
      qrCode,
      firstName,
      middleName,
      lastName,
      dateOfBirth,
      gender,
      nationality,
      phoneNumber,
      email,
      address,
      emergencyContacts,
      medicalConditions,
      allergies,
      currentMedications,
      bloodGroup,
      uploadedDocuments,
      consentForm,
      kitSize,
      paymentMethod,
      paymentStatus,
      transactionId
    });

    await newRegistration.save();

    return res.status(201).json({
      success: true,
      message: 'Marathon Registration created successfully',
      data: newRegistration
    });

  } catch (err) {
    console.error("Error creating registration:", err);
    return res.status(500).json({
      success: false,
      message: err.message || 'Server Error'
    });
  }
};
