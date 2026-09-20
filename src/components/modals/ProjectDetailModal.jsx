import React, { useState } from 'react';
import { INITIAL_DATA } from '../../data/initialData';

const ProjectDetailModal = ({ project, onClose }) => {
  if (!project) return null;

  const [activeImage, setActiveImage] = useState(project.image);

  return (
    <div className="modal-overlay active" id="projectDetailModal" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
          <i className="fa-solid fa-xmark"></i>
        </button>

        <div id="modalDynamicContent">
          <img
            id="modalHeroImg"
            src={`/${activeImage.replace(/^\/+/, '')}`}
            alt={project.title}
            className="modal-hero-img"
          />

          <div className="modal-inner-padding">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <span className="section-tag">{project.categoryLabel || 'Turnkey Project'}</span>
                <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-heading)', margin: '0.25rem 0' }}>
                  {project.title}
                </h2>
                <p style={{ fontSize: '1.1rem', color: 'var(--brand-orange)', fontWeight: 700 }}>
                  Client: {project.client}
                </p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span
                  className={`project-status-tag ${
                    project.status?.toLowerCase().includes('handed') ? 'handed-over' : 'ongoing'
                  }`}
                  style={{ position: 'static' }}
                >
                  {project.status}
                </span>
                <p style={{ fontSize: '0.8125rem', color: '#64748B', marginTop: '0.35rem' }}>
                  Year: {project.year || '2024'}
                </p>
              </div>
            </div>

            <div className="modal-meta-grid">
              <div className="modal-meta-item">
                <label>Location</label>
                <p>{project.city}, {project.state}</p>
              </div>
              <div className="modal-meta-item">
                <label>Typology</label>
                <p>{project.type}</p>
              </div>
              <div className="modal-meta-item">
                <label>Green Standard</label>
                <p>IGBC Norms Verified</p>
              </div>
              <div className="modal-meta-item">
                <label>Turnkey Scope</label>
                <p>End-to-End Delivery</p>
              </div>
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <h4 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--text-heading)', marginBottom: '0.75rem' }}>
                Project Overview
              </h4>
              <p style={{ fontSize: '0.95rem', color: '#4B5563', lineHeight: 1.8 }}>
                {project.description}
              </p>
            </div>

            {project.gallery && project.gallery.length > 0 && (
              <div style={{ marginBottom: '2rem' }}>
                <h4 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--text-heading)', marginBottom: '0.75rem' }}>
                  Project Photo Gallery
                </h4>
                <div style={{ display: 'flex', gap: '0.75rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
                  {project.gallery.map((img, idx) => (
                    <img
                      key={idx}
                      src={`/${img.replace(/^\/+/, '')}`}
                      alt={`${project.title} gallery thumbnail ${idx + 1}`}
                      onClick={() => setActiveImage(img)}
                      style={{
                        width: '120px',
                        height: '80px',
                        objectFit: 'cover',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        border: activeImage === img ? '2px solid var(--brand-orange)' : '1px solid var(--border-subtle)',
                        opacity: activeImage === img ? 1 : 0.7,
                        transition: 'all 0.2s ease',
                      }}
                    />
                  ))}
                </div>
              </div>
            )}

            {project.scope && project.scope.length > 0 && (
              <div style={{ marginBottom: '2.5rem' }}>
                <h4 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--text-heading)', marginBottom: '0.75rem' }}>
                  Turnkey Deliverables &amp; Execution Scope
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '0.75rem' }}>
                  {project.scope.map((s, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: '#334155' }}>
                      <i className="fa-solid fa-circle-check" style={{ color: 'var(--brand-green)' }}></i> {s}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', paddingTop: '1.5rem', borderTop: '1px solid var(--border-subtle)' }}>
              <a
                href={`https://wa.me/${INITIAL_DATA.company.whatsappNumber}?text=Hello%20Comfort%20Space,%20I%20am%20inquiring%20about%20a%20project%20similar%20to%20${encodeURIComponent(project.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-brand"
              >
                <i className="fa-brands fa-whatsapp"></i> Inquire About Similar Space
              </a>
              <button className="btn btn-outline-dark" onClick={onClose}>
                Close Details
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailModal;
