import React from 'react';
import './LoadingSpinner.css';

function LoadingSpinner({ message = 'Loading...' }) {
  return (
    <div className="loading-spinner-container">
      <div className="loading-spinner" />
      <div className="loading-message">{message}</div>
    </div>
  );
}

export default LoadingSpinner; 