import React, { useState } from 'react';
import TabsBoxed from '../../components/tabs/TabsBoxed';
import BasicTextInput from '../../components/text-inputs/BasicTextInput';
import DateInput from '../../components/text-inputs/DateInput';
import { FaCamera, FaUser, FaEnvelope, FaPhone, FaCalendar } from 'react-icons/fa';
import OrganiserNavbar from '../../components/tabs/OrganiserNavbar';
import EventLogistics from './EventLogistics';
import BibCollectionDetails from './BibCollectionDetails';
import AdditionalDetails from './AdditionalDetails';
import SponsorDetails from './SponsorDetails';
import CategoriesDetails from './CategoriesDetails';

const tabs = [
  { label: 'Overview' },
  { label: 'Logistics' },
  { label: 'Categories' },
  { label: 'Bib Collection' },
  { label: 'Additional Details' },
  { label: 'Sponsors' },
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
const sectionHeaderStyle = {
  background: '#e9e9e9',
  borderTopLeftRadius: 6,
  borderTopRightRadius: 6,
  padding: '14px 24px',
  fontWeight: 400,
  fontSize: 16,
  color: '#0B405B',
  borderBottom: '1px solid #e0e0e0',
};
const sectionBodyStyle = {
  padding: '24px 24px 24px 24px',
  display: 'flex',
  flexDirection: 'column',
  gap: 24,
};
const rowStyle = {
  display: 'flex',
  gap: 24,
  marginBottom: 0,
};
const colStyle = {
  width:270,
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
};
const uploadBoxStyle = {
  width: 270,
  height: 84,
  background: '#f5f5f5',
  borderRadius: 4,
  border: '1px dashed #bbb',
  display: 'flex',
  alignItems: 'center',
  marginBottom: 0,
  padding: 0,
  position: 'relative',
};
const uploadCircleStyle = {
  width: 60,
  height: 60,
  borderRadius: '50%',
  background: '#e5e5e5',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginLeft: 12,
  marginRight: 12,
  overflow: 'hidden',
};
const uploadLabelStyle = {
  background: '#fff',
  border: '1px solid #0B405B',
  color: '#0B405B',
  borderRadius: 2,
  padding: '0 8px',
  fontWeight: 400,
  fontSize: 11,
  cursor: 'pointer',
  marginBottom: 2,
  display: 'flex',
  alignItems: 'center',
  gap: 4,
  width: 140,
  height: 22,
  justifyContent: 'center',
};
const uploadTextStyle = { fontSize: 10, color: '#444', marginTop: 2 };

// Label style for all input labels
const labelStyle = { fontSize: 10, fontWeight: 400 };

function EventOverview() {
  const [activeTab, setActiveTab] = useState(0);
  const [logo, setLogo] = useState(null);
  const [banner, setBanner] = useState(null);
  const [form, setForm] = useState({
    eventName: '', organiserName: '', email: '', phone: '', description: '', regStart: '', regEnd: '',
    payment1: '', payment2: '', upi: '', account: '', ifsc: '', bank: '',
  });
  const [logisticsForm, setLogisticsForm] = useState({
    eventDate: '', startTime: '', venue: '', locationLink: '', city: '', district: '', state: '', country: ''
  });
  const [bibCollectionForm, setBibCollectionForm] = useState({
    bibCollectionStartDate: '',
    bibCollectionEndDate: '',
    bibCollectionVenue: '',
    bibCollectionLocationLink: '',
    bibCollectionStartTime: '',
    bibCollectionEndTime: '',
  });
  const [sameVenueChecked, setSameVenueChecked] = useState(false);
  const [additionalDetailsForm, setAdditionalDetailsForm] = useState({
    documents: [''],
    kitSize: '',
    consentForm: '',
    rules: '',
  });
  const [sponsorForm, setSponsorForm] = useState({
    sponsorName: '',
    sponsorTitle: '',
    sponsorLogo: null,
    sponsorLogoName: '',
    sponsorLogoPreview: '',
  });
  const [sponsors, setSponsors] = useState([]); // Array of sponsor objects
  const [showSponsorForm, setShowSponsorForm] = useState(true); // true: show form, false: show summary
  const [categoryForm, setCategoryForm] = useState({
    categoryName: '',
    distance: '',
    startTime: '',
    minAge: '',
    maxAge: '',
    registrationFees: '',
    maxParticipants: '',
  });
  const [categories, setCategories] = useState([]);
  const [showCategoryForm, setShowCategoryForm] = useState(true);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const handleLogoChange = e => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setLogo(reader.result);
      reader.readAsDataURL(file);
    }
  };
  const handleBannerChange = e => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setBanner(reader.result);
      reader.readAsDataURL(file);
    }
  };
  const handleLogisticsChange = e => setLogisticsForm({ ...logisticsForm, [e.target.name]: e.target.value });
  const handleBibCollectionChange = e => setBibCollectionForm({ ...bibCollectionForm, [e.target.name]: e.target.value });
  const handleSameVenueChange = () => {
    setSameVenueChecked((prev) => {
      const newChecked = !prev;
      if (newChecked) {
        setBibCollectionForm(form => ({
          ...form,
          bibCollectionVenue: logisticsForm.venue,
          bibCollectionLocationLink: logisticsForm.locationLink
        }));
      }
      return newChecked;
    });
  };
  const handleAdditionalDetailsChange = e => setAdditionalDetailsForm({ ...additionalDetailsForm, [e.target.name]: e.target.value });
  const handleAddDocument = () => setAdditionalDetailsForm(form => ({ ...form, documents: [...form.documents, ''] }));
  const handleDocumentChange = (idx, value) => setAdditionalDetailsForm(form => {
    const docs = [...form.documents];
    docs[idx] = value;
    return { ...form, documents: docs };
  });
  const handleRemoveDocument = idx => setAdditionalDetailsForm(form => {
    const docs = form.documents.filter((_, i) => i !== idx);
    return { ...form, documents: docs.length ? docs : [''] };
  });
  const handleSponsorChange = e => setSponsorForm({ ...sponsorForm, [e.target.name]: e.target.value });
  const handleSponsorLogoChange = e => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setSponsorForm(form => ({
        ...form,
        sponsorLogo: file,
        sponsorLogoName: file.name,
        sponsorLogoPreview: reader.result
      }));
      reader.readAsDataURL(file);
    }
  };
  const handleSponsorSave = () => {
    setSponsors(prev => [...prev, sponsorForm]);
    setSponsorForm({ sponsorName: '', sponsorTitle: '', sponsorLogo: null, sponsorLogoName: '', sponsorLogoPreview: '' });
    setShowSponsorForm(false);
  };
  const handleSponsorAdd = () => {
    setShowSponsorForm(true);
  };
  const handleSponsorRemove = idx => {
    setSponsors(prev => prev.filter((_, i) => i !== idx));
  };
  const handleCategoryChange = e => setCategoryForm({ ...categoryForm, [e.target.name]: e.target.value });
  const handleCategorySave = () => {
    setCategories(prev => [...prev, categoryForm]);
    setCategoryForm({ categoryName: '', distance: '', startTime: '', minAge: '', maxAge: '', registrationFees: '', maxParticipants: '' });
    setShowCategoryForm(false);
  };
  const handleCategoryAdd = () => setShowCategoryForm(true);
  const handleCategoryRemove = idx => setCategories(prev => prev.filter((_, i) => i !== idx));

  return (
    <div style={{ minHeight: '100vh', background: '#f9f9f9', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', overflowX: 'hidden' }}>
      <OrganiserNavbar activeTab="/organiser/create-event" />
      <h2 style={{ marginTop: 48, marginBottom: 34, fontWeight: 600, fontSize: 32, color: '#0B405B', letterSpacing: 1, textAlign: 'center' }}>
        CREATE NEW MARATHON
      </h2>
      <div style={{ marginBottom: 34, width: 540, maxWidth: '95vw', display: 'flex', justifyContent: 'center' }}>
        <TabsBoxed tabs={tabs} activeIndex={activeTab} onTabClick={setActiveTab} />
      </div>
      {/* Tab content rendering: only show the selected tab's content */}
      {activeTab === 0 && (
        <>
          <div style={cardStyle}>
            <div style={sectionHeaderStyle}>Stage 1: Basic Event Overview</div>
            <div style={sectionBodyStyle}>
              <div style={rowStyle}>
                <div style={colStyle}>
                  <BasicTextInput
                    label={<span style={labelStyle}>Event Name</span>}
                    name="eventName"
                    placeholder="Event Name"
                    value={form.eventName}
                    onChange={handleChange}
                  />
                </div>
                <div style={colStyle}>
                  <BasicTextInput
                    label={<span style={labelStyle}>Organizer name</span>}
                    name="organiserName"
                    placeholder="Organizer name"
                    value={form.organiserName}
                    onChange={handleChange}
                    icon={<FaUser />}
                  />
                </div>
              </div>
              <div style={rowStyle}>
                <div style={colStyle}>
                  <div style={uploadBoxStyle}>
                    <div style={uploadCircleStyle}>
                      {logo ? (
                        <img src={logo} alt="Event Logo" style={{ width: 60, height: 60, objectFit: 'cover', borderRadius: '50%' }} />
                      ) : (
                        <FaCamera style={{ fontSize: 32, color: '#0B405B' }} />
                      )}
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center', height: '100%', width: 140 }}>
                      <label style={uploadLabelStyle}>
                        <FaCamera style={{ fontSize: 12 }} /> <span style={labelStyle}>Upload Event Logo</span>
                        <input type="file" accept="image/*" style={{ display: 'none' }} onChange={handleLogoChange} />
                      </label>
                      <div style={uploadTextStyle}>or drop file</div>
                    </div>
                  </div>
                </div>
                <div style={colStyle}>
                  <div style={uploadBoxStyle}>
                    <div style={uploadCircleStyle}>
                      {banner ? (
                        <img src={banner} alt="Event Banner" style={{ width: 60, height: 60, objectFit: 'cover', borderRadius: '50%' }} />
                      ) : (
                        <FaCamera style={{ fontSize: 32, color: '#0B405B' }} />
                      )}
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center', height: '100%', width: 140 }}>
                      <label style={uploadLabelStyle}>
                        <FaCamera style={{ fontSize: 12 }} /> <span style={labelStyle}>Upload Event Banner</span>
                        <input type="file" accept="image/*" style={{ display: 'none' }} onChange={handleBannerChange} />
                      </label>
                      <div style={uploadTextStyle}>or drop file</div>
                    </div>
                  </div>
                </div>
              </div>
              <div style={rowStyle}>
                <div style={colStyle}>
                  <BasicTextInput
                    label={<span style={labelStyle}>Email</span>}
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    icon={<FaEnvelope />}
                  />
                </div>
                <div style={colStyle}>
                  <BasicTextInput
                    label={<span style={labelStyle}>Phone Number</span>}
                    name="phone"
                    placeholder="Phone Number"
                    value={form.phone}
                    onChange={handleChange}
                    icon={<FaPhone />}
                  />
                </div>
              </div>
              <div style={rowStyle}>
                <div style={{ gridColumn: '1 / span 2', marginTop: 0, display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                  <BasicTextInput
                    label={<span style={labelStyle}>Description (max 2000 characters)</span>}
                    name="description"
                    placeholder="Description (max 2000 characters)"
                    value={form.description}
                    onChange={handleChange}
                    style={{
                      width: 550,
                      height: 100,
                      textAlign: 'left',
                      alignItems: 'flex-start',
                      justifyContent: 'flex-start',
                      display: 'flex'
                    }}
                    inputStyle={{
                      textAlign: 'left',
                      alignItems: 'flex-start',
                      justifyContent: 'flex-start',
                      display: 'flex'
                    }}
                    multiline={true}
                    rows={4}
                  />
                </div>
              </div>
              <div style={rowStyle}>
                <div style={colStyle}>
                  <DateInput
                    label={<span style={labelStyle}>Registration Start Date</span>}
                    name="regStart"
                    value={form.regStart}
                    onChange={handleChange}
                    icon={<FaCalendar />}
                  />
                </div>
                <div style={colStyle}>
                  <DateInput
                    label={<span style={labelStyle}>Registration End Date</span>}
                    name="regEnd"
                    value={form.regEnd}
                    onChange={handleChange}
                    icon={<FaCalendar />}
                  />
                </div>
              </div>
              <div style={rowStyle}>
                <div style={colStyle}>
                  <BasicTextInput
                    label={<span style={labelStyle}>Payment Method 1</span>}
                    name="payment1"
                    placeholder="Payment Method 1"
                    value={form.payment1}
                    onChange={handleChange}
                  />
                </div>
                <div style={colStyle}>
                  <BasicTextInput
                    label={<span style={labelStyle}>UPI ID</span>}
                    name="upi"
                    placeholder="UPI ID"
                    value={form.upi}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div style={rowStyle}>
                <div style={colStyle}>
                  <BasicTextInput
                    label={<span style={labelStyle}>Payment Method 2</span>}
                    name="payment2"
                    placeholder="Payment Method 2"
                    value={form.payment2}
                    onChange={handleChange}
                  />
                </div>
                <div style={colStyle}>
                  <BasicTextInput
                    label={<span style={labelStyle}>Account Number</span>}
                    name="account"
                    placeholder="Account Number"
                    value={form.account}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div style={rowStyle}>
                <div style={colStyle}>
                  <BasicTextInput
                    label={<span style={labelStyle}>IFSC Code</span>}
                    name="ifsc"
                    placeholder="IFSC Code"
                    value={form.ifsc}
                    onChange={handleChange}
                  />
                </div>
                <div style={colStyle}>
                  <BasicTextInput
                    label={<span style={labelStyle}>BANK NAME & BRANCH</span>}
                    name="bank"
                    placeholder="BANK NAME & BRANCH"
                    value={form.bank}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
          </div>
          <div style={{ width: cardStyle.minWidth, display: 'flex', justifyContent: 'center', gap: 12, marginBottom: 32 }}>
            {/* Prev button not shown on first tab */}
            <button
              style={{ background: '#0B405B', color: '#fff', border: 'none', borderRadius: 2, padding: '6px 8px', fontWeight: 400, fontSize: 10, cursor: 'pointer' }}
              onClick={() => setActiveTab((prev) => Math.min(prev + 1, tabs.length - 1))}
            >
              Next
            </button>
          </div>
        </>
      )}
      {activeTab === 1 && (
        <>
          <EventLogistics form={logisticsForm} onChange={handleLogisticsChange} 
            onPrev={() => setActiveTab((prev) => Math.max(prev - 1, 0))}
            onNext={() => setActiveTab((prev) => Math.min(prev + 1, tabs.length - 1))}
          />
        </>
      )}
      {activeTab === 2 && (
        <CategoriesDetails
          form={categoryForm}
          onChange={handleCategoryChange}
          onPrev={() => setActiveTab((prev) => Math.max(prev - 1, 0))}
          onSave={handleCategorySave}
          categories={categories}
          showForm={showCategoryForm}
          onAddCategory={handleCategoryAdd}
          onRemoveCategory={handleCategoryRemove}
          onNext={() => setActiveTab((prev) => Math.min(prev + 1, tabs.length - 1))}
        />
      )}
      {activeTab === 3 && (
        <BibCollectionDetails
          form={bibCollectionForm}
          onChange={handleBibCollectionChange}
          onPrev={() => setActiveTab((prev) => Math.max(prev - 1, 0))}
          onNext={() => setActiveTab((prev) => Math.min(prev + 1, tabs.length - 1))}
          onSameVenueChange={handleSameVenueChange}
          sameVenueChecked={sameVenueChecked}
        />
      )}
      {activeTab === 4 && (
        <AdditionalDetails
          form={additionalDetailsForm}
          onChange={handleAdditionalDetailsChange}
          onPrev={() => setActiveTab((prev) => Math.max(prev - 1, 0))}
          onNext={() => setActiveTab((prev) => Math.min(prev + 1, tabs.length - 1))}
          onAddDocument={handleAddDocument}
          onDocumentChange={handleDocumentChange}
          onRemoveDocument={handleRemoveDocument}
        />
      )}
      {activeTab === 5 && (
        <SponsorDetails
          form={sponsorForm}
          onChange={handleSponsorChange}
          onPrev={() => setActiveTab((prev) => Math.max(prev - 1, 0))}
          onSave={handleSponsorSave}
          onLogoChange={handleSponsorLogoChange}
          sponsors={sponsors}
          showForm={showSponsorForm}
          onAddSponsor={handleSponsorAdd}
          onRemoveSponsor={handleSponsorRemove}
        />
      )}
      {activeTab > 1 && activeTab < tabs.length && activeTab !== 2 && activeTab !== 3 && activeTab !== 4 && activeTab !== 5 && (
        <div style={{ width: cardStyle.minWidth, display: 'flex', justifyContent: 'center', gap: 12, marginBottom: 32 }}>
          {activeTab > 0 && (
            <button
              style={{ background: '#EDF0F3', color: '#0B405B', borderRadius: 2, fontWeight: 400, fontSize: 10, padding: '6px 8px', cursor: 'pointer', marginRight: 0, transition: 'background 0.18s, color 0.18s' }}
              onClick={() => setActiveTab((prev) => Math.max(prev - 1, 0))}
            >
              Prev
            </button>
          )}
          {activeTab < tabs.length - 1 && (
            <button
              style={{ background: '#0B405B', color: '#fff', border: 'none', borderRadius: 2, padding: '6px 8px', fontWeight: 400, fontSize: 10, cursor: 'pointer' }}
              onClick={() => setActiveTab((prev) => Math.min(prev + 1, tabs.length - 1))}
            >
              Next
            </button>
          )}
        </div>
      )}
      {/* Example for future tabs:
      {activeTab === 2 && (
        <EventCategories ... />
      )}
      */}
    </div>
  );
}

export default EventOverview; 