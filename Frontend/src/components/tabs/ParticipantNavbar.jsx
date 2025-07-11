import React, { useRef, useEffect, useState, useContext } from 'react';
import { FaMoon } from 'react-icons/fa';
import './Tabs.css';
import { AuthContext } from '../../App';
import { useNavigate } from 'react-router-dom';

const participantTabs = [
  { label: 'Home', path: '/participant/home' },
  { label: 'Marathons', path: '/participant/marathons' },
  { label: 'My Events', path: '/participant/my-events' }
];

function ParticipantNavbar({ onTabClick, activeTab, tabs }) {
  const sliderRef = useRef(null);
  const tabRefs = useRef([]);
  const [sliderStyle, setSliderStyle] = useState({ left: 0, width: 0 });
  const { isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const tabList = tabs || participantTabs;

  useEffect(() => {
    if (!activeTab) return;
    const idx = tabList.findIndex(tab => tab.path === activeTab);
    if (idx !== -1 && tabRefs.current[idx]) {
      const el = tabRefs.current[idx];
      setSliderStyle({
        left: el.offsetLeft - 8,
        width: el.offsetWidth + 16
      });
    }
  }, [activeTab, tabList]);

  return (
    <nav className="navbar" style={{ position: 'relative' }}>
      <div className="navbar-content">
        {tabList.map((tab, idx) => (
          <button
            key={tab.label || idx}
            ref={el => tabRefs.current[idx] = el}
            className={"navbar-item" + (activeTab && activeTab === tab.path ? ' active' : '')}
            onClick={onTabClick ? () => onTabClick(tab.path) : (tab.path === '/login' ? () => navigate('/login') : undefined)}
            style={{
              borderBottom: activeTab && activeTab === tab.path ? '2px solid #A8FD24' : 'none',
              color: activeTab && activeTab === tab.path ? '#A8FD24' : '#fff',
              fontWeight: 400,
              fontSize: 14,
              background: 'transparent',
              transition: 'color 0.18s',
            }}
          >
            {tab.icon}
            {tab.label && <span>{tab.label}</span>}
          </button>
        ))}
        <button className="navbar-darklight-btn" onClick={() => { /* dark mode toggle */ }}>
          <FaMoon />
        </button>
      </div>
      {activeTab && <div className="tab-slider" ref={sliderRef} style={{ ...sliderStyle, position: 'absolute' }} />}
    </nav>
  );
}

export default ParticipantNavbar; 