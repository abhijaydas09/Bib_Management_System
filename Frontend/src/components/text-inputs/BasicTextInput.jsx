import React from 'react';
import './BasicTextInput.css';

function BasicTextInput({
  label,
  placeholder,
  value,
  onChange,
  type = 'text',
  disabled = false,
  error = '',
  ...rest
}) {
  return (
    <div className="basic-textinput-wrapper">
      {label && <label className="basic-textinput-label">{label}</label>}
      <input
        className="basic-textinput-input"
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        {...rest}
      />
      {error && <div className="basic-textinput-error">{error}</div>}
    </div>
  );
}

export default BasicTextInput; 