import React from 'react';
import { INITIAL_DATA } from '../data/initialData';

const TurnkeyPage = ({ onSelectTab }) => {

  return (
    <main id="tab-turnkey" className="tab-page active-page">
      <div className="page-banner-wrap">
        <div className="container text-center">
          <span className="section-tag">Unified Turnkey Track</span>
          <h1 className="page-banner-title">Turnkey Projects &amp; Civil Infrastructure</h1>
          <p className="section-subtitle">
            From site inspection to pre-handover snag clearance and transparent PO-based billing. Single-window responsibility for heavy commercial builds.
          </p>
        </div>
      </div>

      {/* The 7 Step Scope of Work Breakdown */}
      <section className="section-padding" style={{ background: '#FFFFFF' }}>
        <div className="container">
          <div className="section-header text-center">
            <span className="section-tag">Execution Roadmap</span>
            <h2 className="section-title">The 7-Step Turnkey Scope of Work</h2>
            <p className="section-subtitle">
              Our systematic framework documented in client service level agreements (SLAs).
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
            {/* Step 01 */}
            <div style={{ background: '#FFFFFF', borderRadius: '10px', border: '1px solid var(--border-subtle)', overflow: 'hidden', boxShadow: 'var(--shadow-xs)', display: 'flex', flexDirection: 'column' }}>
              <div style={{ height: '180px', position: 'relative', overflow: 'hidden' }}>
                <img
                  src="/assets/images/extracted_18_McDonald_s_Hyderabad.jpeg"
                  alt="Pre-Commencement Site Inspection"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{ position: 'absolute', top: '12px', left: '12px', background: 'rgba(30, 37, 56, 0.88)', color: '#F59E0B', fontWeight: 800, fontSize: '0.8rem', padding: '0.25rem 0.75rem', borderRadius: '9999px', border: '1px solid rgba(245, 158, 11, 0.3)' }}>
                  Step 01
                </div>
              </div>
              <div style={{ padding: '1.35rem 1.5rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.4rem', color: 'var(--text-heading)' }}>Pre-Commencement Inspection</h3>
                <p style={{ color: '#4B5563', lineHeight: 1.6, fontSize: '0.85rem' }}>
                  Team audits physical site measurements against given blueprints, checks baseline MEP rough-ins, and alerts client and architects immediately if any physical deviations exist.
                </p>
              </div>
            </div>

            {/* Step 02 */}
            <div style={{ background: '#FFFFFF', borderRadius: '10px', border: '1px solid var(--border-subtle)', overflow: 'hidden', boxShadow: 'var(--shadow-xs)', display: 'flex', flexDirection: 'column' }}>
              <div style={{ height: '180px', position: 'relative', overflow: 'hidden' }}>
                <img
                  src="/assets/images/mcdonalds-hyd-exterior.jpg"
                  alt="Landlord & Municipal Coordination"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{ position: 'absolute', top: '12px', left: '12px', background: 'rgba(30, 37, 56, 0.88)', color: '#F59E0B', fontWeight: 800, fontSize: '0.8rem', padding: '0.25rem 0.75rem', borderRadius: '9999px', border: '1px solid rgba(245, 158, 11, 0.3)' }}>
                  Step 02
                </div>
              </div>
              <div style={{ padding: '1.35rem 1.5rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.4rem', color: 'var(--text-heading)' }}>Landlord &amp; Municipal Permits</h3>
                <p style={{ color: '#4B5563', lineHeight: 1.6, fontSize: '0.85rem' }}>
                  Seamless coordination with Landlords (LL), Mall managers, and municipal utility providers for work permits, night-shift logistics, debris removal, and life safety sign-offs.
                </p>
              </div>
            </div>

            {/* Step 03 */}
            <div style={{ background: '#FFFFFF', borderRadius: '10px', border: '1px solid var(--border-subtle)', overflow: 'hidden', boxShadow: 'var(--shadow-xs)', display: 'flex', flexDirection: 'column' }}>
              <div style={{ height: '180px', position: 'relative', overflow: 'hidden' }}>
                <img
                  src="/assets/images/mcdonalds-hyd-kitchen.jpg"
                  alt="Specification-Grade Procurement"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{ position: 'absolute', top: '12px', left: '12px', background: 'rgba(30, 37, 56, 0.88)', color: '#F59E0B', fontWeight: 800, fontSize: '0.8rem', padding: '0.25rem 0.75rem', borderRadius: '9999px', border: '1px solid rgba(245, 158, 11, 0.3)' }}>
                  Step 03
                </div>
              </div>
              <div style={{ padding: '1.35rem 1.5rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.4rem', color: 'var(--text-heading)' }}>Specification-Grade Procurement</h3>
                <p style={{ color: '#4B5563', lineHeight: 1.6, fontSize: '0.85rem' }}>
                  Direct procurement and supply of materials strictly adhering to approved BOQs. From fire-retardant ply to commercial electrical breakers, all batches undergo quality audits.
                </p>
              </div>
            </div>

            {/* Step 04 */}
            <div style={{ background: '#FFFFFF', borderRadius: '10px', border: '1px solid var(--border-subtle)', overflow: 'hidden', boxShadow: 'var(--shadow-xs)', display: 'flex', flexDirection: 'column' }}>
              <div style={{ height: '180px', position: 'relative', overflow: 'hidden' }}>
                <img
                  src="/assets/images/tata-capital-workstations.png"
                  alt="Periodical Reviews & Timely Updates"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{ position: 'absolute', top: '12px', left: '12px', background: 'rgba(30, 37, 56, 0.88)', color: '#F59E0B', fontWeight: 800, fontSize: '0.8rem', padding: '0.25rem 0.75rem', borderRadius: '9999px', border: '1px solid rgba(245, 158, 11, 0.3)' }}>
                  Step 04
                </div>
              </div>
              <div style={{ padding: '1.35rem 1.5rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.4rem', color: 'var(--text-heading)' }}>Reviews &amp; Timely Updates</h3>
                <p style={{ color: '#4B5563', lineHeight: 1.6, fontSize: '0.85rem' }}>
                  Periodical on-site coordination meetings with Client Project Managers and Architects. Constant real-time progress updates addressing potential risks to guarantee on-time completion.
                </p>
              </div>
            </div>

            {/* Step 05 */}
            <div style={{ background: '#FFFFFF', borderRadius: '10px', border: '1px solid var(--border-subtle)', overflow: 'hidden', boxShadow: 'var(--shadow-xs)', display: 'flex', flexDirection: 'column' }}>
              <div style={{ height: '180px', position: 'relative', overflow: 'hidden' }}>
                <img
                  src="/assets/images/mcdonalds-hyd-mccafe.png"
                  alt="Pre-Handover Snag Rectification"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{ position: 'absolute', top: '12px', left: '12px', background: 'rgba(30, 37, 56, 0.88)', color: '#F59E0B', fontWeight: 800, fontSize: '0.8rem', padding: '0.25rem 0.75rem', borderRadius: '9999px', border: '1px solid rgba(245, 158, 11, 0.3)' }}>
                  Step 05
                </div>
              </div>
              <div style={{ padding: '1.35rem 1.5rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.4rem', color: 'var(--text-heading)' }}>Snag Rectification Audits</h3>
                <p style={{ color: '#4B5563', lineHeight: 1.6, fontSize: '0.85rem' }}>
                  Site readiness audit prior to client walkthrough. Snags in joinery, paint touch-ups, circuit balancing, and fixture alignment are cleared with dedicated zero-compromise squads.
                </p>
              </div>
            </div>

            {/* Step 06 */}
            <div style={{ background: '#FFFFFF', borderRadius: '10px', border: '1px solid var(--border-subtle)', overflow: 'hidden', boxShadow: 'var(--shadow-xs)', display: 'flex', flexDirection: 'column' }}>
              <div style={{ height: '180px', position: 'relative', overflow: 'hidden' }}>
                <img
                  src="/assets/images/mcdonalds-hyd-counters.png"
                  alt="Handing Over & Sign-Off"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{ position: 'absolute', top: '12px', left: '12px', background: 'rgba(30, 37, 56, 0.88)', color: '#F59E0B', fontWeight: 800, fontSize: '0.8rem', padding: '0.25rem 0.75rem', borderRadius: '9999px', border: '1px solid rgba(245, 158, 11, 0.3)' }}>
                  Step 06
                </div>
              </div>
              <div style={{ padding: '1.35rem 1.5rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.4rem', color: 'var(--text-heading)' }}>Handing Over &amp; Sign-Off</h3>
                <p style={{ color: '#4B5563', lineHeight: 1.6, fontSize: '0.85rem' }}>
                  Formal joint inspection, testing of all MEP and life-safety systems, delivery of as-built drawings and warranty certificates, leading to the official client sign-off.
                </p>
              </div>
            </div>
          </div>

          <div style={{ background: '#FFFFFF', border: '1.5px solid var(--brand-orange)', padding: '1.5rem 2rem', borderRadius: '10px', marginTop: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.25rem', boxShadow: 'var(--shadow-xs)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
              <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: 'var(--brand-orange-light)', border: '1.5px solid var(--brand-orange)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--brand-orange)', fontWeight: 800, fontSize: '1.15rem', flexShrink: 0 }}>
                07
              </div>
              <div>
                <span style={{ color: 'var(--brand-orange)', fontWeight: 750, fontSize: '1.05rem', display: 'block' }}>Step 07: Transparent Billing &amp; PO Settlement</span>
                <p style={{ color: '#64748B', fontSize: '0.85rem', marginTop: '0.2rem' }}>Submission of final itemized bills with verified joint measurements strictly adhering to PO terms.</p>
              </div>
            </div>
            <button className="btn btn-brand" onClick={() => onSelectTab('contact')}>
              Initiate Turnkey Inquiry
            </button>
          </div>
        </div>
      </section>

      {/* Turnkey Deliverables in Action Gallery */}
      <section className="section-padding" style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-subtle)', borderBottom: '1px solid var(--border-subtle)' }}>
        <div className="container">
          <div className="section-header text-center">
            <span className="section-tag">Visual Verification</span>
            <h2 className="section-title">Turnkey Deliverables in Action</h2>
            <p className="section-subtitle">Real site photographs demonstrating structural integrity, precision MEP joinery, and corporate fit-out standards across key sectors.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
            <div style={{ background: '#FFFFFF', borderRadius: '10px', overflow: 'hidden', border: '1px solid var(--border-subtle)', boxShadow: 'var(--shadow-xs)' }}>
              <div style={{ height: '200px', overflow: 'hidden' }}>
                <img src="/assets/images/mcdonalds-hyd-exterior.jpg" alt="McDonald's Turnkey Facade" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ padding: '1.15rem 1.25rem' }}>
                <span style={{ color: 'var(--brand-orange)', fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', display: 'block', marginBottom: '0.25rem' }}>QSR Civil Infrastructure</span>
                <strong style={{ fontSize: '0.95rem', color: 'var(--text-heading)', display: 'block', marginBottom: '0.35rem' }}>McDonald's Hyderabad Flagship</strong>
                <p style={{ color: '#64748B', fontSize: '0.8rem', lineHeight: 1.5, margin: 0 }}>Structural glazing, drive-thru civil aprons, and outdoor branding fit-out.</p>
              </div>
            </div>

            <div style={{ background: '#FFFFFF', borderRadius: '10px', overflow: 'hidden', border: '1px solid var(--border-subtle)', boxShadow: 'var(--shadow-xs)' }}>
              <div style={{ height: '200px', overflow: 'hidden' }}>
                <img src="/assets/images/mcdonalds-hyd-kitchen.jpg" alt="Commercial Kitchen MEP" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ padding: '1.15rem 1.25rem' }}>
                <span style={{ color: 'var(--brand-orange)', fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', display: 'block', marginBottom: '0.25rem' }}>Heavy MEP &amp; Kitchens</span>
                <strong style={{ fontSize: '0.95rem', color: 'var(--text-heading)', display: 'block', marginBottom: '0.35rem' }}>Commercial Kitchen &amp; MEP</strong>
                <p style={{ color: '#64748B', fontSize: '0.8rem', lineHeight: 1.5, margin: 0 }}>Stainless steel hoods, specialized grease drainage, and fire suppression systems.</p>
              </div>
            </div>

            <div style={{ background: '#FFFFFF', borderRadius: '10px', overflow: 'hidden', border: '1px solid var(--border-subtle)', boxShadow: 'var(--shadow-xs)' }}>
              <div style={{ height: '200px', overflow: 'hidden' }}>
                <img src="/assets/images/tata-capital-workstations.png" alt="Corporate Turnkey Fit-Out" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ padding: '1.15rem 1.25rem' }}>
                <span style={{ color: 'var(--brand-orange)', fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', display: 'block', marginBottom: '0.25rem' }}>Corporate Headquarters</span>
                <strong style={{ fontSize: '0.95rem', color: 'var(--text-heading)', display: 'block', marginBottom: '0.35rem' }}>Tata Capital Regional Hub</strong>
                <p style={{ color: '#64748B', fontSize: '0.8rem', lineHeight: 1.5, margin: 0 }}>Modular workstation clusters, acoustic ceilings, and integrated cabling.</p>
              </div>
            </div>

            <div style={{ background: '#FFFFFF', borderRadius: '10px', overflow: 'hidden', border: '1px solid var(--border-subtle)', boxShadow: 'var(--shadow-xs)' }}>
              <div style={{ height: '200px', overflow: 'hidden' }}>
                <img src="/assets/images/muro-bar-dining.jpg" alt="Luxury Hospitality Fit-Out" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ padding: '1.15rem 1.25rem' }}>
                <span style={{ color: 'var(--brand-orange)', fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', display: 'block', marginBottom: '0.25rem' }}>Turnkey Hospitality</span>
                <strong style={{ fontSize: '0.95rem', color: 'var(--text-heading)', display: 'block', marginBottom: '0.35rem' }}>MURO Luxury Dining &amp; Bar</strong>
                <p style={{ color: '#64748B', fontSize: '0.8rem', lineHeight: 1.5, margin: 0 }}>Bespoke timber louvers, marble counters, ambient architectural lighting.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ongoing McDonald's Projects */}
      <section className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container">
          <div className="section-header text-center">
            <span className="section-tag">Active Construction</span>
            <h2 className="section-title">Ongoing Turnkey Projects Tracker</h2>
            <p className="section-subtitle">Live status of ongoing McDonald's executions for Hardcastle Restaurants Pvt. Ltd.</p>
          </div>

          <div className="table-responsive">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Site Location</th>
                  <th>State</th>
                  <th>Client Partner</th>
                  <th>Current Milestone</th>
                  <th>Execution Progress</th>
                </tr>
              </thead>
              <tbody>
                {INITIAL_DATA.ongoingProjects.map((proj) => (
                  <tr key={proj.sl}>
                    <td><strong>{proj.site}</strong></td>
                    <td>{proj.state}</td>
                    <td><span style={{ color: 'var(--brand-orange)', fontWeight: 600 }}>{proj.client}</span></td>
                    <td>{proj.stage}</td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <div style={{ flexGrow: 1, height: '8px', background: '#E2E8F0', borderRadius: '9999px', overflow: 'hidden' }}>
                          <div style={{ width: `${proj.progress}%`, height: '100%', background: 'linear-gradient(90deg, #F59E0B, #10B981)', borderRadius: '9999px' }}></div>
                        </div>
                        <span style={{ fontSize: '0.8rem', fontWeight: 700, minWidth: '35px' }}>{proj.progress}%</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

    </main>
  );
};

export default TurnkeyPage;
