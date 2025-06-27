import React, { useState } from 'react';
import './UserProfile.css';

function UserProfile({ role, onSubmit }) {
  // role: 'participant' or 'organiser'
  const [form, setForm] = useState(
    role === 'participant'
      ? { event_name: '', category: '', bib_number: '' }
      : { username: '', email: '', name: '' }
  );

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Basic validation
    for (const key in form) {
      if (!form[key]) {
        alert('Please fill all required fields.');
        return;
      }
    }
    if (onSubmit) onSubmit(form);
    else alert('Profile submitted!');
  };

  return (
    <div className="profile-root">
      <div className="profile-box">
        <h2 className="profile-title">{role === 'participant' ? 'Participant' : 'Organiser'} Profile</h2>
        <form className="profile-form" onSubmit={handleSubmit}>
          {role === 'participant' ? (
            <>
              <input
                type="text"
                name="event_name"
                placeholder="Event Name"
                value={form.event_name}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="category"
                placeholder="Category"
                value={form.category}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="bib_number"
                placeholder="Bib Number"
                value={form.bib_number}
                onChange={handleChange}
                required
              />
            </>
          ) : (
            <>
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={form.username}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </>
          )}
          <button type="submit" className="profile-submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default UserProfile; 