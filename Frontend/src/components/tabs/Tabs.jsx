import React, { useRef, useLayoutEffect, useState } from 'react';
import './Tabs.css';

function Tabs({ tabs, activeIndex, onTabClick }) {
  const containerRef = useRef();
  const [sliderStyle, setSliderStyle] = useState({ left: 0, width: 0 });

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const tabEls = Array.from(container.querySelectorAll('.tab-item'));
    if (tabEls[activeIndex]) {
      const el = tabEls[activeIndex];
      setSliderStyle({
        left: el.offsetLeft,
        width: el.offsetWidth,
      });
    }
  }, [activeIndex, tabs.length]);

  return (
    <div className="tabs-container" ref={containerRef}>
      {tabs.map((tab, idx) => (
        <button
          key={tab.label}
          className={`tab-item${activeIndex === idx ? ' active' : ''}`}
          onClick={() => onTabClick(idx)}
          style={{ color: 'var(--color-primary)' }}
        >
          {activeIndex === idx && tab.leadingIcon && <span className="tab-icon leading">{tab.leadingIcon}</span>}
          <span className="tab-label">{tab.label}</span>
          {activeIndex === idx && tab.trailingItem && <span className="tab-icon trailing">{tab.trailingItem}</span>}
        </button>
      ))}
      <div className="tab-slider" style={sliderStyle} />
    </div>
  );
}

export default Tabs; 