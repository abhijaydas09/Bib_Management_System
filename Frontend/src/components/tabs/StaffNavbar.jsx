import React, { useRef, useEffect, useState } from 'react';
import { FaMoon, FaUserCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './Tabs.css';

const staffTabs = [
  { label: 'Home', path: '/staff/home' },
  { label: 'Event Details', path: '/staff/event-details' },
  { label: 'QR Logs', path: '/staff/qr-logs' },
  { label: 'Logout', action: 'logout', isLogout: true },
];

function StaffNavbar({ onTabClick, activeTab, isLoggedIn = false }) {
  const sliderRef = useRef(null);
  const tabRefs = useRef([]);
  const [sliderStyle, setSliderStyle] = useState({ left: 0, width: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    const idx = staffTabs.findIndex(tab => tab.path === activeTab);
    if (idx !== -1 && tabRefs.current[idx]) {
      const el = tabRefs.current[idx];
      setSliderStyle({
        left: el.offsetLeft - 8,
        width: el.offsetWidth + 16
      });
    }
  }, [activeTab]);

  return (
    <nav className="navbar" style={{ position: 'relative' }}>
      <div className="navbar-content">
        {staffTabs.map((tab, idx) => (
          <button
            key={tab.label || idx}
            ref={el => tabRefs.current[idx] = el}
            className={`navbar-item${activeTab === tab.path ? ' active' : ''}`}
            onClick={() => tab.action ? tab.action() : onTabClick(tab.path)}
          >
            {tab.icon}
            {tab.label && <span>{tab.label}</span>}
          </button>
        ))}
        {isLoggedIn && (
          <button className="navbar-profile-btn" onClick={() => navigate('/profile')} style={{ background: 'transparent', border: 'none', cursor: 'pointer', marginLeft: 8 }}>
            <FaUserCircle size={22} color="#fff" />
          </button>
        )}
        <button className="navbar-darklight-btn" onClick={() => { /* dark mode toggle */ }}>
          <FaMoon />
        </button>
      </div>
      <div className="tab-slider" ref={sliderRef} style={{ ...sliderStyle, position: 'absolute' }} />
    </nav>
  );
}

export default StaffNavbar; 