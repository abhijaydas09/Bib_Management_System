const express = require('express');
const router = express.Router();
const ContactMessage = require('../models/ContactMessage');

router.post('/', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const newMessage = new ContactMessage({ name, email, subject, message });
    await newMessage.save();

    res.json({ message: "Contact message saved successfully!" });
  } catch (err) {
    console.error("Contact form error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
