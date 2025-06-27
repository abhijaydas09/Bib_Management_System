import React, { useState } from 'react';
import './ContactUs.css';

function ContactUs() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 2500);
    setForm({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="contact-root">
      <div className="contact-box">
        <h2 className="contact-title">Contact Us</h2>
        {submitted ? (
          <div className="contact-success">Thank you for contacting us! We'll get back to you soon.</div>
        ) : (
          <form className="contact-form" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={form.email}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="subject"
              placeholder="Subject"
              value={form.subject}
              onChange={handleChange}
              required
            />
            <textarea
              name="message"
              placeholder="Your Message"
              value={form.message}
              onChange={handleChange}
              required
              rows={5}
            />
            <button type="submit" className="contact-submit">Send Message</button>
          </form>
        )}
      </div>
    </div>
  );
}

export default ContactUs; 