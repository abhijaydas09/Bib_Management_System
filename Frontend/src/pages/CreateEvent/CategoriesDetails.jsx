import React from 'react';
import BasicTextInput from '../../components/text-inputs/BasicTextInput';
import { FaList, FaRegCircle, FaClock, FaTrash } from 'react-icons/fa';

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
const navButtonStyle = {
  background: '#EDF0F3',
  color: '#0B405B',
  borderRadius: 2,
  fontWeight: 400,
  fontSize: 10,
  padding: '6px 8px',
  cursor: 'pointer',
  marginRight: 0,
  border: 'none',
  transition: 'background 0.18s, color 0.18s',
};
// New style for Next button
const nextButtonStyle = {
  background: '#0B405B',
  color: '#fff',
  borderRadius: 2,
  fontWeight: 400,
  fontSize: 10,
  padding: '6px 8px',
  cursor: 'pointer',
  marginRight: 0,
  border: 'none',
  transition: 'background 0.18s, color 0.18s',
};

function CategoriesDetails({
  form,
  onChange,
  onPrev,
  onSave,
  categories = [],
  showForm = true,
  onAddCategory,
  onRemoveCategory,
  onNext // <-- add onNext prop for Next button
}) {
  return (
    <>
      <div style={cardStyle}>
        <div style={sectionHeaderStyle}>
          <span style={{ color: '#0B405B', fontWeight: 400, fontSize: 16 }}>
            Stage 3: Categories
          </span>
        </div>
        <div style={sectionBodyStyle}>
          {/* Always show the summary of saved categories */}
          {categories.length === 0 && (
            <div style={{ color: '#B00020', fontSize: 13, marginBottom: 8 }}>
              No categories have been saved yet.
            </div>
          )}
          {categories.map((c, idx) => (
            <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: 24, marginBottom: 12 }}>
              <div style={{ flex: 2 }}>
                <div style={{ color: '#0B405B', fontWeight: 600, fontSize: 14, marginBottom: 2 }}>
                  Category {idx + 1}
                </div>
                <div style={{ display: 'flex', gap: 24, alignItems: 'center', marginBottom: 8 }}>
                  <div>
                    <div style={{ color: '#0B405B', fontWeight: 400, fontSize: 12, display: 'inline', marginRight: 8 }}>Category name:</div>
                    <span style={{ color: '#444', fontWeight: 400, fontSize: 13, marginRight: 24 }}>{c.categoryName}</span>
                  </div>
                  <div>
                    <div style={{ color: '#0B405B', fontWeight: 400, fontSize: 12, display: 'inline', marginRight: 8 }}>Distance:</div>
                    <span style={{ color: '#444', fontWeight: 400, fontSize: 13 }}>{c.distance}</span>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 24, alignItems: 'center', marginBottom: 8 }}>
                  <div>
                    <div style={{ color: '#0B405B', fontWeight: 400, fontSize: 12, display: 'inline', marginRight: 8 }}>Start time:</div>
                    <span style={{ color: '#444', fontWeight: 400, fontSize: 13, marginRight: 24 }}>{c.startTime}</span>
                  </div>
                  <div>
                    <div style={{ color: '#0B405B', fontWeight: 400, fontSize: 12, display: 'inline', marginRight: 8 }}>Min Age:</div>
                    <span style={{ color: '#444', fontWeight: 400, fontSize: 13 }}>{c.minAge}</span>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 24, alignItems: 'center', marginBottom: 8 }}>
                  <div>
                    <div style={{ color: '#0B405B', fontWeight: 400, fontSize: 12, display: 'inline', marginRight: 8 }}>Max Age:</div>
                    <span style={{ color: '#444', fontWeight: 400, fontSize: 13, marginRight: 24 }}>{c.maxAge}</span>
                  </div>
                  <div>
                    <div style={{ color: '#0B405B', fontWeight: 400, fontSize: 12, display: 'inline', marginRight: 8 }}>Reg. Fees:</div>
                    <span style={{ color: '#444', fontWeight: 400, fontSize: 13 }}>{c.registrationFees}</span>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 24, alignItems: 'center', marginBottom: 8 }}>
                  <div>
                    <div style={{ color: '#0B405B', fontWeight: 400, fontSize: 12, display: 'inline', marginRight: 8 }}>Max Participants:</div>
                    <span style={{ color: '#444', fontWeight: 400, fontSize: 13 }}>{c.maxParticipants}</span>
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => onRemoveCategory(idx)}
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
                aria-label="Delete Category"
              >
                <FaTrash size={16} />
              </button>
            </div>
          ))}
          {/* Show the input form for a new category if showForm is true */}
          {showForm && (
            <>
              <div style={{ ...labelStyle, fontSize: 12, marginBottom: 0 }}>
                Category {categories.length + 1}
              </div>
              {/* Two column layout for all input fields */}
              <div style={rowStyle}>
                <div style={colStyle}>
                  <BasicTextInput
                    name="categoryName"
                    placeholder="Category name"
                    value={form.categoryName}
                    onChange={onChange}
                    icon={<FaList />}
                  />
                  <BasicTextInput
                    name="startTime"
                    placeholder="Start time"
                    value={form.startTime}
                    onChange={onChange}
                    icon={<FaClock />}
                  />
                  <BasicTextInput
                    name="maxAge"
                    placeholder="Maximum Age"
                    value={form.maxAge}
                    onChange={onChange}
                  />
                  <BasicTextInput
                    name="maxParticipants"
                    placeholder="Maximum Participants"
                    value={form.maxParticipants}
                    onChange={onChange}
                  />
                </div>
                <div style={colStyle}>
                  <BasicTextInput
                    name="distance"
                    placeholder="Distance"
                    value={form.distance}
                    onChange={onChange}
                    icon={<FaRegCircle />}
                  />
                  <BasicTextInput
                    name="minAge"
                    placeholder="Minimum Age"
                    value={form.minAge}
                    onChange={onChange}
                  />
                  <BasicTextInput
                    name="registrationFees"
                    placeholder="Registration Fees"
                    value={form.registrationFees}
                    onChange={onChange}
                  />
                  {/* Empty for alignment */}
                  <div style={{ height: 0 }} />
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
          {/* Add Category button only if form is closed */}
          {!showForm && (
            <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end', marginTop: 8 }}>
              <button
                type="button"
                onClick={onAddCategory}
                style={saveButtonStyle}
              >
                Add Category
              </button>
            </div>
          )}
        </div>
      </div>
      {/* Prev, Next, and Submit buttons centered below the box */}
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
            style={navButtonStyle}
          >
            Prev
          </button>
        )}
        {/* Only show Submit if there is at least one category and form is closed */}
        {categories.length > 0 && !showForm && (
          <button
            type="button"
            onClick={onSave}
            style={submitButtonStyle}
          >
            Submit
          </button>
        )}
        {/* Always show Next button if onNext is provided */}
        {onNext && (
          <button
            type="button"
            onClick={onNext}
            style={nextButtonStyle}
          >
            Next
          </button>
        )}
      </div>
    </>
  );
}

export default CategoriesDetails; 