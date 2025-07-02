import React from 'react';
import './Toast.css';

const icons = {
  info: (
    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="8"/></svg>
  ),
  success: (
    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M9 12l2 2l4-4"/></svg>
  ),
  error: (
    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
  ),
  warning: (
    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12" y2="16"/></svg>
  ),
  neutral: (
    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/></svg>
  ),
};

const bgVars = {
  info: 'var(--toast-info-bg, #3a4651)',
  success: 'var(--toast-success-bg, #1dbf73)',
  error: 'var(--toast-error-bg, #e74c3c)',
  warning: 'var(--toast-warning-bg, #f39c12)',
  neutral: 'var(--toast-neutral-bg, #3498db)',
};

function Toast({
  type = 'info',
  content = <span>Placeholder text for <b>toast</b></span>,
  actionLabel = 'Button',
  onAction,
  onDismiss,
}) {
  return (
    <div className="toast-body" style={{ background: bgVars[type] }}>
      <span className="toast-icon">{icons[type]}</span>
      <span className="toast-content">{content}</span>
      {onAction && (
        <button className="toast-action" onClick={onAction}>{actionLabel}</button>
      )}
      <button className="toast-dismiss" onClick={onDismiss} aria-label="Dismiss">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2"><line x1="6" y1="6" x2="14" y2="14"/><line x1="14" y1="6" x2="6" y2="14"/></svg>
      </button>
    </div>
  );
}

export default Toast; 