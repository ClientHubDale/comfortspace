import React, { useState } from 'react';
import { INITIAL_DATA } from '../data/initialData';

const ContactPage = ({ onSaveLead, onShowToast }) => {
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [service, setService] = useState('Turnkey Base Projects');
  const [budget, setBudget] = useState('₹30L - ₹75L');
  const [location, setLocation] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !phone || !email) {
      alert('Please fill in required contact fields');
      return;
    }

    const newLead = {
      id: `lead-${Date.now()}`,
      name,
      company: company || 'Individual Client',
      phone,
      email,
      service,
      budget,
      location: location || 'Bangalore',
      message,
      date: new Date().toISOString().replace('T', ' ').substring(0, 16),
      status: 'New',
    };

    onSaveLead(newLead);
    onShowToast(`✓ Thank you ${name}! Your inquiry has been sent to our estimation desk.`);

    // Clear form
    setName('');
    setCompany('');
    setPhone('');
    setEmail('');
    setLocation('');
    setMessage('');
  };

  return (
    <main id="tab-contact" className="tab-page active-page">
      <div className="page-banner-wrap">
        <div className="container text-center">
          <span className="section-tag">Let's Build Together</span>
          <h1 className="page-banner-title">Request a Turnkey Consultation</h1>
          <p className="section-subtitle">
            Have an upcoming commercial space, restaurant, or banking fit-out? Connect with our senior project estimators.
          </p>
        </div>
      </div>

      <section className="section-padding" style={{ background: '#FFFFFF' }}>
        <div className="container">
          <div className="contact-grid">
            
            {/* Contact Details Panel */}
            <div className="contact-info-panel">
              <span className="section-tag">Direct Communication</span>
              <h2 style={{ fontSize: '1.35rem', fontWeight: 750, color: 'var(--text-heading)', margin: '0.5rem 0 1rem' }}>
                Corporate Headquarters
              </h2>
              <p style={{ color: '#64748B', fontSize: '0.85rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                Comfort Space Pvt. Ltd.<br />
                <em style={{ color: 'var(--brand-orange)', fontStyle: 'normal', fontWeight: 600 }}>Formerly known as Shivashakthi Comforts</em>
              </p>

              <div className="contact-card-item">
                <div className="contact-icon-bubble"><i className="fa-solid fa-location-dot"></i></div>
                <div>
                  <h5 style={{ color: 'var(--text-heading)', fontSize: '0.875rem', marginBottom: '0.2rem' }}>Bangalore Registered Office</h5>
                  <p style={{ color: '#64748B', fontSize: '0.8rem', lineHeight: 1.5 }}>
                    #48, 2nd Floor, 100 Feet Ring Road,<br />
                    BTM Layout 2nd Stage, Bangalore,<br />
                    Karnataka - 560076, India
                  </p>
                </div>
              </div>

              <div className="contact-card-item">
                <div className="contact-icon-bubble"><i className="fa-solid fa-phone"></i></div>
                <div>
                  <h5 style={{ color: 'var(--text-heading)', fontSize: '0.875rem', marginBottom: '0.2rem' }}>Telephone</h5>
                  <p style={{ color: '#334155', fontSize: '0.8rem' }}>
                    <a href="tel:+919845012345" style={{ color: 'var(--text-heading)', fontWeight: 600, textDecoration: 'none' }}>
                      +91 98450 12345
                    </a>
                  </p>
                  <p style={{ color: '#94A3B8', fontSize: '0.72rem' }}>Mon - Sat, 9:30 AM to 6:30 PM IST</p>
                </div>
              </div>

              <div className="contact-card-item">
                <div className="contact-icon-bubble"><i className="fa-solid fa-envelope"></i></div>
                <div>
                  <h5 style={{ color: 'var(--text-heading)', fontSize: '0.875rem', marginBottom: '0.2rem' }}>Inquiries &amp; BOQ Submissions</h5>
                  <p style={{ color: '#334155', fontSize: '0.8rem' }}>
                    <a href="mailto:projects@comfortspace.com" style={{ color: 'var(--brand-orange)', fontWeight: 600, textDecoration: 'none' }}>
                      projects@comfortspace.com
                    </a>
                  </p>
                </div>
              </div>

              <div style={{ marginTop: '1.5rem', paddingTop: '1.25rem', borderTop: '1px solid var(--border-subtle)' }}>
                <h5 style={{ color: 'var(--text-heading)', fontSize: '0.875rem', marginBottom: '0.65rem' }}>Instant WhatsApp Direct Chat</h5>
                <a
                  href={`https://wa.me/${INITIAL_DATA.company.whatsappNumber}?text=${encodeURIComponent(INITIAL_DATA.company.whatsappMessage)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-brand"
                  style={{ width: '100%', background: '#25D366', borderColor: '#25D366', fontSize: '0.85rem', padding: '0.65rem 1rem', justifyContent: 'center' }}
                >
                  <i className="fa-brands fa-whatsapp"></i> Chat on WhatsApp Now
                </a>
              </div>
            </div>

            {/* Lead Consultation Form */}
            <div className="contact-form-card">
              <h3 style={{ fontSize: '1.35rem', fontWeight: 750, color: 'var(--text-heading)', marginBottom: '0.35rem' }}>
                Project Inquiry &amp; Estimation
              </h3>
              <p style={{ color: '#64748B', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
                Fill in your site details to receive a preliminary BOQ and timeline estimate.
              </p>

              <form onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="contactName">Your Name *</label>
                    <input
                      type="text"
                      id="contactName"
                      className="form-control"
                      placeholder="e.g. Vikram Malhotra"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="contactCompany">Company / Brand Name</label>
                    <input
                      type="text"
                      id="contactCompany"
                      className="form-control"
                      placeholder="e.g. Acme Retail Pvt Ltd"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="contactPhone">Phone Number *</label>
                    <input
                      type="tel"
                      id="contactPhone"
                      className="form-control"
                      placeholder="+91 98450 00000"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="contactEmail">Email Address *</label>
                    <input
                      type="email"
                      id="contactEmail"
                      className="form-control"
                      placeholder="vikram@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="contactServiceSelect">Service Required *</label>
                    <select
                      id="contactServiceSelect"
                      className="form-control"
                      value={service}
                      onChange={(e) => setService(e.target.value)}
                      required
                    >
                      <option value="Turnkey Base Projects">Turnkey Base Projects (Design &amp; Build)</option>
                      <option value="Civil Construction">Civil Construction</option>
                      <option value="Project Management (PMC)">Project Management (PMC)</option>
                      <option value="Modular Furniture Supply">Modular Furniture Supply &amp; Installation</option>
                      <option value="Fire &amp; Life Safety">Fire &amp; Life Safety</option>
                      <option value="Post-Handover Support / AMC">Post-Handover Support / AMC</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="contactBudget">Estimated Project Budget</label>
                    <select
                      id="contactBudget"
                      className="form-control"
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                    >
                      <option value="₹15L - ₹30L">₹15 Lakhs - ₹30 Lakhs</option>
                      <option value="₹30L - ₹75L">₹30 Lakhs - ₹75 Lakhs</option>
                      <option value="₹75L - ₹1.5 Cr">₹75 Lakhs - ₹1.5 Crore</option>
                      <option value="₹1.5 Cr+">Above ₹1.5 Crore</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="contactLocation">Site Location &amp; City</label>
                  <input
                    type="text"
                    id="contactLocation"
                    className="form-control"
                    placeholder="e.g. Indiranagar, Bangalore"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="contactMessage">Project Scope &amp; Timeline Details</label>
                  <textarea
                    id="contactMessage"
                    className="form-control"
                    placeholder="Describe the carpet area, target opening date, and any special architectural drawings available..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-brand" style={{ width: '100%', padding: '1.125rem', justifyContent: 'center' }}>
                  <i className="fa-solid fa-paper-plane"></i> Submit Turnkey Inquiry
                </button>
              </form>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
};

export default ContactPage;
