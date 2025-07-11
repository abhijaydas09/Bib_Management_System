import React from 'react';
import './TabsBoxed.css';

function TabsBoxed({ tabs, activeIndex, onTabClick }) {
  return (
    <div className="tabsboxed-container">
      {tabs.map((tab, idx) => (
        <React.Fragment key={tab.label}>
          <button
            className={`tabsboxed-item${activeIndex === idx ? ' active' : ''}`}
            onClick={() => onTabClick(idx)}
          >
            <span className="tabsboxed-label">{tab.label}</span>
          </button>
          {idx < tabs.length - 1 && <span className="tabsboxed-divider" />}
        </React.Fragment>
      ))}
    </div>
  );
}

export default TabsBoxed; 