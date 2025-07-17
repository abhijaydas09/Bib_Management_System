import React, { useState } from 'react';
import BasicTextInput from '../text-inputs/BasicTextInput';

const inputStyle = { width: '100%', marginBottom: 0 };
const labelStyle = { fontWeight: 400, marginBottom: 4, color: '#3d3d3d', fontSize: 9 };

export default function AddStaffModal({ open, onClose, onAddStaff }) {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    userId: '',
    password: '',
    confirmPassword: ''
  });

  if (!open) return null;

  const handleChange = (field, value) => setForm(f => ({ ...f, [field]: value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onAddStaff) onAddStaff(form);
  };

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
      background: 'rgba(0,0,0,0.18)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center'
    }}>
      <div style={{ background: '#fff', borderRadius: 8, minWidth: 700, maxWidth: 800, padding: 32, position: 'relative' }}>
        <button
          onClick={onClose}
          style={{ position: 'absolute', top: 18, right: 24, background: 'none', border: 'none', fontSize: 24, color: '#b3b3b3', cursor: 'pointer' }}
          aria-label="Close"
        >
          ×
        </button>
        <div style={{ fontWeight: 400, fontSize: 14, color: '#0B405B', marginBottom: 2 }}>Add New Staff Member</div>
        <div style={{ color: '#8a8fa3', fontSize: 10, marginBottom: 24, fontWeight: 400 }}>Grant access to trusted team members for bib collection and attendance tracking.</div>
        <form onSubmit={handleSubmit}>
          <div style={{ background: '#f6eaff', border: '2px dashed #e0cfff', borderRadius: 12, padding: 24, marginBottom: 32 }}>
            <div style={{ display: 'flex', gap: 24, marginBottom: 18 }}>
              <div style={{ flex: 1 }}>
                <div style={labelStyle}>First Name</div>
                <BasicTextInput
                  placeholder="First Name"
                  value={form.firstName}
                  onChange={e => handleChange('firstName', e.target.value)}
                  style={inputStyle}
                />
              </div>
              <div style={{ flex: 1 }}>
                <div style={labelStyle}>Last Name</div>
                <BasicTextInput
                  placeholder="Last Name"
                  value={form.lastName}
                  onChange={e => handleChange('lastName', e.target.value)}
                  style={inputStyle}
                />
              </div>
            </div>
            <div style={{ display: 'flex', gap: 24, marginBottom: 18 }}>
              <div style={{ flex: 1 }}>
                <div style={labelStyle}>Phone Number</div>
                <BasicTextInput
                  placeholder="Phone Number"
                  value={form.phone}
                  onChange={e => handleChange('phone', e.target.value)}
                  style={inputStyle}
                />
              </div>
              <div style={{ flex: 1 }}>
                <div style={labelStyle}>Email</div>
                <BasicTextInput
                  placeholder="Email"
                  value={form.email}
                  onChange={e => handleChange('email', e.target.value)}
                  style={inputStyle}
                />
              </div>
            </div>
            <div style={{ display: 'flex', gap: 24, marginBottom: 18 }}>
              <div style={{ flex: 1 }}>
                <div style={labelStyle}>User ID</div>
                <BasicTextInput
                  placeholder="User ID"
                  value={form.userId}
                  onChange={e => handleChange('userId', e.target.value)}
                  style={inputStyle}
                />
              </div>
            </div>
            <div style={{ display: 'flex', gap: 24 }}>
              <div style={{ flex: 1 }}>
                <div style={labelStyle}>Password</div>
                <BasicTextInput
                  placeholder="Password"
                  type="password"
                  value={form.password}
                  onChange={e => handleChange('password', e.target.value)}
                  style={inputStyle}
                />
              </div>
              <div style={{ flex: 1 }}>
                <div style={labelStyle}>Confirm Password</div>
                <BasicTextInput
                  placeholder="Confirm Password"
                  type="password"
                  value={form.confirmPassword}
                  onChange={e => handleChange('confirmPassword', e.target.value)}
                  style={inputStyle}
                />
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 16 }}>
            <button type="button" onClick={onClose} style={{ background: '#f4f7fa', color: '#3d3d3d', border: 'none', borderRadius: 2, padding: '6px 13px', fontWeight: 400, fontSize: 10, cursor: 'pointer' }}>Cancel</button>
            <button type="submit" style={{ background: '#0B405B', color: '#fff', border: 'none', borderRadius: 2, padding: '6px 13px', fontWeight: 400, fontSize: 10, cursor: 'pointer' }}>Add Staff</button>
          </div>
        </form>
      </div>
    </div>
  );
} 