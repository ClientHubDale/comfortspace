import React from 'react';

const Footer = ({ onSelectTab, onOpenAdmin }) => {
  return (
    <footer className="main-footer">
      <div className="container">
        <div className="footer-grid">
          
          <div className="footer-col">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <img src="/assets/images/logo.png" alt="Comfort Space Logo" style={{ height: '50px' }} />
              <div className="brand-logo-text">
                <div className="brand-logo-main" style={{ fontSize: '1.15rem' }}>
                  <span className="brand-orange">COMFORT</span> <span className="brand-navy">SPACE</span>
                </div>
                <div className="brand-logo-sub" style={{ fontSize: '0.65rem' }}>
                  Formerly <em>Shivashakthi Comforts</em>
                </div>
              </div>
            </div>
            <p style={{ fontSize: '0.875rem', lineHeight: 1.7, color: '#64748B', marginBottom: '1.5rem' }}>
              With over 20 years of proven performance, we are a leading commercial interior fit-out, turnkey design &amp; build, and civil infrastructure firm headquartered in Bangalore with active operations across 7 states.
            </p>
            <span className="igbc-seal-pill">
              <i className="fa-solid fa-leaf"></i> Indian Green Building Council (IGBC) Founding Member
            </span>
          </div>

          <div className="footer-col">
            <h4>Navigation</h4>
            <ul className="footer-links">
              <li>
                <a href="#home" onClick={(e) => { e.preventDefault(); onSelectTab('home'); }}>Home</a>
              </li>
              <li>
                <a href="#about" onClick={(e) => { e.preventDefault(); onSelectTab('about'); }}>About Our Heritage</a>
              </li>
              <li>
                <a href="#services" onClick={(e) => { e.preventDefault(); onSelectTab('services'); }}>Core Capabilities</a>
              </li>
              <li>
                <a href="#turnkey" onClick={(e) => { e.preventDefault(); onSelectTab('turnkey'); }}>Turnkey &amp; Infrastructure</a>
              </li>
              <li>
                <a href="#projects" onClick={(e) => { e.preventDefault(); onSelectTab('projects'); }}>Handed-Over Projects</a>
              </li>
              <li>
                <a href="#contact" onClick={(e) => { e.preventDefault(); onSelectTab('contact'); }}>Request Quote</a>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Core Sectors</h4>
            <ul className="footer-links">
              <li>
                <a href="#projects" onClick={(e) => { e.preventDefault(); onSelectTab('projects'); }}>QSR &amp; Drive-Thru Outlets</a>
              </li>
              <li>
                <a href="#projects" onClick={(e) => { e.preventDefault(); onSelectTab('projects'); }}>Luxury Fine Dining &amp; Cafes</a>
              </li>
              <li>
                <a href="#projects" onClick={(e) => { e.preventDefault(); onSelectTab('projects'); }}>Banking &amp; Financial Branches</a>
              </li>
              <li>
                <a href="#projects" onClick={(e) => { e.preventDefault(); onSelectTab('projects'); }}>Corporate Regional Headquarters</a>
              </li>
              <li>
                <a href="#services" onClick={(e) => { e.preventDefault(); onSelectTab('services'); }}>Modular Workstations</a>
              </li>
              <li>
                <a href="#services" onClick={(e) => { e.preventDefault(); onSelectTab('services'); }}>24/7 Post-Handover AMC</a>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Bangalore HQ</h4>
            <p style={{ fontSize: '0.875rem', lineHeight: 1.7, color: '#64748B', marginBottom: '1rem' }}>
              #48, 2nd Floor, 100 Feet Ring Road,<br />
              BTM Layout 2nd Stage, Bangalore,<br />
              Karnataka - 560076, India
            </p>
            <p style={{ fontSize: '0.875rem', marginBottom: '0.5rem' }}>
              <i className="fa-solid fa-phone" style={{ color: 'var(--brand-orange)', marginRight: '6px' }}></i>
              <a href="tel:+919845012345" style={{ color: 'var(--text-heading)', textDecoration: 'none', fontWeight: 600 }}>
                +91 98450 12345
              </a>
            </p>
            <p style={{ fontSize: '0.875rem' }}>
              <i className="fa-solid fa-envelope" style={{ color: 'var(--brand-orange)', marginRight: '6px' }}></i>
              <a href="mailto:projects@comfortspace.com" style={{ color: 'var(--brand-orange)', textDecoration: 'none', fontWeight: 600 }}>
                projects@comfortspace.com
              </a>
            </p>
            <div style={{ marginTop: '1.5rem' }}>
              <button className="btn btn-outline-dark btn-sm" onClick={onOpenAdmin}>
                <i className="fa-solid fa-lock"></i> Client CMS Login
              </button>
            </div>
          </div>

        </div>

        <div className="footer-bottom">
          <div>
            &copy; {new Date().getFullYear()} Comfort Space Pvt. Ltd. (Formerly Shivashakthi Comforts). All Rights Reserved.
          </div>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <span>Privacy Policy</span>
            <span>Terms of Execution</span>
            <span>IGBC Green Policy</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
