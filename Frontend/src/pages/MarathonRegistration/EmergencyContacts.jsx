import React from 'react';
import BasicTextInput from '../../components/text-inputs/BasicTextInput';
import { FaUser, FaEnvelope, FaPhone, FaUserFriends } from 'react-icons/fa';

const headerStyle = {
  background: '#e9e9e9',
  borderTopLeftRadius: 8,
  borderTopRightRadius: 8,
  padding: '14px 24px',
  fontWeight: 400,
  fontSize: 20,
  color: '#0B405B',
  borderBottom: '1px solid #e0e0e0',
};

const labelStyle = { fontSize: 10, fontWeight: 400 };

function EmergencyContacts({ emergencyContacts, setEmergencyContacts }) {
  const handleChange = (idx, e) => {
    const { name, value } = e.target;
    setEmergencyContacts((prev) =>
      prev.map((c, i) => (i === idx ? { ...c, [name]: value } : c))
    );
  };

  const handleAddContact = () => {
    setEmergencyContacts((prev) => [
      ...prev,
      { firstName: '', middleName: '', lastName: '', relationship: '', phone: '', email: '' },
    ]);
  };

  return (
    <>
      <div style={headerStyle}>Stage 3: Emergency Contact Details</div>
      <div style={{ padding: '24px 32px', width: '100%' }}>
        {emergencyContacts.map((contact, idx) => (
          <div key={idx} style={{ marginBottom: 32 }}>
            <div style={{ color: '#0B405B', fontWeight: 400, fontSize: 12, marginBottom: 12 }}>
              Emergency Contact {idx + 1}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '270px 270px', gap: 24 }}>
              <BasicTextInput
                name="firstName"
                label={<span style={labelStyle}>First Name</span>}
                placeholder="First Name"
                value={contact.firstName}
                onChange={(e) => handleChange(idx, e)}
                icon={<FaUser />}
              />
              <BasicTextInput
                name="middleName"
                label={<span style={labelStyle}>Middle Name</span>}
                placeholder="Middle Name"
                value={contact.middleName}
                onChange={(e) => handleChange(idx, e)}
                icon={<FaUser />}
              />
              <BasicTextInput
                name="lastName"
                label={<span style={labelStyle}>Last Name</span>}
                placeholder="Last Name"
                value={contact.lastName}
                onChange={(e) => handleChange(idx, e)}
                icon={<FaUser />}
              />
              <BasicTextInput
                name="relationship"
                label={<span style={labelStyle}>Relationship</span>}
                placeholder="Relationship"
                value={contact.relationship}
                onChange={(e) => handleChange(idx, e)}
                icon={<FaUserFriends />}
              />
              <BasicTextInput
                name="phone"
                label={<span style={labelStyle}>Phone Number</span>}
                placeholder="Phone Number"
                value={contact.phone}
                onChange={(e) => handleChange(idx, e)}
                icon={<FaPhone />}
              />
              <BasicTextInput
                name="email"
                label={<span style={labelStyle}>Email</span>}
                placeholder="Email"
                value={contact.email}
                onChange={(e) => handleChange(idx, e)}
                icon={<FaEnvelope />}
              />
            </div>
          </div>
        ))}
        <div style={{ textAlign: 'right', marginTop: -16, marginRight: 64 }}>
          <button
            type="button"
            onClick={handleAddContact}
            style={{
              background: 'rgba(16, 153, 96, 0.3)',
              color: '#109960',
              border: 'none',
              fontWeight: 300,
              fontSize: 10,
              padding: '2px 6px',
              cursor: 'pointer',
            }}
          >
            Add Contact
          </button>
        </div>
      </div>
    </>
  );
}

export default EmergencyContacts; 