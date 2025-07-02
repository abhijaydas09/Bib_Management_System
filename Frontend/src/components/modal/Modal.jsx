import React from 'react';
import './Modal.css';

export default function Modal({
  open,
  onClose,
  leading,
  title,
  counter,
  trailing,
  label,
  subtitle,
  children,
  primaryAction,
  secondaryAction,
}) {
  if (!open) return null;
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-root" onClick={e => e.stopPropagation()}>
        <header className="modal-header">
          {leading && <span className="modal-leading">{leading}</span>}
          <div className="modal-title-group">
            <span className="modal-title">{title}</span>
            {counter !== undefined && <span className="modal-counter">{counter}</span>}
          </div>
          {label && <span className="modal-label">{label}</span>}
          <div className="modal-trailing">{trailing}</div>
          <button className="modal-close" aria-label="Close" onClick={onClose}>
            ×
          </button>
        </header>
        {subtitle && <div className="modal-subtitle">{subtitle}</div>}
        <hr className="modal-divider" />
        <div className="modal-body-outer">
          <div className="modal-body-box">
            {children}
          </div>
        </div>
        <hr className="modal-divider" />
        <footer className="modal-footer">
          {secondaryAction && (
            <button className="modal-btn modal-btn-secondary" onClick={secondaryAction.onClick}>
              {secondaryAction.label}
            </button>
          )}
          {primaryAction && (
            <button className="modal-btn modal-btn-primary" onClick={primaryAction.onClick}>
              {primaryAction.label}
            </button>
          )}
        </footer>
      </div>
    </div>
  );
} 