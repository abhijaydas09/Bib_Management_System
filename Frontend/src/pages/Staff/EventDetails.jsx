import React from 'react';
import StaffNavbar from '../../components/tabs/StaffNavbar';

function EventDetails() {
  return (
    <div>
      <StaffNavbar />
      <div style={{ padding: 32 }}>
        <h1>Event Details</h1>
        <p>View and manage event details here.</p>
      </div>
    </div>
  );
}

export default EventDetails; 