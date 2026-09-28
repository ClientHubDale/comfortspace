import React, { useLayoutEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import { INITIAL_DATA } from '../data/initialData';
import useScrollReveal from '../hooks/useScrollReveal';
import { smoothScrollTo } from '../utils/smoothScroll';

import { assetSrc as src } from '../utils/assetSrc';

const HERO_COLUMNS = [
  [
    'assets/images/mcd-hyd-entrance.jpg',
    'assets/images/cs-muro-lounge.jpg',
    'assets/images/cs-tata-training.jpg',
    'assets/images/mcd-hyd-kiosks.jpg',
  ],
  [
    'assets/images/cs-au-bank-floor.jpg',
    'assets/images/mcd-hyd-mccafe-bar.jpg',
    'assets/images/muro-bar-dining.jpg',
    'assets/images/cs-tata-reception.jpg',
  ],
];

/* --------------------------------------------------------------------------
   Project Gallery
   -------------------------------------------------------------------------- */
const ProjectsPage = ({ projects, onOpenProjectModal, onSelectTab, selectedCategory = 'all', onSelectCategory }) => {
  const categories = INITIAL_DATA.categories;
  const clients = INITIAL_DATA.clients;
  const mcd = INITIAL_DATA.mcdonaldsHandedOver;

  const featured = projects.find((p) => p.id === 'proj-mcd-hyd') || projects[0];
  const featuredShots = featured ? (featured.gallery?.length ? featured.gallery : [featured.image]) : [];
  const [shot, setShot] = useState(0);

  const filtersRef = useRef(null);
  const [pill, setPill] = useState({ left: 0, width: 0 });

  useScrollReveal([projects.length, selectedCategory]);

  const filtered = projects.filter((p) => selectedCategory === 'all' || p.category === selectedCategory);
  /* On the 3-column grid a wide card fills two cells; widen just enough cards
     (first and/or last) that every row comes out full. */
  const wides = (3 - (filtered.length % 3)) % 3;
  const isWide = (idx) => (wides >= 1 && idx === 0) || (wides === 2 && idx === filtered.length - 1);

  const countFor = (id) => (id === 'all' ? projects.length : projects.filter((p) => p.category === id).length);

  /* The highlight behind the active filter slides to it */
  useLayoutEffect(() => {
    const place = () => {
      const wrap = filtersRef.current;
      const btn = wrap?.querySelector('.pgx-filter.is-active');
      if (btn) setPill({ left: btn.offsetLeft, width: btn.offsetWidth });
    };
    place();
    window.addEventListener('resize', place);
    return () => window.removeEventListener('resize', place);
  }, [selectedCategory]);

  /* Cards glide to their new places when the filter changes (View
     Transitions API); browsers without it simply swap instantly. */
  const pickCategory = (id) => {
    if (id === selectedCategory) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (document.startViewTransition && !reduced) {
      document.startViewTransition(() => flushSync(() => onSelectCategory(id)));
    } else {
      onSelectCategory(id);
    }
  };

  /* Client cards lean toward the cursor */
  const tilt = (e) => {
    const card = e.currentTarget;
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    card.style.setProperty('--ry', `${x * 10}deg`);
    card.style.setProperty('--rx', `${-y * 10}deg`);
    card.style.setProperty('--mx', `${e.clientX - r.left}px`);
    card.style.setProperty('--my', `${e.clientY - r.top}px`);
  };
  const untilt = (e) => {
    e.currentTarget.style.setProperty('--ry', '0deg');
    e.currentTarget.style.setProperty('--rx', '0deg');
  };

  /* McDonald's outlets grouped by state, largest first */
  const byState = Object.entries(
    mcd.reduce((acc, m) => {
      (acc[m.state] = acc[m.state] || []).push(m);
      return acc;
    }, {})
  ).sort((a, b) => b[1].length - a[1].length);
  const typeCounts = Object.entries(
    mcd.reduce((acc, m) => ({ ...acc, [m.type]: (acc[m.type] || 0) + 1 }), {})
  ).sort((a, b) => b[1] - a[1]);

  return (
    <main id="tab-projects" className="tab-page active-page csx-page csx-projects">
      {/* ====================================================================
          1. HERO — copy beside two photo columns drifting in opposite ways
          ==================================================================== */}
      <section className="pgx-hero">
        <div className="container pgx-hero-grid">
          <div className="pgx-hero-copy">
            <nav className="abx-crumb" aria-label="Breadcrumb">
              <button onClick={() => onSelectTab('home')}>Home</button>
              <span aria-hidden="true">/</span>
              <span aria-current="page">Project Gallery</span>
            </nav>

            <span className="abx-eyebrow">
              <span className="abx-eyebrow-line" aria-hidden="true"></span>
              Architectural Portfolio
            </span>

            <h1 className="pgx-title">
              <span className="pgx-title-line">Spaces we&apos;ve</span>
              <span className="pgx-title-line">
                <em>handed over.</em>
              </span>
            </h1>

            <p className="pgx-sub">
              Flagship QSRs and highway drive-thrus, luxury dining, banking branches and corporate
              campuses — delivered turnkey across India.
            </p>

            <div className="pgx-hero-stats">
              <div>
                <strong>200+</strong>
                <span>Projects completed</span>
              </div>
              <div>
                <strong>22+</strong>
                <span>McDonald&apos;s outlets</span>
              </div>
              <div>
                <strong>{clients.length}</strong>
                <span>Brand partners featured</span>
              </div>
            </div>

            <div className="pgx-hero-actions">
              <button
                className="csx-btn csx-btn-dark"
                onClick={() => smoothScrollTo('projects-gallery')}
              >
                Browse Projects <i className="fa-solid fa-arrow-down"></i>
              </button>
              <button className="csx-btn csx-btn-outline" onClick={() => onSelectTab('contact')}>
                Start Yours
              </button>
            </div>
          </div>

          <div className="pgx-columns" aria-hidden="true">
            {HERO_COLUMNS.map((col, c) => (
              <div key={c} className={`pgx-column ${c ? 'is-down' : ''}`}>
                <div className="pgx-column-rail">
                  {[...col, ...col].map((img, i) => (
                    <img key={i} src={src(img)} alt="" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================================
          2. FEATURED CASE STUDY
          ==================================================================== */}
      {featured && (
        <section id="pg-flagship" className="pgx-section">
          <div className="container">
            <div className="pgx-case" data-reveal>
              <div className="pgx-case-media">
                <div className="pgx-case-stage">
                  <img key={shot} src={src(featuredShots[shot])} alt={featured.title} />
                  <span className="pgx-case-badge">
                    <i className="fa-solid fa-star"></i> Flagship Case Study
                  </span>
                </div>
                {featuredShots.length > 1 && (
                  <div className="pgx-case-thumbs">
                    {featuredShots.map((g, i) => (
                      <button
                        key={g}
                        className={`pgx-thumb ${i === shot ? 'is-active' : ''}`}
                        onClick={() => setShot(i)}
                        aria-label={`Show photo ${i + 1}`}
                      >
                        <img src={src(g)} alt="" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="pgx-case-copy">
                <span className="csx-tag">{featured.categoryLabel}</span>
                <h2>{featured.title}</h2>
                <dl className="pgx-case-meta">
                  <div>
                    <dt>Client</dt>
                    <dd>{featured.client}</dd>
                  </div>
                  <div>
                    <dt>Location</dt>
                    <dd>
                      {featured.city}, {featured.state}
                    </dd>
                  </div>
                  <div>
                    <dt>Format</dt>
                    <dd>{featured.type}</dd>
                  </div>
                  <div>
                    <dt>Status</dt>
                    <dd>
                      {featured.status} · {featured.year}
                    </dd>
                  </div>
                </dl>
                <p>{featured.description}</p>
                <ul className="pgx-case-scope">
                  {(featured.scope || []).map((s) => (
                    <li key={s}>
                      <i className="fa-solid fa-check"></i>
                      {s}
                    </li>
                  ))}
                </ul>
                <button className="csx-btn csx-btn-brand" onClick={() => onOpenProjectModal(featured)}>
                  Open Full Gallery &amp; Specs <i className="fa-solid fa-expand"></i>
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ====================================================================
          3. GALLERY — sliding filter + cards that glide when filtered
          ==================================================================== */}
      <section id="projects-gallery" className="pgx-section pgx-tint">
        <div className="container">
          <div className="pgx-head" data-reveal>
            <div>
              <span className="csx-tag">All Projects</span>
              <h2 className="csx-head-title csx-head-sm">Explore the portfolio</h2>
            </div>

            <div className="pgx-filters" ref={filtersRef} role="tablist" aria-label="Filter projects">
              <span className="pgx-filter-pill" style={{ left: pill.left, width: pill.width }} aria-hidden="true"></span>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  role="tab"
                  aria-selected={selectedCategory === cat.id}
                  className={`pgx-filter ${selectedCategory === cat.id ? 'is-active' : ''}`}
                  onClick={() => pickCategory(cat.id)}
                >
                  {cat.name}
                  <span className="pgx-filter-count">{countFor(cat.id)}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="pgx-grid">
            {filtered.map((proj, idx) => (
              <article
                key={proj.id}
                className={`pgx-card ${isWide(idx) ? 'is-wide' : ''}`}
                style={{ viewTransitionName: `pg-${proj.id.replace(/[^a-zA-Z0-9-]/g, '')}` }}
                onClick={() => onOpenProjectModal(proj)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onOpenProjectModal(proj);
                  }
                }}
                role="button"
                tabIndex={0}
              >
                <img src={src(proj.image)} alt={proj.title} loading="lazy" />
                <span className="pgx-card-shade" aria-hidden="true"></span>
                <span className={`pgx-card-status ${/handed/i.test(proj.status) ? 'done' : 'live'}`}>
                  {!/handed/i.test(proj.status) && <span className="tkx-live-dot" aria-hidden="true"></span>}
                  {proj.status}
                </span>
                <div className="pgx-card-body">
                  <span className="pgx-card-cat">
                    {proj.type} · {proj.city}
                  </span>
                  <h3>{proj.title}</h3>
                  <ul className="pgx-card-scope">
                    {(proj.scope || []).slice(0, 3).map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ul>
                  <span className="pgx-card-go">
                    View project <i className="fa-solid fa-arrow-right"></i>
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================================
          4. McDONALD'S ROLLOUT — every handed-over outlet by state
          ==================================================================== */}
      <section id="pg-rollout" className="pgx-section">
        <div className="container">
          <div className="pgx-rollout">
            <div className="pgx-rollout-intro" data-reveal>
              <span className="csx-tag">National QSR Partner</span>
              <h2 className="csx-head-title csx-head-sm">
                {mcd.length} McDonald&apos;s outlets <span className="svx-serif">handed over.</span>
              </h2>
              <p>
                Built for Hardcastle Restaurants Pvt. Ltd., master franchisee of McDonald&apos;s in West
                &amp; South India — high streets, highway drive-thrus, food courts and campuses.
              </p>
              <ul className="pgx-types">
                {typeCounts.map(([type, n]) => (
                  <li key={type}>
                    <strong>{n}</strong>
                    <span>{type}</span>
                  </li>
                ))}
              </ul>
              <button className="svx-link" onClick={() => onSelectTab('turnkey', 'tk-tracker')}>
                See the sites under construction now <i className="fa-solid fa-arrow-right"></i>
              </button>
            </div>

            <div className="pgx-states">
              {byState.map(([state, sites], idx) => (
                <div
                  key={state}
                  className="pgx-state"
                  data-reveal
                  style={{ '--reveal-delay': `${(idx % 3) * 70}ms` }}
                >
                  <div className="pgx-state-head">
                    <strong>{state}</strong>
                    <span>{sites.length}</span>
                  </div>
                  <ul>
                    {sites.map((s) => (
                      <li key={s.sl}>
                        <span>{s.site}</span>
                        <small>{s.type}</small>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          5. CLIENTS — cards that tilt toward the cursor
          ==================================================================== */}
      <section id="pg-clients" className="pgx-section pgx-tint">
        <div className="container">
          <div className="pgx-head pgx-head-center" data-reveal>
            <div>
              <span className="csx-tag">Brand Partners</span>
              <h2 className="csx-head-title csx-head-sm">Brands that build with us</h2>
            </div>
          </div>

          <div className="pgx-clients">
            {clients.map((c, idx) => (
              <article
                key={c.name}
                className="pgx-client"
                data-reveal
                style={{ '--reveal-delay': `${(idx % 3) * 80}ms` }}
                onPointerMove={tilt}
                onPointerLeave={untilt}
              >
                <div className="pgx-client-inner">
                  <span className="pgx-client-badge">{c.highlight}</span>
                  <strong className="pgx-client-logo">{c.logoText}</strong>
                  <span className="pgx-client-sub">{c.logoBadge}</span>
                  <p>{c.tagline}</p>
                  <div className="pgx-client-scope">
                    <small>{c.type}</small>
                    <span>{c.scope}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================================
          6. CTA
          ==================================================================== */}
      <section className="pgx-cta-wrap">
        <div className="container">
          <div className="pgx-cta" data-reveal>
            <img src="/assets/images/cs-hq-band.jpg" alt="" className="pgx-cta-bg" loading="lazy" />
            <span className="pgx-cta-veil" aria-hidden="true"></span>
            <div className="pgx-cta-copy">
              <h2>
                Your space could be <em>our next case study.</em>
              </h2>
              <div className="pgx-cta-actions">
                <button className="csx-btn csx-btn-white" onClick={() => onSelectTab('contact')}>
                  Start Your Project <i className="fa-solid fa-arrow-right"></i>
                </button>
                <button className="csx-btn csx-btn-glass" onClick={() => onSelectTab('services')}>
                  Our Services
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ProjectsPage;
