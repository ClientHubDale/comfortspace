import React, { useState } from 'react';

const BROWSER_TABS = [
  { id: 'overview', label: 'Corporate Overview', icon: 'fa-building' },
  { id: 'milestones', label: 'Evolution Milestones', icon: 'fa-timeline' },
  { id: 'leadership', label: 'Leadership', icon: 'fa-users' },
  { id: 'brochure', label: 'Credentials & Brochure', icon: 'fa-file-lines' },
];

const MILESTONES = [
  {
    year: '2004',
    title: 'Founded as Shivashakthi Comforts',
    desc: 'Incorporated in Bangalore with a mandate to bridge creative design and rigorous engineering execution. Early focus on residential and small commercial interior fit-outs.',
    icon: 'fa-seedling',
    color: '#16a34a',
  },
  {
    year: '2010',
    title: 'McDonald\'s Partnership Begins',
    desc: 'Secured the first major QSR turnkey contract with Hardcastle Restaurants Pvt. Ltd. — executing the landmark Hyderabad Flagship High Street outlet with McCafe integration.',
    icon: 'fa-handshake',
    color: '#ea580c',
  },
  {
    year: '2014',
    title: 'Banking & Corporate Expansion',
    desc: 'Executed Tata Capital\'s Mysore Regional Office & Training Centre, entering the high-specification corporate banking and NBFCs sector with structured cabling and MEP capabilities.',
    icon: 'fa-landmark',
    color: '#7c3aed',
  },
  {
    year: '2018',
    title: 'IGBC Founding Member Status',
    desc: 'Recognized as a Founding Member of the Indian Green Building Council (IGBC), cementing our commitment to eco-conscious, sustainable commercial architecture.',
    icon: 'fa-leaf',
    color: '#16a34a',
  },
  {
    year: '2022',
    title: 'Rebranded to Comfort Space Pvt. Ltd.',
    desc: 'Strategically restructured and rebranded from Shivashakthi Comforts to Comfort Space Pvt. Ltd., reflecting two decades of growth across 7+ states and 200+ project completions.',
    icon: 'fa-arrow-up-right-dots',
    color: '#ea580c',
  },
  {
    year: 'Now',
    title: '22+ McDonald\'s Sites & Counting',
    desc: 'Actively executing simultaneous multi-state turnkey builds across Gujarat, Maharashtra, Chhattisgarh, and Karnataka with a 100-member strong specialist squad.',
    icon: 'fa-rocket',
    color: '#0ea5e9',
  },
];

const LEADERSHIP = [
  {
    role: 'Managing Director',
    name: 'D. Sridhar Rao',
    expertise: 'Turnkey Architecture & Business Development',
    experience: '25+ Years',
    icon: 'fa-user-tie',
    color: '#4a2550',
  },
  {
    role: 'Principal Civil Engineer',
    name: 'Structural Engineering Lead',
    expertise: 'RCC, Façade Engineering & Site Execution',
    experience: '18+ Years',
    icon: 'fa-helmet-safety',
    color: '#ea580c',
  },
  {
    role: 'Chief Safety Officer',
    name: 'QSR & HSE Compliance Head',
    expertise: 'NBC Compliance, Fire Safety & Life Safety Systems',
    experience: '15+ Years',
    icon: 'fa-shield-halved',
    color: '#16a34a',
  },
  {
    role: 'PMC & Client Relations Head',
    name: 'Projects Management Lead',
    expertise: 'BOQ, SLA Governance & Client Coordination',
    experience: '20+ Years',
    icon: 'fa-clipboard-check',
    color: '#7c3aed',
  },
];

const CREDENTIALS = [
  { label: 'IGBC Founding Member', desc: 'Indian Green Building Council — Eco-Conscious Commercial Design', icon: 'fa-leaf', color: '#16a34a' },
  { label: 'ISO 9001 Compliance', desc: 'Quality Management Systems in Construction & Fit-Out', icon: 'fa-certificate', color: '#ea580c' },
  { label: 'McDonald\'s Approved Contractor', desc: 'Hardcastle Restaurants Pvt. Ltd. — West & South India', icon: 'fa-star', color: '#f59e0b' },
  { label: 'NBC Code Certified', desc: 'National Building Code & Fire Safety Statutory Compliance', icon: 'fa-shield-check', color: '#0ea5e9' },
  { label: 'Tata Capital Preferred Vendor', desc: 'Corporate Banking & NBFC Turnkey Fit-Out Partner', icon: 'fa-building-columns', color: '#7c3aed' },
  { label: '20+ Years of Excellence', desc: 'Consistent Performance Across Commercial, Retail & Hospitality', icon: 'fa-medal', color: '#d97706' },
];

