import React, { useEffect, useRef, useState } from 'react';
import { INITIAL_DATA } from '../data/initialData';
import useScrollReveal from '../hooks/useScrollReveal';
import { smoothScrollTo } from '../utils/smoothScroll';

/* --------------------------------------------------------------------------
   Content
   -------------------------------------------------------------------------- */
const HERO_WORDS = ['design', 'engineer', 'build', 'maintain'];

const KINETIC = ['Civil Construction', 'Turnkey Fit-Outs', 'Project Management', 'Fire & Life Safety', 'Modular Furniture', '24/7 AMC'];

const TRADES = [
  { icon: 'fa-bolt', title: 'Electrical & Lighting', text: 'LT panels, DB wiring, feature and emergency lighting' },
  { icon: 'fa-faucet-drip', title: 'Plumbing & Sanitary', text: 'Water supply, drainage and water-saving fixtures' },
  { icon: 'fa-fan', title: 'HVAC & Ventilation', text: 'Ducting, VRF and kitchen exhaust systems' },
  { icon: 'fa-network-wired', title: 'Structured Cabling', text: 'High-speed data, CCTV and access control' },
  { icon: 'fa-border-all', title: 'Ceilings & Acoustics', text: 'Gypsum, grid and acoustic ceiling treatments' },
  { icon: 'fa-table-cells-large', title: 'Flooring & Finishes', text: 'Tile, vinyl, stone and high-finish paints' },
  { icon: 'fa-grip-lines-vertical', title: 'Partitions & Dry-Wall', text: 'Glass, gypsum and fire-rated partitions' },
  { icon: 'fa-building', title: 'Façade & Signage', text: 'Structural glazing, ACP cladding and brand signage' },
];

const MODELS = [
  {
    name: 'Build & Execute',
    tag: 'You have the design',
    text: 'Your architect has the drawings — we turn them into a finished space, to specification.',
    points: [
      'Site inspection & drawing review',
      'Procurement strictly to approved BOQ',
      'Civil, MEP and interior execution',
      'QA/QC checks and snag closure',
    ],
    icon: 'fa-helmet-safety',
  },
  {
    name: 'Design & Build',
    tag: 'Turnkey · Most chosen',
    text: 'One contract from concept to keys. The model behind our QSR, banking and corporate rollouts.',
    points: [
      'Concept, layouts & material boards',
      'Working drawings, MEP design & BOQ',
      'Civil, MEP, interiors & networking',
      'Approvals, fire NOC & statutory sign-offs',
      'Handover, as-builts & 24/7 AMC',
    ],
    icon: 'fa-key',
    featured: true,
  },
  {
    name: 'Project Management',
    tag: 'We represent you',
    text: 'Owner-side PMC that protects your budget, schedule and specification across every vendor.',
    points: [
      'BOQ estimation & budget control',
      'Vendor orchestration & scheduling',
      'Resident engineers on site',
      'Progress reviews & bill audits',
    ],
    icon: 'fa-clipboard-check',
  },
];

/* --------------------------------------------------------------------------
   Services
   -------------------------------------------------------------------------- */
