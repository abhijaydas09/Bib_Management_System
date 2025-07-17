import React, { useState } from 'react';
import BasicTextInput from '../../components/text-inputs/BasicTextInput';
import DateInput from '../../components/text-inputs/DateInput';
import { FaCamera, FaUser, FaEnvelope, FaPhone, FaCalendar, FaLock, FaMapMarkerAlt, FaClock, FaPlus, FaTrash, FaRupeeSign, FaList, FaUniversity, FaLink } from 'react-icons/fa';

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
  width: 270,
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
};
const labelStyle = { fontSize: 10, fontWeight: 400 };

export default function EditDetails() {
  // State for each section (mocked for now)
  const [overview, setOverview] = useState({ eventName: '', eventDate: '', eventTime: '', description: '' });
  const [organiser, setOrganiser] = useState({ firstName: '', middleName: '', phone: '', email: '' });
  const [regDates, setRegDates] = useState({ start: '', end: '' });
  const [paymentMethods, setPaymentMethods] = useState(['']);
  const [account, setAccount] = useState({ accountNumber: '', bank: '', ifsc: '', upi: '' });
  const [logistics, setLogistics] = useState({ venue: '', locationLink: '', city: '', district: '', state: '', country: '' });
  const [bibCollection, setBibCollection] = useState({ startDate: '', endDate: '', startTime: '', endTime: '', venue: '', locationLink: '', sameAsMarathon: false });
  const [categories, setCategories] = useState([{ name: '', distance: '', startTime: '', ageRestriction: '', fees: '' }]);
  const [documents, setDocuments] = useState(['']);
  const [kitSizes, setKitSizes] = useState(['']);
  const [consentForm, setConsentForm] = useState('');
  const [sponsors, setSponsors] = useState([{ details: '', title: '', logo: '' }]);

  // Handlers for dynamic fields
  const handleAddPayment = () => setPaymentMethods(arr => [...arr, '']);
  const handleRemovePayment = idx => setPaymentMethods(arr => arr.filter((_, i) => i !== idx));
  const handlePaymentChange = (idx, value) => setPaymentMethods(arr => arr.map((v, i) => i === idx ? value : v));

  const handleAddCategory = () => setCategories(arr => [...arr, { name: '', distance: '', startTime: '', ageRestriction: '', fees: '' }]);
  const handleRemoveCategory = idx => setCategories(arr => arr.filter((_, i) => i !== idx));
  const handleCategoryChange = (idx, field, value) => setCategories(arr => arr.map((cat, i) => i === idx ? { ...cat, [field]: value } : cat));

  const handleAddDocument = () => setDocuments(arr => [...arr, '']);
  const handleRemoveDocument = idx => setDocuments(arr => arr.filter((_, i) => i !== idx));
  const handleDocumentChange = (idx, value) => setDocuments(arr => arr.map((v, i) => i === idx ? value : v));

  const handleAddKitSize = () => setKitSizes(arr => [...arr, '']);
  const handleRemoveKitSize = idx => setKitSizes(arr => arr.filter((_, i) => i !== idx));
  const handleKitSizeChange = (idx, value) => setKitSizes(arr => arr.map((v, i) => i === idx ? value : v));

  const handleAddSponsor = () => setSponsors(arr => [...arr, { details: '', title: '', logo: '' }]);
  const handleRemoveSponsor = idx => setSponsors(arr => arr.filter((_, i) => i !== idx));
  const handleSponsorChange = (idx, field, value) => setSponsors(arr => arr.map((s, i) => i === idx ? { ...s, [field]: value } : s));

  return (
    <div style={{ minHeight: '100vh', background: '#f9f9f9', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', overflowX: 'hidden', paddingBottom: 48 }}>
      <h2 style={{ marginTop: 48, marginBottom: 34, fontWeight: 600, fontSize: 32, color: '#0B405B', letterSpacing: 1, textAlign: 'center' }}>
        Edit Event Details
      </h2>
      <div style={{ width: 900, maxWidth: '98vw', display: 'flex', flexDirection: 'column', gap: 32 }}>
        {/* Basic Event Overview */}
        <div style={{ background: '#fff', borderRadius: 6, boxShadow: '0 2px 8px rgba(0,0,0,0.08)', marginBottom: 16 }}>
          <div style={sectionHeaderStyle}>Basic Event Overview</div>
          <div style={sectionBodyStyle}>
            <div style={rowStyle}>
              <div style={colStyle}>
                <BasicTextInput label={<span style={labelStyle}>Event Name</span>} placeholder="Event Name" value={overview.eventName} onChange={e => setOverview(f => ({ ...f, eventName: e.target.value }))} />
              </div>
              <div style={colStyle}>
                <DateInput label={<span style={labelStyle}>Event Date</span>} placeholder="Event Date" value={overview.eventDate} onChange={val => setOverview(f => ({ ...f, eventDate: val }))} />
                <BasicTextInput label={<span style={labelStyle}>Event Time</span>} placeholder="Event Time" value={overview.eventTime} onChange={e => setOverview(f => ({ ...f, eventTime: e.target.value }))} />
              </div>
            </div>
            <BasicTextInput label={<span style={labelStyle}>Description</span>} placeholder="Description" value={overview.description} onChange={e => setOverview(f => ({ ...f, description: e.target.value }))} multiline rows={3} />
          </div>
        </div>
        {/* Organiser 1 */}
        <div style={{ background: '#fff', borderRadius: 6, boxShadow: '0 2px 8px rgba(0,0,0,0.08)', marginBottom: 16 }}>
          <div style={sectionHeaderStyle}>Organiser 1</div>
          <div style={sectionBodyStyle}>
            <div style={rowStyle}>
              <div style={colStyle}>
                <BasicTextInput label={<span style={labelStyle}>First Name</span>} placeholder="First Name" value={organiser.firstName} onChange={e => setOrganiser(f => ({ ...f, firstName: e.target.value }))} />
              </div>
              <div style={colStyle}>
                <BasicTextInput label={<span style={labelStyle}>Middle Name</span>} placeholder="Middle Name" value={organiser.middleName} onChange={e => setOrganiser(f => ({ ...f, middleName: e.target.value }))} />
              </div>
            </div>
            <div style={rowStyle}>
              <div style={colStyle}>
                <BasicTextInput label={<span style={labelStyle}>Phone Number</span>} placeholder="Phone Number" value={organiser.phone} onChange={e => setOrganiser(f => ({ ...f, phone: e.target.value }))} icon={<FaPhone />} />
              </div>
              <div style={colStyle}>
                <BasicTextInput label={<span style={labelStyle}>Email</span>} placeholder="Email" value={organiser.email} onChange={e => setOrganiser(f => ({ ...f, email: e.target.value }))} icon={<FaEnvelope />} />
              </div>
            </div>
          </div>
        </div>
        {/* Registration Dates */}
        <div style={{ background: '#fff', borderRadius: 6, boxShadow: '0 2px 8px rgba(0,0,0,0.08)', marginBottom: 16 }}>
          <div style={sectionHeaderStyle}>Registration Dates</div>
          <div style={sectionBodyStyle}>
            <div style={rowStyle}>
              <div style={colStyle}>
                <DateInput label={<span style={labelStyle}>Registration Start Date</span>} placeholder="Registration Start Date" value={regDates.start} onChange={val => setRegDates(f => ({ ...f, start: val }))} />
              </div>
              <div style={colStyle}>
                <DateInput label={<span style={labelStyle}>Registration End Date</span>} placeholder="Registration End Date" value={regDates.end} onChange={val => setRegDates(f => ({ ...f, end: val }))} />
              </div>
            </div>
          </div>
        </div>
        {/* Payment Methods */}
        <div style={{ background: '#fff', borderRadius: 6, boxShadow: '0 2px 8px rgba(0,0,0,0.08)', marginBottom: 16 }}>
          <div style={sectionHeaderStyle}>Payment Methods</div>
          <div style={sectionBodyStyle}>
            {paymentMethods.map((method, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <BasicTextInput placeholder={`Payment Method ${idx + 1}`} value={method} onChange={e => handlePaymentChange(idx, e.target.value)} style={{ flex: 1 }} />
                {paymentMethods.length > 1 && (
                  <button type="button" onClick={() => handleRemovePayment(idx)} style={{ background: 'none', border: 'none', color: '#e53935', fontSize: 18, cursor: 'pointer' }}><FaTrash /></button>
                )}
              </div>
            ))}
            <button type="button" onClick={handleAddPayment} style={{ background: '#eaf1fb', color: '#0B405B', border: 'none', borderRadius: 4, padding: '6px 16px', fontWeight: 500, fontSize: 14, cursor: 'pointer', marginTop: 8 }}><FaPlus style={{ marginRight: 6 }} /> Add</button>
          </div>
        </div>
        {/* Account Details */}
        <div style={{ background: '#fff', borderRadius: 6, boxShadow: '0 2px 8px rgba(0,0,0,0.08)', marginBottom: 16 }}>
          <div style={sectionHeaderStyle}>Account Details</div>
          <div style={sectionBodyStyle}>
            <div style={rowStyle}>
              <div style={colStyle}>
                <BasicTextInput label={<span style={labelStyle}>Account Number</span>} placeholder="Account Number" value={account.accountNumber} onChange={e => setAccount(f => ({ ...f, accountNumber: e.target.value }))} icon={<FaUniversity />} />
              </div>
              <div style={colStyle}>
                <BasicTextInput label={<span style={labelStyle}>BANK NAME & BRANCH</span>} placeholder="BANK NAME & BRANCH" value={account.bank} onChange={e => setAccount(f => ({ ...f, bank: e.target.value }))} />
              </div>
            </div>
            <div style={rowStyle}>
              <div style={colStyle}>
                <BasicTextInput label={<span style={labelStyle}>IFSC Code</span>} placeholder="IFSC Code" value={account.ifsc} onChange={e => setAccount(f => ({ ...f, ifsc: e.target.value }))} />
              </div>
              <div style={colStyle}>
                <BasicTextInput label={<span style={labelStyle}>UPI ID</span>} placeholder="UPI ID" value={account.upi} onChange={e => setAccount(f => ({ ...f, upi: e.target.value }))} />
              </div>
            </div>
          </div>
        </div>
        {/* Event Logistics */}
        <div style={{ background: '#fff', borderRadius: 6, boxShadow: '0 2px 8px rgba(0,0,0,0.08)', marginBottom: 16 }}>
          <div style={sectionHeaderStyle}>Event Logistics</div>
          <div style={sectionBodyStyle}>
            <div style={rowStyle}>
              <div style={colStyle}>
                <BasicTextInput label={<span style={labelStyle}>Venue</span>} placeholder="Venue" value={logistics.venue} onChange={e => setLogistics(f => ({ ...f, venue: e.target.value }))} icon={<FaMapMarkerAlt />} />
              </div>
              <div style={colStyle}>
                <BasicTextInput label={<span style={labelStyle}>Location Link</span>} placeholder="Location Link" value={logistics.locationLink} onChange={e => setLogistics(f => ({ ...f, locationLink: e.target.value }))} icon={<FaLink />} />
              </div>
            </div>
            <div style={rowStyle}>
              <div style={colStyle}>
                <BasicTextInput label={<span style={labelStyle}>City</span>} placeholder="City" value={logistics.city} onChange={e => setLogistics(f => ({ ...f, city: e.target.value }))} />
              </div>
              <div style={colStyle}>
                <BasicTextInput label={<span style={labelStyle}>District</span>} placeholder="District" value={logistics.district} onChange={e => setLogistics(f => ({ ...f, district: e.target.value }))} />
              </div>
              <div style={colStyle}>
                <BasicTextInput label={<span style={labelStyle}>State</span>} placeholder="State" value={logistics.state} onChange={e => setLogistics(f => ({ ...f, state: e.target.value }))} />
              </div>
              <div style={colStyle}>
                <BasicTextInput label={<span style={labelStyle}>Country</span>} placeholder="Country" value={logistics.country} onChange={e => setLogistics(f => ({ ...f, country: e.target.value }))} />
              </div>
            </div>
          </div>
        </div>
        {/* Bib Collection Details */}
        <div style={{ background: '#fff', borderRadius: 6, boxShadow: '0 2px 8px rgba(0,0,0,0.08)', marginBottom: 16 }}>
          <div style={sectionHeaderStyle}>Bib Collection Details</div>
          <div style={sectionBodyStyle}>
            <div style={rowStyle}>
              <div style={colStyle}>
                <DateInput label={<span style={labelStyle}>Bib Collection Start Date</span>} placeholder="Bib Collection Start Date" value={bibCollection.startDate} onChange={val => setBibCollection(f => ({ ...f, startDate: val }))} />
              </div>
              <div style={colStyle}>
                <DateInput label={<span style={labelStyle}>Bib Collection End Date</span>} placeholder="Bib Collection End Date" value={bibCollection.endDate} onChange={val => setBibCollection(f => ({ ...f, endDate: val }))} />
              </div>
            </div>
            <div style={rowStyle}>
              <div style={colStyle}>
                <BasicTextInput label={<span style={labelStyle}>Bib Collection Start Time</span>} placeholder="Bib Collection Start Time" value={bibCollection.startTime} onChange={e => setBibCollection(f => ({ ...f, startTime: e.target.value }))} icon={<FaClock />} />
              </div>
              <div style={colStyle}>
                <BasicTextInput label={<span style={labelStyle}>Bib Collection End Time</span>} placeholder="Bib Collection End Time" value={bibCollection.endTime} onChange={e => setBibCollection(f => ({ ...f, endTime: e.target.value }))} icon={<FaClock />} />
              </div>
            </div>
            <div style={rowStyle}>
              <div style={colStyle}>
                <BasicTextInput label={<span style={labelStyle}>Venue</span>} placeholder="Venue" value={bibCollection.venue} onChange={e => setBibCollection(f => ({ ...f, venue: e.target.value }))} icon={<FaMapMarkerAlt />} />
              </div>
              <div style={colStyle}>
                <BasicTextInput label={<span style={labelStyle}>Location Link</span>} placeholder="Location Link" value={bibCollection.locationLink} onChange={e => setBibCollection(f => ({ ...f, locationLink: e.target.value }))} icon={<FaLink />} />
              </div>
            </div>
            <div style={{ marginTop: 8 }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13 }}>
                <input type="checkbox" checked={bibCollection.sameAsMarathon} onChange={e => setBibCollection(f => ({ ...f, sameAsMarathon: e.target.checked }))} />
                Same as Marathon Venue
              </label>
            </div>
          </div>
        </div>
        {/* Categories */}
        <div style={{ background: '#fff', borderRadius: 6, boxShadow: '0 2px 8px rgba(0,0,0,0.08)', marginBottom: 16 }}>
          <div style={sectionHeaderStyle}>Categories</div>
          <div style={sectionBodyStyle}>
            {categories.map((cat, idx) => (
              <div key={idx} style={{ border: '1px solid #e0e0e0', borderRadius: 4, padding: 16, marginBottom: 12, position: 'relative' }}>
                <div style={{ display: 'flex', gap: 24 }}>
                  <div style={colStyle}>
                    <BasicTextInput label={<span style={labelStyle}>Category Name</span>} placeholder="Category name" value={cat.name} onChange={e => handleCategoryChange(idx, 'name', e.target.value)} icon={<FaList />} />
                  </div>
                  <div style={colStyle}>
                    <BasicTextInput label={<span style={labelStyle}>Distance</span>} placeholder="Distance" value={cat.distance} onChange={e => handleCategoryChange(idx, 'distance', e.target.value)} />
                  </div>
                  <div style={colStyle}>
                    <BasicTextInput label={<span style={labelStyle}>Start Time</span>} placeholder="Start time" value={cat.startTime} onChange={e => handleCategoryChange(idx, 'startTime', e.target.value)} icon={<FaClock />} />
                  </div>
                  <div style={colStyle}>
                    <BasicTextInput label={<span style={labelStyle}>Age Restriction</span>} placeholder="Age restriction" value={cat.ageRestriction} onChange={e => handleCategoryChange(idx, 'ageRestriction', e.target.value)} />
                  </div>
                  <div style={colStyle}>
                    <BasicTextInput label={<span style={labelStyle}>Fees</span>} placeholder="Fee" value={cat.fees} onChange={e => handleCategoryChange(idx, 'fees', e.target.value)} icon={<FaRupeeSign />} />
                  </div>
                  <button type="button" onClick={() => handleRemoveCategory(idx)} style={{ background: 'none', border: 'none', color: '#e53935', fontSize: 18, cursor: 'pointer', position: 'absolute', top: 8, right: 8 }}><FaTrash /></button>
                </div>
              </div>
            ))}
            <button type="button" onClick={handleAddCategory} style={{ background: '#eaf1fb', color: '#0B405B', border: 'none', borderRadius: 4, padding: '6px 16px', fontWeight: 500, fontSize: 14, cursor: 'pointer', marginTop: 8 }}><FaPlus style={{ marginRight: 6 }} /> Add</button>
          </div>
        </div>
        {/* Additional Details */}
        <div style={{ background: '#fff', borderRadius: 6, boxShadow: '0 2px 8px rgba(0,0,0,0.08)', marginBottom: 16 }}>
          <div style={sectionHeaderStyle}>Additional Details</div>
          <div style={sectionBodyStyle}>
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontWeight: 500, fontSize: 15, marginBottom: 8 }}>Required Documents</div>
              {documents.map((doc, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                  <BasicTextInput placeholder={`Name of Document ${idx + 1}`} value={doc} onChange={e => handleDocumentChange(idx, e.target.value)} style={{ flex: 1 }} />
                  {documents.length > 1 && (
                    <button type="button" onClick={() => handleRemoveDocument(idx)} style={{ background: 'none', border: 'none', color: '#e53935', fontSize: 18, cursor: 'pointer' }}><FaTrash /></button>
                  )}
                </div>
              ))}
              <button type="button" onClick={handleAddDocument} style={{ background: '#eaf1fb', color: '#0B405B', border: 'none', borderRadius: 4, padding: '6px 16px', fontWeight: 500, fontSize: 14, cursor: 'pointer', marginTop: 8 }}><FaPlus style={{ marginRight: 6 }} /> Add</button>
            </div>
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontWeight: 500, fontSize: 15, marginBottom: 8 }}>Kit Sizes</div>
              {kitSizes.map((size, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                  <BasicTextInput placeholder="Size" value={size} onChange={e => handleKitSizeChange(idx, e.target.value)} style={{ flex: 1 }} />
                  {kitSizes.length > 1 && (
                    <button type="button" onClick={() => handleRemoveKitSize(idx)} style={{ background: 'none', border: 'none', color: '#e53935', fontSize: 18, cursor: 'pointer' }}><FaTrash /></button>
                  )}
                </div>
              ))}
              <button type="button" onClick={handleAddKitSize} style={{ background: '#eaf1fb', color: '#0B405B', border: 'none', borderRadius: 4, padding: '6px 16px', fontWeight: 500, fontSize: 14, cursor: 'pointer', marginTop: 8 }}><FaPlus style={{ marginRight: 6 }} /> Add</button>
            </div>
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontWeight: 500, fontSize: 15, marginBottom: 8 }}>Consent Form</div>
              <BasicTextInput placeholder="Add Link" value={consentForm} onChange={e => setConsentForm(e.target.value)} icon={<FaLink />} />
            </div>
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontWeight: 500, fontSize: 15, marginBottom: 8 }}>Rules & Guidelines</div>
              <textarea style={{ width: '100%', minHeight: 120, borderRadius: 4, border: '1px solid #e0e0e0', padding: 12, fontSize: 14 }} placeholder="Rules & Guidelines" value={''} readOnly />
            </div>
          </div>
        </div>
        {/* Sponsor Details */}
        <div style={{ background: '#fff', borderRadius: 6, boxShadow: '0 2px 8px rgba(0,0,0,0.08)', marginBottom: 16 }}>
          <div style={sectionHeaderStyle}>Sponsor Details</div>
          <div style={sectionBodyStyle}>
            {sponsors.map((s, idx) => (
              <div key={idx} style={{ border: '1px solid #e0e0e0', borderRadius: 4, padding: 16, marginBottom: 12, position: 'relative' }}>
                <div style={rowStyle}>
                  <div style={colStyle}>
                    <BasicTextInput placeholder="Sponsor details" value={s.details} onChange={e => handleSponsorChange(idx, 'details', e.target.value)} icon={<FaRupeeSign />} />
                  </div>
                  <div style={colStyle}>
                    <BasicTextInput placeholder="Sponsor Title" value={s.title} onChange={e => handleSponsorChange(idx, 'title', e.target.value)} />
                  </div>
                  <div style={colStyle}>
                    <BasicTextInput placeholder="Sponsor Logo" value={s.logo} onChange={e => handleSponsorChange(idx, 'logo', e.target.value)} icon={<FaCamera />} />
                  </div>
                  <button type="button" onClick={() => handleRemoveSponsor(idx)} style={{ background: 'none', border: 'none', color: '#e53935', fontSize: 18, cursor: 'pointer', position: 'absolute', top: 8, right: 8 }}><FaTrash /></button>
                </div>
              </div>
            ))}
            <button type="button" onClick={handleAddSponsor} style={{ background: '#eaf1fb', color: '#0B405B', border: 'none', borderRadius: 4, padding: '6px 16px', fontWeight: 500, fontSize: 14, cursor: 'pointer', marginTop: 8 }}><FaPlus style={{ marginRight: 6 }} /> Add</button>
          </div>
        </div>
      </div>
    </div>
  );
}