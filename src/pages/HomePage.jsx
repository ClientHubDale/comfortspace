import React, { useEffect, useRef } from 'react';
import { INITIAL_DATA } from '../data/initialData';
import useScrollReveal from '../hooks/useScrollReveal';
import useStageSequence from '../hooks/useStageSequence';
import CountUp from '../components/common/CountUp';

/* --------------------------------------------------------------------------
   Home
   -------------------------------------------------------------------------- */
const HomePage = ({ onSelectTab, onOpenStoryModal, onOpenProjectModal, projects }) => {
  const heroImgRef = useRef(null);
  const showreelRef = useRef(null);
  const stageRailRef = useRef(null);
  const turnkeySteps = INITIAL_DATA.turnkeySteps;

  const {
    sectionRef: stageSectionRef,
    revealed: revealedStages,
    activeIndex: selectedTurnkeyStep,
    setActiveIndex: setSelectedTurnkeyStep,
    isPinned: stagesPinned,
  } = useStageSequence(turnkeySteps.length);

  const featuredProjects = projects.filter((p) => p.featured);
  const currentTurnkey = turnkeySteps[selectedTurnkeyStep];
  const services = INITIAL_DATA.services;

  useScrollReveal([projects.length]);

  /* Slow parallax drift on the hero photograph */
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const node = heroImgRef.current;
        if (node) {
          const shift = Math.min(window.scrollY * 0.16, 90);
          node.style.transform = `translate3d(0, ${shift}px, 0) scale(1.08)`;
        }
        ticking = false;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* The closing showreel only downloads and plays once it is on screen, and
     stays on its poster frame entirely if the visitor prefers reduced motion */
  useEffect(() => {
    const video = showreelRef.current;
    if (!video) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reduced.matches) return;

    if (!('IntersectionObserver' in window)) {
      video.play().catch(() => {});
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) video.play().catch(() => {});
          else video.pause();
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(video);
    return () => {
      observer.disconnect();
      video.pause();
    };
  }, []);

  /* On phones the stage rail lies on its side, so the active stage has to be
     scrolled into view or the sequence advances off-screen while the rail
     still shows stage 01. */
  useEffect(() => {
    const rail = stageRailRef.current;
    if (!rail) return;
    if (rail.scrollWidth <= rail.clientWidth + 4) return; // vertical rail, nothing to do

    const active = rail.children[selectedTurnkeyStep + 1]; // +1 skips the track element
    if (!active) return;

    const target = active.offsetLeft - (rail.clientWidth - active.offsetWidth) / 2;
    rail.scrollTo({
      left: Math.max(0, target),
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
    });
  }, [selectedTurnkeyStep]);

  const openFlagship = () => {
    const mcd = projects.find((p) => p.id === 'proj-mcd-hyd') || projects[0];
    if (mcd) onOpenProjectModal(mcd);
  };

  const flagshipShots = [
    {
      img: '/assets/images/mcd-hyd-entrance.jpg',
      title: 'Main Entrance & Facade',
      meta: 'Structural Glazing & Signage',
    },
    {
      img: '/assets/images/mcd-hyd-mccafe-bar.jpg',
      title: 'McCafe & Ordering Counter',
      meta: 'Timber Louver Joinery',
    },
    {
      img: '/assets/images/mcd-hyd-dining-rings.jpg',
      title: 'Dining Area & Lighting',
      meta: 'Circular Booths & Ring Fixtures',
    },
    {
      img: '/assets/images/mcd-hyd-kiosks.jpg',
      title: 'Self-Ordering Kiosks',
      meta: 'Digital Counters & Flooring',
    },
  ];

  return (
    <main id="tab-home" className="tab-page active-page csx-page csx-home">
      {/* ====================================================================
          1. CINEMATIC HERO
          ==================================================================== */}
      <section className="csx-hero">
        <div className="csx-hero-frame">
          <img
            ref={heroImgRef}
            src="/assets/images/cs-hq-hero.jpg"
            alt="Comfort Space commercial headquarters at dusk"
            className="csx-hero-bg"
          />
          <span className="csx-hero-veil" aria-hidden="true"></span>
          <span className="csx-hero-glow orb-a" aria-hidden="true"></span>
          <span className="csx-hero-glow orb-b" aria-hidden="true"></span>

          <div className="csx-hero-inner">
            <span className="csx-hero-pill">
              <i className="fa-solid fa-trophy"></i> 20+ Years of Excellence
            </span>

            <h1 className="csx-hero-title">
              <span className="csx-line">Engineering Futuristic</span>
              <span className="csx-line csx-serif">Commercial &amp; Turnkey Spaces</span>
            </h1>

            <p className="csx-hero-sub">
              From bare shells to luxury dining, multi-state QSR drive-thrus, high-security banking
              hubs and corporate headquarters — Comfort Space Pvt. Ltd. delivers structurally sound,
              aesthetically superior built environments.
            </p>

            <div className="csx-hero-actions">
              <button className="csx-btn csx-btn-dark" onClick={() => onSelectTab('projects')}>
                Explore Our Projects <i className="fa-solid fa-arrow-up-right-from-square"></i>
              </button>
              <button className="csx-btn csx-btn-ghost" onClick={onOpenStoryModal}>
                <span className="csx-play">
                  <span className="csx-play-wave"></span>
                  <i className="fa-solid fa-play"></i>
                </span>
                Watch Our Story
              </button>
            </div>
          </div>

          {/* floating stat card — bottom left */}
          <div className="csx-hero-card csx-hero-card-left">
            <div className="csx-hero-card-num">
              <CountUp end={200} suffix="+" />
            </div>
            <div className="csx-hero-card-label">Projects Delivered</div>
            <a
              className="csx-hero-card-btn"
              href={`https://wa.me/${INITIAL_DATA.company.whatsappNumber}?text=${encodeURIComponent(
                INITIAL_DATA.company.whatsappMessage
              )}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fa-brands fa-whatsapp"></i> Chat With Us
            </a>
          </div>

          {/* floating link card — bottom right */}
          <button className="csx-hero-card csx-hero-card-right" onClick={() => onSelectTab('turnkey')}>
            <span className="csx-hero-card-arrow">
              <i className="fa-solid fa-arrow-right"></i>
            </span>
            <span className="csx-hero-card-copy">
              <strong>Turnkey Methodology</strong>
              <small>
                7-Stage Framework <i className="fa-solid fa-chevron-right"></i>
              </small>
            </span>
          </button>
        </div>
      </section>

      {/* ====================================================================
          2. TRUST MARQUEE
          ==================================================================== */}
      <section className="csx-marquee" data-reveal>
        <div className="container">
          <div className="csx-marquee-label">Trusted by Industry Leaders Across India</div>
        </div>
        <div className="csx-marquee-viewport">
          <div className="csx-marquee-rail">
            {[...INITIAL_DATA.clients, ...INITIAL_DATA.clients].map((client, idx) => (
              <div
                className="csx-marquee-chip"
                key={idx}
                aria-hidden={idx >= INITIAL_DATA.clients.length || undefined}
              >
                <span className="csx-chip-name">{client.logoText}</span>
                <span className="csx-chip-badge">{client.logoBadge}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================================
          3. STATS BAR
          ==================================================================== */}
      <section className="csx-section csx-stats-section">
        <div className="container">
          <div className="csx-stats-bar" data-reveal>
            <div className="csx-stat">
              <div className="csx-stat-num">
                <CountUp end={20} suffix="+" />
              </div>
              <div className="csx-stat-label">Years of Excellence</div>
            </div>
            <div className="csx-stat">
              <div className="csx-stat-num">
                <CountUp end={200} suffix="+" />
              </div>
              <div className="csx-stat-label">Projects Completed</div>
            </div>
            <div className="csx-stat">
              <div className="csx-stat-num">
                <CountUp end={22} suffix="+" />
              </div>
              <div className="csx-stat-label">McDonald's Outlets</div>
            </div>
            <div className="csx-stat">
              <div className="csx-stat-num">
                <CountUp end={7} suffix="+" />
              </div>
              <div className="csx-stat-label">States Covered</div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          4. BENTO CAPABILITIES
          ==================================================================== */}
      <section className="csx-section">
        <div className="container">
          <div className="csx-head-row" data-reveal>
            <h2 className="csx-head-title">
              Architected for turnkey{' '}
              <br />
              commercial excellence
            </h2>
            <button className="csx-btn csx-btn-outline" onClick={() => onSelectTab('services')}>
              All Services <i className="fa-solid fa-arrow-up-right-from-square"></i>
            </button>
          </div>

          <div className="csx-bento">
            {/* 01 — civil construction (tall feature card) */}
            <article
              className="csx-bento-card csx-bento-tall csx-bento-accent"
              data-reveal
              onClick={() => onSelectTab('services')}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onSelectTab('services');
                }
              }}
            >
              <div className="csx-bento-head">
                <div className="csx-bento-icon">
                  <i className={`fa-solid ${services[0].icon}`}></i>
                </div>
                <span className="csx-bento-num">{services[0].number}</span>
              </div>
              <div className="csx-bento-media">
                <img src="/assets/images/mcd-hyd-entrance.jpg" alt={services[0].title} loading="lazy" />
              </div>
              <div className="csx-bento-body">
                <h3>{services[0].title}</h3>
                <span className="csx-bento-sub">{services[0].subtitle}</span>
                <p>{services[0].summary}</p>
                <ul className="csx-bento-list">
                  {services[0].features.slice(0, 3).map((feature, idx) => (
                    <li key={idx}>
                      <i className="fa-solid fa-check"></i> {feature}
                    </li>
                  ))}
                </ul>
                <span className="csx-bento-link">
                  Structural &amp; facade scope <i className="fa-solid fa-arrow-right"></i>
                </span>
              </div>
            </article>

            {/* 02 — turnkey base projects (wide card) */}
            <article
              className="csx-bento-card csx-bento-wide csx-bento-accent"
              data-reveal
              onClick={() => onSelectTab('turnkey')}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onSelectTab('turnkey');
                }
              }}
            >
              <i className={`fa-solid ${services[1].icon} csx-bento-watermark`} aria-hidden="true"></i>
              <div className="csx-bento-head">
                <div className="csx-bento-icon">
                  <i className={`fa-solid ${services[1].icon}`}></i>
                </div>
                <span className="csx-bento-num">{services[1].number}</span>
              </div>
              <div className="csx-bento-body">
                <h3>Unlock end-to-end delivery of your commercial space</h3>
                <span className="csx-bento-sub">{services[1].subtitle}</span>
                <p>{services[1].summary}</p>
                <ul className="csx-bento-chips">
                  {services[1].features.slice(0, 3).map((feature, idx) => (
                    <li key={idx}>{feature}</li>
                  ))}
                </ul>
              </div>
            </article>

            {/* 03 — project management */}
            <article
              className="csx-bento-card csx-bento-accent"
              data-reveal
              onClick={() => onSelectTab('services')}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onSelectTab('services');
                }
              }}
            >
              <i className={`fa-solid ${services[2].icon} csx-bento-watermark`} aria-hidden="true"></i>
              <div className="csx-bento-head">
                <div className="csx-bento-icon csx-bento-icon-arrow">
                  <i className={`fa-solid ${services[2].icon}`}></i>
                </div>
                <span className="csx-bento-num">{services[2].number}</span>
              </div>
              <div className="csx-bento-body">
                <h3>{services[2].title}</h3>
                <span className="csx-bento-sub">{services[2].subtitle}</span>
                <ul className="csx-bento-list">
                  {services[2].features.slice(0, 4).map((feature, idx) => (
                    <li key={idx}>
                      <i className="fa-solid fa-check"></i> {feature}
                    </li>
                  ))}
                </ul>
                <span className="csx-bento-link">
                  PMC governance <i className="fa-solid fa-arrow-right"></i>
                </span>
              </div>
            </article>

            {/* 04 — fire & life safety */}
            <article
              className="csx-bento-card csx-bento-accent"
              data-reveal
              onClick={() => onSelectTab('services')}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onSelectTab('services');
                }
              }}
            >
              <i className={`fa-solid ${services[3].icon} csx-bento-watermark`} aria-hidden="true"></i>
              <div className="csx-bento-head">
                <div className="csx-bento-icon">
                  <i className={`fa-solid ${services[3].icon}`}></i>
                </div>
                <span className="csx-bento-num">{services[3].number}</span>
              </div>
              <div className="csx-bento-body">
                <h3>{services[3].title}</h3>
                <span className="csx-bento-sub">{services[3].subtitle}</span>
                <ul className="csx-bento-list">
                  {services[3].features.slice(0, 4).map((feature, idx) => (
                    <li key={idx}>
                      <i className="fa-solid fa-check"></i> {feature}
                    </li>
                  ))}
                </ul>
                <span className="csx-bento-link">
                  NBC &amp; fire NOC scope <i className="fa-solid fa-arrow-right"></i>
                </span>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* ====================================================================
          5. FLAGSHIP SPOTLIGHT
          ==================================================================== */}
      <section className="csx-section csx-section-tint">
        <div className="container">
          <div className="csx-head-row" data-reveal>
            <div>
              <span className="csx-tag csx-tag-amber">
                <i className="fa-solid fa-star"></i> Recently Handed Over Flagship
              </span>
              <h2 className="csx-head-title csx-head-sm">
                McDonald's &amp; McCafe, Hyderabad
              </h2>
              <p className="csx-head-sub">
                Complete turnkey civil, structural facade, McCafe joinery, commercial stainless steel
                kitchen and self-ordering kiosk fit-out for Hardcastle Restaurants Pvt. Ltd.
              </p>
            </div>
            <button className="csx-btn csx-btn-brand" onClick={openFlagship}>
              View Gallery &amp; Specs <i className="fa-solid fa-expand"></i>
            </button>
          </div>

          <div className="csx-shot-grid">
            {flagshipShots.map((shot, idx) => (
              <button
                key={idx}
                className="csx-shot"
                data-reveal
                style={{ '--reveal-delay': `${idx * 70}ms` }}
                onClick={openFlagship}
              >
                <span className="csx-shot-media">
                  <img src={shot.img} alt={shot.title} loading="lazy" />
                  <span className="csx-shot-zoom">
                    <i className="fa-solid fa-up-right-and-down-left-from-center"></i>
                  </span>
                </span>
                <span className="csx-shot-meta">
                  <strong>{shot.title}</strong>
                  <small>{shot.meta}</small>
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================================
          6. ABOUT SPLIT
          ==================================================================== */}
      <section className="csx-section">
        <div className="container">
          <div className="csx-split">
            <div className="csx-split-copy" data-reveal>
              <span className="csx-tag">About Our Firm</span>
              <h2 className="csx-head-title csx-head-sm">
                Best-in-class interior design &amp; turnkey excellence
              </h2>
              <p>
                We are a premier interior design, civil construction and turnkey project management
                firm with <strong>over two decades of consistent performance</strong>. Formerly known
                as <em>Shivashakthi Comforts</em>, we have transformed commercial, retail, banking and
                hospitality landscapes across India.
              </p>
              <p>
                Our in-house civil engineers, commercial interior architects and site supervisors
                relieve you of all execution stress — <em>you sit back and relax while we do all the
                hard work for you.</em>
              </p>
              <div className="csx-btn-row">
                <button className="csx-btn csx-btn-dark" onClick={() => onSelectTab('about')}>
                  Our Heritage <i className="fa-solid fa-arrow-right"></i>
                </button>
                <button className="csx-btn csx-btn-outline" onClick={() => onSelectTab('turnkey')}>
                  Turnkey Methodology
                </button>
              </div>
            </div>

            <div className="csx-split-media" data-reveal>
              <img src="/assets/images/cs-hq-about.jpg" alt="Comfort Space completed project" loading="lazy" />
              <div className="csx-split-badge">
                <strong>
                  <CountUp end={20} suffix="+ YRS" />
                </strong>
                <span>Delivering structurally sound, aesthetically superior spaces.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          7. 7-STAGE TURNKEY FRAMEWORK
          ==================================================================== */}
      <section
        ref={stageSectionRef}
        className={`csx-section-tint csx-stage-scroller ${stagesPinned ? 'is-pinning' : ''}`}
        style={{ '--csx-stage-count': turnkeySteps.length }}
      >
        <div className="csx-stage-sticky">
          <div className="container">
            <div className="csx-head-center" data-reveal>
              <span className="csx-tag">Guaranteed Delivery</span>
              <h2 className="csx-head-title csx-head-sm">Proprietary 7-Stage Turnkey Framework</h2>
              <p className="csx-head-sub">
                Built for institutional clients who demand zero timeline overruns, complete
                transparency and flawless architectural precision.
              </p>
            </div>

            <div className="csx-stage-wrap">
              <div className="csx-stage-rail" ref={stageRailRef}>
                <span className="csx-stage-track" aria-hidden="true">
                  <span
                    className="csx-stage-track-fill"
                    style={{ height: `${(revealedStages / turnkeySteps.length) * 100}%` }}
                  />
                </span>

                {turnkeySteps.map((step, idx) => (
                  <button
                    key={idx}
                    className={`csx-stage-btn ${idx < revealedStages ? 'is-in' : ''} ${
                      selectedTurnkeyStep === idx ? 'active' : ''
                    }`}
                    onClick={() => setSelectedTurnkeyStep(idx)}
                  >
                    <span className="csx-stage-num">{step.step}</span>
                    <span className="csx-stage-title">{step.title}</span>
                    <i className="fa-solid fa-chevron-right csx-stage-caret" aria-hidden="true"></i>
                  </button>
                ))}

                <div className="csx-stage-counter" aria-hidden="true">
                  <span className="csx-stage-counter-now">
                    {String(Math.max(revealedStages, 1)).padStart(2, '0')}
                  </span>
                  <span className="csx-stage-counter-sep">/</span>
                  <span className="csx-stage-counter-all">
                    {String(turnkeySteps.length).padStart(2, '0')}
                  </span>
                </div>
              </div>

              <div className="csx-stage-panel" key={selectedTurnkeyStep}>
                <span className="csx-stage-chip">Stage {currentTurnkey.step}</span>
                <h3>{currentTurnkey.title}</h3>
                <p>{currentTurnkey.description}</p>
                <button className="csx-btn csx-btn-brand" onClick={() => onSelectTab('turnkey')}>
                  Learn Turnkey Scope <i className="fa-solid fa-arrow-right"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          8. FEATURED PROJECTS
          ==================================================================== */}
      <section className="csx-section">
        <div className="container">
          <div className="csx-head-row" data-reveal>
            <div>
              <span className="csx-tag">Portfolio Highlights</span>
              <h2 className="csx-head-title csx-head-sm">Featured project showcase</h2>
              <p className="csx-head-sub">
                A curated glimpse into executions for McDonald's, MURO Restaurant, Tata Capital and AU
                Small Finance Bank.
              </p>
            </div>
            <button className="csx-btn csx-btn-outline" onClick={() => onSelectTab('projects')}>
              Full Gallery <i className="fa-solid fa-arrow-up-right-from-square"></i>
            </button>
          </div>

          <div className="csx-proj-grid">
            {featuredProjects.map((proj, idx) => (
              <article
                key={proj.id}
                className="csx-proj-card"
                data-reveal
                style={{ '--reveal-delay': `${idx * 70}ms` }}
                onClick={() => onOpenProjectModal(proj)}
              >
                <div className="csx-proj-media">
                  <img src={`/${proj.image.replace(/^\/+/, '')}`} alt={proj.title} loading="lazy" />
                  <span
                    className={`csx-proj-status ${
                      proj.status.toLowerCase().includes('handed') ? 'done' : 'live'
                    }`}
                  >
                    {proj.status}
                  </span>
                </div>
                <div className="csx-proj-body">
                  <span className="csx-proj-cat">{proj.categoryLabel || proj.category}</span>
                  <h3>{proj.title}</h3>
                  <div className="csx-proj-client">{proj.client}</div>
                  <div className="csx-proj-foot">
                    <span>
                      <i className="fa-solid fa-location-dot"></i> {proj.city}, {proj.state}
                    </span>
                    <span className="csx-proj-go">
                      <i className="fa-solid fa-arrow-right"></i>
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================================
          9. IGBC SUSTAINABILITY
          ==================================================================== */}
      <section className="csx-section csx-section-tint">
        <div className="container">
          <div className="csx-green" data-reveal>
            <div className="csx-green-copy">
              <span className="csx-tag csx-tag-green">Sustainability Commitment</span>
              <h2 className="csx-head-title csx-head-sm csx-green-title">
                Founding Member, Indian Green Building Council
              </h2>
              <p className="csx-green-quote">“To enable a sustainable built environment for all”</p>
              <p className="csx-green-text">
                Environmental stewardship is embedded into our architectural DNA. We implement
                energy-efficient MEP layouts, low-VOC finishes, recycled acoustics and
                water-conservation sanitary engineering across all turnkey commercial spaces.
              </p>
              <button className="csx-btn csx-btn-dark" onClick={() => onSelectTab('about')}>
                Our Green Practices <i className="fa-solid fa-leaf"></i>
              </button>
            </div>

            <ul className="csx-green-grid">
              <li>
                <i className="fa-solid fa-solar-panel"></i>
                <h5>Energy Efficiency</h5>
                <p>Smart LED sensory arrays &amp; optimized HVAC thermal zoning.</p>
              </li>
              <li>
                <i className="fa-solid fa-recycle"></i>
                <h5>Sustainable Materials</h5>
                <p>FSC-certified timber, low-VOC laminates &amp; recycled gypsum.</p>
              </li>
              <li>
                <i className="fa-solid fa-faucet-drip"></i>
                <h5>Water Conservation</h5>
                <p>Aerated water fixtures &amp; intelligent commercial drainage.</p>
              </li>
              <li>
                <i className="fa-solid fa-shield-virus"></i>
                <h5>Indoor Air Quality</h5>
                <p>High-MERV filtration &amp; acoustic comfort certification.</p>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ====================================================================
          10. TESTIMONIALS
          ==================================================================== */}
      <section className="csx-section">
        <div className="container">
          <div className="csx-head-center" data-reveal>
            <span className="csx-tag">Client Endorsements</span>
            <h2 className="csx-head-title csx-head-sm">What our partners say</h2>
          </div>

          <div className="csx-quote-grid">
            {INITIAL_DATA.testimonials.map((t, idx) => (
              <figure
                key={idx}
                className="csx-quote"
                data-reveal
                style={{ '--reveal-delay': `${idx * 80}ms` }}
              >
                <i className="fa-solid fa-quote-right csx-quote-mark" aria-hidden="true"></i>
                <div className="csx-quote-stars">★★★★★</div>
                <blockquote>{t.quote}</blockquote>
                <figcaption>
                  <strong>{t.author}</strong>
                  <span>{t.company}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================================
          11. CLOSING CTA BAND
          ==================================================================== */}
      <section className="csx-cta-section">
        <div className="container">
          <div className="csx-cta" data-reveal>
            <video
              ref={showreelRef}
              className="csx-cta-bg"
              poster="/assets/images/cs-showreel-poster.jpg"
              muted
              loop
              playsInline
              preload="none"
              aria-label="Showreel of completed Comfort Space projects"
            >
              <source src="/assets/video/project-showreel.mp4" type="video/mp4" />
            </video>
            <span className="csx-cta-veil" aria-hidden="true"></span>
            <div className="csx-cta-inner">
              <h2>
                Designing spaces{' '}
                <br />
                that inspire.
              </h2>
              <div className="csx-btn-row csx-btn-row-center">
                <button className="csx-btn csx-btn-white" onClick={() => onSelectTab('contact')}>
                  Start Your Project <i className="fa-solid fa-arrow-up-right-from-square"></i>
                </button>
                <button className="csx-btn csx-btn-glass" onClick={() => onSelectTab('projects')}>
                  View Portfolio
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default HomePage;
