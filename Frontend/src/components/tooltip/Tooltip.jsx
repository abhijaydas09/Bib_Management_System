import React, { useState } from 'react';
import './Tooltip.css';

function Tooltip({ heading, children, body, placement = 'top' }) {
  const [visible, setVisible] = useState(false);

  return (
    <div
      className="tooltip-trigger"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onFocus={() => setVisible(true)}
      onBlur={() => setVisible(false)}
      tabIndex={0}
      style={{ display: 'inline-block', position: 'relative' }}
    >
      {children}
      {visible && (
        <div className={`tooltip-box tooltip-${placement}`}>
          <div className="tooltip-heading">{heading}</div>
          <div className="tooltip-body">{body}</div>
          <div className="tooltip-arrow" />
        </div>
      )}
    </div>
  );
}

export default Tooltip; 