const AboutPage = ({ onSelectTab }) => {
  const [browserTab, setBrowserTab] = useState('overview');

  return (
    <main id="tab-about" className="tab-page active-page">
      <div className="page-banner-wrap">
        <div className="container text-center">
          <span className="section-tag">Our Corporate Legacy</span>
          <h1 className="page-banner-title">Two Decades of Craftsmanship &amp; Trust</h1>
          <p className="section-subtitle">
            From Shivashakthi Comforts to Comfort Space Pvt. Ltd. — Shaping India's commercial interior landscape with structural durability and aesthetic brilliance.
          </p>
        </div>
      </div>

      <section className="section-padding" style={{ background: '#FFFFFF' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '4rem', alignItems: 'center' }}>
            <div>
              <span className="section-tag">Heritage &amp; Evolution</span>
              <h2 className="section-title" style={{ marginBottom: '1.25rem' }}>A 20-Year Legacy Built on Integrity &amp; Detail</h2>
              <p style={{ color: '#4B5563', lineHeight: 1.65, fontSize: '0.9rem', marginBottom: '1rem' }}>
                <strong>Comfort Space Pvt. Ltd.</strong> (formerly known as <em>Shivashakthi Comforts</em>) was founded with a clear mandate: to bridge the gap between creative architectural design and rigorous engineering execution.
              </p>
              <p style={{ color: '#4B5563', lineHeight: 1.65, fontSize: '0.875rem', marginBottom: '1rem' }}>
                Over 20+ years, our organization has earned the trust of India's most demanding corporate giants, banking institutions, QSR food chains, and luxury restaurants. Our in-house teams are always ready to take on intricate, complex specifications under tight deadlines.
              </p>
              <p style={{ color: '#4B5563', lineHeight: 1.65, fontSize: '0.875rem' }}>
                We put meticulous thought into every project we undertake to ensure that we provide our clients with structurally sound, aesthetically superior spaces while maintaining safety, sustainability, and complete client trust.
              </p>
            </div>
            <div style={{ background: 'var(--bg-secondary)', padding: '2.25rem 2.5rem', borderRadius: '12px', border: '1px solid var(--border-subtle)' }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 750, marginBottom: '1.25rem', color: 'var(--text-heading)' }}>
                Core Pillars of Our Practice
              </h3>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem', padding: 0 }}>
                <li style={{ display: 'flex', gap: '0.85rem', alignItems: 'flex-start' }}>
                  <i className="fa-solid fa-circle-check" style={{ color: 'var(--brand-orange)', fontSize: '1.1rem', marginTop: '2px' }}></i>
                  <div>
                    <strong style={{ color: 'var(--text-heading)', fontSize: '0.875rem', display: 'block' }}>Turnkey Single-Point Accountability</strong>
                    <span style={{ fontSize: '0.8rem', color: '#64748B' }}>No finger-pointing between civil, electrical, MEP, and carpentry contractors.</span>
                  </div>
                </li>
                <li style={{ display: 'flex', gap: '0.85rem', alignItems: 'flex-start' }}>
                  <i className="fa-solid fa-circle-check" style={{ color: 'var(--brand-orange)', fontSize: '1.1rem', marginTop: '2px' }}></i>
                  <div>
                    <strong style={{ color: 'var(--text-heading)', fontSize: '0.875rem', display: 'block' }}>In-House Specialist Squads</strong>
                    <span style={{ fontSize: '0.8rem', color: '#64748B' }}>Resident Civil Engineers, PMC managers, and Safety Officers on every site.</span>
                  </div>
                </li>
                <li style={{ display: 'flex', gap: '0.85rem', alignItems: 'flex-start' }}>
                  <i className="fa-solid fa-circle-check" style={{ color: 'var(--brand-orange)', fontSize: '1.1rem', marginTop: '2px' }}></i>
                  <div>
                    <strong style={{ color: 'var(--text-heading)', fontSize: '0.875rem', display: 'block' }}>IGBC Green Building Certified</strong>
                    <span style={{ fontSize: '0.8rem', color: '#64748B' }}>Proud Founding Member advocating for eco-conscious commercial spaces.</span>
                  </div>
                </li>
                <li style={{ display: 'flex', gap: '0.85rem', alignItems: 'flex-start' }}>
                  <i className="fa-solid fa-circle-check" style={{ color: 'var(--brand-orange)', fontSize: '1.1rem', marginTop: '2px' }}></i>
                  <div>
                    <strong style={{ color: 'var(--text-heading)', fontSize: '0.875rem', display: 'block' }}>24/7 Post-Handover Maintenance</strong>
                    <span style={{ fontSize: '0.8rem', color: '#64748B' }}>Round-the-clock emergency support squads and long-term AMC warranties.</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* === BROWSER SECTION === */}
      <section className="section-padding" style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-subtle)', borderBottom: '1px solid var(--border-subtle)' }}>
        <div className="container">
          <div className="section-header text-center" style={{ marginBottom: '2.5rem' }}>
            <span className="section-tag">Interactive Corporate Profile</span>
            <h2 className="section-title">Discover Comfort Space — In Depth</h2>
            <p className="section-subtitle">
              Explore our corporate DNA, 20-year evolution timeline, leadership squad, and accreditation credentials — all in one place.
            </p>
          </div>

          {/* Browser Window Mockup */}
          <div className="about-browser-mockup">
            {/* Chrome Bar */}
            <div className="about-browser-chrome">
              {/* Window Controls */}
              <div className="about-browser-dots">
                <span className="about-dot dot-red"></span>
                <span className="about-dot dot-yellow"></span>
                <span className="about-dot dot-green"></span>
              </div>

              {/* Address Bar */}
              <div className="about-browser-addressbar">
                <i className="fa-solid fa-lock" style={{ color: '#16a34a', fontSize: '0.7rem' }}></i>
                <span>comfortspace.com / corporate-profile</span>
                <i className="fa-solid fa-rotate-right" style={{ marginLeft: 'auto', color: '#94a3b8', fontSize: '0.7rem', cursor: 'pointer' }}></i>
              </div>

              {/* Tab Pills */}
              <div className="about-browser-tabpills">
                {BROWSER_TABS.map((tab) => (
                  <button
                    key={tab.id}
                    className={`about-browser-tabpill${browserTab === tab.id ? ' active' : ''}`}
                    onClick={() => setBrowserTab(tab.id)}
                  >
                    <i className={`fa-solid ${tab.icon}`}></i>
                    <span>{tab.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Browser Viewport / Content Area */}
            <div className="about-browser-viewport">

              {/* === TAB: OVERVIEW === */}
              {browserTab === 'overview' && (
                <div className="about-browser-content">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.75rem' }}>
                    <div style={{ width: '48px', height: '48px', borderRadius: '10px', background: 'var(--brand-orange-light)', border: '1.5px solid var(--brand-orange)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <i className="fa-solid fa-building" style={{ color: 'var(--brand-orange)', fontSize: '1.2rem' }}></i>
                    </div>
                    <div>
                      <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-heading)', marginBottom: '0.1rem' }}>Comfort Space Pvt. Ltd.</h3>
                      <span style={{ fontSize: '0.78rem', color: '#64748b', fontStyle: 'italic' }}>Formerly: Shivashakthi Comforts | Est. 2004 | Bangalore, India</span>
                    </div>
                  </div>

                  <p style={{ color: '#4b5563', lineHeight: 1.75, fontSize: '0.875rem', marginBottom: '1.5rem', borderLeft: '3px solid var(--brand-orange)', paddingLeft: '1rem' }}>
                    A premier interior design, civil construction, and turnkey project management firm delivering structurally superior and aesthetically refined commercial spaces across India's most demanding sectors — QSR, Banking, Corporate, and Luxury Hospitality.
                  </p>

                  {/* Fast Facts Grid */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1rem', marginBottom: '1.75rem' }}>
                    {[
                      { val: '20+', label: 'Years of Excellence', icon: 'fa-calendar-check', color: '#ea580c' },
                      { val: '200+', label: 'Projects Completed', icon: 'fa-layer-group', color: '#7c3aed' },
                      { val: '7+', label: 'States Covered', icon: 'fa-map-location-dot', color: '#0ea5e9' },
                      { val: '22+', label: "McDonald's Sites", icon: 'fa-store', color: '#f59e0b' },
                    ].map((fact) => (
                      <div key={fact.label} style={{ background: '#fff', border: '1px solid var(--border-subtle)', borderRadius: '10px', padding: '1.1rem', textAlign: 'center', boxShadow: 'var(--shadow-xs)' }}>
                        <i className={`fa-solid ${fact.icon}`} style={{ color: fact.color, fontSize: '1.2rem', marginBottom: '0.5rem', display: 'block' }}></i>
                        <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-heading)', lineHeight: 1 }}>{fact.val}</div>
                        <div style={{ fontSize: '0.72rem', color: '#64748b', marginTop: '0.25rem', lineHeight: 1.3 }}>{fact.label}</div>
                      </div>
                    ))}
                  </div>

                  <div style={{ background: 'linear-gradient(135deg, #4a2550 0%, #683568 100%)', borderRadius: '10px', padding: '1.25rem 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
                    <div>
                      <div style={{ color: '#fbbf24', fontWeight: 700, fontSize: '0.85rem', marginBottom: '0.2rem' }}>
                        <i className="fa-solid fa-leaf" style={{ marginRight: '0.4rem' }}></i>IGBC Founding Member
                      </div>
                      <div style={{ color: '#e2e8f0', fontSize: '0.78rem' }}>Advocating sustainable commercial built environments since 2018</div>
                    </div>
                    <button
                      className="btn btn-brand btn-sm"
                      onClick={() => onSelectTab('contact')}
                      style={{ whiteSpace: 'nowrap' }}
                    >
                      <i className="fa-solid fa-paper-plane"></i> Start a Project
                    </button>
                  </div>
                </div>
              )}

              {/* === TAB: MILESTONES === */}
              {browserTab === 'milestones' && (
                <div className="about-browser-content">
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-heading)', marginBottom: '0.4rem' }}>20-Year Corporate Evolution</h3>
                  <p style={{ color: '#64748b', fontSize: '0.82rem', marginBottom: '1.75rem' }}>From a boutique interior firm to a multi-state turnkey powerhouse.</p>
                  <div className="about-milestones-list">
                    {MILESTONES.map((m, idx) => (
                      <div key={m.year} className="about-milestone-item">
                        <div className="about-milestone-left">
                          <div className="about-milestone-dot" style={{ background: m.color }}>
                            <i className={`fa-solid ${m.icon}`} style={{ color: '#fff', fontSize: '0.75rem' }}></i>
                          </div>
                          {idx < MILESTONES.length - 1 && <div className="about-milestone-line"></div>}
                        </div>
                        <div className="about-milestone-body">
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.3rem' }}>
                            <span style={{ background: m.color, color: '#fff', fontSize: '0.68rem', fontWeight: 800, padding: '0.15rem 0.55rem', borderRadius: '9999px' }}>{m.year}</span>
                            <strong style={{ fontSize: '0.9rem', color: 'var(--text-heading)' }}>{m.title}</strong>
                          </div>
                          <p style={{ color: '#64748b', fontSize: '0.8rem', lineHeight: 1.55, margin: 0 }}>{m.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* === TAB: LEADERSHIP === */}
              {browserTab === 'leadership' && (
                <div className="about-browser-content">
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-heading)', marginBottom: '0.4rem' }}>Leadership &amp; Specialist Squad</h3>
                  <p style={{ color: '#64748b', fontSize: '0.82rem', marginBottom: '1.75rem' }}>In-house specialists who ensure every project is executed with precision and accountability.</p>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '1rem' }}>
                    {LEADERSHIP.map((leader) => (
                      <div key={leader.role} className="about-leader-card">
                        <div className="about-leader-icon" style={{ background: leader.color + '18', borderColor: leader.color + '40' }}>
                          <i className={`fa-solid ${leader.icon}`} style={{ color: leader.color, fontSize: '1.3rem' }}></i>
                        </div>
                        <div style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.8px', color: leader.color, marginBottom: '0.25rem' }}>{leader.role}</div>
                        <strong style={{ fontSize: '0.88rem', color: 'var(--text-heading)', display: 'block', marginBottom: '0.35rem' }}>{leader.name}</strong>
                        <p style={{ fontSize: '0.77rem', color: '#64748b', margin: '0 0 0.6rem', lineHeight: 1.4 }}>{leader.expertise}</p>
                        <span style={{ background: '#f8fafc', border: '1px solid var(--border-subtle)', borderRadius: '9999px', padding: '0.2rem 0.65rem', fontSize: '0.7rem', fontWeight: 700, color: '#475569' }}>
                          <i className="fa-solid fa-clock" style={{ marginRight: '0.3rem', color: leader.color }}></i>{leader.experience}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div style={{ marginTop: '1.5rem', background: '#f8fafc', border: '1px solid var(--border-subtle)', borderRadius: '8px', padding: '1rem 1.25rem', fontSize: '0.8rem', color: '#64748b', display: 'flex', alignItems: 'flex-start', gap: '0.65rem' }}>
                    <i className="fa-solid fa-circle-info" style={{ color: 'var(--brand-orange)', marginTop: '2px' }}></i>
                    <span>Every Comfort Space project is overseen by a dedicated Resident Engineer and a QA/QC supervisor — ensuring zero compromise on specification, safety, or deadline.</span>
                  </div>
                </div>
              )}

              {/* === TAB: BROCHURE === */}
              {browserTab === 'brochure' && (
                <div className="about-browser-content">
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-heading)', marginBottom: '0.4rem' }}>Corporate Accreditations &amp; Capability Deck</h3>
                  <p style={{ color: '#64748b', fontSize: '0.82rem', marginBottom: '1.75rem' }}>Our credentials, certifications, and industry recognitions that affirm our standards of delivery.</p>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '0.85rem', marginBottom: '1.75rem' }}>
                    {CREDENTIALS.map((cred) => (
                      <div key={cred.label} className="about-credential-card">
                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.85rem' }}>
                          <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: cred.color + '1a', border: `1.5px solid ${cred.color}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                            <i className={`fa-solid ${cred.icon}`} style={{ color: cred.color, fontSize: '0.9rem' }}></i>
                          </div>
                          <div>
                            <strong style={{ fontSize: '0.82rem', color: 'var(--text-heading)', display: 'block', marginBottom: '0.2rem' }}>{cred.label}</strong>
                            <span style={{ fontSize: '0.73rem', color: '#64748b', lineHeight: 1.4 }}>{cred.desc}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Capability Deck Download CTA */}
                  <div style={{ background: 'linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%)', border: '1.5px solid #ea580c40', borderRadius: '12px', padding: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.25rem' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.35rem' }}>
                        <i className="fa-solid fa-file-pdf" style={{ color: 'var(--brand-orange)', fontSize: '1.2rem' }}></i>
                        <strong style={{ color: 'var(--text-heading)', fontSize: '0.95rem' }}>Corporate Capability Brochure</strong>
                      </div>
                      <p style={{ color: '#64748b', fontSize: '0.8rem', margin: 0 }}>Complete profile: company overview, project portfolio, scope of work, accreditations, and contact details.</p>
                    </div>
                    <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                      <button
                        className="btn btn-brand btn-sm"
                        onClick={() => onSelectTab('contact')}
                      >
                        <i className="fa-solid fa-envelope"></i> Request Brochure
                      </button>
                      <button
                        className="btn btn-white btn-sm"
                        onClick={() => window.print()}
                      >
                        <i className="fa-solid fa-print"></i> Print Profile
                      </button>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      </section>

      {/* Geographic Footprint Across 7 States */}
      <section className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container">
          <div className="section-header text-center">
            <span className="section-tag">National Capability</span>
            <h2 className="section-title">Executing Seamlessly Across 7+ States</h2>
            <p className="section-subtitle">
              Our established logistics and mobile engineering squads allow us to execute simultaneous projects across South and Western India.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
            <div style={{ background: '#FFFFFF', padding: '1.5rem 1.25rem', borderRadius: '8px', border: '1px solid var(--border-subtle)', textAlign: 'center', boxShadow: 'var(--shadow-xs)' }}>
              <h3 style={{ color: 'var(--brand-orange)', fontSize: '1.15rem', fontWeight: 750 }}>Karnataka</h3>
              <p style={{ color: '#64748B', fontSize: '0.8rem', lineHeight: 1.5, marginTop: '0.35rem' }}>Bangalore HQ, Mysore, Doddabalapur, Bagalur, Budigere, Udupi, Suratkhal</p>
            </div>
            <div style={{ background: '#FFFFFF', padding: '1.5rem 1.25rem', borderRadius: '8px', border: '1px solid var(--border-subtle)', textAlign: 'center', boxShadow: 'var(--shadow-xs)' }}>
              <h3 style={{ color: 'var(--brand-orange)', fontSize: '1.15rem', fontWeight: 750 }}>Andhra Pradesh</h3>
              <p style={{ color: '#64748B', fontSize: '0.8rem', lineHeight: 1.5, marginTop: '0.35rem' }}>Visakhapatnam (Madhurawada, MVP Colony), Rajamundry, Ibrahimpatnam</p>
            </div>
            <div style={{ background: '#FFFFFF', padding: '1.5rem 1.25rem', borderRadius: '8px', border: '1px solid var(--border-subtle)', textAlign: 'center', boxShadow: 'var(--shadow-xs)' }}>
              <h3 style={{ color: 'var(--brand-orange)', fontSize: '1.15rem', fontWeight: 750 }}>Telangana</h3>
              <p style={{ color: '#64748B', fontSize: '0.8rem', lineHeight: 1.5, marginTop: '0.35rem' }}>Hyderabad Flagship &amp; McCafe, Aparna Mall, Phoenix Avance LUNA</p>
            </div>
            <div style={{ background: '#FFFFFF', padding: '1.5rem 1.25rem', borderRadius: '8px', border: '1px solid var(--border-subtle)', textAlign: 'center', boxShadow: 'var(--shadow-xs)' }}>
              <h3 style={{ color: 'var(--brand-orange)', fontSize: '1.15rem', fontWeight: 750 }}>Gujarat</h3>
              <p style={{ color: '#64748B', fontSize: '0.8rem', lineHeight: 1.5, marginTop: '0.35rem' }}>Poicha Highway Drive-Thru, Makwa &amp; Western Outlets</p>
            </div>
            <div style={{ background: '#FFFFFF', padding: '1.5rem 1.25rem', borderRadius: '8px', border: '1px solid var(--border-subtle)', textAlign: 'center', boxShadow: 'var(--shadow-xs)' }}>
              <h3 style={{ color: 'var(--brand-orange)', fontSize: '1.15rem', fontWeight: 750 }}>Maharashtra</h3>
              <p style={{ color: '#64748B', fontSize: '0.8rem', lineHeight: 1.5, marginTop: '0.35rem' }}>Mumbai, Dombivli High Street, Nagpur</p>
            </div>
            <div style={{ background: '#FFFFFF', padding: '1.5rem 1.25rem', borderRadius: '8px', border: '1px solid var(--border-subtle)', textAlign: 'center', boxShadow: 'var(--shadow-xs)' }}>
              <h3 style={{ color: 'var(--brand-orange)', fontSize: '1.15rem', fontWeight: 750 }}>Tamil Nadu</h3>
              <p style={{ color: '#64748B', fontSize: '0.8rem', lineHeight: 1.5, marginTop: '0.35rem' }}>Mettupalayam Highway Corridor &amp; Regional Hubs</p>
            </div>
            <div style={{ background: '#FFFFFF', padding: '1.5rem 1.25rem', borderRadius: '8px', border: '1px solid var(--border-subtle)', textAlign: 'center', boxShadow: 'var(--shadow-xs)' }}>
              <h3 style={{ color: 'var(--brand-orange)', fontSize: '1.15rem', fontWeight: 750 }}>Goa</h3>
              <p style={{ color: '#64748B', fontSize: '0.8rem', lineHeight: 1.5, marginTop: '0.35rem' }}>Madgaon High Street Flagship &amp; Coastal Outlets</p>
            </div>
            <div style={{ background: '#FFFFFF', padding: '1.5rem 1.25rem', borderRadius: '8px', border: '1px solid var(--border-subtle)', textAlign: 'center', boxShadow: 'var(--shadow-xs)' }}>
              <h3 style={{ color: 'var(--brand-orange)', fontSize: '1.15rem', fontWeight: 750 }}>Chhattisgarh</h3>
              <p style={{ color: '#64748B', fontSize: '0.8rem', lineHeight: 1.5, marginTop: '0.35rem' }}>Raipur Commercial &amp; Retail Outlets</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AboutPage;
