import React from 'react';
import BasicTextInput from '../../components/text-inputs/BasicTextInput';
import { FaExclamationCircle, FaShieldAlt, FaQuestionCircle } from 'react-icons/fa';

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
const addBtnStyle = {
  background: 'rgba(16, 153, 96, 0.3)',
  color: '#109960',
  border: 'none',
  fontWeight: 300,
  fontSize: 10,
  padding: '2px 6px',
  cursor: 'pointer',
  marginLeft: 8,
  marginTop: 4,
  borderRadius: 2,
};
const addBtnContainerStyle = { marginTop: 8, display: 'flex', justifyContent: 'flex-end' };

function HealthFitness({ medicalConditions, setMedicalConditions, allergies, setAllergies, medications, setMedications, bloodGroup, setBloodGroup }) {
  const handleChange = (setter, idx, e) => {
    const { value } = e.target;
    setter((prev) => prev.map((item, i) => (i === idx ? value : item)));
  };
  const handleAdd = (setter) => {
    setter((prev) => [...prev, '']);
  };

  return (
    <>
      <div style={headerStyle}>Stage 4: Health & Fitness</div>
      <div style={{ padding: '24px 32px', width: '100%' }}>
        {/* Medical Conditions & Allergies */}
        <div style={{ marginBottom: 32 }}>
          <div style={{ color: '#0B405B', fontWeight: 400, fontSize: 12, marginBottom: 12 }}>Any Medical Conditions or Allergies</div>
          <div style={{ display: 'grid', gridTemplateColumns: '270px 270px', gap: 24 }}>
            {/* Medical Conditions */}
            <div>
              {medicalConditions.map((cond, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'flex-end', gap: 8, marginBottom: 0 }}>
                  <BasicTextInput
                    name={`medicalCondition${idx}`}
                    label={idx === 0 ? <span style={labelStyle}>Medical Condition</span> : undefined}
                    placeholder="Medical Condition"
                    value={cond}
                    onChange={(e) => handleChange(setMedicalConditions, idx, e)}
                    icon={<FaExclamationCircle />}
                  />
                </div>
              ))}
              <div style={addBtnContainerStyle}>
                <button
                  type="button"
                  style={addBtnStyle}
                  onClick={() => handleAdd(setMedicalConditions)}
                >
                  + Add
                </button>
              </div>
            </div>
            {/* Allergies */}
            <div>
              {allergies.map((allergy, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'flex-end', gap: 8, marginBottom: 0 }}>
                  <BasicTextInput
                    name={`allergy${idx}`}
                    label={idx === 0 ? <span style={labelStyle}>Allergy</span> : undefined}
                    placeholder="Allergy"
                    value={allergy}
                    onChange={(e) => handleChange(setAllergies, idx, e)}
                    icon={<FaExclamationCircle />}
                  />
                </div>
              ))}
              <div style={addBtnContainerStyle}>
                <button
                  type="button"
                  style={addBtnStyle}
                  onClick={() => handleAdd(setAllergies)}
                >
                  + Add
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* Medications */}
        <div style={{ marginBottom: 32 }}>
          <div style={{ color: '#0B405B', fontWeight: 400, fontSize: 12, marginBottom: 12 }}>Current Medications</div>
          <div style={{ width: 270 }}>
            {medications.map((med, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'flex-end', gap: 8, marginBottom: 0 }}>
                <BasicTextInput
                  name={`medication${idx}`}
                  label={idx === 0 ? <span style={labelStyle}>Current Medications</span> : undefined}
                  placeholder="Current Medications"
                  value={med}
                  onChange={(e) => handleChange(setMedications, idx, e)}
                  icon={<FaShieldAlt />}
                />
              </div>
            ))}
            <div style={addBtnContainerStyle}>
              <button
                type="button"
                style={addBtnStyle}
                onClick={() => handleAdd(setMedications)}
              >
                + Add
              </button>
            </div>
          </div>
        </div>
        {/* Blood Group */}
        <div style={{ marginBottom: 32 }}>
          <div style={{ color: '#0B405B', fontWeight: 400, fontSize: 12, marginBottom: 12 }}>Blood Group</div>
          <div style={{ width: 270 }}>
            <BasicTextInput
              name="bloodGroup"
              label={<span style={labelStyle}>Blood Group</span>}
              placeholder="Blood Group"
              value={bloodGroup}
              onChange={e => setBloodGroup(e.target.value)}
              icon={<FaQuestionCircle />}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default HealthFitness; 