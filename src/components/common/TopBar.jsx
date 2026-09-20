import React from 'react';

const TopBar = () => {
  return (
    <div className="top-bar">
      <div className="top-bar-inner">
        <div className="top-bar-left">
          <a href="tel:+919876543210" className="top-bar-link">
            <i className="fa-solid fa-phone"></i> +91 98765 43210
          </a>
          <span className="top-bar-sep">|</span>
          <a href="mailto:info@comfortspace.com" className="top-bar-link">
            <i className="fa-solid fa-envelope"></i> info@comfortspace.com
          </a>
        </div>
        <div className="top-bar-right">
          <span className="top-bar-item">
            <i className="fa-solid fa-location-dot"></i> Bengaluru, Karnataka, India
          </span>
          <span className="top-bar-sep">|</span>
          <span className="top-bar-item">
            <i className="fa-regular fa-calendar-check"></i> Mon - Sat : 9:00 AM - 7:00 PM
          </span>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
