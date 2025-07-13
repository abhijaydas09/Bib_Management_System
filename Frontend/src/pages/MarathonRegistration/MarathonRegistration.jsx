import React, { useState } from 'react';
import TabsBoxed from '../../components/tabs/TabsBoxed';
import ParticipantNavbar from '../../components/tabs/ParticipantNavbar';
import Footer from '../../components/footer/Footer';
import BasicInfo from './BasicInfo';
import CategorySelection from './CategorySelection';
import EmergencyContacts from './EmergencyContacts';
import HealthFitness from './HealthFitness';
import DocumentsUpload from './DocumentsUpload';

const tabs = [
  { label: 'Basic Information' },
  { label: 'Category' },
  { label: 'Emergency Contacts' },
  { label: 'Health & Safety Info' },
  { label: 'Documents' },
  { label: 'Checkout' },
];

const cardStyle = {
  background: '#fff',
  borderRadius: 6,
  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
  marginBottom: 16,
  padding: 0,
  minWidth: 626,
  maxWidth: 900,
};

const initialForm = {
  firstName: '',
  middleName: '',
  lastName: '',
  dob: '',
  gender: '',
  nationality: '',
  phone: '',
  email: '',
  address1: '',
  address2: '',
  address3: '',
  city: '',
  district: '',
  state: '',
  country: '',
};

function MarathonRegistration() {
  const [activeTab, setActiveTab] = useState(0);
  const [form, setForm] = useState(initialForm);
  const [selectedCategory, setSelectedCategory] = useState('Beginner');
  const [emergencyContacts, setEmergencyContacts] = useState([
    { firstName: '', middleName: '', lastName: '', relationship: '', phone: '', email: '' }
  ]);
  const [medicalConditions, setMedicalConditions] = useState(['']);
  const [allergies, setAllergies] = useState(['']);
  const [medications, setMedications] = useState(['']);
  const [bloodGroup, setBloodGroup] = useState('');
  const [requiredDocuments, setRequiredDocuments] = useState([
    { name: '', file: null },
    { name: '', file: null },
  ]);
  const [kitSize, setKitSize] = useState('');
  const [consentForm, setConsentForm] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    setActiveTab((prev) => Math.min(prev + 1, tabs.length - 1));
  };
  const handlePrev = () => {
    setActiveTab((prev) => Math.max(prev - 1, 0));
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f9f9f9', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', overflowX: 'hidden' }}>
      <ParticipantNavbar activeTab="/participant/marathons" />
      <h2 style={{ marginTop: 48, marginBottom: 34, fontWeight: 600, fontSize: 32, color: '#0B405B', letterSpacing: 1, textAlign: 'center' }}>
        MARATHON REGISTRATION
      </h2>
      <div style={{ marginBottom: 34, maxWidth: '95vw', display: 'flex', justifyContent: 'center' }}>
        <TabsBoxed tabs={tabs} activeIndex={activeTab} onTabClick={setActiveTab} />
      </div>
      <div style={cardStyle}>
        {activeTab === 0 && (
          <BasicInfo form={form} onChange={handleChange} />
        )}
        {activeTab === 1 && (
          <CategorySelection
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
        )}
        {activeTab === 2 && (
          <EmergencyContacts
            emergencyContacts={emergencyContacts}
            setEmergencyContacts={setEmergencyContacts}
          />
        )}
        {activeTab === 3 && (
          <HealthFitness
            medicalConditions={medicalConditions}
            setMedicalConditions={setMedicalConditions}
            allergies={allergies}
            setAllergies={setAllergies}
            medications={medications}
            setMedications={setMedications}
            bloodGroup={bloodGroup}
            setBloodGroup={setBloodGroup}
          />
        )}
        {activeTab === 4 && (
          <DocumentsUpload
            requiredDocuments={requiredDocuments}
            setRequiredDocuments={setRequiredDocuments}
            kitSize={kitSize}
            setKitSize={setKitSize}
            consentForm={consentForm}
            setConsentForm={setConsentForm}
          />
        )}
        {activeTab === 5 && <div style={{ padding: 32 }}>Checkout Tab (to be implemented)</div>}
      </div>
      {/* Navigation Buttons */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginBottom: 32 }}>
        {activeTab > 0 && (
          <button
            type="button"
            style={{
              background: '#EDF0F3',
              color: '#0B405B',
              borderRadius: 2,
              fontWeight: 400,
              fontSize: 10,
              padding: '6px 8px',
              cursor: 'pointer',
              transition: 'background 0.18s, color 0.18s',
            }}
            onClick={handlePrev}
          >
            Prev
          </button>
        )}
        {activeTab < tabs.length - 1 && (
          <button
            type="button"
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
            onClick={handleNext}
          >
            Next
          </button>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default MarathonRegistration; 