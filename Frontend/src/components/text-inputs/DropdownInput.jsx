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
  ...props
}) {
  return (
    <div className={`dropdowninput-wrapper${disabled ? ' disabled' : ''}${error ? ' error' : ''}${isActive ? ' active' : ''}`}> 
      <label className="dropdowninput-label">{label}</label>
      <div className="dropdowninput-field-group">
        <select
          className="dropdowninput-select"
          value={value}
          onChange={onChange}
          disabled={disabled}
          multiple={multiple}
          {...props}
        >
          {!multiple && <option value="" disabled>{placeholder}</option>}
          {options.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
        <span className="dropdowninput-arrow">▼</span>
      </div>
      {error && <div className="dropdowninput-error">{error}</div>}
    </div>
  );
}

export default DropdownInput; 