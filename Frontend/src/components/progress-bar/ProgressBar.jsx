import React from 'react';
import './ProgressBar.css';

function ProgressBar({ label = 'Label', value = 50, max = 100 }) {
  const percent = Math.round((value / max) * 100);
  return (
    <div className="progressbar-root">
      <div className="progressbar-header">
        <span className="progressbar-label">{label}</span>
        <span className="progressbar-percent">{percent}%</span>
      </div>
      <div className="progressbar-container">
        <div
          className="progressbar-indicator"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}

export default ProgressBar; 