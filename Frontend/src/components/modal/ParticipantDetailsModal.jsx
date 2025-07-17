import React from 'react';

// Helper to get initials from name
const getInitials = (name) => {
  if (!name) return '';
  const parts = name.trim().split(' ');
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

// Import solid icons from react-icons
import { FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';

const ParticipantDetailsModal = ({
  open,
  onClose,
  participant,
  onMarkAttendance,
  onMarkBibCollected,
}) => {
  if (!open || !participant) return null;

  // Define a base text color for the modal
  const baseTextColor = '#0B405B'; // Our blue colour

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        background: 'rgba(0,0,0,0.25)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: baseTextColor, // Set base text color for the overlay (will inherit in children)
      }}
    >
      <div
        style={{
          background: '#fff',
          borderRadius: 10,
          boxShadow: '0 4px 24px rgba(0,0,0,0.12)',
          padding: 32,
          minWidth: 400,
          maxWidth: 500,
          position: 'relative',
          color: baseTextColor, // Set text color for modal content
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: -4,
            right: -4,
            background: 'none',
            border: 'none',
            fontSize: 24,
            color: '#0B405B', // Close button color
            cursor: 'pointer',
            fontWeight: 700,
          }}
          aria-label="Close"
        >
          &times;
        </button>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 24 }}>
          <div style={{ flex: 1 }}>
            <div
              style={{
                fontWeight: 700,
                fontSize: 24,
                color: '#0B405B', // Event name color
                marginBottom: 8,
              }}
            >
              {participant.eventName || 'EVENT NAME'}
            </div>
            <div
              style={{
                fontWeight: 700,
                fontSize: 20,
                marginBottom: 8,
                color: baseTextColor, // Participant name color
              }}
            >
              {participant.name || 'Participant Name'}
            </div>
            <div style={{ marginBottom: 4, color: baseTextColor }}>
              <b>Bib Number:</b> {participant.bibNumber || '-'}
            </div>
            <div style={{ marginBottom: 4, color: baseTextColor }}>
              <b>Category:</b> {participant.category || '-'}
            </div>
            <div style={{ marginBottom: 4, color: baseTextColor }}>
              <b>T-Shirt Size:</b> {participant.tShirtSize || '-'}
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                marginTop: 16,
                gap: 16,
              }}
            >
              <span
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  color: '#0B405B',
                  fontWeight: 500,
                }}
              >
                <FaCalendarAlt style={{ color: '#0B405B', fontSize: 16 }} aria-label="calendar" />
                {participant.eventDate || 'EVENT DATE'}
              </span>
              <span
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  color: '#0B405B',
                  fontWeight: 500,
                  marginTop: 1,
                }}
              >
                <FaMapMarkerAlt style={{ color: '#0B405B', fontSize: 16 }} aria-label="venue" />
                {participant.venue || 'VENUE'}
              </span>
            </div>
          </div>
          <div style={{ flexShrink: 0 }}>
            <div
              style={{
                width: 80,
                height: 80,
                borderRadius: '50%',
                background: '#eaf1fb',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 32,
                color: '#0B405B',
                fontWeight: 600,
              }}
            >
              {getInitials(participant.name)}
            </div>
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            gap: 8,
            marginTop: 32,
          }}
        >
          <button
            onClick={onMarkAttendance}
            style={{
              background: '#eaf1fb',
              color: '#0B405B',
              border: 'none',
              borderRadius: 4,
              padding: '8px 16px',
              fontWeight: 500,
              fontSize: 14,
              cursor: 'pointer',
            }}
          >
            Mark Attendance
          </button>
          <button
            onClick={onMarkBibCollected}
            style={{
              background: '#0B405B',
              color: '#fff',
              border: 'none',
              borderRadius: 4,
              padding: '8px 16px',
              fontWeight: 500,
              fontSize: 14,
              cursor: 'pointer',
            }}
          >
            Bib Collected
          </button>
        </div>
      </div>
    </div>
  );
};

export default ParticipantDetailsModal;