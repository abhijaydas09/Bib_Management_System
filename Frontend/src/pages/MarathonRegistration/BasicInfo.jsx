import React from 'react';
import BasicTextInput from '../../components/text-inputs/BasicTextInput';
import DateInput from '../../components/text-inputs/DateInput';
import { FaUser, FaCalendar, FaFlag, FaEnvelope, FaHome, FaMapMarkerAlt } from 'react-icons/fa';

const cardStyle = {
  background: '#fff',
  borderRadius: 6,
  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
  marginBottom: 0,
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
  fontSize: 20,
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
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
};
const labelStyle = { fontSize: 10, fontWeight: 400 };
const navButtonStyle = {
  background: '#0B405B',
  color: '#fff',
  border: 'none',
  borderRadius: 2,
  fontWeight: 400,
  fontSize: 10,
  padding: '6px 18px',
  cursor: 'pointer',
  alignSelf: 'flex-end',
  transition: 'background 0.18s, color 0.18s',
};

function BasicInfo({ form, onChange, onNext, onPrev }) {
  return (
    <>
      <div style={sectionHeaderStyle}>Stage 1: Basic Information</div>
      <div style={sectionBodyStyle}>
        <div style={rowStyle}>
          <div style={colStyle}>
            <BasicTextInput label={<span style={labelStyle}>First Name</span>} name="firstName" placeholder="First Name" value={form.firstName} onChange={onChange} icon={<FaUser />} />
          </div>
          <div style={colStyle}>
            <BasicTextInput label={<span style={labelStyle}>Middle Name</span>} name="middleName" placeholder="Middle Name" value={form.middleName} onChange={onChange} icon={<FaUser />} />
          </div>
        </div>
        <div style={rowStyle}>
          <div style={colStyle}>
            <BasicTextInput label={<span style={labelStyle}>Last Name</span>} name="lastName" placeholder="Last Name" value={form.lastName} onChange={onChange} icon={<FaUser />} />
          </div>
          <div style={colStyle}>
            <DateInput label={<span style={labelStyle}>Date of Birth</span>} name="dob" value={form.dob} onChange={onChange} icon={<FaCalendar />} />
          </div>
        </div>
        <div style={rowStyle}>
          <div style={colStyle}>
            {/* Make gender label always visible and more prominent */}
            <div style={{ marginBottom: -11 }}>
              <span style={{ ...labelStyle, color: '#0B405B', fontWeight: 400 }}>Gender</span>
            </div>
            <select
              id="gender-select"
              name="gender"
              value={form.gender}
              onChange={onChange}
              style={{
                width: '100%',
                height: 30,
                border: '0.5px solid #000',
                borderRadius: 2,
                fontFamily: 'Lexend, Arial, sans-serif',
                fontWeight: 300,
                fontSize: 8.5,
                color: form.gender ? '#222' : '#888',
                padding: '0 10px',
                background: '#fff',
                outline: 'none',
                boxSizing: 'border-box',
                appearance: 'none',
              }}
            >
              <option value="" disabled>
                Select Gender
              </option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div style={colStyle}>
            <BasicTextInput label={<span style={labelStyle}>Nationality</span>} name="nationality" placeholder="Nationality" value={form.nationality} onChange={onChange} icon={<FaFlag />} />
          </div>
        </div>
        <div style={rowStyle}>
          <div style={colStyle}>
            <BasicTextInput label={<span style={labelStyle}>Phone Number</span>} name="phone" placeholder="Phone Number" value={form.phone} onChange={onChange} />
          </div>
          <div style={colStyle}>
            <BasicTextInput label={<span style={labelStyle}>Email</span>} name="email" placeholder="Email" value={form.email} onChange={onChange} icon={<FaEnvelope />} />
          </div>
        </div>
        {/* Address Fields - styled like CompleteProfile */}
        <div style={{ width: 568, maxWidth: '95vw', display: 'flex', flexDirection: 'column', gap: 26 }}>
          <BasicTextInput name="address1" label={<span style={labelStyle}>Address Line 1</span>} placeholder="Address Line 1" value={form.address1} onChange={onChange} icon={<FaHome />} style={{ width: 570, fontSize: 15, padding: '12px 16px', borderRadius: 2, border: '1px solid #000', boxSizing: 'border-box' }} />
          <BasicTextInput name="address2" label={<span style={labelStyle}>Address Line 2</span>} placeholder="Address Line 2" value={form.address2} onChange={onChange} icon={<FaHome />} style={{ width: 570, fontSize: 15, padding: '12px 16px', borderRadius: 2, border: '1px solid #000', boxSizing: 'border-box' }} />
          <BasicTextInput name="address3" label={<span style={labelStyle}>Address Line 3</span>} placeholder="Address Line 3" value={form.address3} onChange={onChange} icon={<FaHome />} style={{ width: 570, fontSize: 15, padding: '12px 16px', borderRadius: 2, border: '1px solid #000', boxSizing: 'border-box' }} />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '270px 270px', gap: 24, justifyContent: 'center', width: 564, maxWidth: '95vw' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 26 }}>
            <BasicTextInput name="city" label={<span style={labelStyle}>City</span>} placeholder="City" value={form.city} onChange={onChange} icon={<FaHome />} style={{ width: '100%' }} />
            <BasicTextInput name="state" label={<span style={labelStyle}>State</span>} placeholder="State" value={form.state} onChange={onChange} icon={<FaHome />} style={{ width: '100%' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 26 }}>
            <BasicTextInput name="district" label={<span style={labelStyle}>District</span>} placeholder="District" value={form.district} onChange={onChange} icon={<FaHome />} style={{ width: '100%' }} />
            <BasicTextInput name="country" label={<span style={labelStyle}>Country</span>} placeholder="Country" value={form.country} onChange={onChange} icon={<FaHome />} style={{ width: '100%' }} />
          </div>
        </div>
      </div>
    </>
  );
}

export default BasicInfo; 