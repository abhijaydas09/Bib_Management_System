import React from 'react';
import './Toast.css';

// Button details are in Frontend/src/components/button/Button.jsx and Button.css
// The Toast component uses its own minimal button styles for the action and dismiss buttons.

const icons = {
  info: (
    <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="8"/></svg>
  ),
  success: (
    <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M9 12l2 2l4-4"/></svg>
  ),
  error: (
    <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
  ),
  warning: (
    <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12" y2="16"/></svg>
  ),
  neutral: (
    <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/></svg>
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
  // Button details: The action and dismiss buttons in this Toast use the .toast-action and .toast-dismiss classes,
  // which are defined in Toast.css. For a more detailed or reusable button, see Button.jsx and Button.css.
  return (
    <div
      className="toast-body"
      style={{
        background: bgVars[type],
        fontSize: '7px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '10px',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', flex: 1, minWidth: 0 }}>
        <span className="toast-icon">{icons[type]}</span>
        <span
          className="toast-content"
          style={{
            fontSize: '7px',
            fontWeight: 300,
            textAlign: 'left',
            flex: 1,
            minWidth: 0,
          }}
        >
          {content}
        </span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', marginLeft: 'auto', gap: '8px' }}>
        {onAction && (
          <button
            className="toast-action"
            onClick={onAction}
            style={{
              fontSize: '7px',
              fontWeight: 700,
              background: 'rgba(255,255,255,0.15)',
            }}
          >
            {actionLabel}
          </button>
        )}
        <button
          className="toast-dismiss"
          onClick={onDismiss}
          aria-label="Dismiss"
          style={{
            fontSize: '7px',
            background: 'rgba(255,255,255,0)',
            width: '29px',
            minWidth: '29px',
            maxWidth: '29px',
            padding: '2px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <svg width="14" height="14" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2"><line x1="6" y1="6" x2="14" y2="14"/><line x1="14" y1="6" x2="6" y2="14"/></svg>
        </button>
      </div>
    </div>
  );
}

export default Toast; 