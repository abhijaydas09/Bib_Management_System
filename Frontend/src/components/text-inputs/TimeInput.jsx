import React, { useState } from 'react';
import './TimeInput.css';

function TimeInput({
  label,
  placeholder = 'Placeholder',
  value,
  onChange,
  disabled = false,
  ...props
}) {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className={`timeinput-wrapper${isActive ? ' active' : ''}${disabled ? ' disabled' : ''}`}> 
      <label className="timeinput-label">{label}</label>
      <div className="timeinput-field-group">
        <input
          className="timeinput-input"
          type="time"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onFocus={() => setIsActive(true)}
          onBlur={() => setIsActive(false)}
          disabled={disabled}
          {...props}
        />
        <span className="timeinput-clock">
          <svg width="16" height="16" viewBox="0 0 30 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
        </span>
      </div>
    </div>
  );
}

export default TimeInput; 