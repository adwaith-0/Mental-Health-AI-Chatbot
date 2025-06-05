import React from 'react';

const Header = () => {
  return (
    <header className="header">
      <div className="header-logo">
        <span className="header-icon">
          {/* Gold chat bubble icon */}
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="gold-gradient" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#FFD700"/>
                <stop offset="100%" stopColor="#FFC300"/>
              </linearGradient>
            </defs>
            <ellipse cx="20" cy="20" rx="16" ry="13" fill="url(#gold-gradient)"/>
            <ellipse cx="20" cy="20" rx="13" ry="10" fill="#18181b"/>
            <ellipse cx="20" cy="20" rx="10" ry="7" fill="url(#gold-gradient)" fillOpacity="0.15"/>
            <circle cx="15.5" cy="20" r="1.5" fill="#FFD700"/>
            <circle cx="20" cy="20" r="1.5" fill="#FFD700"/>
            <circle cx="24.5" cy="20" r="1.5" fill="#FFD700"/>
          </svg>
        </span>
        Mindful Support
      </div>
      <nav className="header-nav">
        <button className="header-btn active">
          <span className="header-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <ellipse cx="12" cy="12" rx="10" ry="8" fill="url(#gold-gradient)"/>
              <ellipse cx="12" cy="12" rx="8" ry="6" fill="#18181b"/>
              <ellipse cx="12" cy="12" rx="6" ry="4" fill="url(#gold-gradient)" fillOpacity="0.15"/>
              <circle cx="9.5" cy="12" r="1" fill="#FFD700"/>
              <circle cx="12" cy="12" r="1" fill="#FFD700"/>
              <circle cx="14.5" cy="12" r="1" fill="#FFD700"/>
            </svg>
          </span>
          Resources
        </button>
        <button className="header-btn">
          <span className="header-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <ellipse cx="12" cy="12" rx="10" ry="8" fill="url(#gold-gradient)"/>
              <ellipse cx="12" cy="12" rx="8" ry="6" fill="#18181b"/>
              <ellipse cx="12" cy="12" rx="6" ry="4" fill="url(#gold-gradient)" fillOpacity="0.15"/>
              <circle cx="12" cy="12" r="2" fill="#FFD700"/>
            </svg>
          </span>
          About
        </button>
      </nav>
    </header>
  );
};

export default Header;
