import React from 'react';
import BasicTextInput from '../../components/text-inputs/BasicTextInput';
import { FaDollarSign, FaUpload } from 'react-icons/fa';
import { FaTrash } from 'react-icons/fa';

// Styles omitted for brevity (same as before)
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
const labelStyle = { fontSize: 10, fontWeight: 400, color: '#0B405B', marginBottom: 0 };
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
const saveButtonStyle = {
  background: '#B6F2D6',
  color: '#2B7A4B',
  border: 'none',
  borderRadius: 16,
  padding: '2px 5px',
  fontWeight: 300,
  fontSize: 10,
  cursor: 'pointer',
  marginTop: 0,
  marginBottom: 0,
  alignSelf: 'flex-end',
  transition: 'background 0.18s, color 0.18s',
};
const submitButtonStyle = {
  background: '#0B405B',
  color: '#fff',
  border: 'none',
  borderRadius: 2,
  fontWeight: 400,
  fontSize: 10,
  padding: '6px 18px',
  cursor: 'pointer',
  transition: 'background 0.18s, color 0.18s',
};

/**
 * Where is the saved information?
 * 
 * The saved sponsor information is stored in the `sponsors` array prop.
 * When you click "Save Details", the current form values are expected to be added to the `sponsors` array
 * (this logic is handled by the parent component, not here).
 * 
 * When showForm is false, the component displays the saved sponsors from the `sponsors` array.
 * 
 * So, the saved information is in the `sponsors` prop, which is managed by the parent.
 */

function SponsorDetails({
  form,
  onChange,
  onPrev,
  onSave,
  onLogoChange,
  sponsors = [],
  showForm = true,
  onAddSponsor,
  onRemoveSponsor
}) {
  return (
    <>
      <div style={cardStyle}>
        <div style={sectionHeaderStyle}>
          <span style={{ color: '#0B405B', fontWeight: 400, fontSize: 16 }}>
            Stage 6: Sponsor Details
          </span>
        </div>
        <div style={sectionBodyStyle}>
          {/* Always show the summary of saved sponsors */}
          {sponsors.length === 0 && (
            <div style={{ color: '#B00020', fontSize: 13, marginBottom: 8 }}>
              No sponsors have been saved yet.
            </div>
          )}
          {sponsors.map((s, idx) => (
            <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: 24, marginBottom: 12 }}>
              <div style={{ flex: 2 }}>
                <div style={{ color: '#0B405B', fontWeight: 600, fontSize: 14, marginBottom: 2 }}>
                  Sponsor {idx + 1}
                </div>
                {/* Sponsor name and title on a single line */}
                <div style={{ display: 'flex', gap: 24, alignItems: 'center', marginBottom: 8 }}>
                  <div>
                    <div style={{ color: '#0B405B', fontWeight: 400, fontSize: 12, display: 'inline', marginRight: 8 }}>Sponsor name:</div>
                    <span style={{ color: '#444', fontWeight: 400, fontSize: 13, marginRight: 24 }}>{s.sponsorName}</span>
                  </div>
                  <div>
                    <div style={{ color: '#0B405B', fontWeight: 400, fontSize: 12, display: 'inline', marginRight: 8 }}>Sponsor Title:</div>
                    <span style={{ color: '#444', fontWeight: 400, fontSize: 13 }}>{s.sponsorTitle}</span>
                  </div>
                </div>
                {/* Sponsor logo below */}
                <div>
                  <div style={{ color: '#0B405B', fontWeight: 400, fontSize: 12, marginTop: 0 }}>Sponsor Logo:</div>
                  <div style={{ color: '#444', fontWeight: 400, fontSize: 13 }}>{s.sponsorLogoName}</div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => onRemoveSponsor(idx)}
                style={{
                  background: 'none',
                  color: '#B00020',
                  border: 'none',
                  borderRadius: '50%',
                  width: 16,
                  height: 16,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  marginRight: 4,
                  padding: 0,
                }}
                aria-label="Delete Sponsor"
              >
                <FaTrash size={16} />
              </button>
            </div>
          ))}
          {/* Show the input form for a new sponsor if showForm is true */}
          {showForm && (
            <>
              <div style={{ ...labelStyle, fontSize: 12, marginBottom: 0 }}>
                Sponsor {sponsors.length + 1}
              </div>
              <div style={rowStyle}>
                <div style={colStyle}>
                  <label style={{ ...labelStyle, marginBottom: -8 }}>Sponsor Name</label>
                  <BasicTextInput
                    name="sponsorName"
                    placeholder="Sponsor Name."
                    value={form.sponsorName}
                    onChange={onChange}
                    icon={<FaDollarSign />}
                  />
                </div>
                <div style={colStyle}>
                  <label style={{ ...labelStyle, marginBottom: -8 }}>Sponsor Title</label>
                  <BasicTextInput
                    name="sponsorTitle"
                    placeholder="Sponsor Title"
                    value={form.sponsorTitle}
                    onChange={onChange}
                  />
                </div>
              </div>
              <div style={rowStyle}>
                <div style={{ ...colStyle, maxWidth: 400 }}>
                  <label style={{ ...labelStyle, marginBottom: -8 }}>Sponsor Logo</label>
                  <div style={{ position: 'relative', width: '100%' }}>
                    <input
                      type="file"
                      accept="image/*"
                      id="sponsorLogoUpload"
                      style={{ display: 'none' }}
                      onChange={onLogoChange}
                    />
                    <BasicTextInput
                      name="sponsorLogo"
                      placeholder="Sponsor Logo"
                      value={form.sponsorLogoName || ''}
                      icon={<FaUpload />}
                      readOnly
                      onClick={() => document.getElementById('sponsorLogoUpload').click()}
                      style={{ cursor: 'pointer', background: '#fff' }}
                    />
                    {form.sponsorLogoPreview && (
                      <img
                        src={form.sponsorLogoPreview}
                        alt="Sponsor Logo Preview"
                        style={{ marginTop: 8, maxHeight: 60, borderRadius: 4 }}
                      />
                    )}
                  </div>
                </div>
              </div>
              {/* Save Details button below the input fields in the box */}
              <div
                style={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                  flexDirection: 'row',
                  gap: 12,
                  marginTop: 0,
                  marginBottom: 0,
                }}
              >
                <button
                  type="button"
                  onClick={onSave}
                  style={saveButtonStyle}
                >
                  Save Details
                </button>
              </div>
            </>
          )}
          {/* Add Sponsor button only if form is closed */}
          {!showForm && (
            <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end', marginTop: 8 }}>
              <button
                type="button"
                onClick={onAddSponsor}
                style={saveButtonStyle}
              >
                Add Sponsor
              </button>
            </div>
          )}
        </div>
      </div>
      {/* Prev and Submit buttons centered below the box */}
      <div
        style={{
          width: cardStyle.minWidth,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
          gap: 12,
          marginTop: 0,
          marginBottom: 32,
        }}
      >
        {onPrev && (
          <button
            type="button"
            onClick={onPrev}
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
        {/* Only show Submit if there is at least one sponsor and form is closed */}
        {sponsors.length > 0 && !showForm && (
          <button
            type="button"
            onClick={onSave}
            style={submitButtonStyle}
          >
            Submit
          </button>
        )}
      </div>
    </>
  );
}

export default SponsorDetails;