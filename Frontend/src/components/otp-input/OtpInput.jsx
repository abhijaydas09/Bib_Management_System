import React, { useRef } from 'react';
import './OtpInput.css';

function OtpInput({
  label = 'Label',
  helpText = 'Help text',
  length = 6,
  value = '',
  onChange,
}) {
  const inputs = Array.from({ length });
  const inputRefs = useRef([]);

  const handleChange = (e, idx) => {
    const val = e.target.value.replace(/[^0-9]/g, '');
    let newValue = value.split('');
    newValue[idx] = val;
    newValue = newValue.join('').padEnd(length, '');
    onChange(newValue);
    if (val && idx < length - 1) {
      inputRefs.current[idx + 1].focus();
    }
  };

  const handleKeyDown = (e, idx) => {
    if (e.key === 'Backspace' && !value[idx] && idx > 0) {
      inputRefs.current[idx - 1].focus();
    }
  };

  return (
    <div className="otpinput-wrapper">
      <label className="otpinput-label">{label}</label>
      <div className="otpinput-boxes">
        {inputs.map((_, idx) => (
          <input
            key={idx}
            ref={el => (inputRefs.current[idx] = el)}
            className="otpinput-box"
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={value[idx] || ''}
            onChange={e => handleChange(e, idx)}
            onKeyDown={e => handleKeyDown(e, idx)}
            autoFocus={idx === 0}
          />
        ))}
      </div>
      <div className="otpinput-help">{helpText}</div>
    </div>
  );
}

export default OtpInput; 