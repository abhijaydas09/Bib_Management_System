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
            {activeIndex === idx && tab.leadingIcon && <span className="tabsboxed-icon leading">{tab.leadingIcon}</span>}
            <span className="tabsboxed-label">{tab.label}</span>
            {activeIndex === idx && tab.trailingItem && <span className="tabsboxed-icon trailing">{tab.trailingItem}</span>}
          </button>
          {idx < tabs.length - 1 && <span className="tabsboxed-divider" />}
        </React.Fragment>
      ))}
    </div>
  );
}

export default TabsBoxed; 