import React from 'react';
import { INITIAL_DATA } from '../data/initialData';

const ProjectsPage = ({ projects, onOpenProjectModal, selectedCategory = 'all', onSelectCategory }) => {
  const filteredProjects = projects.filter((proj) => {
    if (selectedCategory === 'all') return true;
    return proj.category === selectedCategory;
  });

  return (
    <main id="tab-projects" className="tab-page active-page">
      <div className="page-banner-wrap">
        <div className="container text-center">
          <span className="section-tag">Architectural Portfolio</span>
          <h1 className="page-banner-title">Our Handed-Over Projects</h1>
          <p className="section-subtitle">
            Explore our prestigious commercial, banking, luxury dining, and retail drive-thru spaces across India.
          </p>
        </div>
      </div>

      <section id="projects-gallery" className="section-padding" style={{ background: '#FFFFFF' }}>
        <div className="container">

          {/* Category Filters */}
          <div className="gallery-filters" id="projectFiltersWrap">
            {INITIAL_DATA.categories.map((cat) => (
              <button
                key={cat.id}
                className={`filter-btn ${selectedCategory === cat.id ? 'active' : ''}`}
                onClick={() => onSelectCategory(cat.id)}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Project Cards Grid */}
          <div className="projects-grid" id="projectGalleryGrid">
            {filteredProjects.map((proj) => (
              <div
                key={proj.id}
                className="project-card"
                onClick={() => onOpenProjectModal(proj)}
              >
                <div className="project-card-img-wrap">
                  <img src={`/${proj.image.replace(/^\/+/, '')}`} alt={proj.title} loading="lazy" />
                  <span
                    className={`project-status-tag ${proj.status.toLowerCase().includes('handed') ? 'handed-over' : 'ongoing'
                      }`}
                  >
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
                      Specs &amp; Photos <i className="fa-solid fa-arrow-right"></i>
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

export default ProjectsPage;
