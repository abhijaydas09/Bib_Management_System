import React from 'react';
import './DropdownInput.css';

function DropdownInput({
  label,
  options = [],
  value,
  onChange,
  disabled = false,
  error = '',
  isActive = false,
  multiple = false,
  placeholder = 'Choose an option',
}) {
  return (
    <div className="dropdowninput-wrapper">
      {label && <label className="dropdowninput-label">{label}</label>}
      <div className="dropdowninput-field-group">
        <select
          className="dropdowninput-select"
          value={value}
          onChange={onChange}
          disabled={disabled}
          multiple={multiple}
        >
          {!multiple && <option value="" disabled>{placeholder}</option>}
          {options.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
        <span className="dropdowninput-arrow">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
        </span>
      </div>
      {error && <div className="dropdowninput-error">{error}</div>}
    </div>
  );
}

export default DropdownInput; 