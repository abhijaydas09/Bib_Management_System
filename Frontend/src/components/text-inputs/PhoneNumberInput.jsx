import React from 'react';
import './PhoneNumberInput.css';

function PhoneNumberInput({
  label,
  placeholder,
  value,
  onChange,
  countryCode = '+1',
  onCountryChange,
  disabled = false,
  error = '',
  isActive = false,
  countryOptions = ['+1', '+91', '+44'],
  ...props
}) {
  return (
    <div className={`phoneinput-wrapper${disabled ? ' disabled' : ''}${error ? ' error' : ''}${isActive ? ' active' : ''}`}> 
      <label className="phoneinput-label">{label}</label>
      <div className="phoneinput-field-group">
        <select
          className="phoneinput-country"
          value={countryCode}
          onChange={onCountryChange}
          disabled={disabled}
        >
          {countryOptions.map(opt => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
        <input
          className="phoneinput-input"
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          {...props}
        />
      </div>
      {error && <div className="phoneinput-error">{error}</div>}
    </div>
  );
}

export default PhoneNumberInput; 