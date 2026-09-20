import React from 'react';

const MobileDrawer = ({ isOpen, activeTab, onSelectTab, onOpenAdmin, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="mobile-nav-drawer active" id="mobileNavDrawer">
      <div style={{ display: 'flex', justifyContent: 'flex-end', paddingBottom: '0.5rem' }}>
        <button
          onClick={onClose}
          style={{ background: 'none', border: 'none', fontSize: '1.25rem', color: '#64748B', cursor: 'pointer' }}
          aria-label="Close menu"
        >
          <i className="fa-solid fa-xmark"></i>
        </button>
      </div>

      <a
        href="#home"
        className={`nav-link ${activeTab === 'home' ? 'active' : ''}`}
        onClick={(e) => {
          e.preventDefault();
          onSelectTab('home');
          onClose();
        }}
      >
        Home
      </a>
      <a
        href="#about"
        className={`nav-link ${activeTab === 'about' ? 'active' : ''}`}
        onClick={(e) => {
          e.preventDefault();
          onSelectTab('about');
          onClose();
        }}
      >
        About Us
      </a>
      <a
        href="#services"
        className={`nav-link ${activeTab === 'services' ? 'active' : ''}`}
        onClick={(e) => {
          e.preventDefault();
          onSelectTab('services');
          onClose();
        }}
      >
        Services
      </a>
      <a
        href="#turnkey"
        className={`nav-link ${activeTab === 'turnkey' ? 'active' : ''}`}
        onClick={(e) => {
          e.preventDefault();
          onSelectTab('turnkey');
          onClose();
        }}
      >
        Turnkey &amp; Project Management
      </a>
      <a
        href="#projects"
        className={`nav-link ${activeTab === 'projects' ? 'active' : ''}`}
        onClick={(e) => {
          e.preventDefault();
          onSelectTab('projects');
          onClose();
        }}
      >
        Project Gallery
      </a>
      <a
        href="#contact"
        className={`nav-link ${activeTab === 'contact' ? 'active' : ''}`}
        onClick={(e) => {
          e.preventDefault();
          onSelectTab('contact');
          onClose();
        }}
      >
        Contact
      </a>
      <button
        className="btn btn-outline-brand"
        style={{ marginTop: '1rem', width: '100%', justifyContent: 'center' }}
        onClick={() => {
          onClose();
          onOpenAdmin();
        }}
      >
        <i className="fa-solid fa-lock"></i> Open Admin CMS
      </button>
    </div>
  );
};

export default MobileDrawer;
