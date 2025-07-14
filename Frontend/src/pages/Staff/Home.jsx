import React from 'react';
import StaffNavbar from '../../components/tabs/StaffNavbar';

function Home() {
  return (
    <div>
      <StaffNavbar />
      <div style={{ padding: 32 }}>
        <h1>Staff Home</h1>
        <p>Welcome to the staff dashboard.</p>
      </div>
    </div>
  );
}

export default Home; 