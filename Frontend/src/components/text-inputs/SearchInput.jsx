import React, { useState } from 'react';
import './SearchInput.css';

function SearchInput({
  placeholder = 'Search',
  value,
  onChange,
  onSearch,
  disabled = false,
  ...props
}) {
  const [isActive, setIsActive] = useState(false);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && onSearch) {
      onSearch(value);
    }
  };

  return (
    <div className={`searchinput-wrapper${isActive ? ' active' : ''}${disabled ? ' disabled' : ''}`}> 
      <input
        className="searchinput-input"
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onFocus={() => setIsActive(true)}
        onBlur={() => setIsActive(false)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        {...props}
      />
      <button
        className="searchinput-btn"
        type="button"
        onClick={() => onSearch && onSearch(value)}
        disabled={disabled}
        tabIndex={-1}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
      </button>
    </div>
  );
}

export default SearchInput; 