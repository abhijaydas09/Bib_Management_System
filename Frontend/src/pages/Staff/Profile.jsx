import React from 'react';
import StaffNavbar from '../../components/tabs/StaffNavbar';

function Profile() {
  return (
    <div>
      <StaffNavbar />
      <div style={{ padding: 32 }}>
        <h1>Staff Profile</h1>
        <p>View and edit your profile here.</p>
      </div>
    </div>
  );
}

export default Profile; 