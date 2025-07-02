import React from 'react';
import './BasicTextInput.css';

function TextInput({
  label,
  placeholder,
  value,
  onChange,
  disabled = false,
  error = '',
  onFocus,
  onBlur,
  isActive = false,
  ...props
}) {
  return (
    <div className={`textinput-wrapper${disabled ? ' disabled' : ''}${error ? ' error' : ''}${isActive ? ' active' : ''}`}> 
      <label className="textinput-label">{label}</label>
      <input
        className="textinput-input"
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        onFocus={onFocus}
        onBlur={onBlur}
        {...props}
      />
      {error && <div className="textinput-error">{error}</div>}
    </div>
  );
}

export default TextInput; 