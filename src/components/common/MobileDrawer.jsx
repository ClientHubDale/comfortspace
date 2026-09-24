import React from 'react';
import { DROPDOWNS } from './navMenus';

/* Section links indented under a top-level page link */
const DrawerSub = ({ items, onSelectTab, onClose }) => (
  <div className="drawer-sub">
    {items.map((item) => (
      <button
        key={item.label}
        type="button"
        onClick={() => {
          onSelectTab(item.tab, item.section, item.filter);
          onClose();
        }}
      >
        <i className={`fa-solid ${item.icon}`}></i> {item.label}
      </button>
    ))}
  </div>
);

const MobileDrawer = ({ isOpen, activeTab, onSelectTab, onOpenAdmin, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="mobile-nav-drawer active" id="mobileNavDrawer" data-lenis-prevent>
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
      <DrawerSub items={DROPDOWNS.about.items} onSelectTab={onSelectTab} onClose={onClose} />
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
      <DrawerSub items={DROPDOWNS.services.items} onSelectTab={onSelectTab} onClose={onClose} />
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
      <DrawerSub items={DROPDOWNS.turnkey.items} onSelectTab={onSelectTab} onClose={onClose} />
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
      <DrawerSub items={DROPDOWNS.projects.items} onSelectTab={onSelectTab} onClose={onClose} />
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
