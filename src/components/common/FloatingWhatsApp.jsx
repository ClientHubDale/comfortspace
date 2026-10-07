import React from 'react';
import { INITIAL_DATA } from '../../data/initialData';

const FloatingWhatsApp = ({ activeTab }) => {
  // Hero section has its own interactive overlay, but show floating button on other tabs
  if (activeTab === 'home' || activeTab === 'contact') return null;

  return (
    <a
      href={`tel:${INITIAL_DATA.company.phone.replace(/\s/g, '')}`}
      className="floating-whatsapp"
      aria-label={`Call us on ${INITIAL_DATA.company.phoneDisplay}`}
    >
      <i className="fa-solid fa-phone"></i>
      <span>{INITIAL_DATA.company.phoneDisplay}</span>
      <i className="fa-solid fa-arrow-right"></i>
    </a>
  );
};

export default FloatingWhatsApp;
