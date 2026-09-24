import React, { useEffect, useRef, useState } from 'react';
import { INITIAL_DATA } from '../data/initialData';
import useScrollReveal from '../hooks/useScrollReveal';
import CountUp from '../components/common/CountUp';
import useStageSequence from '../hooks/useStageSequence';

/* --------------------------------------------------------------------------
   Content
   -------------------------------------------------------------------------- */
const HERO_MOSAIC = [
  { src: '/assets/images/mcd-hyd-entrance.jpg', alt: "McDonald's Hyderabad flagship facade" },
  { src: '/assets/images/muro-bar-dining.jpg', alt: 'MURO Restaurant bar and dining' },
  { src: '/assets/images/cs-tata-reception.jpg', alt: 'Tata Capital regional office reception' },
  { src: '/assets/images/cs-au-bank-floor.jpg', alt: 'AU Small Finance Bank office floor' },
];

const BIG_NUMBERS = [
  { end: 20, suffix: '+', label: 'Years of consistent performance' },
  { end: 200, suffix: '+', label: 'Commercial projects delivered' },
  { end: 22, suffix: '+', label: "McDonald's outlets built" },
  { end: 100, suffix: '+', label: 'In-house specialists' },
];

const MANIFESTO =
  'We bring commercial spaces to life — from bare shell to brand-perfect handover — with engineering you can trust and design your customers remember.';

const PURPOSE = [
  {
    id: 'mission',
    label: 'Our Mission',
    icon: 'fa-bullseye',
    img: '/assets/images/mcd-hyd-mccafe-bar.jpg',
    title: 'Deliver spaces that work as hard as the brands inside them',
    text: 'To deliver structurally sound, aesthetically superior commercial spaces — on time, on budget and with single-point accountability from bare shell to handover.',
    points: ['Single contract, single team', 'Fixed timelines with SLA governance', 'Zero-snag handover'],
  },
  {
    id: 'vision',
    label: 'Our Vision',
    icon: 'fa-eye',
    img: '/assets/images/cs-hq-about.jpg',
    title: "India's most trusted turnkey partner for commercial brands",
    text: 'To be the first call for QSR, banking, corporate and hospitality brands expanding across India — known for precision engineering and sustainable built environments.',
    points: ['Pan-India multi-site execution', 'IGBC-led green practices', 'Long-term brand partnerships'],
  },
  {
    id: 'values',
    label: 'Our Values',
    icon: 'fa-gem',
    img: '/assets/images/cs-muro-lounge.jpg',
    title: 'Integrity in every estimate, care in every detail',
    text: 'Transparency at every stage, zero compromise on safety, and meticulous attention to the details our clients never have to worry about.',
    points: ['Honest BOQs, no hidden costs', 'Safety-first sites', 'Craftsmanship that lasts'],
  },
];

const ADVANTAGES = [
  { title: 'Single-point accountability', text: 'Civil, MEP, carpentry and finishes under one contract — no finger-pointing.' },
  { title: 'In-house specialist squads', text: 'Resident engineers, PMC managers and safety officers on every site.' },
  { title: 'Design-to-execution under one roof', text: 'Concept, drawings, BOQ and build handled by the same team.' },
  { title: 'Multi-state simultaneous delivery', text: 'Mobile crews running parallel sites across 7+ states.' },
  { title: 'Brand-standard compliance', text: "Approved contractor for McDonald's and preferred vendor to Tata Capital." },
  { title: 'On-time, on-budget handover', text: 'Weekly progress reporting and SLA-governed schedules.' },
  { title: 'IGBC green practices', text: 'Low-VOC finishes, efficient MEP and water-conserving fixtures.' },
  { title: '24/7 post-handover support', text: 'Emergency response squads and long-term AMC warranties.' },
];

const INDUSTRIES = [
  { icon: 'fa-burger', title: 'QSR & Drive-Thru', text: 'High-street, mall and highway outlets' },
  { icon: 'fa-champagne-glasses', title: 'Luxury Dining & Bars', text: 'Signature restaurants and lounges' },
  { icon: 'fa-building-columns', title: 'Banking & NBFC', text: 'Branches, vaults and regional offices' },
  { icon: 'fa-briefcase', title: 'Corporate Offices', text: 'Workspaces, training and boardrooms' },
  { icon: 'fa-bag-shopping', title: 'Retail Stores', text: 'Flagship and multi-city store rollouts' },
  { icon: 'fa-mug-hot', title: 'Cafés & Kiosks', text: 'Compact, high-footfall formats' },
  { icon: 'fa-kitchen-set', title: 'Commercial Kitchens', text: 'Stainless steel and exhaust systems' },
  { icon: 'fa-helmet-safety', title: 'Civil & Shell Works', text: 'RCC, façades and structural glazing' },
];

