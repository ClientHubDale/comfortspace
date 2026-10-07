import React from 'react';
import { INITIAL_DATA } from '../../data/initialData';

const company = INITIAL_DATA.company;

const TopBar = () => {
  return (
    <div className="top-bar">
      <div className="top-bar-inner">
        <div className="top-bar-left">
          <a href={`tel:${company.phone.replace(/\s/g, '')}`} className="top-bar-link">
            <i className="fa-solid fa-phone"></i> {company.phoneDisplay}
          </a>
          <span className="top-bar-sep">|</span>
          <a href="mailto:info@comfortspace.com" className="top-bar-link">
            <i className="fa-solid fa-envelope"></i> info@comfortspace.com
          </a>
        </div>
        <div className="top-bar-right">
          <span className="top-bar-item">
            <i className="fa-solid fa-location-dot"></i> Yelahanka, Bangalore
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
