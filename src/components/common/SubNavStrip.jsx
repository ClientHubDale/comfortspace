import React from 'react';

const tabLabels = {
  home: 'Home',
  about: 'About Us',
  services: 'Services',
  turnkey: 'Turnkey & Project Management',
  projects: 'Project Gallery',
  contact: 'Contact',
};

const SubNavStrip = ({ activeTab, onSelectTab, onOpenAdmin }) => {
  if (activeTab === 'home') return null;

  return (
    <div className="sub-nav-strip" id="globalSubNavStrip">
      <div className="sub-nav-inner">
        <div className="breadcrumb-trail">
          <a
            href="#home"
            className="tab-trigger"
            onClick={(e) => {
              e.preventDefault();
              onSelectTab('home');
            }}
          >
            <i className="fa-solid fa-house" style={{ color: 'var(--brand-orange)', fontSize: '0.85rem' }}></i> Home
          </a>
          <span className="sep">›</span>
          <span style={{ color: 'var(--brand-orange)', fontWeight: '600' }}>
            {tabLabels[activeTab] || activeTab}
          </span>
        </div>
        <button className="admin-pill-btn" onClick={onOpenAdmin}>
          <i className="fa-solid fa-lock"></i> Open Admin CMS
        </button>
      </div>
    </div>
  );
};

export default SubNavStrip;
