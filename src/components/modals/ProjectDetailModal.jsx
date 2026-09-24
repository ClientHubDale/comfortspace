import React, { useState, useEffect } from 'react';
import { INITIAL_DATA } from '../../data/initialData';

const asPath = (src) => `/${String(src).replace(/^\/+/, '')}`;

const ProjectDetailModal = ({ project, onClose }) => {
  /* Hooks run unconditionally — the null guard sits below them, otherwise the
     hook order changes between renders as the modal opens and closes. */
  const [activeImage, setActiveImage] = useState(null);

  /* A different project reuses this same mounted component, so the preview has
     to follow it rather than keeping the previous project's shot. */
  useEffect(() => {
    setActiveImage(project ? project.image : null);
  }, [project]);

  /* Escape closes, and the page behind must not scroll while this is open. */
  useEffect(() => {
    if (!project) return;
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKey);
    };
  }, [project, onClose]);

  if (!project) return null;

  const hero = activeImage || project.image;
  const isHandedOver = project.status?.toLowerCase().includes('handed');

  return (
    <div
      className="csx-pm-overlay"
      data-lenis-prevent
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={project.title}
    >
      <div className="csx-pm-box" onClick={(e) => e.stopPropagation()}>
        {/* ---- hero ---- */}
        <div className="csx-pm-hero">
          <img src={asPath(hero)} alt={project.title} className="csx-pm-hero-img" />
          <span className="csx-pm-hero-veil" aria-hidden="true"></span>

          <span className={`csx-pm-status ${isHandedOver ? 'done' : 'live'}`}>
            <i className={`fa-solid ${isHandedOver ? 'fa-circle-check' : 'fa-hard-hat'}`}></i>
            {project.status}
          </span>

          <button className="csx-pm-close" onClick={onClose} aria-label="Close">
            <i className="fa-solid fa-xmark"></i>
          </button>

          <div className="csx-pm-hero-copy">
            <span className="csx-pm-tag">{project.categoryLabel || 'Turnkey Project'}</span>
            <h2>{project.title}</h2>
            <p className="csx-pm-client">{project.client}</p>
          </div>
        </div>

        {/* ---- body ---- */}
        <div className="csx-pm-body">
          <dl className="csx-pm-meta">
            <div>
              <dt>Location</dt>
              <dd>
                {project.city}, {project.state}
              </dd>
            </div>
            <div>
              <dt>Typology</dt>
              <dd>{project.type}</dd>
            </div>
            <div>
              <dt>Year</dt>
              <dd>{project.year || '2024'}</dd>
            </div>
            <div>
              <dt>Green Standard</dt>
              <dd>IGBC Norms Verified</dd>
            </div>
          </dl>

          <section className="csx-pm-section">
            <h3>Project Overview</h3>
            <p className="csx-pm-text">{project.description}</p>
          </section>

          {project.gallery?.length > 1 && (
            <section className="csx-pm-section">
              <h3>Photo Gallery</h3>
              <div className="csx-pm-thumbs">
                {project.gallery.map((img, idx) => (
                  <button
                    key={idx}
                    className={`csx-pm-thumb ${hero === img ? 'active' : ''}`}
                    onClick={() => setActiveImage(img)}
                    aria-label={`View photo ${idx + 1}`}
                  >
                    <img src={asPath(img)} alt="" loading="lazy" />
                  </button>
                ))}
              </div>
            </section>
          )}

          {project.scope?.length > 0 && (
            <section className="csx-pm-section">
              <h3>Turnkey Deliverables &amp; Execution Scope</h3>
              <ul className="csx-pm-scope">
                {project.scope.map((item, idx) => (
                  <li key={idx}>
                    <i className="fa-solid fa-check"></i> {item}
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>

        {/* ---- footer ---- */}
        <div className="csx-pm-foot">
          <a
            href={`https://wa.me/${INITIAL_DATA.company.whatsappNumber}?text=${encodeURIComponent(
              `Hello Comfort Space, I am inquiring about a project similar to ${project.title}.`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="csx-pm-btn brand"
          >
            <i className="fa-brands fa-whatsapp"></i> Inquire About a Similar Space
          </a>
          <button className="csx-pm-btn ghost" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailModal;
