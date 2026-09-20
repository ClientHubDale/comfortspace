import React from 'react';

const FloatingWhatsApp = ({ activeTab }) => {
  // Hero section has its own interactive overlay, but show floating button on other tabs
  if (activeTab === 'home') return null;

  return (
    <a
      href="https://wa.me/919876543210?text=Hello%20Comfort%20Space,%20I%20am%20inquiring%20about%20a%20Turnkey%20Fit-out%20project."
      target="_blank"
      rel="noopener noreferrer"
      className="floating-whatsapp"
      aria-label="Chat on WhatsApp"
    >
      <i className="fa-brands fa-whatsapp"></i>
      <span>Chat on WhatsApp</span>
      <i className="fa-solid fa-arrow-right"></i>
    </a>
  );
};

export default FloatingWhatsApp;
