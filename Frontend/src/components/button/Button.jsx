import React from 'react';
import './Button.css';

function Button({
  children,
  leadingIcon,
  trailingIcon,
  onClick,
  disabled = false,
  loading = false,
  skeleton = false,
  ...props
}) {
  return (
    <button
      className={`custom-btn${disabled ? ' disabled' : ''}${loading ? ' loading' : ''}${skeleton ? ' skeleton' : ''}`}
      onClick={onClick}
      disabled={disabled || loading || skeleton}
      {...props}
    >
      {loading ? (
        <span className="btn-spinner" />
      ) : (
        <>
          {leadingIcon && <span className="btn-icon leading">{leadingIcon}</span>}
          <span className="btn-label">{children}</span>
          {trailingIcon && <span className="btn-icon trailing">{trailingIcon}</span>}
        </>
      )}
    </button>
  );
}

export default Button; 