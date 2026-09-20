import React from 'react';

const StoryModal = ({ isOpen, onClose, onExploreProjects }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop active" id="storyModal" onClick={onClose}>
      <div
        className="modal-box"
        style={{
          maxWidth: '820px',
          padding: '2rem',
          background: '#FFFFFF',
          borderRadius: '20px',
          position: 'relative',
          boxShadow: '0 25px 60px rgba(0,0,0,0.25)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="modal-close"
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1.25rem',
            right: '1.5rem',
            fontSize: '1.75rem',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: '#64748B',
            transition: 'color 0.2s',
          }}
          onMouseOver={(e) => (e.currentTarget.style.color = '#1E293B')}
          onMouseOut={(e) => (e.currentTarget.style.color = '#64748B')}
          aria-label="Close modal"
        >
          &times;
        </button>

        <div style={{ marginBottom: '1.25rem' }}>
          <span className="hero-badge-pill gold" style={{ marginBottom: '0.5rem', display: 'inline-flex' }}>
            <i className="fa-solid fa-trophy"></i> 20+ YEARS OF EXCELLENCE
          </span>
          <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.85rem', color: '#482050', marginTop: '0.35rem' }}>
            Comfort Space &bull; Engineering Inspiring Built Environments
          </h3>
          <p style={{ color: '#64748B', fontSize: '0.95rem', marginTop: '0.25rem' }}>
            From bare shells to corporate headquarters, high-security banking infrastructure, and iconic hospitality destinations.
          </p>
        </div>

        <div style={{ position: 'relative', borderRadius: '14px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.12)' }}>
          <img
            src="/assets/images/mcdonalds-hyd-exterior.jpg"
            alt="Comfort Space Flagship Showcase"
            style={{ width: '100%', height: '380px', objectFit: 'cover', display: 'block' }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to top, rgba(30,20,40,0.92) 0%, rgba(30,20,40,0.3) 50%, transparent 100%)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              padding: '2rem',
              color: '#FFFFFF',
            }}
          >
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '0.75rem' }}>
              <span style={{ background: '#22C55E', color: '#FFFFFF', fontSize: '0.75rem', fontWeight: 700, padding: '0.25rem 0.65rem', borderRadius: '9999px' }}>
                FEATURED FLAGSHIP
              </span>
              <span style={{ fontSize: '0.85rem', color: '#E2E8F0' }}>
                McDonald's &amp; McCafe Flagship Drive-thru, Hyderabad
              </span>
            </div>
            <h4 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.45rem' }}>
              Precision Civil Fit-Outs, Structural Glazing &amp; Commercial Kitchens
            </h4>
            <p style={{ fontSize: '0.9rem', color: '#CBD5E1', maxWidth: '650px', lineHeight: 1.5 }}>
              20+ years of uncompromised speed, quality engineering, and turnkey execution across 7 states in India.
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ fontSize: '0.85rem', color: '#64748B' }}>
            <i className="fa-solid fa-check-circle" style={{ color: '#22C55E', marginRight: '5px' }}></i> IGBC Founding Member &bull; On-Time Delivery Guarantee
          </div>
          <button
            className="btn-hero-explore"
            onClick={() => {
              onClose();
              onExploreProjects();
            }}
            style={{ fontSize: '0.875rem', padding: '0.65rem 1.4rem' }}
          >
            Explore Complete Gallery <i className="fa-solid fa-arrow-right"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default StoryModal;
