import React, { useState } from 'react';
import { INITIAL_DATA } from '../data/initialData';

const HomePage = ({ onSelectTab, onOpenStoryModal, onOpenProjectModal, projects }) => {
  const [selectedTurnkeyStep, setSelectedTurnkeyStep] = useState(0);

  const featuredProjects = projects.filter((p) => p.featured);
  const currentTurnkey = INITIAL_DATA.turnkeySteps[selectedTurnkeyStep];

  return (
    <main id="tab-home" className="tab-page active-page">
      {/* Hero Section */}
      <section className="hero-section-ref cinematic-sunset">
        {/* Ambient Floating Twilight Orbs */}
        <div className="hero-ambient-orb orb-1"></div>
        <div className="hero-ambient-orb orb-2"></div>
        <div className="hero-ambient-orb orb-3"></div>

        <div className="hero-main-container">
          <div className="hero-content-left animate-stagger-in">
            <div className="hero-badge-strip">
              <span className="hero-badge-pill gold">
                <i className="fa-solid fa-trophy"></i> 20+ YEARS OF EXCELLENCE
              </span>
              <span className="hero-badge-sep">|</span>
              <span className="hero-badge-pill green">
                <i className="fa-solid fa-leaf"></i> Designing Spaces That Inspire
              </span>
            </div>

            <h1 className="hero-ref-title">
              <span className="hero-title-lead animate-slide-up">Engineering Futuristic</span>
              <span className="hero-title-serif plum animate-slide-up">Commercial &amp; Turnkey</span>
              <span className="hero-title-serif gold animate-slide-up">Spaces</span>
            </h1>

            <p className="hero-ref-desc animate-slide-up">
              From bare shells to vibrant luxury dining, multi-state QSR drive-thrus, high-security banking hubs, and corporate headquarters, Comfort Space Pvt. Ltd. (formerly Shivashakthi Comforts) delivers structurally sound, aesthetically superior built environments.
            </p>

            {/* 4 Feature Badges in Horizontal Row */}
            <div className="hero-features-row animate-slide-up">
              <div className="hero-feat-item">
                <div className="hero-feat-icon white-circle purple"><i className="fa-solid fa-city"></i></div>
                <div className="hero-feat-info">
                  <strong>Turnkey Solutions</strong>
                  <small>End-to-End Delivery</small>
                </div>
              </div>
              <div className="hero-feat-item">
                <div className="hero-feat-icon white-circle peach"><i className="fa-solid fa-shield-halved"></i></div>
                <div className="hero-feat-info">
                  <strong>Quality Assured</strong>
                  <small>Built to Last</small>
                </div>
              </div>
              <div className="hero-feat-item">
                <div className="hero-feat-icon white-circle mint"><i className="fa-solid fa-leaf"></i></div>
                <div className="hero-feat-info">
                  <strong>Sustainable Designs</strong>
                  <small>Greener Tomorrow</small>
                </div>
              </div>
              <div className="hero-feat-item">
                <div className="hero-feat-icon white-circle lavender"><i className="fa-solid fa-users"></i></div>
                <div className="hero-feat-info">
                  <strong>Expert Team</strong>
                  <small>Skilled &amp; Experienced</small>
                </div>
              </div>
            </div>

            {/* Hero CTA Buttons */}
            <div className="hero-cta-row animate-slide-up">
              <a
                href="#projects"
                className="btn-hero-explore glowing-rim tab-trigger"
                onClick={(e) => {
                  e.preventDefault();
                  onSelectTab('projects');
                }}
              >
                Explore Our Projects <i className="fa-solid fa-arrow-right"></i>
              </a>
              <button
                className="btn-hero-watch"
                onClick={onOpenStoryModal}
              >
                <span className="play-circle-icon">
                  <span className="radar-wave"></span>
                  <i className="fa-solid fa-play"></i>
                </span>
                <span>Watch Our Story</span>
              </button>
            </div>
          </div>

          <div className="hero-visual-container animate-fade-in-right">
            <div className="hero-visual-frame">
              <img
                src="/assets/images/hero-building-clean-sunset.png"
                alt="Comfort Space Commercial Headquarters Architecture"
                className="hero-visual-img"
              />
              <a
                href="https://wa.me/919876543210?text=Hello%20Comfort%20Space,%20I%20am%20inquiring%20about%20a%20Commercial%20Turnkey%20project."
                target="_blank"
                rel="noopener noreferrer"
                className="hero-whatsapp-clickable-overlay"
                aria-label="Chat on WhatsApp"
                title="Chat on WhatsApp"
              ></a>
            </div>
          </div>
        </div>
      </section>

      {/* Client Marquee */}
      <section className="marquee-section">
        <div className="container">
          <div className="marquee-header-label">Trusted by Industry Leaders Across India</div>
          <div className="marquee-track" id="clientMarqueeTrack">
            {INITIAL_DATA.clients.map((client, idx) => (
              <div key={idx} className="marquee-item">
                <span className="marquee-item-name">{client.logoText}</span>
                <span className="marquee-item-badge">{client.logoBadge}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SPOTLIGHT: RECENTLY COMPLETED MCDONALD'S HYDERABAD FLAGSHIP */}
      <section className="section-padding" style={{ background: '#FFFFFF', borderBottom: '1px solid var(--border-subtle)' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
            <div>
              <span className="section-tag" style={{ background: '#FEF3C7', color: '#D97706', borderColor: '#FCD34D' }}>
                <i className="fa-solid fa-star"></i> Recently Handed Over Flagship
              </span>
              <h2 className="section-title" style={{ marginTop: '0.5rem', fontSize: '1.45rem' }}>
                HARDCASTLE RESTAURANTS PVT. LTD. (McDonald's &amp; McCafe, Hyderabad)
              </h2>
              <p style={{ color: '#64748B', fontSize: '0.9rem', marginTop: '0.35rem', lineHeight: 1.6 }}>
                Complete turnkey civil, structural facade, McCafe joinery, commercial stainless steel kitchen, and self-ordering kiosk fit-out.
              </p>
            </div>
            <div>
              <button
                className="btn btn-brand btn-sm"
                onClick={() => {
                  const mcd = projects.find((p) => p.id === 'proj-mcd-hyd') || projects[0];
                  if (mcd) onOpenProjectModal(mcd);
                }}
              >
                <i className="fa-solid fa-expand"></i> View Project Gallery &amp; Specs
              </button>
            </div>
          </div>

          {/* 4-Photo Showcase Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
            <div
              style={{ borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--border-subtle)', boxShadow: 'var(--shadow-sm)', cursor: 'pointer' }}
              onClick={() => {
                const mcd = projects.find((p) => p.id === 'proj-mcd-hyd') || projects[0];
                if (mcd) onOpenProjectModal(mcd);
              }}
            >
              <img
                src="/assets/images/mcdonalds-hyd-exterior.jpg"
                alt="McDonald's Hyderabad Exterior Entrance"
                style={{ width: '100%', height: '240px', objectFit: 'cover', transition: 'transform 0.4s ease' }}
                onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
              />
              <div style={{ padding: '0.875rem 1rem', background: '#FFFFFF' }}>
                <strong style={{ fontSize: '0.875rem', color: 'var(--text-heading)', display: 'block' }}>Main Entrance &amp; Facade</strong>
                <span style={{ fontSize: '0.75rem', color: '#64748B' }}>Structural Glazing &amp; Signage</span>
              </div>
            </div>

            <div
              style={{ borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--border-subtle)', boxShadow: 'var(--shadow-sm)', cursor: 'pointer' }}
              onClick={() => {
                const mcd = projects.find((p) => p.id === 'proj-mcd-hyd') || projects[0];
                if (mcd) onOpenProjectModal(mcd);
              }}
            >
              <img
                src="/assets/images/mcdonalds-hyd-mccafe.png"
                alt="McCafe Wooden Louver Detailing"
                style={{ width: '100%', height: '240px', objectFit: 'cover', transition: 'transform 0.4s ease' }}
                onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
              />
              <div style={{ padding: '0.875rem 1rem', background: '#FFFFFF' }}>
                <strong style={{ fontSize: '0.875rem', color: 'var(--text-heading)', display: 'block' }}>McCafe &amp; Ordering Counter</strong>
                <span style={{ fontSize: '0.75rem', color: '#64748B' }}>Timber Louver Joinery</span>
              </div>
            </div>

            <div
              style={{ borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--border-subtle)', boxShadow: 'var(--shadow-sm)', cursor: 'pointer' }}
              onClick={() => {
                const mcd = projects.find((p) => p.id === 'proj-mcd-hyd') || projects[0];
                if (mcd) onOpenProjectModal(mcd);
              }}
            >
              <img
                src="/assets/images/mcdonalds-hyd-kitchen.jpg"
                alt="Commercial Stainless Steel Kitchen"
                style={{ width: '100%', height: '240px', objectFit: 'cover', transition: 'transform 0.4s ease' }}
                onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
              />
              <div style={{ padding: '0.875rem 1rem', background: '#FFFFFF' }}>
                <strong style={{ fontSize: '0.875rem', color: 'var(--text-heading)', display: 'block' }}>Commercial Kitchen &amp; MEP</strong>
                <span style={{ fontSize: '0.75rem', color: '#64748B' }}>Stainless Steel Fabrication</span>
              </div>
            </div>

            <div
              style={{ borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--border-subtle)', boxShadow: 'var(--shadow-sm)', cursor: 'pointer' }}
              onClick={() => {
                const mcd = projects.find((p) => p.id === 'proj-mcd-hyd') || projects[0];
                if (mcd) onOpenProjectModal(mcd);
              }}
            >
              <img
                src="/assets/images/mcdonalds-hyd-counters.png"
                alt="Self-Ordering Kiosks & Dining Booths"
                style={{ width: '100%', height: '240px', objectFit: 'cover', transition: 'transform 0.4s ease' }}
                onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
              />
              <div style={{ padding: '0.875rem 1rem', background: '#FFFFFF' }}>
                <strong style={{ fontSize: '0.875rem', color: 'var(--text-heading)', display: 'block' }}>Dining Area &amp; Kiosks</strong>
                <span style={{ fontSize: '0.75rem', color: '#64748B' }}>Circular Booths &amp; Lighting</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Corporate Introduction */}
      <section className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '4rem', alignItems: 'center' }}>
            <div>
              <span className="section-tag">About Our Firm</span>
              <h2 className="section-title" style={{ marginBottom: '1.25rem' }}>
                Best-In-Class Interior Design &amp; Turnkey Excellence
              </h2>
              <p style={{ fontSize: '0.9rem', color: '#4B5563', lineHeight: 1.7, marginBottom: '1rem' }}>
                We proudly introduce ourselves as a premier interior design, civil construction, and turnkey project management firm with <strong>over two decades of consistent performance</strong>. Formerly known as <em>Shivashakthi Comforts</em>, we have transformed commercial, retail, banking, and hospitality landscapes across India.
              </p>
              <p style={{ fontSize: '0.875rem', color: '#4B5563', lineHeight: 1.7, marginBottom: '1.75rem' }}>
                Our specialized in-house civil engineers, commercial interior architects, and site supervisors relieve you of all execution stress: <em>You sit back and relax while we do all the hard work for you!</em>
              </p>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <button className="btn btn-dark" onClick={() => onSelectTab('about')}>
                  Learn Our Heritage <i className="fa-solid fa-arrow-right"></i>
                </button>
                <button className="btn btn-outline-brand" onClick={() => onSelectTab('turnkey')}>
                  Turnkey Methodology
                </button>
              </div>
            </div>
            <div style={{ position: 'relative' }}>
              <img
                src="/assets/images/mcdonalds-hyd-exterior.jpg"
                alt="Comfort Space Completed Project"
                style={{ width: '100%', borderRadius: '10px', boxShadow: 'var(--shadow-md)', objectFit: 'cover', maxHeight: '440px' }}
                loading="lazy"
              />
              <div
                style={{
                  position: 'absolute',
                  bottom: '-20px',
                  left: '-20px',
                  background: '#FFFFFF',
                  color: 'var(--text-heading)',
                  padding: '1.25rem 1.75rem',
                  borderRadius: '8px',
                  border: '1px solid var(--border-subtle)',
                  boxShadow: 'var(--shadow-md)',
                  maxWidth: '260px',
                }}
              >
                <div style={{ color: 'var(--brand-orange)', fontSize: '1.35rem', fontWeight: 800 }}>20+ YRS</div>
                <div style={{ fontSize: '0.75rem', color: '#64748B', marginTop: '0.25rem', fontWeight: 600 }}>
                  Delivering structurally sound, aesthetically superior spaces.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Services Grid Preview */}
      <section className="section-padding" style={{ background: '#FFFFFF' }}>
        <div className="container">
          <div className="section-header text-center">
            <span className="section-tag">Core Capabilities</span>
            <h2 className="section-title">Our Areas of Expertise</h2>
            <p className="section-subtitle">
              From heavy civil construction to bespoke modular joinery and 24/7 post-handover support, we cover every dimension of the built environment.
            </p>
          </div>

          <div className="services-grid">
            {INITIAL_DATA.services.slice(0, 3).map((srv) => (
              <div key={srv.id} className="service-card">
                <div className="service-card-img-wrap">
                  <img src={`/${srv.image.replace(/^\/+/, '')}`} alt={srv.title} />
                  <span className="service-number-pill">{srv.number}</span>
                </div>
                <div className="service-card-body">
                  <div className="service-icon-box">
                    <i className={`fa-solid ${srv.icon}`}></i>
                  </div>
                  <h3>{srv.title}</h3>
                  <div className="service-sub">{srv.subtitle}</div>
                  <p>{srv.summary}</p>
                  <ul className="service-features-list">
                    {srv.features.map((f, fIdx) => (
                      <li key={fIdx}>
                        <i className="fa-solid fa-check"></i> {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center" style={{ marginTop: '3.5rem' }}>
            <button className="btn btn-brand" onClick={() => onSelectTab('services')}>
              View All Services &amp; Specifications <i className="fa-solid fa-arrow-right"></i>
            </button>
          </div>
        </div>
      </section>

      {/* 7-Stage Turnkey Feature */}
      <section className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container">
          <div className="section-header text-center">
            <span className="section-tag">Guaranteed Delivery</span>
            <h2 className="section-title">Proprietary 7-Stage Turnkey Framework</h2>
            <p className="section-subtitle">
              Designed for institutional clients who demand zero timeline overruns, complete transparency, and flawless architectural precision.
            </p>
          </div>

          <div className="turnkey-wrapper">
            <div className="turnkey-roadmap-nav">
              {INITIAL_DATA.turnkeySteps.map((step, idx) => (
                <div
                  key={idx}
                  className={`turnkey-step-btn ${selectedTurnkeyStep === idx ? 'active' : ''}`}
                  onClick={() => setSelectedTurnkeyStep(idx)}
                >
                  <span className="turnkey-step-num">{step.step}</span>
                  <span className="turnkey-step-title">{step.title}</span>
                </div>
              ))}
            </div>

            <div className="turnkey-card-display">
              <span className="step-num-badge">Stage {currentTurnkey.step}</span>
              <h3>{currentTurnkey.title}</h3>
              <p>{currentTurnkey.description}</p>
              <button
                className="btn btn-brand btn-sm"
                onClick={() => onSelectTab('turnkey')}
                style={{ marginTop: '1.5rem' }}
              >
                Learn Turnkey Scope <i className="fa-solid fa-arrow-right"></i>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects Grid */}
      <section className="section-padding" style={{ background: '#FFFFFF' }}>
        <div className="container">
          <div className="section-header text-center">
            <span className="section-tag">Portfolio Highlights</span>
            <h2 className="section-title">Featured Project Showcase</h2>
            <p className="section-subtitle">
              A curated glimpse into our high-profile executions for McDonald's, MURO Restaurant, Tata Capital, and AU Small Finance Bank.
            </p>
          </div>

          <div className="projects-grid">
            {featuredProjects.map((proj) => (
              <div key={proj.id} className="project-card" onClick={() => onOpenProjectModal(proj)}>
                <div className="project-card-img-wrap">
                  <img src={`/${proj.image.replace(/^\/+/, '')}`} alt={proj.title} loading="lazy" />
                  <span className={`project-status-tag ${proj.status.toLowerCase().includes('handed') ? 'handed-over' : 'ongoing'}`}>
                    {proj.status}
                  </span>
                </div>
                <div className="project-card-body">
                  <span className="project-cat">{proj.categoryLabel || proj.category}</span>
                  <h3>{proj.title}</h3>
                  <div className="project-client">{proj.client}</div>
                  <div className="project-location">
                    <i className="fa-solid fa-location-dot"></i> {proj.city}, {proj.state}
                  </div>
                  <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.8rem', color: '#94A3B8', fontWeight: 600 }}>{proj.type}</span>
                    <button className="btn btn-outline-brand btn-sm" style={{ padding: '0.35rem 0.75rem', fontSize: '0.75rem' }}>
                      Details <i className="fa-solid fa-arrow-right"></i>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center" style={{ marginTop: '3.5rem' }}>
            <button className="btn btn-brand" onClick={() => onSelectTab('projects')}>
              Explore Full Project Gallery (With Filters) <i className="fa-solid fa-arrow-right"></i>
            </button>
          </div>
        </div>
      </section>

      {/* IGBC Green Building Feature */}
      <section className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container">
          <div className="igbc-feature-box">
            <div className="igbc-grid">
              <div>
                <span className="section-tag" style={{ background: '#DCFCE7', color: '#15803D', borderColor: 'rgba(22,163,74,0.3)' }}>
                  Sustainability Commitment
                </span>
                <h2 style={{ fontSize: '1.65rem', fontWeight: 750, margin: '0.75rem 0', color: '#064E3B', lineHeight: 1.3 }}>
                  Founding Member: Indian Green Building Council (IGBC)
                </h2>
                <p className="igbc-quote" style={{ fontSize: '1rem', marginBottom: '0.75rem' }}>
                  “To enable a sustainable built environment for all”
                </p>
                <p style={{ color: '#166534', lineHeight: 1.65, marginBottom: '1.5rem', fontSize: '0.875rem' }}>
                  At Comfort Space, environmental stewardship is embedded into our architectural DNA. We implement energy-efficient MEP layouts, low-VOC finishes, recycled acoustics, and water-conservation sanitary engineering across all turnkey commercial spaces.
                </p>
                <button className="btn btn-dark" onClick={() => onSelectTab('about')}>
                  Read About Our Green Practices <i className="fa-solid fa-leaf" style={{ color: '#4ADE80', marginLeft: '5px' }}></i>
                </button>
              </div>
              <div>
                <ul className="green-points-list">
                  <li className="green-point-item">
                    <h5 style={{ fontSize: '0.9rem' }}><i className="fa-solid fa-solar-panel"></i> Energy Efficiency</h5>
                    <p style={{ fontSize: '0.8rem' }}>Smart LED sensory arrays &amp; optimized HVAC thermal zoning.</p>
                  </li>
                  <li className="green-point-item">
                    <h5 style={{ fontSize: '0.9rem' }}><i className="fa-solid fa-recycle"></i> Sustainable Materials</h5>
                    <p style={{ fontSize: '0.8rem' }}>FSC-certified timber, low-VOC laminates &amp; recycled gypsum.</p>
                  </li>
                  <li className="green-point-item">
                    <h5 style={{ fontSize: '0.9rem' }}><i className="fa-solid fa-faucet-drip"></i> Water Conservation</h5>
                    <p style={{ fontSize: '0.8rem' }}>Aerated water fixtures &amp; intelligent commercial drainage.</p>
                  </li>
                  <li className="green-point-item">
                    <h5 style={{ fontSize: '0.9rem' }}><i className="fa-solid fa-shield-virus"></i> Indoor Air Quality</h5>
                    <p style={{ fontSize: '0.8rem' }}>High-MERV filtration &amp; acoustic comfort certification.</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Banner */}
      <section className="section-padding" style={{ background: '#FFFFFF' }}>
        <div className="container">
          <div className="section-header text-center">
            <span className="section-tag">Client Endorsements</span>
            <h2 className="section-title">What Our Partners Say</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {INITIAL_DATA.testimonials.map((t, idx) => (
              <div
                key={idx}
                style={{
                  background: '#F8FAFC',
                  border: '1px solid var(--border-subtle)',
                  padding: '1.75rem 2rem',
                  borderRadius: '10px',
                  boxShadow: 'var(--shadow-xs)',
                }}
              >
                <div style={{ color: 'var(--brand-orange)', fontSize: '1rem', marginBottom: '0.75rem' }}>★★★★★</div>
                <p style={{ color: '#334155', fontStyle: 'italic', fontSize: '0.875rem', lineHeight: 1.65, marginBottom: '1.25rem' }}>
                  "{t.quote}"
                </p>
                <h5 style={{ color: 'var(--text-heading)', fontSize: '0.875rem', fontWeight: 700 }}>{t.author}</h5>
                <span style={{ color: 'var(--brand-orange)', fontSize: '0.75rem', fontWeight: 600 }}>{t.company}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default HomePage;
