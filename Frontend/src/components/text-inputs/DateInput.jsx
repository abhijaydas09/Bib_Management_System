import React, { useState } from 'react';
import './DateInput.css';

function DateInput({
  label,
  placeholder = 'Placeholder',
  value,
  onChange,
  disabled = false,
  ...props
}) {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className={`dateinput-wrapper${isActive ? ' active' : ''}${disabled ? ' disabled' : ''}`}> 
      <label className="dateinput-label">{label}</label>
      <div className="dateinput-field-group">
        <input
          className="dateinput-input"
          type="date"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onFocus={() => setIsActive(true)}
          onBlur={() => setIsActive(false)}
          disabled={disabled}
          {...props}
        />
        <span className="dateinput-calendar">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
        </span>
      </div>
    </div>
  );
}

export default DateInput; 