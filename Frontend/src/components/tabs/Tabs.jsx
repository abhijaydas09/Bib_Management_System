import React, { useRef, useLayoutEffect, useState } from 'react';
import './Tabs.css';

function Tabs({ tabs, activeIndex, onTabClick, onDarkLightToggle, isDarkMode }) {
  const containerRef = useRef();
  // The slider width is stored in sliderStyle.width, which is set below.
  const [sliderStyle, setSliderStyle] = useState({ left: 0, width: 0 });

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const tabEls = Array.from(container.querySelectorAll('.navbar-item'));
    if (tabEls[activeIndex]) {
      const el = tabEls[activeIndex];
      // Increase the slider width by 16px (from +16 to +32)
      setSliderStyle({
        left: el.offsetLeft - 16,
        width: el.offsetWidth + 32,
      });
    }
  }, [activeIndex, tabs.length]);

  return (
    <nav className="navbar" ref={containerRef}>
      <div
        className="navbar-content"
        style={{
          marginLeft: 0,
          marginRight: 0,
          justifyContent: 'flex-end',
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          gap: 80, // 80px gap between all tabs and between last tab and dark mode icon
        }}
      >
        {tabs.map((tab, idx) => (
          <button
            key={tab.label}
            className={`navbar-item${activeIndex === idx ? ' active' : ''}`}
            onClick={() => onTabClick(idx)}
            style={{
              color: activeIndex === idx ? '#A8FD24' : '#fff',
              fontWeight: 400,
              fontSize: '14px',
              background: 'transparent',
              transition: 'color 0.18s',
            }}
          >
            <span className="tab-label">{tab.label}</span>
          </button>
        ))}
        <button
          className="navbar-darklight-btn"
          onClick={onDarkLightToggle}
          aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {isDarkMode ? (
            // Sun icon (white)
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="5" />
              <line x1="12" y1="1" x2="12" y2="3" />
              <line x1="12" y1="21" x2="12" y2="23" />
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
              <line x1="1" y1="12" x2="3" y2="12" />
              <line x1="21" y1="12" x2="23" y2="12" />
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            </svg>
          ) : (
            // Moon icon (white)
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z" />
            </svg>
          )}
        </button>
      </div>
      <div
        className="tab-slider"
        // The slider width is applied here via sliderStyle.width
        style={{
          ...sliderStyle,
          height: '3px',
          background: '#A8FD24',
          position: 'absolute',
          bottom: 0,
          transition: 'left 0.18s, width 0.18s, background 0.18s',
        }}
      />
    </nav>
  );
}

export default Tabs;