const MILESTONES = [
  {
    year: '2004',
    title: 'Founded as Shivashakthi Comforts',
    desc: 'Incorporated in Bangalore to bridge creative design and rigorous engineering execution, starting with residential and small commercial fit-outs.',
    icon: 'fa-seedling',
  },
  {
    year: '2010',
    title: "McDonald's partnership begins",
    desc: 'First major QSR turnkey contract with Hardcastle Restaurants Pvt. Ltd. — the landmark Hyderabad flagship high street outlet with McCafe.',
    icon: 'fa-handshake',
  },
  {
    year: '2014',
    title: 'Banking & corporate expansion',
    desc: "Tata Capital's Mysore Regional Office & Training Centre takes us into high-specification corporate banking with structured cabling and MEP.",
    icon: 'fa-landmark',
  },
  {
    year: '2018',
    title: 'IGBC Founding Member',
    desc: 'Recognised as a Founding Member of the Indian Green Building Council, cementing our commitment to eco-conscious commercial architecture.',
    icon: 'fa-leaf',
  },
  {
    year: '2022',
    title: 'Rebranded to Comfort Space Pvt. Ltd.',
    desc: 'Restructured and rebranded to reflect two decades of growth across 7+ states and 200+ completed projects.',
    icon: 'fa-arrow-up-right-dots',
  },
  {
    year: 'Now',
    title: "22+ McDonald's sites & counting",
    desc: 'Simultaneous multi-state turnkey builds across Gujarat, Maharashtra, Chhattisgarh and Karnataka with a 100-strong specialist squad.',
    icon: 'fa-rocket',
  },
];

const LEADERSHIP = [
  {
    role: 'Managing Director',
    name: 'D. Sridhar Rao',
    expertise: 'Turnkey architecture & business development',
    experience: '25+ yrs',
    icon: 'fa-user-tie',
  },
  {
    role: 'Principal Civil Engineer',
    name: 'Structural Engineering Lead',
    expertise: 'RCC, façade engineering & site execution',
    experience: '18+ yrs',
    icon: 'fa-helmet-safety',
  },
  {
    role: 'Chief Safety Officer',
    name: 'QSR & HSE Compliance Head',
    expertise: 'NBC compliance, fire & life safety systems',
    experience: '15+ yrs',
    icon: 'fa-shield-halved',
  },
  {
    role: 'PMC & Client Relations',
    name: 'Projects Management Lead',
    expertise: 'BOQ, SLA governance & client coordination',
    experience: '20+ yrs',
    icon: 'fa-clipboard-check',
  },
];

const SEALS = [
  { icon: 'fa-leaf', label: 'IGBC', sub: 'Founding Member' },
  { icon: 'fa-certificate', label: 'ISO 9001', sub: 'Quality Systems' },
  { icon: 'fa-star', label: "McDonald's", sub: 'Approved Contractor' },
  { icon: 'fa-shield-halved', label: 'NBC', sub: 'Code Compliant' },
  { icon: 'fa-building-columns', label: 'Tata Capital', sub: 'Preferred Vendor' },
];

const STATES = [
  { name: 'Karnataka', tag: 'HQ', cities: ['Bangalore', 'Mysore', 'Doddabalapur', 'Bagalur', 'Budigere', 'Udupi', 'Suratkhal'] },
  { name: 'Telangana', cities: ['Hyderabad Flagship & McCafe', 'Aparna Mall', 'Phoenix Avance LUNA'] },
  { name: 'Andhra Pradesh', cities: ['Visakhapatnam', 'Madhurawada', 'MVP Colony', 'Rajamundry', 'Ibrahimpatnam'] },
  { name: 'Maharashtra', cities: ['Mumbai', 'Dombivli High Street', 'Nagpur'] },
  { name: 'Gujarat', cities: ['Poicha Highway Drive-Thru', 'Makwa', 'Western Outlets'] },
  { name: 'Tamil Nadu', cities: ['Mettupalayam Highway Corridor', 'Regional Hubs'] },
  { name: 'Goa', cities: ['Madgaon High Street Flagship', 'Coastal Outlets'] },
  { name: 'Chhattisgarh', cities: ['Raipur Commercial & Retail Outlets'] },
];

