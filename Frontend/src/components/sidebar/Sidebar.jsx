import React from 'react';
import './Sidebar.css';

function Sidebar({ tabs, activeIndex, onTabClick }) {
  return (
    <nav className="sidebar-container">
      {tabs.map((tab, idx) => (
        <React.Fragment key={tab.label}>
          <button
            className={`sidebar-item${activeIndex === idx ? ' active' : ''}`}
            onClick={() => onTabClick(idx)}
            tabIndex={0}
          >
            {tab.icon && <span className="sidebar-icon">{tab.icon}</span>}
            <span className="sidebar-label">{tab.label}</span>
          </button>
          {idx < tabs.length - 1 && <span className="sidebar-divider" />}
        </React.Fragment>
      ))}
    </nav>
  );
}

export default Sidebar; 