const ServicesPage = ({ onSelectTab }) => {
  const services = INITIAL_DATA.services;
  const company = INITIAL_DATA.company;

  const stackRef = useRef(null);
  const tradesRef = useRef(null);
  const [wordIdx, setWordIdx] = useState(0);

  useScrollReveal([]);

  /* Hero verb rotates through what we do */
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const timer = setInterval(() => setWordIdx((i) => (i + 1) % HERO_WORDS.length), 2400);
    return () => clearInterval(timer);
  }, []);

  /* Stacked service cards: as the next card slides over, the one beneath
     shrinks and dims. Progress is written to a CSS variable per card. */
  useEffect(() => {
    const stack = stackRef.current;
    if (!stack) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const cards = Array.from(stack.querySelectorAll('.svx-card'));
    let ticking = false;
    const measure = () => {
      ticking = false;
      cards.forEach((card, i) => {
        const next = cards[i + 1];
        if (!next) return;
        const stickyTop = parseFloat(getComputedStyle(card).top) || 0;
        const covered = (card.offsetHeight - (next.getBoundingClientRect().top - stickyTop)) / card.offsetHeight;
        card.style.setProperty('--cover', Math.min(Math.max(covered, 0), 1).toFixed(3));
      });
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  /* Cursor spotlight — each surface gets the pointer position in its own
     coordinates, and CSS paints a soft glow there. */
  const trackSpotlight = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mx', `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty('--my', `${e.clientY - rect.top}px`);
  };

  const trackTrades = (e) => {
    const grid = tradesRef.current;
    if (!grid) return;
    grid.querySelectorAll('.svx-trade').forEach((tile) => {
      const rect = tile.getBoundingClientRect();
      tile.style.setProperty('--mx', `${e.clientX - rect.left}px`);
      tile.style.setProperty('--my', `${e.clientY - rect.top}px`);
    });
  };

  const jumpTo = (id) => smoothScrollTo(id);

  return (
    <main id="tab-services" className="tab-page active-page csx-page csx-services">
      {/* ====================================================================
          1. HERO — rotating verb over a blueprint grid with a cursor spotlight
          ==================================================================== */}
      <section className="svx-hero" onPointerMove={trackSpotlight}>
        <span className="svx-hero-grid" aria-hidden="true"></span>
        <span className="svx-hero-spot" aria-hidden="true"></span>

        <div className="container svx-hero-inner">
          <nav className="abx-crumb svx-crumb" aria-label="Breadcrumb">
            <button onClick={() => onSelectTab('home')}>Home</button>
            <span aria-hidden="true">/</span>
            <span aria-current="page">Services</span>
          </nav>

          <span className="svx-kicker">
            <span className="svx-kicker-dot" aria-hidden="true"></span>6 disciplines · 1 accountable team
          </span>

          <h1 className="svx-hero-title">
            <span className="svx-hero-line">
              We{' '}
              <span className="svx-word-slot">
                <span className="svx-word" key={wordIdx}>
                  {HERO_WORDS[wordIdx]}
                </span>
              </span>
            </span>
            <span className="svx-hero-line">commercial spaces.</span>
          </h1>

          <p className="svx-hero-sub">
            Civil construction, turnkey fit-outs, project management, fire &amp; life safety, modular
            furniture and round-the-clock maintenance — delivered by one team under one contract.
          </p>

          <div className="svx-chips">
            {services.map((s, idx) => (
              <button
                key={s.id}
                className="svx-chip"
                style={{ '--d': `${0.5 + idx * 0.06}s` }}
                onClick={() => jumpTo(`svc-${s.id}`)}
              >
                <span className="svx-chip-num">{s.number}</span>
                {s.title.replace(' Supply', '').replace('Post-Handover Support & ', '')}
                <i className="fa-solid fa-arrow-down"></i>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================================
          2. KINETIC BAND
          ==================================================================== */}
      <section className="svx-kinetic" aria-hidden="true">
        <div className="svx-kinetic-rail">
          {[...KINETIC, ...KINETIC].map((word, idx) => (
            <span key={idx} className={idx % 2 ? 'is-outline' : ''}>
              {word}
              <i className="fa-solid fa-asterisk"></i>
            </span>
          ))}
        </div>
      </section>

      {/* ====================================================================
          3. SERVICES — cards that stack as you scroll
          ==================================================================== */}
      <section className="svx-section">
        <div className="container">
          <div className="svx-head" data-reveal>
            <span className="csx-tag">What We Do</span>
            <h2 className="csx-head-title">
              Six services. <span className="svx-serif">One standard.</span>
            </h2>
          </div>

          <div className="svx-stack" ref={stackRef}>
            {services.map((s, idx) => (
              <article
                key={s.id}
                id={`svc-${s.id}`}
                className="svx-card"
                style={{ '--i': idx }}
              >
                <div className="svx-card-inner">
                  <div className="svx-card-copy">
                    <div className="svx-card-top">
                      <span className="svx-card-icon">
                        <i className={`fa-solid ${s.icon}`}></i>
                      </span>
                      <span className="svx-card-count">
                        {s.number} <em>/ 0{services.length}</em>
                      </span>
                    </div>
                    <h3>{s.title}</h3>
                    <span className="svx-card-sub">{s.subtitle}</span>
                    <p>{s.summary}</p>
                    <ul className="svx-card-list">
                      {s.features.map((f) => (
                        <li key={f}>
                          <i className="fa-solid fa-check"></i>
                          {f}
                        </li>
                      ))}
                    </ul>
                    <div className="svx-card-actions">
                      <button className="csx-btn csx-btn-dark" onClick={() => onSelectTab('contact')}>
                        Discuss This Service <i className="fa-solid fa-arrow-right"></i>
                      </button>
                      <button className="svx-link" onClick={() => onSelectTab('projects')}>
                        Related projects <i className="fa-solid fa-arrow-right"></i>
                      </button>
                    </div>
                  </div>
                  <div className="svx-card-media">
                    <img src={`/${s.image.replace(/^\/+/, '')}`} alt={s.title} loading="lazy" />
                    <span className="svx-card-bignum" aria-hidden="true">
                      {s.number}
                    </span>
                  </div>
                </div>
                <span className="svx-card-shade" aria-hidden="true"></span>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================================
          4. TRADES — spotlight grid
          ==================================================================== */}
      <section className="svx-section svx-trades-wrap">
        <div className="container">
          <div className="svx-head svx-head-split" data-reveal>
            <div>
              <span className="csx-tag">Under One Roof</span>
              <h2 className="csx-head-title csx-head-sm">Every trade your site needs, already on our team</h2>
            </div>
            <p className="svx-head-note">
              No sub-contractor hand-offs, no finger-pointing — every package below is planned, executed
              and signed off by Comfort Space.
            </p>
          </div>

          <div className="svx-trades" ref={tradesRef} onPointerMove={trackTrades}>
            {TRADES.map((t, idx) => (
              <article
                key={t.title}
                className="svx-trade"
                data-reveal
                style={{ '--reveal-delay': `${(idx % 4) * 70}ms` }}
              >
                <span className="svx-trade-icon">
                  <i className={`fa-solid ${t.icon}`}></i>
                </span>
                <h3>{t.title}</h3>
                <p>{t.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================================
          5. ENGAGEMENT MODELS
          ==================================================================== */}
      <section className="svx-section">
        <div className="container">
          <div className="svx-head svx-head-center" data-reveal>
            <span className="csx-tag">Ways To Work With Us</span>
            <h2 className="csx-head-title csx-head-sm">Pick the engagement that fits your project</h2>
          </div>

          <div className="svx-models">
            {MODELS.map((m, idx) => (
              <article
                key={m.name}
                className={`svx-model ${m.featured ? 'is-featured' : ''}`}
                data-reveal
                style={{ '--reveal-delay': `${idx * 90}ms` }}
                onPointerMove={trackSpotlight}
              >
                {m.featured && <span className="svx-model-badge">Recommended</span>}
                <span className="svx-model-icon">
                  <i className={`fa-solid ${m.icon}`}></i>
                </span>
                <span className="svx-model-tag">{m.tag}</span>
                <h3>{m.name}</h3>
                <p>{m.text}</p>
                <ul>
                  {m.points.map((p) => (
                    <li key={p}>
                      <i className="fa-solid fa-circle-check"></i>
                      {p}
                    </li>
                  ))}
                </ul>
                <button
                  className={`csx-btn ${m.featured ? 'csx-btn-brand' : 'csx-btn-outline'}`}
                  onClick={() => onSelectTab('contact')}
                >
                  Get a Proposal <i className="fa-solid fa-arrow-right"></i>
                </button>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================================
          6. CTA — card with a rotating gradient border
          ==================================================================== */}
      <section className="svx-cta-wrap">
        <div className="container">
          <div className="svx-cta" data-reveal>
            <div className="svx-cta-inner">
              <span className="csx-tag">Start Here</span>
              <h2>
                Tell us about your space.
                <span className="svx-serif"> We&apos;ll take it from there.</span>
              </h2>
              <div className="svx-cta-actions">
                <button className="csx-btn csx-btn-brand" onClick={() => onSelectTab('contact')}>
                  Request a Site Visit <i className="fa-solid fa-arrow-right"></i>
                </button>
                <a
                  className="csx-btn csx-btn-outline"
                  href={`https://wa.me/${company.whatsappNumber}?text=${encodeURIComponent(company.whatsappMessage)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fa-brands fa-whatsapp"></i> WhatsApp Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ServicesPage;
