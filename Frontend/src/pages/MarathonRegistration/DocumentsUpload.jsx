import React, { useRef } from 'react';
import { FaUpload } from 'react-icons/fa';
import BasicTextInput from '../../components/text-inputs/BasicTextInput';
import DropdownInput from '../../components/text-inputs/DropdownInput';

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
const uploadBtnStyle = {
  background: 'rgba(16, 153, 96, 0.3)',
  color: '#109960',
  border: 'none',
  fontWeight: 300,
  fontSize: 10,
  padding: '2px 6px',
  cursor: 'pointer',
  borderRadius: 16,
  marginTop: 8,
  marginBottom: 0,
  display: 'block',
};
const uploadInputWrapper = {
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  gap: 0,
};
const uploadIconBtn = {
  background: 'none',
  border: 'none',
  color: '#0B405B',
  fontSize: 22,
  cursor: 'pointer',
  height: 40,
  width: 40,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginLeft: -40,
  zIndex: 2,
};

const kitSizes = ['Select Size', 'XS', 'S', 'M', 'L', 'XL', 'XXL'];
const kitSizeOptions = kitSizes.map(size => ({ label: size, value: size === 'Select Size' ? '' : size }));

function DocumentsUpload({ requiredDocuments, setRequiredDocuments, kitSize, setKitSize, consentForm, setConsentForm }) {
  // Refs for file inputs
  const fileInputRefs = [useRef(), useRef()];
  const consentInputRef = useRef();

  const handleDocFileChange = (idx, e) => {
    const file = e.target.files[0];
    setRequiredDocuments((prev) => prev.map((doc, i) => i === idx ? { ...doc, file } : doc));
  };
  const handleConsentFileChange = (e) => {
    setConsentForm(e.target.files[0]);
  };
  const handleDocUpload = (idx) => {
    const doc = requiredDocuments[idx];
    if (doc.file) {
      // Replace this with actual upload/save logic
      alert(`Document ${idx + 1} uploaded: ${doc.file.name}`);
    } else {
      alert('Please select a file first.');
    }
  };
  const handleConsentUpload = () => {
    if (consentForm) {
      // Replace this with actual upload/save logic
      alert(`Consent form uploaded: ${consentForm.name}`);
    } else {
      alert('Please select a file first.');
    }
  };

  return (
    <>
      <div style={headerStyle}>Stage 5: Documents</div>
      <div style={{ padding: '24px 32px', width: '100%' }}>
        {/* Required Documents */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ color: '#0B405B', fontWeight: 400, fontSize: 12, marginBottom: 12 }}>Required Documents</div>
          <div style={{ display: 'grid', gridTemplateColumns: '270px 270px', gap: 24 }}>
            {requiredDocuments.map((doc, idx) => (
              <div key={idx}>
                <div style={uploadInputWrapper}>
                  <BasicTextInput
                    name={`document${idx}`}
                    label={undefined}
                    placeholder={`Document ${idx + 1}`}
                    value={doc.file ? doc.file.name : ''}
                    readOnly
                    icon={<FaUpload />}
                    style={{ width: '100%', cursor: 'pointer', background: '#fff' }}
                    onClick={() => fileInputRefs[idx].current.click()}
                  />
                  <input
                    type="file"
                    ref={fileInputRefs[idx]}
                    style={{ display: 'none' }}
                    onChange={(e) => handleDocFileChange(idx, e)}
                  />
                </div>
                <button
                  type="button"
                  style={uploadBtnStyle}
                  onClick={() => handleDocUpload(idx)}
                >
                  Upload Document
                </button>
              </div>
            ))}
          </div>
        </div>
        {/* Kit Sizes */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ color: '#0B405B', fontWeight: 400, fontSize: 12, marginBottom: 12 }}>Kit Sizes</div>
          <DropdownInput
            value={kitSize}
            onChange={e => setKitSize(e.target.value)}
            options={kitSizeOptions}
            placeholder="Select Size"
            style={{ width: '100%', maxWidth: 400 }}
          />
        </div>
        {/* Consent Form */}
        <div style={{ marginBottom: 32 }}>
          <div style={{ color: '#0B405B', fontWeight: 400, fontSize: 12, marginBottom: 12 }}>
            Consent Form (<a href="#" style={{ color: '#109960', textDecoration: 'underline', fontWeight: 400 }}>Download</a>)
          </div>
          <div style={uploadInputWrapper}>
            <BasicTextInput
              name="consentForm"
              label={undefined}
              placeholder="Upload here!"
              value={consentForm ? consentForm.name : ''}
              readOnly
              icon={<FaUpload />}
              style={{ width: '100%', cursor: 'pointer', background: '#fff' }}
              onClick={() => consentInputRef.current.click()}
            />
            <input
              type="file"
              ref={consentInputRef}
              style={{ display: 'none' }}
              onChange={handleConsentFileChange}
            />
          </div>
          <button
            type="button"
            style={uploadBtnStyle}
            onClick={handleConsentUpload}
          >
            Upload Document
          </button>
        </div>
      </div>
    </>
  );
}

export default DocumentsUpload; 