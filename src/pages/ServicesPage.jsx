import React from 'react';
import { INITIAL_DATA } from '../data/initialData';

const ServicesPage = ({ onSelectTab }) => {
  return (
    <main id="tab-services" className="tab-page active-page">
      <div className="page-banner-wrap">
        <div className="container text-center">
          <span className="section-tag">End-to-End Capabilities</span>
          <h1 className="page-banner-title">Comprehensive Spatial &amp; Civil Solutions</h1>
          <p className="section-subtitle">
            Meticulous engineering, bespoke joinery, life safety, and round-the-clock maintenance built to meet stringent commercial timelines.
          </p>
        </div>
      </div>

      <section className="section-padding" style={{ background: '#FFFFFF' }}>
        <div className="container">
          <div className="services-grid" id="fullServicesGrid">
            {INITIAL_DATA.services.map((srv) => (
              <div key={srv.id} className="service-card">
                <div className="service-card-img-wrap">
                  <img src={`/${srv.image.replace(/^\/+/, '')}`} alt={srv.title} loading="lazy" />
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
                    {srv.features.map((feat, fIdx) => (
                      <li key={fIdx}>
                        <i className="fa-solid fa-check"></i> {feat}
                      </li>
                    ))}
                  </ul>
                  <div style={{ marginTop: '1.5rem' }}>
                    <button
                      className="btn btn-outline-brand btn-sm"
                      style={{ width: '100%', justifyContent: 'center' }}
                      onClick={() => onSelectTab('contact')}
                    >
                      Inquire About This Service <i className="fa-solid fa-arrow-right"></i>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default ServicesPage;
