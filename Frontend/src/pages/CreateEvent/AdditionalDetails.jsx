import React from 'react';
import BasicTextInput from '../../components/text-inputs/BasicTextInput';
import { FaRegFile, FaLink } from 'react-icons/fa';

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
  gap: 32,
};
const labelStyle = { fontSize: 10, fontWeight: 400, color: '#0B405B', marginBottom: 8 };
const addButtonStyle = {
  background: '#B6F2D6',
  color: '#2B7A4B',
  border: 'none',
  borderRadius: 8,
  padding: '2px 5px',
  fontWeight: 300,
  fontSize: 9,
  cursor: 'pointer',
  marginTop: 4,
  marginBottom: 0,
  alignSelf: 'flex-start',
  transition: 'background 0.18s, color 0.18s',
};

function AdditionalDetails({ form, onChange, onPrev, onNext, onAddDocument, onDocumentChange, onRemoveDocument }) {
  return (
    <>
      <div style={cardStyle}>
        <div style={sectionHeaderStyle}><span style={{color:'#0B405B', fontWeight:400, fontSize:16}}>Stage 5: Additional Details</span></div>
        <div style={sectionBodyStyle}>
          {/* Required Documents */}
          <div>
            <div style={labelStyle}>Required Documents</div>
            {form.documents.map((doc, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <BasicTextInput
                  name={`document_${idx}`}
                  placeholder={`Document ${idx + 1}`}
                  value={doc}
                  onChange={e => onDocumentChange(idx, e.target.value)}
                  icon={<FaRegFile />}
                  // No custom style: use normal dimensions
                />
                {form.documents.length > 1 && (
                  <button type="button" onClick={() => onRemoveDocument(idx)} style={{ color: '#B00020', background: 'none', border: 'none', fontSize: 18, cursor: 'pointer' }}>×</button>
                )}
              </div>
            ))}
            <button type="button" style={addButtonStyle} onClick={onAddDocument}>Add Document</button>
          </div>
          {/* Kit Sizes */}
          <div>
            <div style={labelStyle}>Kit Sizes</div>
            <BasicTextInput
              name="kitSize"
              placeholder="Size"
              value={form.kitSize}
              onChange={onChange}
            />
          </div>
          {/* Consent Form */}
          <div>
            <div style={labelStyle}>Consent Form</div>
            <BasicTextInput
              name="consentForm"
              placeholder="Add Link"
              value={form.consentForm}
              onChange={onChange}
              icon={<FaLink />}
            />
          </div>
          {/* Rules & Guidelines */}
          <div>
            <div style={labelStyle}>Rules & Guidelines</div>
            <BasicTextInput
              label={null}
              name="rules"
              placeholder="Rules & Guidelines"
              value={form.rules}
              onChange={onChange}
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
      </div>
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
        {onNext && (
          <button
            type="button"
            onClick={onNext}
            style={{
              background: '#0B405B',
              color: '#fff',
              border: 'none',
              borderRadius: 2,
              padding: '6px 8px',
              fontWeight: 400,
              fontSize: 10,
              cursor: 'pointer',
            }}
          >
            Next
          </button>
        )}
      </div>
    </>
  );
}

export default AdditionalDetails; 