const FAQS = [
  {
    q: 'What does "turnkey" mean at Comfort Space?',
    a: 'We take full responsibility from site survey and design through civil, MEP, fit-out, statutory approvals and final handover. You deal with one team and one contract, and receive a ready-to-operate space.',
  },
  {
    q: 'Which sectors do you specialise in?',
    a: "QSR and drive-thru outlets, luxury dining, banking and NBFC branches, corporate offices, retail stores and commercial kitchens. We are an approved contractor for McDonald's (Hardcastle Restaurants) and a preferred vendor to Tata Capital.",
  },
  {
    q: 'Can you execute projects outside Bangalore?',
    a: 'Yes. Our mobile engineering squads currently deliver across Karnataka, Telangana, Andhra Pradesh, Maharashtra, Gujarat, Tamil Nadu, Goa and Chhattisgarh, often running several sites at once.',
  },
  {
    q: 'How long does a typical commercial fit-out take?',
    a: 'It depends on scope and size, but a QSR outlet is usually handed over in 6–10 weeks and a corporate office in 8–14 weeks. Every project gets a committed schedule with weekly progress reporting.',
  },
  {
    q: 'Do you provide support after handover?',
    a: 'Yes — 24/7 emergency response and long-term AMC warranties covering civil, electrical, HVAC and carpentry.',
  },
];

/* --------------------------------------------------------------------------
   About
   -------------------------------------------------------------------------- */
