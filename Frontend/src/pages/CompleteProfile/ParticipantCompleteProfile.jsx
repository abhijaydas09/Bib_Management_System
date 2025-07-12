import React, { useState } from 'react';
import { FaUser, FaCalendarAlt, FaFlag, FaPhone, FaEnvelope, FaBuilding, FaGlobe, FaFacebook, FaInstagram, FaLinkedin, FaTwitter, FaHome, FaLink } from 'react-icons/fa';
import BasicTextInput from '../../components/text-inputs/BasicTextInput.jsx';
import TabsBoxed from '../../components/tabs/TabsBoxed.jsx';
import OrganiserNavbar from '../../components/tabs/OrganiserNavbar.jsx';

function OrganiserCompleteProfile() {
  const [activeTab, setActiveTab] = useState(0);
  const [form, setForm] = useState({
    // Basic Information
    organisationName: '',
    organisationType: '',
    organiserFirstName: '',
    organiserLastName: '',
    description: '',
    // Contact Details
    email: '',
    phone: '',
    website: '',
    facebook: '',
    instagram: '',
    linkedin: '',
    twitter: '',
    // Address Details
    address1: '',
    address2: '',
    address3: '',
    city: '',
    district: '',
    state: '',
    country: '',
    // Profile Setup
    publicProfileLink: '',
  });

  const tabs = [
    { label: 'Basic Information' },
    { label: 'Contact Details' },
    { label: 'Address Details' },
    { label: 'Profile Setup' },
  ];

  const stageHeaders = [
    'Stage 1: Basic Information',
    'Stage 2: Contact Details',
    'Stage 3: Address Details',
    'Stage 4: Profile Setup',
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSave = () => {
    console.log('Saving organiser form data:', form);
  };

  const handleNext = () => {
    handleSave();
    setActiveTab((prev) => Math.min(prev + 1, tabs.length - 1));
  };

  const handlePrev = () => {
    handleSave();
    setActiveTab((prev) => Math.max(prev - 1, 0));
  };

  const renderTabForm = () => {
    if (activeTab === 0) {
      // Basic Information
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
            <BasicTextInput name="organisationName" placeholder="Organisation Name" value={form.organisationName} onChange={handleChange} icon={<FaBuilding />} style={{ width: '100%' }} />
            <BasicTextInput name="organiserFirstName" placeholder="Organiser First Name" value={form.organiserFirstName} onChange={handleChange} icon={<FaUser />} style={{ width: '100%' }} />
            <BasicTextInput name="description" placeholder="Description (max 2000 characters)" value={form.description} onChange={handleChange} style={{ width: '100%' }} multiline={true} rows={4} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 26 }}>
            <BasicTextInput name="organisationType" placeholder="Organisation Type" value={form.organisationType} onChange={handleChange} style={{ width: '100%' }} />
            <BasicTextInput name="organiserLastName" placeholder="Organiser Last Name" value={form.organiserLastName} onChange={handleChange} icon={<FaUser />} style={{ width: '100%' }} />
          </div>
        </form>
      );
    } else if (activeTab === 1) {
      // Contact Details
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
          <div style={{ width: 564, maxWidth: '95vw', display: 'flex', flexDirection: 'column', gap: 18 }}>
            <BasicTextInput name="email" placeholder="Email Address" value={form.email} onChange={handleChange} icon={<FaEnvelope />} style={{ width: '100%' }} />
            <BasicTextInput name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} icon={<FaPhone />} style={{ width: '100%' }} />
            <BasicTextInput name="website" placeholder="Website" value={form.website} onChange={handleChange} icon={<FaGlobe />} style={{ width: '100%' }} />
            <div style={{ display: 'grid', gridTemplateColumns: '270px 270px', gap: 24 }}>
              <BasicTextInput name="facebook" placeholder="Facebook" value={form.facebook} onChange={handleChange} icon={<FaFacebook />} style={{ width: '100%' }} />
              <BasicTextInput name="instagram" placeholder="Instagram" value={form.instagram} onChange={handleChange} icon={<FaInstagram />} style={{ width: '100%' }} />
              <BasicTextInput name="linkedin" placeholder="LinkedIn" value={form.linkedin} onChange={handleChange} icon={<FaLinkedin />} style={{ width: '100%' }} />
              <BasicTextInput name="twitter" placeholder="Twitter" value={form.twitter} onChange={handleChange} icon={<FaTwitter />} style={{ width: '100%' }} />
            </div>
          </div>
        </form>
      );
    } else if (activeTab === 2) {
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
          <div style={{ width: 564, maxWidth: '95vw', display: 'flex', flexDirection: 'column', gap: 26 }}>
            <BasicTextInput name="address1" placeholder="Address Line 1" value={form.address1} onChange={handleChange} icon={<FaHome />} style={{ width: 568, fontSize: 15, padding: '12px 16px', borderRadius: 2, border: '1px solid #000', boxSizing: 'border-box' }} />
            <BasicTextInput name="address2" placeholder="Address Line 2" value={form.address2} onChange={handleChange} icon={<FaHome />} style={{ width: 568, fontSize: 15, padding: '12px 16px', borderRadius: 2, border: '1px solid #000', boxSizing: 'border-box' }} />
            <BasicTextInput name="address3" placeholder="Address Line 3" value={form.address3} onChange={handleChange} icon={<FaHome />} style={{ width: 568, fontSize: 15, padding: '12px 16px', borderRadius: 2, border: '1px solid #000', boxSizing: 'border-box' }} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '270px 270px', gap: 24, justifyContent: 'center', width: 564, maxWidth: '95vw' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 26 }}>
              <BasicTextInput name="city" placeholder="City" value={form.city} onChange={handleChange} icon={<FaHome />} style={{ width: '100%' }} />
              <BasicTextInput name="state" placeholder="State" value={form.state} onChange={handleChange} icon={<FaHome />} style={{ width: '100%' }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 26 }}>
              <BasicTextInput name="district" placeholder="District" value={form.district} onChange={handleChange} icon={<FaHome />} style={{ width: '100%' }} />
              <BasicTextInput name="country" placeholder="Country" value={form.country} onChange={handleChange} icon={<FaHome />} style={{ width: '100%' }} />
            </div>
          </div>
        </form>
      );
    } else if (activeTab === 3) {
      // Profile Setup
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
          <div style={{ width: 564, maxWidth: '95vw' }}>
            <BasicTextInput name="publicProfileLink" placeholder="Public Profile Link" value={form.publicProfileLink} onChange={handleChange} icon={<FaLink />} style={{ width: '100%' }} />
          </div>
        </form>
      );
    }
    return null;
  };

  return (
    <div style={{ minHeight: '100vh', minWidth: '100vw', background: '#fff', width: '100vw', display: 'flex', flexDirection: 'column', alignItems: 'center', boxSizing: 'border-box' }}>
      {/* Organiser Navbar with profile icon (shows when logged in) */}
      <div style={{ width: '100%' }}>
        <OrganiserNavbar />
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

export default OrganiserCompleteProfile;