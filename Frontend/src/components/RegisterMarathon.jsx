import React, { useState } from 'react';
import './RegisterMarathon.css';

function RegisterMarathon({ marathon, userProfile }) {
  // marathon: { name, location, categories, date, entryFee, image }
  // userProfile: { name, email }
  const [form, setForm] = useState({
    name: userProfile?.name || '',
    email: userProfile?.email || '',
    category: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 2500);
  };

  return (
    <div className="register-root">
      <div className="register-box">
        <div className="register-marathon-details">
          <img className="register-marathon-img" src={marathon.image} alt={marathon.name + ' image'} />
          <h2>{marathon.name}</h2>
          <div><b>Location:</b> {marathon.location}</div>
          <div><b>Date:</b> {marathon.date}</div>
          <div><b>Entry Fee:</b> ₹{marathon.entryFee}</div>
        </div>
        {submitted ? (
          <div className="register-success">Registration successful! See you at the marathon.</div>
        ) : (
          <form className="register-form" onSubmit={handleSubmit}>
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
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              required
              className="register-category"
            >
              <option value="">Select Category</option>
              {marathon.categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            <button type="submit" className="register-submit">Register</button>
          </form>
        )}
      </div>
    </div>
  );
}

export default RegisterMarathon; 