const AboutPage = ({ onSelectTab }) => {
  const manifestoRef = useRef(null);

  const [purposeId, setPurposeId] = useState(PURPOSE[0].id);
  const [openState, setOpenState] = useState(0);
  const [openFaq, setOpenFaq] = useState(0);

  /* Same scroll-pinned sequence as the Home 7-stage framework: the section
     holds still while each slice of scroll advances one milestone. */
  const {
    sectionRef: journeyRef,
    activeIndex: yearIdx,
    setActiveIndex: setYearIdx,
    isPinned: journeyPinned,
  } = useStageSequence(MILESTONES.length);

  useScrollReveal([]);

  const purpose = PURPOSE.find((p) => p.id === purposeId);
  const milestone = MILESTONES[yearIdx];
  const words = MANIFESTO.split(' ');
  const company = INITIAL_DATA.company;

  /* The manifesto lights up word by word as it scrolls through the viewport.
     Progress goes to a CSS variable, so scrolling never re-renders React. */
  useEffect(() => {
    const node = manifestoRef.current;
    if (!node) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      node.style.setProperty('--p', '1');
      return;
    }
    let ticking = false;
    const measure = () => {
      const rect = node.getBoundingClientRect();
      const start = window.innerHeight * 0.85;
      const end = window.innerHeight * 0.35;
      const progress = Math.min(Math.max((start - rect.top) / (start - end + rect.height * 0.4), 0), 1);
      node.style.setProperty('--p', progress.toFixed(3));
      ticking = false;
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

  /* Picking a year while the section is pinned scrolls to that year's slice,
     otherwise the next scroll tick would snap straight back. */
  const pickYear = (idx) => {
    const section = journeyRef.current;
    if (!journeyPinned || !section) {
      setYearIdx(idx);
      return;
    }
    const travel = section.offsetHeight - (window.innerHeight - 72);
    const sectionTop = section.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({
      top: sectionTop - 72 + (travel * (idx + 0.5)) / MILESTONES.length,
      behavior: 'smooth',
    });
  };

  return (
    <main id="tab-about" className="tab-page active-page csx-page csx-about">
      {/* ====================================================================
          1. HERO — editorial copy beside a project mosaic
          ==================================================================== */}
      <section className="abx-hero">
        <div className="container abx-hero-grid">
          <div className="abx-hero-copy">
            <nav className="abx-crumb" aria-label="Breadcrumb">
              <button onClick={() => onSelectTab('home')}>Home</button>
              <span aria-hidden="true">/</span>
              <span aria-current="page">About Us</span>
            </nav>

            <span className="abx-eyebrow">
              <span className="abx-eyebrow-line" aria-hidden="true"></span>
              Since 2004 · Bangalore
            </span>

            <h1 className="abx-hero-title">
              <span className="abx-hero-line">We bring spaces</span>
              <span className="abx-hero-line">
                to <em>life.</em>
              </span>
            </h1>

            <p className="abx-hero-sub">
              Comfort Space Pvt. Ltd. — formerly <strong>Shivashakthi Comforts</strong> — is a
              turnkey interior, civil and project management firm building India&apos;s most
              demanding commercial spaces for over two decades.
            </p>

            <div className="abx-hero-actions">
              <button className="csx-btn csx-btn-dark" onClick={() => onSelectTab('projects')}>
                See Our Work <i className="fa-solid fa-arrow-right"></i>
              </button>
              <button className="csx-btn csx-btn-outline" onClick={() => onSelectTab('contact')}>
                Start a Project
              </button>
            </div>

            <div className="abx-hero-proof">
              <div className="abx-avatars" aria-hidden="true">
                <span>
                  <i className="fa-solid fa-burger"></i>
                </span>
                <span>
                  <i className="fa-solid fa-building-columns"></i>
                </span>
                <span>
                  <i className="fa-solid fa-briefcase"></i>
                </span>
              </div>
              <p>
                Trusted by <strong>McDonald&apos;s, Tata Capital, AU Bank</strong> &amp; MURO
              </p>
            </div>
          </div>

          <div className="abx-mosaic">
            {HERO_MOSAIC.map((m, idx) => (
              <figure key={m.src} className={`abx-mosaic-tile t${idx + 1}`}>
                <img src={m.src} alt={m.alt} />
              </figure>
            ))}

            {/* rotating seal */}
            <div className="abx-seal" aria-hidden="true">
              <svg viewBox="0 0 120 120" className="abx-seal-ring">
                <defs>
                  <path id="abx-seal-path" d="M60,60 m-46,0 a46,46 0 1,1 92,0 a46,46 0 1,1 -92,0" />
                </defs>
                <text>
                  <textPath href="#abx-seal-path">
                    COMFORT SPACE • EST. 2004 • TURNKEY EXPERTS •
                  </textPath>
                </text>
              </svg>
              <span className="abx-seal-core">
                20<small>yrs</small>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          2. BIG NUMBERS — dark band
          ==================================================================== */}
      <section className="abx-numbers-wrap">
        <div className="container">
          <div className="abx-numbers" data-reveal>
            {BIG_NUMBERS.map((n) => (
              <div key={n.label} className="abx-number">
                <span className="abx-number-val">
                  <CountUp end={n.end} suffix={n.suffix} />
                </span>
                <span className="abx-number-label">{n.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================================
          3. MANIFESTO — words light up on scroll
          ==================================================================== */}
      <section className="abx-manifesto-wrap">
        <div className="container">
          <span className="csx-tag">Excellence Through Experience</span>
          <p
            className="abx-manifesto"
            ref={manifestoRef}
            style={{ '--n': words.length }}
            aria-label={MANIFESTO}
          >
            {words.map((w, idx) => (
              <span
                key={idx}
                className={/life|trust|remember/i.test(w) ? 'is-accent' : undefined}
                style={{ '--i': idx }}
                aria-hidden="true"
              >
                {w}{' '}
              </span>
            ))}
          </p>
          <div className="abx-signature" data-reveal>
            <span className="abx-signature-mark">DSR</span>
            <div>
              <strong>D. Sridhar Rao</strong>
              <small>Managing Director, Comfort Space Pvt. Ltd.</small>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          4. PURPOSE — mission / vision / values as tabs
          ==================================================================== */}
      <section className="abx-section abx-tint">
        <div className="container">
          <div className="abx-head" data-reveal>
            <span className="csx-tag">What Drives Us</span>
            <h2 className="csx-head-title csx-head-sm">Purpose behind every project</h2>
          </div>

          <div className="abx-purpose" data-reveal>
            <div className="abx-purpose-tabs" role="tablist" aria-label="Mission, vision and values">
              {PURPOSE.map((p, idx) => (
                <button
                  key={p.id}
                  role="tab"
                  id={`abx-tab-${p.id}`}
                  aria-selected={purposeId === p.id}
                  aria-controls="abx-purpose-panel"
                  className={`abx-purpose-tab ${purposeId === p.id ? 'active' : ''}`}
                  onClick={() => setPurposeId(p.id)}
                >
                  <span className="abx-purpose-tab-num">0{idx + 1}</span>
                  <span className="abx-purpose-tab-label">{p.label}</span>
                  <i className={`fa-solid ${p.icon}`}></i>
                </button>
              ))}
            </div>

            <div
              className="abx-purpose-panel"
              id="abx-purpose-panel"
              role="tabpanel"
              aria-labelledby={`abx-tab-${purpose.id}`}
              key={purpose.id}
            >
              <div className="abx-purpose-copy">
                <h3>{purpose.title}</h3>
                <p>{purpose.text}</p>
                <ul>
                  {purpose.points.map((pt) => (
                    <li key={pt}>
                      <i className="fa-solid fa-arrow-right"></i> {pt}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="abx-purpose-media">
                <img src={purpose.img} alt="" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          5. WHY US — numbered advantage list beside a sticky intro
          ==================================================================== */}
      <section className="abx-section">
        <div className="container abx-why">
          <div className="abx-why-intro" data-reveal>
            <span className="csx-tag">Why Comfort Space</span>
            <h2 className="csx-head-title csx-head-sm">
              Eight reasons brands build with us again and again
            </h2>
            <p>
              Two decades of commercial delivery have taught us what matters most to a brand
              opening a new space: certainty.
            </p>
            <div className="abx-why-media">
              <img src="/assets/images/mcd-hyd-kiosks.jpg" alt="Self-ordering kiosks fitted by Comfort Space" loading="lazy" />
              <span className="abx-why-chip">
                <i className="fa-solid fa-circle-check"></i> 0 timeline overruns on flagship QSR builds
              </span>
            </div>
          </div>

          <ol className="abx-why-list">
            {ADVANTAGES.map((a, idx) => (
              <li key={a.title} data-reveal style={{ '--reveal-delay': `${(idx % 2) * 60}ms` }}>
                <span className="abx-why-num">{String(idx + 1).padStart(2, '0')}</span>
                <div>
                  <h3>{a.title}</h3>
                  <p>{a.text}</p>
                </div>
                <i className="fa-solid fa-arrow-right abx-why-arrow" aria-hidden="true"></i>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ====================================================================
          6. INDUSTRIES — icon grid
          ==================================================================== */}
      <section className="abx-section abx-dark">
        <div className="container">
          <div className="abx-head abx-head-split" data-reveal>
            <div>
              <span className="abx-tag-light">Industries We Serve</span>
              <h2 className="abx-dark-title">Specialists in spaces that can&apos;t afford to fail</h2>
            </div>
            <button className="csx-btn csx-btn-white" onClick={() => onSelectTab('services')}>
              Explore Services <i className="fa-solid fa-arrow-right"></i>
            </button>
          </div>

          <div className="abx-industries">
            {INDUSTRIES.map((ind, idx) => (
              <article
                key={ind.title}
                className="abx-industry"
                data-reveal
                style={{ '--reveal-delay': `${(idx % 4) * 70}ms` }}
              >
                <span className="abx-industry-icon">
                  <i className={`fa-solid ${ind.icon}`}></i>
                </span>
                <h3>{ind.title}</h3>
                <p>{ind.text}</p>
                <span className="abx-industry-num">{String(idx + 1).padStart(2, '0')}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================================
          7. JOURNEY — pinned on scroll, one milestone per scroll slice
          ==================================================================== */}
      <section
        ref={journeyRef}
        className={`csx-stage-scroller abx-journey ${journeyPinned ? 'is-pinning' : ''}`}
        style={{ '--csx-stage-count': MILESTONES.length }}
      >
        <div className="csx-stage-sticky">
          <div className="container">
            <div className="abx-head abx-head-center" data-reveal>
              <span className="csx-tag">Our Journey</span>
              <h2 className="csx-head-title csx-head-sm">Two decades, one standard</h2>
            </div>

            <div className="abx-years" data-reveal role="tablist" aria-label="Company milestones">
              <span className="abx-years-track" aria-hidden="true">
                <span
                  className="abx-years-fill"
                  style={{ width: `${(yearIdx / (MILESTONES.length - 1)) * 100}%` }}
                />
              </span>
              {MILESTONES.map((m, idx) => (
                <button
                  key={m.year}
                  role="tab"
                  aria-selected={idx === yearIdx}
                  className={`abx-year ${idx <= yearIdx ? 'is-past' : ''} ${idx === yearIdx ? 'active' : ''}`}
                  onClick={() => pickYear(idx)}
                >
                  <span className="abx-year-dot"></span>
                  <span className="abx-year-label">{m.year}</span>
                </button>
              ))}
            </div>

            <div className="abx-milestone" key={yearIdx} role="tabpanel">
              <span className="abx-milestone-year" aria-hidden="true">
                {milestone.year}
              </span>
              <div className="abx-milestone-body">
                <span className="abx-milestone-icon">
                  <i className={`fa-solid ${milestone.icon}`}></i>
                </span>
                <div>
                  <h3>{milestone.title}</h3>
                  <p>{milestone.desc}</p>
                </div>
              </div>
              <div className="abx-milestone-nav">
                <button
                  aria-label="Previous milestone"
                  disabled={yearIdx === 0}
                  onClick={() => pickYear(yearIdx - 1)}
                >
                  <i className="fa-solid fa-arrow-left"></i>
                </button>
                <button
                  aria-label="Next milestone"
                  disabled={yearIdx === MILESTONES.length - 1}
                  onClick={() => pickYear(yearIdx + 1)}
                >
                  <i className="fa-solid fa-arrow-right"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          8. LEADERSHIP — portrait panels
          ==================================================================== */}
      <section className="abx-section abx-tint">
        <div className="container">
          <div className="abx-head abx-head-split" data-reveal>
            <div>
              <span className="csx-tag">Leadership</span>
              <h2 className="csx-head-title csx-head-sm">The people behind every handover</h2>
            </div>
            <p className="abx-head-note">
              Every site has a dedicated Resident Engineer and a QA/QC supervisor.
            </p>
          </div>

          <div className="abx-team">
            {LEADERSHIP.map((l, idx) => (
              <article
                key={l.role}
                className="abx-person"
                data-reveal
                style={{ '--reveal-delay': `${idx * 80}ms` }}
                tabIndex={0}
              >
                <div className="abx-person-portrait">
                  <i className={`fa-solid ${l.icon}`}></i>
                  <span className="abx-person-exp">{l.experience}</span>
                  <span className="abx-person-reveal">
                    <small>Expertise</small>
                    <strong>{l.expertise}</strong>
                  </span>
                </div>
                <div className="abx-person-meta">
                  <h3>{l.name}</h3>
                  <span>{l.role}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================================
          9. CREDENTIALS — certificate + seals
          ==================================================================== */}
      <section className="abx-section">
        <div className="container abx-creds">
          <figure className="abx-cert" data-reveal>
            <img
              src="/assets/images/extracted_11_IGBC_Founding_Member_certificate.jpeg"
              alt="IGBC Founding Member certificate awarded to Comfort Space"
              loading="lazy"
            />
          </figure>
          <div className="abx-creds-copy" data-reveal>
            <span className="csx-tag csx-tag-green">Accreditations</span>
            <h2 className="csx-head-title csx-head-sm">Certified to build responsibly</h2>
            <p className="abx-creds-quote">“{company.igbcVision}”</p>
            <p>
              As a Founding Member of the Indian Green Building Council, we specify energy-efficient
              MEP, low-VOC finishes and water-conserving fixtures across every turnkey space.
            </p>
            <ul className="abx-seals">
              {SEALS.map((s) => (
                <li key={s.label} className="abx-seal-badge">
                  <span>
                    <i className={`fa-solid ${s.icon}`}></i>
                  </span>
                  <strong>{s.label}</strong>
                  <small>{s.sub}</small>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ====================================================================
          10. PRESENCE — HQ card + state accordion
          ==================================================================== */}
      <section className="abx-section abx-tint">
        <div className="container abx-presence">
          <div className="abx-hq" data-reveal>
            <span className="abx-tag-light">Headquarters</span>
            <h2>Bangalore, India</h2>
            <p className="abx-hq-address">
              <i className="fa-solid fa-location-dot"></i> {company.address}
            </p>
            <img
              className="abx-hq-photo"
              src="/assets/images/cs-hq-hero.jpg"
              alt="Comfort Space headquarters, Bangalore"
              loading="lazy"
            />
            <div className="abx-hq-stats">
              <div>
                <strong>7+</strong>
                <span>States</span>
              </div>
              <div>
                <strong>30+</strong>
                <span>Cities</span>
              </div>
              <div>
                <strong>200+</strong>
                <span>Sites</span>
              </div>
            </div>
            <span className="abx-hq-glow" aria-hidden="true"></span>
          </div>

          <div className="abx-states" data-reveal>
            <span className="csx-tag">Pan-India Presence</span>
            <h2 className="csx-head-title csx-head-sm">Where we build</h2>
            <div className="abx-acc">
              {STATES.map((s, idx) => {
                const open = openState === idx;
                return (
                  <div key={s.name} className={`abx-acc-item ${open ? 'open' : ''}`}>
                    <button
                      className="abx-acc-head"
                      aria-expanded={open}
                      onClick={() => setOpenState(open ? -1 : idx)}
                    >
                      <span className="abx-acc-title">
                        {s.name}
                        {s.tag && <em>{s.tag}</em>}
                      </span>
                      <span className="abx-acc-count">{s.cities.length} {s.cities.length === 1 ? 'location' : 'locations'}</span>
                      <i className="fa-solid fa-plus" aria-hidden="true"></i>
                    </button>
                    <div className="abx-acc-body">
                      <div>
                        <ul className="abx-city-chips">
                          {s.cities.map((c) => (
                            <li key={c}>{c}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          11. FAQ
          ==================================================================== */}
      <section className="abx-section">
        <div className="container abx-faq">
          <div className="abx-faq-intro" data-reveal>
            <span className="csx-tag">FAQs</span>
            <h2 className="csx-head-title csx-head-sm">Questions clients ask us</h2>
            <p>Can&apos;t find what you&apos;re looking for? Our project team replies within a day.</p>
            <button className="csx-btn csx-btn-brand" onClick={() => onSelectTab('contact')}>
              Ask a Question <i className="fa-solid fa-arrow-right"></i>
            </button>
          </div>

          <div className="abx-acc abx-faq-list" data-reveal>
            {FAQS.map((f, idx) => {
              const open = openFaq === idx;
              return (
                <div key={f.q} className={`abx-acc-item ${open ? 'open' : ''}`}>
                  <button
                    className="abx-acc-head"
                    aria-expanded={open}
                    onClick={() => setOpenFaq(open ? -1 : idx)}
                  >
                    <span className="abx-acc-title">{f.q}</span>
                    <i className="fa-solid fa-plus" aria-hidden="true"></i>
                  </button>
                  <div className="abx-acc-body">
                    <div>
                      <p>{f.a}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ====================================================================
          12. COLLABORATE — contact band
          ==================================================================== */}
      <section className="abx-collab-wrap">
        <div className="container">
          <div className="abx-collab" data-reveal>
            <div className="abx-collab-copy">
              <span className="abx-tag-light">Collaborate With Us</span>
              <h2>
                Have a space in mind? <em>Let&apos;s build it.</em>
              </h2>
              <button className="csx-btn csx-btn-brand" onClick={() => onSelectTab('contact')}>
                Start Your Project <i className="fa-solid fa-arrow-right"></i>
              </button>
            </div>
            <ul className="abx-collab-contacts">
              <li>
                <span>
                  <i className="fa-solid fa-phone"></i>
                </span>
                <div>
                  <small>Call us</small>
                  <a href={`tel:${company.phone.replace(/\s/g, '')}`}>{company.phoneDisplay}</a>
                </div>
              </li>
              <li>
                <span>
                  <i className="fa-solid fa-envelope"></i>
                </span>
                <div>
                  <small>Email</small>
                  <a href={`mailto:${company.email}`}>{company.email}</a>
                </div>
              </li>
              <li>
                <span>
                  <i className="fa-brands fa-whatsapp"></i>
                </span>
                <div>
                  <small>WhatsApp</small>
                  <a
                    href={`https://wa.me/${company.whatsappNumber}?text=${encodeURIComponent(company.whatsappMessage)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Chat with our team
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AboutPage;
