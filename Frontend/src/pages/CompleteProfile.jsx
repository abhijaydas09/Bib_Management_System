import React, { useState } from 'react';
import { FaUser, FaCalendarAlt, FaFlag, FaPhone, FaEnvelope } from 'react-icons/fa';
import BasicTextInput from '../components/text-inputs/BasicTextInput.jsx';
import TabsBoxed from '../components/tabs/TabsBoxed.jsx';
import ParticipantNavbar from '../components/tabs/ParticipantNavbar.jsx';

function CompleteProfile() {
  const [activeTab, setActiveTab] = useState(0);
  const [form, setForm] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    dateOfBirth: '',
    gender: '',
    nationality: '',
    phone: '',
    email: '',
    // Address fields
    address1: '',
    address2: '',
    address3: '',
    city: '',
    district: '',
    state: '',
    country: '',
    // Emergency Contacts (array of 2)
    emergencyContacts: [
      { firstName: '', middleName: '', lastName: '', relationship: '', phone: '', email: '' },
    ],
    // Health & Fitness arrays
    medicalConditions: [''],
    allergies: [''],
    currentMedications: [''],
    bloodGroup: '',
  });

  // Track if Add Contact button has been clicked
  const [addContactClicked, setAddContactClicked] = useState(false);

  // Convert tabs to objects with label property for TabsBoxed compatibility
  const tabs = [
    { label: 'Personal Details' },
    { label: 'Address Details' },
    { label: 'Emergency Contacts' },
    { label: 'Health & Fitness' },
  ];

  // Tab headers for each stage
  const stageHeaders = [
    'Stage 1: Personal Details',
    'Stage 2: Address Details',
    'Stage 3: Emergency Contacts',
    'Stage 4: Health & Fitness',
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // Handler for emergency contact field changes
  const handleEmergencyContactChange = (idx, e) => {
    const { name, value } = e.target;
    setForm(prevForm => {
      const updatedContacts = prevForm.emergencyContacts.map((contact, cidx) =>
        cidx === idx ? { ...contact, [name]: value } : contact
      );
      return { ...prevForm, emergencyContacts: updatedContacts };
    });
  };

  // Handler to add a new emergency contact (up to 2)
  const handleAddContact = () => {
    setForm(prevForm => {
      if (prevForm.emergencyContacts.length < 2) {
        return {
          ...prevForm,
          emergencyContacts: [
            ...prevForm.emergencyContacts,
            { firstName: '', middleName: '', lastName: '', relationship: '', phone: '', email: '' },
          ],
        };
      }
      return prevForm;
    });
    setAddContactClicked(true);
  };

  // Handler for Health & Fitness array field changes
  const handleArrayFieldChange = (field, idx, e) => {
    const { value } = e.target;
    setForm(prevForm => {
      const updatedArr = prevForm[field].map((item, i) => (i === idx ? value : item));
      return { ...prevForm, [field]: updatedArr };
    });
  };

  // Handler to add a new value to a Health & Fitness array field (up to 5)
  const handleAddArrayField = (field) => {
    setForm(prevForm => {
      if (prevForm[field].length < 5) {
        return { ...prevForm, [field]: [...prevForm[field], ''] };
      }
      return prevForm;
    });
  };

  // Handler to save details (stub for now)
  const handleSave = () => {
    // You can implement actual save logic here (e.g., API call or localStorage)
    // For now, just log the form state
    console.log('Saving form data:', form);
  };

  // Handler for Next button
  const handleNext = () => {
    handleSave();
    setActiveTab((prev) => Math.min(prev + 1, tabs.length - 1));
  };

  // Handler for Prev button
  const handlePrev = () => {
    handleSave();
    setActiveTab((prev) => Math.max(prev - 1, 0));
  };

  // Render form fields for each tab
  const renderTabForm = () => {
    if (activeTab === 0) {
      // Personal Details
      return (
        <form
          style={{
            padding: 32,
            display: 'grid',
            gridTemplateColumns: '270px 270px',
            gap: 24,
            justifyContent: 'center',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 26 }}>
            <BasicTextInput name="firstName" placeholder="First Name" value={form.firstName} onChange={handleChange} icon={<FaUser />} style={{ width: '100%' }} />
            <BasicTextInput name="lastName" placeholder="Last Name" value={form.lastName} onChange={handleChange} icon={<FaUser />} style={{ width: '100%' }} />
            <BasicTextInput name="gender" placeholder="Gender" value={form.gender} onChange={handleChange} style={{ width: '100%' }} />
            <BasicTextInput name="phone" placeholder="Phone Number" value={form.phone} onChange={handleChange} icon={<FaPhone />} style={{ width: '100%' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 26 }}>
            <BasicTextInput name="middleName" placeholder="Middle Name" value={form.middleName} onChange={handleChange} icon={<FaUser />} style={{ width: '100%' }} />
            <BasicTextInput name="dateOfBirth" placeholder="Date of Birth" value={form.dateOfBirth} onChange={handleChange} icon={<FaCalendarAlt />} style={{ width: '100%' }} />
            <BasicTextInput name="nationality" placeholder="Nationality" value={form.nationality} onChange={handleChange} icon={<FaFlag />} style={{ width: '100%' }} />
            <BasicTextInput name="email" placeholder="Email" value={form.email} onChange={handleChange} icon={<FaEnvelope />} style={{ width: '100%' }} />
          </div>
        </form>
      );
    } else if (activeTab === 1) {
      // Address Details
      return (
        <form
          style={{
            padding: 32,
            display: 'flex',
            flexDirection: 'column',
            gap: 24,
            alignItems: 'center',
          }}
        >
          {/* Long address lines, full width */}
          <div style={{ width: 564, maxWidth: '95vw', display: 'flex', flexDirection: 'column', gap: 26 }}>
            <BasicTextInput
              name="address1"
              placeholder="Address Line 1"
              value={form.address1}
              onChange={handleChange}
              style={{
                width: 568,
                fontSize: 15,
                padding: '12px 16px',
                borderRadius: 2,
                border: '1px solid #000',
                boxSizing: 'border-box',
              }}
            />
            <BasicTextInput
              name="address2"
              placeholder="Address Line 2"
              value={form.address2}
              onChange={handleChange}
              style={{
                width: 568,
                fontSize: 15,
                padding: '12px 16px',
                borderRadius: 2,
                border: '1px solid #000',
                boxSizing: 'border-box',
              }}
            />
            <BasicTextInput
              name="address3"
              placeholder="Address Line 3"
              value={form.address3}
              onChange={handleChange}
              style={{
                width: 568,
                fontSize: 15,
                padding: '12px 16px',
                borderRadius: 2,
                border: '1px solid #000',
                boxSizing: 'border-box',
              }}
            />
          </div>
          {/* City, State, District, Country in two columns */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '270px 270px',
              gap: 24,
              justifyContent: 'center',
              width: 564,
              maxWidth: '95vw',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: 26 }}>
              <BasicTextInput
                name="city"
                placeholder="City"
                value={form.city}
                onChange={handleChange}
                style={{ width: '100%' }}
              />
              <BasicTextInput
                name="state"
                placeholder="State"
                value={form.state}
                onChange={handleChange}
                style={{ width: '100%' }}
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 26 }}>
              <BasicTextInput
                name="district"
                placeholder="District"
                value={form.district}
                onChange={handleChange}
                style={{ width: '100%' }}
              />
              <BasicTextInput
                name="country"
                placeholder="Country"
                value={form.country}
                onChange={handleChange}
                style={{ width: '100%' }}
              />
            </div>
          </div>
        </form>
      );
    } else if (activeTab === 2) {
      // Emergency Contacts
      return (
        <form
          style={{
            padding: 32,
            display: 'flex',
            flexDirection: 'column',
            gap: 24,
            alignItems: 'center',
          }}
        >
          {form.emergencyContacts.map((contact, idx) => (
            <React.Fragment key={idx}>
              <div style={{ width: 564, maxWidth: '95vw', fontWeight: 500, fontSize: 10, color: '#0B405B', marginBottom: -16, marginTop: idx === 0 ? 0 : 16 }}>
                Emergency Contact {idx + 1}
              </div>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '270px 270px',
                  gap: 24,
                  justifyContent: 'center',
                  width: 564,
                  maxWidth: '95vw',
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: 26 }}>
                  <BasicTextInput name="firstName" placeholder="First Name" value={contact.firstName} onChange={e => handleEmergencyContactChange(idx, e)} style={{ width: '100%' }} />
                  <BasicTextInput name="lastName" placeholder="Last Name" value={contact.lastName} onChange={e => handleEmergencyContactChange(idx, e)} style={{ width: '100%' }} />
                  <BasicTextInput name="phone" placeholder="Phone Number" value={contact.phone} onChange={e => handleEmergencyContactChange(idx, e)} style={{ width: '100%' }} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 26 }}>
                  <BasicTextInput name="middleName" placeholder="Middle Name" value={contact.middleName} onChange={e => handleEmergencyContactChange(idx, e)} style={{ width: '100%' }} />
                  <BasicTextInput name="relationship" placeholder="Relationship" value={contact.relationship} onChange={e => handleEmergencyContactChange(idx, e)} style={{ width: '100%' }} />
                  <BasicTextInput name="email" placeholder="Email" value={contact.email} onChange={e => handleEmergencyContactChange(idx, e)} style={{ width: '100%' }} />
                </div>
              </div>
            </React.Fragment>
          ))}
          {/* Add Contact button */}
          {!addContactClicked && (
            <div style={{ width: 564, maxWidth: '95vw', display: 'flex', justifyContent: 'flex-end', marginTop: -16 }}>
              <button
                type="button"
                onClick={handleAddContact}
                style={{
                  background: 'rgba(0, 162, 81, 0.3)',
                  color: '#109960',
                  borderRadius: 14,
                  fontWeight: 500,
                  fontSize: 9,
                  padding: '1px 5px',
                  cursor: 'pointer',
                  opacity: 1,
                  transition: 'background 0.18s, color 0.18s',
                  border: 'none',
                }}
              >
                Add Contact
              </button>
            </div>
          )}
        </form>
      );
    } else if (activeTab === 3) {
      // Health & Fitness
      return (
        <form
          style={{
            padding: 32,
            display: 'flex',
            flexDirection: 'column',
            gap: 24,
            alignItems: 'center',
          }}
        >
          {/* Any Medical Conditions or Allergies */}
          <div style={{ width: 564, maxWidth: '95vw', fontWeight: 500, fontSize: 10, color: '#0B405B', marginBottom: -18 }}>
            Any Medical Conditions or Allergies
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '270px 270px', gap: 24, width: 564, maxWidth: '95vw', alignItems: 'start' }}>
            <div>
              {form.medicalConditions.map((val, idx) => (
                <BasicTextInput
                  key={idx}
                  name={`medicalCondition${idx}`}
                  placeholder="Medical Condition"
                  value={val}
                  onChange={e => handleArrayFieldChange('medicalConditions', idx, e)}
                  style={{ width: '100%', marginBottom: 6 }}
                />
              ))}
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 6 }}>
                <button
                  type="button"
                  onClick={() => handleAddArrayField('medicalConditions')}
                  disabled={form.medicalConditions.length >= 5}
                  style={{ background: 'rgba(0, 162, 81, 0.3)', color: '#109960', borderRadius: 14, fontWeight: 500, fontSize: 9, padding: '1px 5px', cursor: form.medicalConditions.length >= 5 ? 'not-allowed' : 'pointer', border: 'none', opacity: form.medicalConditions.length >= 5 ? 0.5 : 1 }}
                >
                  + Add
                </button>
              </div>
            </div>
            <div>
              {form.allergies.map((val, idx) => (
                <BasicTextInput
                  key={idx}
                  name={`allergy${idx}`}
                  placeholder="Allergy"
                  value={val}
                  onChange={e => handleArrayFieldChange('allergies', idx, e)}
                  style={{ width: '100%', marginBottom: 6 }}
                />
              ))}
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 6 }}>
                <button
                  type="button"
                  onClick={() => handleAddArrayField('allergies')}
                  disabled={form.allergies.length >= 5}
                  style={{ background: 'rgba(0, 162, 81, 0.3)', color: '#109960', borderRadius: 14, fontWeight: 500, fontSize: 9, padding: '1px 5px', cursor: form.allergies.length >= 5 ? 'not-allowed' : 'pointer', border: 'none', opacity: form.allergies.length >= 5 ? 0.5 : 1 }}
                >
                  + Add
                </button>
              </div>
            </div>
          </div>
          {/* Current Medications */}
          <div style={{ width: 564, maxWidth: '95vw', fontWeight: 500, fontSize: 10, color: '#0B405B', marginBottom: -18, marginTop: -16 }}>
            Current Medications
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '270px 270px', gap: 24, width: 564, maxWidth: '95vw', alignItems: 'start' }}>
            <div>
              {form.currentMedications.map((val, idx) => (
                <BasicTextInput
                  key={idx}
                  name={`currentMedication${idx}`}
                  placeholder="Current Medications"
                  value={val}
                  onChange={e => handleArrayFieldChange('currentMedications', idx, e)}
                  style={{ width: '100%', marginBottom: 6 }}
                />
              ))}
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 6 }}>
                <button
                  type="button"
                  onClick={() => handleAddArrayField('currentMedications')}
                  disabled={form.currentMedications.length >= 5}
                  style={{ background: 'rgba(0, 162, 81, 0.3)', color: '#109960', borderRadius: 14, fontWeight: 500, fontSize: 9, padding: '1px 5px', cursor: form.currentMedications.length >= 5 ? 'not-allowed' : 'pointer', border: 'none', opacity: form.currentMedications.length >= 5 ? 0.5 : 1 }}
                >
                  + Add
                </button>
              </div>
            </div>
          </div>
          {/* Blood Group */}
          <div style={{ width: 564, maxWidth: '95vw', fontWeight: 500, fontSize: 10, color: '#0B405B', marginBottom: -18, marginTop: -16 }}>
            Blood Group
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '270px', gap: 24, width: 564, maxWidth: '95vw', alignItems: 'center' }}>
            <BasicTextInput name="bloodGroup" placeholder="Blood Group" value={form.bloodGroup || ''} onChange={handleChange} style={{ width: '100%' }} />
          </div>
        </form>
      );
    }
    // Add more tabs as needed
    return null;
  };

  return (
    <div style={{ minHeight: '100vh', minWidth: '100vw', background: '#fff', width: '100vw', display: 'flex', flexDirection: 'column', alignItems: 'center', boxSizing: 'border-box' }}>
      {/* Participant Navbar with profile icon (shows when logged in) */}
      <div style={{ width: '100%' }}>
        <ParticipantNavbar />
      </div>
      <h2 style={{ marginTop: 48, marginBottom: 34, fontWeight: 600, fontSize: 32, color: '#0B405B', letterSpacing: 1, textAlign: 'center' }}>
        COMPLETE YOUR PROFILE
      </h2>
      {/* Tabs */}
      <div style={{ marginBottom: 34, width: 540, maxWidth: '95vw', display: 'flex', justifyContent: 'center' }}>
        <TabsBoxed
          tabs={tabs}
          activeIndex={activeTab}
          onTabClick={setActiveTab}
        />
      </div>
      {/* Header box above the card */}
      <div
        style={{
          background: '#E4E4E4',
          borderRadius: '4px 4px 0 0',
          width: 700,
          maxWidth: '95vw',
          margin: '0 auto',
          padding: '14px 32px',
          fontWeight: 400,
          fontSize: 20,
          color: '#0B405B',
          borderBottom: '1px solid #e0e0e0',
          boxShadow: '0 4px 24px rgba(0,0,0,0.12)',
          boxSizing: 'border-box',
        }}
      >
        {stageHeaders[activeTab]}
      </div>
      {/* Card */}
      <div style={{ background: '#fff', borderRadius: '0 0 4px 4px', boxShadow: '0 4px 24px rgba(0,0,0,0.12)', width: 700, maxWidth: '95vw', margin: '0 auto', padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column', alignItems: 'center', boxSizing: 'border-box' }}>
        {/* Card body: 2-column grid */}
        {renderTabForm()}
      </div>
      {/* Next/Prev buttons below the box */}
      <div style={{ marginTop: 16, display: 'flex', justifyContent: 'center', width: '100%', gap: 8 }}>
        {activeTab > 0 && (
          <button
            type="button"
            onClick={handlePrev}
            style={{
              background: '#EDF0F3',
              color: '#0B405B',
              borderRadius: 2,
              fontWeight: 400,
              fontSize: 10,
              padding: '6px 8px',
              cursor: 'pointer',
              marginRight: 0,
              transition: 'background 0.18s, color 0.18s',
            }}
          >
            Prev
          </button>
        )}
        {activeTab < tabs.length - 1 ? (
          <button
            type="button"
            onClick={handleNext}
            style={{
              background: '#0B405B',
              color: '#fff',
              border: 'none',
              borderRadius: 2,
              fontWeight: 400,
              fontSize: 10,
              padding: '6px 8px',
              cursor: 'pointer',
              transition: 'background 0.18s, color 0.18s',
            }}
          >
            Next
          </button>
        ) : (
          <button
            type="button"
            onClick={handleSave}
            style={{
              background: '#0B405B',
              color: '#fff',
              border: 'none',
              borderRadius: 2,
              fontWeight: 400,
              fontSize: 10,
              padding: '6px 8px',
              cursor: 'pointer',
              transition: 'background 0.18s, color 0.18s',
            }}
          >
            Submit
          </button>
        )}
      </div>
    </div>
  );
}

export default CompleteProfile;