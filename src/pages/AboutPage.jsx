import React, { useState, useEffect, useRef } from 'react';
import { INITIAL_DATA } from '../data/initialData';
import useScrollReveal from '../hooks/useScrollReveal';

/* --------------------------------------------------------------------------
   Animated counter — counts up smoothly when scrolled into view
   -------------------------------------------------------------------------- */
const CountUp = ({ end, prefix = '', suffix = '', duration = 1600 }) => {
  const [value, setValue] = useState(0);
  const nodeRef = useRef(null);

  useEffect(() => {
    const node = nodeRef.current;
    if (!node) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setValue(end);
      return;
    }

    let frame;
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        observer.disconnect();
        const startedAt = performance.now();
        const step = (now) => {
          const progress = Math.min((now - startedAt) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setValue(Math.round(end * eased));
          if (progress < 1) frame = requestAnimationFrame(step);
        };
        frame = requestAnimationFrame(step);
      },
      { threshold: 0.35 }
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      if (frame) cancelAnimationFrame(frame);
    };
  }, [end, duration]);

  return (
    <span ref={nodeRef}>
      {prefix}
      {value}
      {suffix}
    </span>
  );
};

/* --------------------------------------------------------------------------
   Interactive Hero Media Presets
   -------------------------------------------------------------------------- */
const HERO_SHOWCASE_PRESETS = [
  {
    id: 'hq',
    title: 'Bangalore Headquarters',
    caption: 'Corporate Design Studio & PMC Command Centre',
    src: '/assets/images/cs-hq-about.jpg',
    location: 'Bangalore, Karnataka',
  },
  {
    id: 'mcd',
    title: "McDonald's Flagship & McCafe",
    caption: 'Turnkey Civil, Façade & Stainless Kitchen',
    src: '/assets/images/mcd-hyd-entrance.jpg',
    location: 'Hyderabad, Telangana',
  },
  {
    id: 'tata',
    title: 'Tata Capital Regional Hub',
    caption: 'Corporate Banking, Clean Suppression & MEP',
    src: '/assets/images/cs-tata-reception.jpg',
    location: 'Mysore, Karnataka',
  },
  {
    id: 'muro',
    title: 'MURO Fine Dining & Bar',
    caption: 'Luxury Acoustic Joinery & Bespoke Ambiance',
    src: '/assets/images/muro-bar-dining.jpg',
    location: 'Bangalore, Karnataka',
  },
];

/* --------------------------------------------------------------------------
   Detailed 20-Year Evolution Eras (Interactive Capsule)
   -------------------------------------------------------------------------- */
const EVOLUTION_ERAS = [
  {
    year: '2004',
    code: 'GENESIS-04',
    title: 'Inception as Shivashakthi Comforts',
    phase: 'The Craft & Civil Inception',
    lead: 'Bridging architectural drawing intent with rigorous site execution.',
    desc: 'Founded in Bangalore by senior civil engineering practitioners to solve the persistent disconnect between architects and uncoordinated trade subcontractors. Established a strict single-window execution methodology starting with bespoke corporate fit-outs and residential structures.',
    image: '/assets/images/cs-hq-about.jpg',
    badge: 'Foundation Era',
    specs: [
      'Incorporated in Bangalore, Karnataka',
      'Pioneered single-point contractor accountability',
      'Early focus on structural woodwork & civil precision',
      'Assembled core in-house engineering supervision',
    ],
    highlight: 'Zero-Dispute Client SLA Benchmark',
    stats: { projects: '15+', team: '12 Specialists' },
  },
  {
    year: '2010',
    code: 'QSR-10',
    title: "McDonald's Multi-State Partnership",
    phase: 'Institutional High Street Scale',
    lead: 'Selected as certified turnkey partner for Hardcastle Restaurants Pvt. Ltd.',
    desc: "Entrusted with the flagship McDonald's High Street & McCafe development in Hyderabad. Handled heavy RCC facade interventions, commercial grade stainless steel kitchen lines, high-traffic acoustic seating, and compressed night-shift fit-outs under global brand standards.",
    image: '/assets/images/mcd-hyd-entrance.jpg',
    badge: 'National QSR Breakthrough',
    specs: [
      'Turnkey execution of Hyderabad Flagship & McCafe',
      'Full compliance with McDonald’s global brand manual',
      'Commercial stainless kitchen & MEP coordination',
      'Began multi-state partnership spanning 22+ sites',
    ],
    highlight: 'National QSR Vendor of the Year',
    stats: { projects: '45+', team: '35 Specialists' },
    projectId: 'proj-mcd-hyd',
  },
  {
    year: '2014',
    code: 'CORP-14',
    title: 'High-Security Banking & Financial Hubs',
    phase: 'Institutional Banking Tier',
    lead: 'Expanding into strict NBFC compliance, server rooms, and corporate towers.',
    desc: 'Secured master turnkey contracts for Tata Capital’s Mysore Regional Office & Training Centre, followed by AU Small Finance Bank corporate spaces. Mastered FM-200 clean-agent gas suppression, structured Cat6A server rooms, acoustic conference suites, and cash vault security.',
    image: '/assets/images/cs-tata-reception.jpg',
    badge: 'Banking Infrastructure',
    specs: [
      'Tata Capital Regional Hub & Corporate Training Centre',
      'AU Small Finance Bank cubicle and branch execution',
      'High-security server rooms & FM-200 suppression',
      'Rigorous BOQ governance & SLA transparency',
    ],
    highlight: 'Preferred Institutional Banking Vendor',
    stats: { projects: '85+', team: '55 Specialists' },
    projectId: 'proj-tata-mysore',
  },
  {
    year: '2018',
    code: 'GREEN-18',
    title: 'Founding Member Status — IGBC',
    phase: 'Sustainable Commercial Design',
    lead: 'Pioneering eco-conscious, energy-efficient commercial environments across India.',
    desc: 'Conferred Founding Member status by the Indian Green Building Council (IGBC). Embedded low-VOC laminates, sensory LED illumination grids, FSC-certified timbers, optimized thermal HVAC zoning, and aerated sanitary engineering as baseline standards on all projects.',
    image: '/assets/images/extracted_11_IGBC_Founding_Member_certificate.jpeg',
    badge: 'Sustainability Leadership',
    specs: [
      'Founding Member status officially recognized',
      'Low-VOC finishes and sustainable drywall acoustics',
      'Optimized thermal zoning & smart MEP layouts',
      'Commitment to eco-conscious built environments',
    ],
    highlight: 'Indian Green Building Council Founding Member',
    stats: { projects: '120+', team: '70 Specialists' },
    isCertificate: true,
  },
  {
    year: '2022',
    code: 'REBRAND-22',
    title: 'Rebranded to Comfort Space Pvt. Ltd.',
    phase: 'Corporate Consolidation',
    lead: 'Transitioning from regional contractor to a pan-India commercial powerhouse.',
    desc: 'Strategically restructured from Shivashakthi Comforts into Comfort Space Pvt. Ltd., reflecting two decades of operating excellence across 7+ states. Delivered benchmark luxury projects including MURO Fine Dining & Cocktail Bar in Bangalore with acoustic timber joinery.',
    image: '/assets/images/muro-bar-dining.jpg',
    badge: 'Pan-India Corporate Brand',
    specs: [
      'Restructured into Comfort Space Pvt. Ltd.',
      'Execution of luxury destinations like MURO Bangalore',
      '200+ landmark projects completed with zero defaults',
      'Expansion into Gujarat, Maharashtra, and Goa corridors',
    ],
    highlight: '200+ Landmark Projects Handed Over',
    stats: { projects: '175+', team: '85 Specialists' },
    projectId: 'proj-muro-blr',
  },
  {
    year: 'Present',
    code: 'NATION-26',
    title: 'Pan-India Multi-State Scale',
    phase: 'Future-Ready Turnkey Force',
    lead: 'Concurrent multi-state turnkey rollouts with digital site governance.',
    desc: 'Actively executing simultaneous turnkey QSR drive-thrus, corporate banking facilities, and commercial fit-outs across Gujarat, Maharashtra, Chhattisgarh, Karnataka, and Telangana. Supported by 100+ specialist craftsmen, resident civil engineers, and 24/7 post-handover AMC.',
    image: '/assets/images/cs-hq-hero.jpg',
    badge: '22+ McDonald’s & Growing',
    specs: [
      'Poicha Highway Drive-Thru & Regional Flagships',
      'Over 100 in-house specialist engineers and supervisors',
      '24/7 Rapid-Response Post-Handover AMC support squads',
      'Resident Civil Engineers permanently stationed on-site',
    ],
    highlight: 'National Execution Across 7+ States',
    stats: { projects: '200+', team: '100+ Specialists' },
  },
];

/* --------------------------------------------------------------------------
   The 4 Technical Blueprint Disciplines
   -------------------------------------------------------------------------- */
const BLUEPRINT_DISCIPLINES = [
  {
    code: 'CIVIL-01',
    title: 'Structural & Core Civil Engineering',
    icon: 'fa-building-columns',
    summary: 'End-to-end structural engineering, concrete load audits, steel fabrication, exterior glazing, and municipal clearances built for institutional durability.',
    chips: ['RCC Framing', 'Structural Glazing', 'Soil Bearing Audits', 'Façade Engineering'],
  },
  {
    code: 'MEP-02',
    title: 'Integrated Mechanical & Electrical (MEP)',
    icon: 'fa-bolt',
    summary: 'High-precision structured cabling, optimized HVAC thermal distribution, primary and secondary electrical paneling, and intelligent commercial drainage.',
    chips: ['Thermal HVAC Zoning', 'Cat6A Structured Cabling', 'High-Load Switchgear', 'Sanitary Rough-Ins'],
  },
  {
    code: 'JOINERY-03',
    title: 'Bespoke Joinery & Acoustic Architecture',
    icon: 'fa-couch',
    summary: 'Precision-manufactured modular executive furniture, custom timber louvers, acoustic ceiling baffles, and stainless commercial kitchen fabrication.',
    chips: ['FSC Timber Joinery', 'Commercial Stainless Steel', 'Sound Absorption Baffles', 'Modular Workstations'],
  },
  {
    code: 'SAFETY-04',
    title: 'National Building Code (NBC) Life Safety',
    icon: 'fa-shield-halved',
    summary: 'Certified installation of active smoke/heat detection arrays, wet-riser sprinkler piping, clean-agent FM-200 gas systems, and Fire NOC clearances.',
    chips: ['FM-200 Clean Agent', 'NBC Compliant Sprinklers', 'Emergency Egress Illuminations', 'Statutory Fire NOC'],
  },
];

/* --------------------------------------------------------------------------
   Leadership Atelier Profiles
   -------------------------------------------------------------------------- */
const ATELIER_LEADERS = [
  {
    id: 'sridhar',
    name: 'D. Sridhar Rao',
    role: 'Managing Director & Founder',
    experience: '25+ Years Experience',
    icon: 'fa-user-tie',
    accent: '#EA580C',
    quote: '“True turnkey construction is not about managing sub-contractors; it is about taking single-point responsibility so our clients never have to compromise.”',
    bio: 'Founding visionary of Comfort Space Pvt. Ltd. (formerly Shivashakthi Comforts). With over two decades of uncompromising leadership in commercial architecture and civil execution, he has guided the delivery of 200+ complex commercial projects across 7 states.',
    signatureFeats: "Personally spearheaded McDonald's Hyderabad Flagship & McCafe and subsequent national corporate rollout agreements across South and Western India.",
    competencies: ['Turnkey Architecture', 'Strategic SLA Governance', 'Multi-State Client Partnerships', 'Statutory Landlord Clearances'],
  },
  {
    id: 'structural',
    name: 'Principal Civil Engineer',
    role: 'Head of Structural & Façade Engineering',
    experience: '18+ Years Experience',
    icon: 'fa-helmet-safety',
    accent: '#D97706',
    quote: '“A commercial interior is only as sound as the structural civil envelope supporting it. We build with absolute seismic and load precision.”',
    bio: 'Oversees on-site structural integrity, exterior structural glazing, heavy foundation engineering, and concrete load testing across high-traffic QSR drive-thrus and multi-storey commercial complexes.',
    signatureFeats: 'Engineered structural adaptations for Poicha Highway Drive-Thru and complex structural modifications for high-load banking server rooms.',
    competencies: ['RCC Structural Calculations', 'Façade Load Engineering', 'Municipal Clearances', 'Zero-Snag Concrete Testing'],
  },
  {
    id: 'safety',
    name: 'Chief Safety Officer (CSO)',
    role: 'QSR & HSE Statutory Compliance Head',
    experience: '15+ Years Experience',
    icon: 'fa-shield-halved',
    accent: '#16A34A',
    quote: '“Zero compromise on job-site safety and statutory National Building Code compliance. Every built space must safeguard human life.”',
    bio: 'Leads our comprehensive Health, Safety & Environment (HSE) governance. Conducts mandatory pre-handover fire suppression audits, NBC compliance inspections, and statutory Fire Department NOC approvals.',
    signatureFeats: 'Maintained a flawless zero-accident record across all 22+ active McDonald’s site executions and high-security banking rollouts.',
    competencies: ['National Building Code (NBC)', 'FM-200 Fire Suppression', 'Job Hazard Analysis (JHA)', 'Statutory Fire NOCs'],
  },
  {
    id: 'pmc',
    name: 'PMC & Client Relations Head',
    role: 'Projects Management Lead (PMC)',
    experience: '20+ Years Experience',
    icon: 'fa-clipboard-check',
    accent: '#7C3AED',
    quote: '“Precision in BOQ estimation and transparency in critical path tracking are the foundations of client trust.”',
    bio: 'Directs procurement schedules, material vetting, critical milestone monitoring, and weekly executive progress reviews to eliminate schedule overruns and budget deviations.',
    signatureFeats: 'Pioneered Comfort Space’s proprietary 7-Stage Turnkey framework, delivering 98.4% of projects ahead of scheduled opening dates.',
    competencies: ['Critical Path Method (CPM)', 'BOQ Budget Control', 'Trade Scheduling', 'As-Built Documentation Handover'],
  },
];

/* --------------------------------------------------------------------------
   Accreditation Vault
   -------------------------------------------------------------------------- */
const VAULT_CREDENTIALS = [
  {
    id: 'igbc',
    title: 'IGBC Founding Member',
    authority: 'Indian Green Building Council (IGBC)',
    tag: 'Sustainable Built Environment',
    desc: 'Conferred Founding Member status by the IGBC for adopting green architecture principles, energy-optimized thermal MEP, and low-VOC materials.',
    icon: 'fa-leaf',
    color: '#16A34A',
    bg: '#DCFCE7',
    hasCertificate: true,
    certificateImg: '/assets/images/extracted_11_IGBC_Founding_Member_certificate.jpeg',
    certCaption: 'Official Founding Member Certificate — Indian Green Building Council (IGBC)',
  },
  {
    id: 'iso',
    title: 'ISO 9001:2015 Compliant',
    authority: 'Quality Management Systems',
    tag: 'Process Precision',
    desc: 'Audited quality assurance workflows governing civil construction, joinery craftsmanship, electrical safety, and snag-free client sign-offs.',
    icon: 'fa-certificate',
    color: '#EA580C',
    bg: '#FFEDD5',
  },
  {
    id: 'mcd-vendor',
    title: "McDonald's Master Approved Contractor",
    authority: 'Hardcastle Restaurants Pvt. Ltd.',
    tag: 'QSR & High Street',
    desc: 'Empanelled master turnkey contractor across West and South India, executing 22+ flagship outlets with commercial stainless kitchen plumbing.',
    icon: 'fa-utensils',
    color: '#D97706',
    bg: '#FEF3C7',
  },
  {
    id: 'nbc',
    title: 'NBC Fire Code Certified',
    authority: 'National Building Code of India',
    tag: 'Life Safety Statutory',
    desc: 'Full compliance with NBC Part 4 fire detection, gas suppression, wet risers, compartmentation, and statutory local fire authority NOC clearances.',
    icon: 'fa-fire-extinguisher',
    color: '#DC2626',
    bg: '#FEE2E2',
  },
  {
    id: 'tata-vendor',
    title: 'Tata Capital Preferred Vendor',
    authority: 'Tata Capital Financial Services',
    tag: 'Corporate Banking Hubs',
    desc: 'Preferred turnkey partner for corporate banking regional headquarters, secure vaults, acoustic boardrooms, and centralized network hubs.',
    icon: 'fa-building-columns',
    color: '#7C3AED',
    bg: '#F3E8FF',
  },
  {
    id: 'track-record',
    title: 'Two Decades Clean Track Record',
    authority: 'Corporate Commercial Standing',
    tag: 'Zero Legal Default',
    desc: '20+ years of uninterrupted business performance, zero arbitration defaults, transparent itemized BOQ billing, and 100% on-time project deliveries.',
    icon: 'fa-award',
    color: '#0284C7',
    bg: '#E0F2FE',
  },
];

/* --------------------------------------------------------------------------
   National Radar States
   -------------------------------------------------------------------------- */
const RADAR_STATES = [
  {
    id: 'ka',
    state: 'Karnataka',
    role: 'Corporate Headquarters & Design Studio',
    count: '80+ Projects',
    cities: 'Bangalore (HQ), Mysore, Bagalur, Doddabalapur, Budigere, Udupi, Suratkhal',
    flagship: 'Bangalore Corporate Design Studio, MURO Fine Dining, Tata Capital Regional Hub',
    squad: 'Resident Civil Engineers, QA/QC Division, Joinery Millwork Force',
  },
  {
    id: 'ts',
    state: 'Telangana',
    role: 'Flagship QSR & Corporate Tech Corridor',
    count: '35+ Projects',
    cities: 'Hyderabad, Secunderabad, Gachibowli, Madhapur, Hitec City',
    flagship: "McDonald's Hyderabad Flagship & McCafe, Phoenix Avance LUNA, Aparna Mall",
    squad: 'Mobile QSR Fit-Out Squad, MEP Specialists, Night-Shift Supervisors',
  },
  {
    id: 'ap',
    state: 'Andhra Pradesh',
    role: 'Coastal Commercial & Banking Corridor',
    count: '25+ Projects',
    cities: 'Visakhapatnam (Madhurawada, MVP Colony), Rajamundry, Ibrahimpatnam',
    flagship: "McDonald's Visakhapatnam High Street & McCafe Outlets",
    squad: 'Coastal Façade Squad, Banking Fit-Out Technicians',
  },
  {
    id: 'mh',
    state: 'Maharashtra',
    role: 'Western Commercial & High Street Hub',
    count: '30+ Projects',
    cities: 'Mumbai Metro, Dombivli High Street, Nagpur, Pune Regional',
    flagship: "Dombivli High Street Flagship, McDonald's Outlets & Corporate Centers",
    squad: 'High Street Project Managers, Mall Liaison Engineers',
  },
  {
    id: 'gj',
    state: 'Gujarat',
    role: 'Highway Corridors & Drive-Thrus',
    count: '18+ Projects',
    cities: 'Poicha Highway Corridor, Makwa, Vadodara, Ahmedabad Regions',
    flagship: 'Poicha Highway Drive-Thru with structural RCC and high-speed QSR bay',
    squad: 'Highway Structural Civil Team, Heavy MEP Riggers',
  },
  {
    id: 'tn',
    state: 'Tamil Nadu',
    role: 'Regional Corridors & Retail Hubs',
    count: '15+ Projects',
    cities: 'Mettupalayam Highway Corridor, Coimbatore & Southern Hubs',
    flagship: 'Highway Corridor Drive-Thrus & Regional Retail Centers',
    squad: 'Regional Logistics Squad, Electrical Sign-Off Team',
  },
  {
    id: 'goa-cg',
    state: 'Goa & Chhattisgarh',
    role: 'Hospitality & Emerging Commercial Hubs',
    count: '12+ Projects',
    cities: 'Madgaon (Goa), Panaji, Raipur (Chhattisgarh)',
    flagship: "Madgaon High Street Flagship & Raipur Commercial Centers",
    squad: 'Hospitality Acoustic Craftsmen, Rapid Handover Team',
  },
];

/* --------------------------------------------------------------------------
   AboutPage Main Component
   -------------------------------------------------------------------------- */
const AboutPage = ({ onSelectTab, onOpenProjectModal, onOpenStoryModal, projects = [] }) => {
  // State management
  const [activeHeroPreset, setActiveHeroPreset] = useState(0);
  const [selectedEraIdx, setSelectedEraIdx] = useState(0);
  const [activeLeaderIdx, setActiveLeaderIdx] = useState(0);
  const [activeRadarIdx, setActiveRadarIdx] = useState(0);
  const [inspectedCertificate, setInspectedCertificate] = useState(null);

  // Cycling statement ticker
  const [tickerIndex, setTickerIndex] = useState(0);
  const TICKER_STATEMENTS = [
    '20+ Years of Undefeated Single-Point Turnkey Accountability.',
    'Over 200+ Institutional Built Environments Delivered on Time.',
    "22+ McDonald's Flagships and Drive-Thrus Built Across India.",
    'Founding Member of the Indian Green Building Council (IGBC).',
    '100+ Permanent In-House Civil Engineers, PMCs & Craftsmen.',
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setTickerIndex((prev) => (prev + 1) % TICKER_STATEMENTS.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [TICKER_STATEMENTS.length]);

  useScrollReveal();

  const currentHero = HERO_SHOWCASE_PRESETS[activeHeroPreset];
  const currentEra = EVOLUTION_ERAS[selectedEraIdx];
  const currentLeader = ATELIER_LEADERS[activeLeaderIdx];
  const currentRadar = RADAR_STATES[activeRadarIdx];

  const handleOpenMilestoneProject = (projectId) => {
    if (!projectId || !projects || !projects.length) {
      onSelectTab('projects');
      return;
    }
    const found = projects.find((p) => p.id === projectId);
    if (found && onOpenProjectModal) {
      onOpenProjectModal(found);
    } else {
      onSelectTab('projects');
    }
  };

  return (
    <main id="tab-about" className="tab-page active-page csx-home csx-about csx-abx-blueprint-bg">
      {/* ====================================================================
          1. ASYMMETRIC ATELIER HERO (DISTINCT FROM HOME)
          ==================================================================== */}
      <section className="csx-abx-hero">
        <div className="container">
          <div className="csx-abx-hero-layout">
            {/* Left Hero Column */}
            <div className="csx-abx-hero-left" data-reveal>
              {/* Rotating Architectural Seal Stamp & Chapter Pills */}
              <div className="csx-abx-seal-row">
                <div className="csx-abx-seal" title="Comfort Space Corporate Seal">
                  <svg className="csx-abx-seal-svg" viewBox="0 0 100 100">
                    <defs>
                      <path
                        id="abxSealCircle"
                        d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                      />
                    </defs>
                    <text fontSize="8.6" fontWeight="800" letterSpacing="2.2" fill="#1E293B">
                      <textPath href="#abxSealCircle" startOffset="0%">
                        • COMFORT SPACE PVT. LTD. • EST. 2004 •
                      </textPath>
                    </text>
                  </svg>
                  <div className="csx-abx-seal-core">
                    <i className="fa-solid fa-compass-drafting"></i>
                  </div>
                </div>

                <div className="csx-abx-seal-text">
                  <span>ATELIER ARCHITECTURAL PROFILE</span>
                  <strong>Commercial Interiors &amp; Turnkey Civil</strong>
                </div>
              </div>

              {/* Quick Chapter Navigation Strip */}
              <nav className="csx-abx-chapters" aria-label="Page Sections">
                <a href="#evolution-capsule" className="csx-abx-chapter-pill">
                  01 Chronology
                </a>
                <a href="#blueprint-disciplines" className="csx-abx-chapter-pill">
                  02 Blueprint
                </a>
                <a href="#atelier-leadership" className="csx-abx-chapter-pill">
                  03 Leadership
                </a>
                <a href="#credentials-vault" className="csx-abx-chapter-pill">
                  04 Credentials
                </a>
                <a href="#national-radar" className="csx-abx-chapter-pill">
                  05 National Grid
                </a>
              </nav>

              {/* Grand Atelier Headline */}
              <h1 className="csx-abx-title">
                The Engineering of <br />
                <span className="csx-abx-serif-accent">Architectural Permanence</span>
              </h1>

              {/* Dynamic Live Statement Ticker */}
              <div className="csx-abx-ticker-box">
                <span className="csx-abx-ticker-dot" aria-hidden="true"></span>
                <span className="csx-abx-ticker-text">{TICKER_STATEMENTS[tickerIndex]}</span>
              </div>

              <p className="csx-abx-desc">
                From our roots as <strong>Shivashakthi Comforts in 2004</strong> to{' '}
                <strong>Comfort Space Pvt. Ltd.</strong> today — we relieve corporate leaders of all
                execution complexity. Single-point accountability, permanent in-house civil engineering
                squads, and zero tolerance for timeline deviation.
              </p>

              <div className="csx-btn-row">
                <a
                  href="#evolution-capsule"
                  className="csx-btn csx-btn-brand"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('evolution-capsule')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Explore 20-Yr Journey <i className="fa-solid fa-timeline"></i>
                </a>

                {onOpenStoryModal && (
                  <button className="csx-btn csx-btn-ghost" onClick={onOpenStoryModal}>
                    <span className="csx-play">
                      <span className="csx-play-wave"></span>
                      <i className="fa-solid fa-play"></i>
                    </span>
                    Watch Corporate Film
                  </button>
                )}

                <button
                  className="csx-btn csx-btn-outline"
                  onClick={() => {
                    document.getElementById('credentials-vault')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Inspect Credentials <i className="fa-solid fa-certificate"></i>
                </button>
              </div>
            </div>

            {/* Right Hero Column: 3D Perspective Card Stage */}
            <div className="csx-abx-stage-wrap" data-reveal>
              <div className="csx-abx-card-stage">
                <div className="csx-abx-stage-media">
                  <img
                    src={currentHero.src}
                    alt={currentHero.title}
                    className="csx-abx-stage-img"
                  />
                  <div className="csx-abx-stage-shimmer"></div>

                  {/* CAD Coordinates Overlay */}
                  <div className="csx-abx-cad-overlay">
                    <i className="fa-solid fa-location-crosshairs"></i>
                    <span>LAT 12.9141° N • LON 77.6094° E</span>
                  </div>

                  {/* Floating Guarantee Badge */}
                  <div className="csx-abx-guarantee-badge">
                    <div className="csx-abx-guarantee-copy">
                      <strong>{currentHero.title}</strong>
                      <span>{currentHero.caption}</span>
                    </div>
                    <div
                      style={{
                        background: '#DCFCE7',
                        color: '#15803D',
                        fontSize: '0.74rem',
                        fontWeight: 800,
                        padding: '0.3rem 0.75rem',
                        borderRadius: '9999px',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      <i className="fa-solid fa-check-circle"></i> Handed Over
                    </div>
                  </div>
                </div>
              </div>

              {/* Live Thumbnail Switcher Strip */}
              <div className="csx-abx-thumb-strip" aria-label="Hero photo selector">
                {HERO_SHOWCASE_PRESETS.map((preset, idx) => (
                  <button
                    key={preset.id}
                    className={`csx-abx-thumb-btn ${activeHeroPreset === idx ? 'active' : ''}`}
                    onClick={() => setActiveHeroPreset(idx)}
                    title={`View ${preset.title}`}
                  >
                    <img src={preset.src} alt={preset.title} />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          2. DYNAMIC ORBIT METRIC CAPSULES
          ==================================================================== */}
      <section className="csx-abx-orbit-section">
        <div className="container">
          <div className="csx-abx-orbit-grid" data-reveal>
            <div className="csx-abx-orbit-card">
              <div className="csx-abx-orbit-num">
                <CountUp end={20} suffix="+" />
              </div>
              <div className="csx-abx-orbit-label">Years of Pedigree</div>
              <div className="csx-abx-orbit-sub">Incorporated 2004 in Bangalore</div>
            </div>

            <div className="csx-abx-orbit-card">
              <div className="csx-abx-orbit-num">
                <CountUp end={200} suffix="+" />
              </div>
              <div className="csx-abx-orbit-label">Turnkey Deliveries</div>
              <div className="csx-abx-orbit-sub">100% on-time milestone handovers</div>
            </div>

            <div className="csx-abx-orbit-card">
              <div className="csx-abx-orbit-num">
                <CountUp end={22} suffix="+" />
              </div>
              <div className="csx-abx-orbit-label">McDonald's Outlets</div>
              <div className="csx-abx-orbit-sub">Approved Master National Partner</div>
            </div>

            <div className="csx-abx-orbit-card">
              <div className="csx-abx-orbit-num">
                <CountUp end={7} suffix="+" />
              </div>
              <div className="csx-abx-orbit-label">States Operating</div>
              <div className="csx-abx-orbit-sub">South &amp; Western India corridors</div>
            </div>

            <div className="csx-abx-orbit-card">
              <div className="csx-abx-orbit-num">
                <CountUp end={100} suffix="+" />
              </div>
              <div className="csx-abx-orbit-label">Specialist Squad</div>
              <div className="csx-abx-orbit-sub">Permanent civil engineers on site</div>
            </div>

            <div className="csx-abx-orbit-card">
              <div className="csx-abx-orbit-num">
                <CountUp end={100} suffix="%" />
              </div>
              <div className="csx-abx-orbit-label">Statutory Compliance</div>
              <div className="csx-abx-orbit-sub">NBC code &amp; fire NOC adherence</div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          3. THEN VS NOW / 20-YEAR EVOLUTION CAPSULE
          ==================================================================== */}
      <section className="csx-abx-evolution-section" id="evolution-capsule">
        <div className="container">
          <div className="csx-head-center" data-reveal>
            <span className="csx-tag">Chronological Evolution</span>
            <h2 className="csx-head-title">Two Decades of Milestone Breakthroughs</h2>
            <p className="csx-head-sub">
              Drag or click through the eras to discover how Shivashakthi Comforts transformed into
              Comfort Space — an institutional turnkey force.
            </p>
          </div>

          {/* Interactive Era Rail */}
          <div className="csx-abx-era-rail" data-reveal>
            {EVOLUTION_ERAS.map((era, idx) => (
              <button
                key={era.year}
                className={`csx-abx-era-btn ${selectedEraIdx === idx ? 'active' : ''}`}
                onClick={() => setSelectedEraIdx(idx)}
              >
                <span className="csx-abx-era-badge">{era.year}</span>
                <span>{era.phase}</span>
              </button>
            ))}
          </div>

          {/* Active Era Exhibition Stage */}
          <div className="csx-abx-era-stage" key={currentEra.year} data-reveal>
            <div className="csx-abx-era-media">
              <img src={currentEra.image} alt={currentEra.title} loading="lazy" />
              <div className="csx-abx-era-veil"></div>
              <div className="csx-abx-era-tag">
                <i className="fa-solid fa-code-commit"></i> {currentEra.code}
              </div>

              {currentEra.isCertificate && (
                <button
                  className="csx-btn csx-btn-glass"
                  style={{
                    position: 'absolute',
                    bottom: '1.5rem',
                    left: '1.5rem',
                    zIndex: 3,
                    fontSize: '0.82rem',
                    padding: '0.5rem 1rem',
                  }}
                  onClick={() =>
                    setInspectedCertificate({
                      title: currentEra.title,
                      image: currentEra.image,
                      authority: 'Indian Green Building Council (IGBC)',
                      caption: 'Official Founding Member Certificate conferred in 2018.',
                    })
                  }
                >
                  <i className="fa-solid fa-expand"></i> Inspect Original Certificate
                </button>
              )}
            </div>

            <div className="csx-abx-era-content">
              <div className="csx-abx-era-subtitle">{currentEra.phase}</div>
              <h3 className="csx-abx-era-title">{currentEra.title}</h3>
              <p className="csx-abx-era-lead">{currentEra.lead}</p>
              <p className="csx-abx-era-body">{currentEra.desc}</p>

              <ul className="csx-abx-era-specs">
                {currentEra.specs.map((item, i) => (
                  <li key={i}>
                    <i className="fa-solid fa-circle-check"></i> {item}
                  </li>
                ))}
              </ul>

              <div className="csx-btn-row">
                {currentEra.projectId ? (
                  <button
                    className="csx-btn csx-btn-brand"
                    onClick={() => handleOpenMilestoneProject(currentEra.projectId)}
                  >
                    View Project Case Study <i className="fa-solid fa-arrow-up-right-from-square"></i>
                  </button>
                ) : (
                  <button className="csx-btn csx-btn-dark" onClick={() => onSelectTab('projects')}>
                    Explore Related Projects <i className="fa-solid fa-arrow-right"></i>
                  </button>
                )}

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.6rem',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    color: 'var(--brand-orange)',
                    marginLeft: 'auto',
                  }}
                >
                  <i className="fa-solid fa-star"></i> {currentEra.highlight}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          4. THE 4 TECHNICAL BLUEPRINT DISCIPLINES
          ==================================================================== */}
      <section className="csx-abx-blueprint-section" id="blueprint-disciplines">
        <div className="container">
          <div className="csx-head-row" data-reveal>
            <div>
              <span className="csx-tag">Engineering Matrix</span>
              <h2 className="csx-head-title csx-head-sm">
                Four Pillars of Technical Execution
              </h2>
              <p className="csx-head-sub">
                Our in-house capabilities encompass the complete architectural anatomy of institutional
                and commercial built spaces.
              </p>
            </div>
            <button className="csx-btn csx-btn-outline" onClick={() => onSelectTab('turnkey')}>
              View 7-Stage Methodology <i className="fa-solid fa-arrow-right"></i>
            </button>
          </div>

          <div className="csx-abx-discipline-grid" data-reveal>
            {BLUEPRINT_DISCIPLINES.map((disc) => (
              <div className="csx-abx-discipline-card" key={disc.code}>
                <div className="csx-abx-discipline-head">
                  <div className="csx-abx-discipline-icon">
                    <i className={`fa-solid ${disc.icon}`}></i>
                  </div>
                  <span className="csx-abx-discipline-code">{disc.code}</span>
                </div>

                <h3>{disc.title}</h3>
                <p>{disc.summary}</p>

                <div className="csx-abx-discipline-chips">
                  {disc.chips.map((c) => (
                    <span key={c}>{c}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================================
          5. THE ATELIER LEADERSHIP SPOTLIGHT
          ==================================================================== */}
      <section className="csx-abx-atelier-section" id="atelier-leadership">
        <div className="container">
          <div className="csx-head-center" data-reveal>
            <span className="csx-tag">Atelier Leadership</span>
            <h2 className="csx-head-title">Engineered Under Senior Directorship</h2>
            <p className="csx-head-sub">
              Select an executive to examine their technical directorship, engineering pedigree, and
              signature commercial executions.
            </p>
          </div>

          <div className="csx-abx-atelier-layout" data-reveal>
            {/* Left: Leader Selector Cards */}
            <div className="csx-abx-leader-list">
              {ATELIER_LEADERS.map((leader, idx) => (
                <button
                  key={leader.id}
                  className={`csx-abx-leader-select-btn ${activeLeaderIdx === idx ? 'active' : ''}`}
                  onClick={() => setActiveLeaderIdx(idx)}
                >
                  <div className="csx-abx-leader-avatar-circle">
                    <i className={`fa-solid ${leader.icon}`}></i>
                  </div>
                  <div className="csx-abx-leader-copy">
                    <strong>{leader.name}</strong>
                    <small>{leader.role}</small>
                  </div>
                  <div style={{ marginLeft: 'auto', fontSize: '0.8rem', opacity: 0.8 }}>
                    <i className="fa-solid fa-chevron-right"></i>
                  </div>
                </button>
              ))}
            </div>

            {/* Right: Active Spotlight Stage */}
            <div className="csx-abx-spotlight-card" key={currentLeader.id}>
              <div className="csx-abx-spotlight-pill">
                <i className="fa-solid fa-clock"></i> {currentLeader.experience}
              </div>

              <h3 className="csx-abx-spotlight-name">{currentLeader.name}</h3>
              <span className="csx-abx-spotlight-role">{currentLeader.role}</span>

              <blockquote className="csx-abx-spotlight-quote">
                {currentLeader.quote}
              </blockquote>

              <p className="csx-abx-spotlight-body">{currentLeader.bio}</p>

              <div className="csx-abx-spotlight-feats">
                <h5>Signature Institutional Feat</h5>
                <p>{currentLeader.signatureFeats}</p>
              </div>

              <div className="csx-abx-discipline-chips" style={{ marginBottom: '1.75rem' }}>
                {currentLeader.competencies.map((comp) => (
                  <span key={comp} style={{ background: '#FFFFFF' }}>
                    <i className="fa-solid fa-check" style={{ color: 'var(--brand-orange)', marginRight: '4px' }}></i>
                    {comp}
                  </span>
                ))}
              </div>

              <div className="csx-btn-row">
                <a
                  className="csx-btn csx-btn-dark"
                  href={`https://wa.me/${INITIAL_DATA.company.whatsappNumber}?text=${encodeURIComponent(
                    `Hello Comfort Space team, I would like to consult with ${currentLeader.name} regarding a commercial project.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fa-brands fa-whatsapp"></i> Speak With {currentLeader.name.split(' ')[0]}
                </a>

                <button className="csx-btn csx-btn-outline" onClick={() => onSelectTab('contact')}>
                  Schedule Consultation
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          6. VERIFIED CREDENTIALS VAULT & MODAL INSPECTOR
          ==================================================================== */}
      <section className="csx-abx-vault-section" id="credentials-vault">
        <div className="container">
          <div className="csx-head-center" data-reveal>
            <span className="csx-tag">Statutory Accreditations</span>
            <h2 className="csx-head-title">The Verified Credentials Vault</h2>
            <p className="csx-head-sub">
              Transparent, statutory recognitions affirming our engineering standards, green building
              commitments, and institutional compliance.
            </p>
          </div>

          <div className="csx-abx-vault-grid" data-reveal>
            {VAULT_CREDENTIALS.map((cred) => (
              <div className="csx-abx-vault-card" key={cred.id}>
                <div className="csx-abx-vault-top">
                  <div className="csx-abx-vault-icon" style={{ background: cred.bg, color: cred.color }}>
                    <i className={`fa-solid ${cred.icon}`}></i>
                  </div>
                  <div>
                    <h4 className="csx-abx-vault-title">{cred.title}</h4>
                    <span className="csx-abx-vault-tag" style={{ color: cred.color }}>
                      {cred.tag}
                    </span>
                  </div>
                </div>

                <p className="csx-abx-vault-desc">{cred.desc}</p>

                <div className="csx-abx-vault-action">
                  <span style={{ fontSize: '0.78rem', color: '#64748B', fontWeight: 600 }}>
                    {cred.authority}
                  </span>

                  {cred.hasCertificate && (
                    <button
                      className="csx-abx-vault-inspect-btn"
                      onClick={() =>
                        setInspectedCertificate({
                          title: cred.title,
                          image: cred.certificateImg,
                          authority: cred.authority,
                          caption: 'Official Founding Member Certificate conferred by IGBC in 2018.',
                        })
                      }
                    >
                      Inspect Certificate <i className="fa-solid fa-arrow-up-right-from-square"></i>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* VIP Capability Deck Banner */}
          <div className="csx-brochure-vip" data-reveal>
            <div className="csx-brochure-vip-copy">
              <span className="csx-brochure-vip-tag">
                <i className="fa-solid fa-file-pdf"></i> Corporate Capability Profile
              </span>
              <h3>Download the Comfort Space Institutional Deck</h3>
              <p>
                Access our comprehensive corporate capability dossier, client case studies for McDonald's
                and Tata Capital, statutory clearances, and engineering leadership profiles.
              </p>
            </div>

            <div className="csx-brochure-vip-actions">
              <button className="csx-btn csx-btn-brand" onClick={() => onSelectTab('contact')}>
                <i className="fa-solid fa-paper-plane"></i> Request Custom BOQ Pitch
              </button>
              <button className="csx-btn csx-btn-white" onClick={() => window.print()}>
                <i className="fa-solid fa-print"></i> Print / Save PDF
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          7. NATIONAL RADAR GRID (7+ STATES)
          ==================================================================== */}
      <section className="csx-abx-radar-section" id="national-radar">
        <div className="container">
          <div className="csx-head-row" data-reveal>
            <div>
              <span className="csx-tag">Territorial Network</span>
              <h2 className="csx-head-title csx-head-sm">National Operational Grid</h2>
              <p className="csx-head-sub">
                Interactive command radar of our mobile squads, supply hubs, and flagship installations
                operating across South and Western India.
              </p>
            </div>
            <button className="csx-btn csx-btn-outline" onClick={() => onSelectTab('projects')}>
              View Complete Gallery <i className="fa-solid fa-arrow-up-right-from-square"></i>
            </button>
          </div>

          <div className="csx-abx-radar-layout" data-reveal>
            {/* Left: High-Tech Dark Radar Console */}
            <div className="csx-abx-radar-console">
              <div className="csx-abx-radar-grid-visual"></div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span
                  style={{
                    fontSize: '0.74rem',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    letterSpacing: '1.5px',
                    color: '#FDBA74',
                  }}
                >
                  <i className="fa-solid fa-satellite-dish"></i> ACTIVE REGIONAL BEACONS
                </span>
                <span
                  style={{
                    fontSize: '0.72rem',
                    color: '#94A3B8',
                    fontFamily: 'monospace',
                  }}
                >
                  COORD: 7+ STATES
                </span>
              </div>

              <div className="csx-abx-beacon-list">
                {RADAR_STATES.map((st, idx) => (
                  <button
                    key={st.id}
                    className={`csx-abx-beacon-btn ${activeRadarIdx === idx ? 'active' : ''}`}
                    onClick={() => setActiveRadarIdx(idx)}
                  >
                    <span className="csx-abx-beacon-ping"></span>
                    <div>
                      <strong>{st.state}</strong>
                      <small>{st.count}</small>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Right: Active State Detail Console */}
            <div className="csx-abx-radar-detail" key={currentRadar.id}>
              <span className="csx-abx-radar-state-pill">{currentRadar.count} Handled</span>
              <h3 className="csx-abx-radar-state-title">{currentRadar.state}</h3>
              <span className="csx-abx-radar-role">{currentRadar.role}</span>

              <div style={{ marginBottom: '1.25rem' }}>
                <strong style={{ fontSize: '0.88rem', color: 'var(--csx-ink)', display: 'block', marginBottom: '0.35rem' }}>
                  <i className="fa-solid fa-city" style={{ color: 'var(--brand-orange)', marginRight: '6px' }}></i> Key Cities Covered:
                </strong>
                <p style={{ fontSize: '0.92rem', color: '#4B5563', lineHeight: 1.6, margin: 0 }}>
                  {currentRadar.cities}
                </p>
              </div>

              <div style={{ marginBottom: '1.25rem' }}>
                <strong style={{ fontSize: '0.88rem', color: 'var(--csx-ink)', display: 'block', marginBottom: '0.35rem' }}>
                  <i className="fa-solid fa-trophy" style={{ color: 'var(--brand-orange)', marginRight: '6px' }}></i> Flagship Landmarks:
                </strong>
                <p style={{ fontSize: '0.92rem', color: '#4B5563', lineHeight: 1.6, margin: 0 }}>
                  {currentRadar.flagship}
                </p>
              </div>

              <div style={{ marginBottom: '1.85rem' }}>
                <strong style={{ fontSize: '0.88rem', color: 'var(--csx-ink)', display: 'block', marginBottom: '0.35rem' }}>
                  <i className="fa-solid fa-users-gear" style={{ color: 'var(--brand-orange)', marginRight: '6px' }}></i> Stationed Squads:
                </strong>
                <p style={{ fontSize: '0.88rem', color: '#64748B', lineHeight: 1.5, margin: 0 }}>
                  {currentRadar.squad}
                </p>
              </div>

              <button className="csx-btn csx-btn-dark" onClick={() => onSelectTab('projects')}>
                Filter {currentRadar.state} in Gallery <i className="fa-solid fa-arrow-right"></i>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          8. CLOSING GRAND CONSULTATION CTA
          ==================================================================== */}
      <section className="csx-section">
        <div className="container">
          <div
            className="csx-head-center"
            style={{
              background: 'linear-gradient(135deg, #1E2538 0%, #0F172A 100%)',
              borderRadius: '28px',
              padding: '4.5rem 2.5rem',
              color: '#FFFFFF',
              boxShadow: '0 32px 70px -25px rgba(15, 23, 42, 0.55)',
              position: 'relative',
              overflow: 'hidden',
            }}
            data-reveal
          >
            <span
              className="csx-hero-pill"
              style={{
                background: 'rgba(255, 255, 255, 0.12)',
                color: '#FFFFFF',
                border: '1px solid rgba(255, 255, 255, 0.25)',
                marginBottom: '1.35rem',
              }}
            >
              <i className="fa-solid fa-handshake"></i> Partner with Comfort Space
            </span>

            <h2
              className="csx-head-title"
              style={{ color: '#FFFFFF', maxWidth: '820px', margin: '0 auto 1.35rem' }}
            >
              Ready to Engineer Your Landmark Commercial Environment?
            </h2>

            <p
              className="csx-head-sub"
              style={{
                color: '#CBD5E1',
                maxWidth: '680px',
                fontSize: '1.05rem',
                lineHeight: 1.75,
                margin: '0 auto 2.5rem',
              }}
            >
              Whether you are planning a high-traffic multi-state QSR rollout, corporate banking
              headquarters, luxury restaurant, or heavy civil fit-out — our principal architects and
              civil engineers are ready to assist.
            </p>

            <div className="csx-hero-actions">
              <button className="csx-btn csx-btn-brand" onClick={() => onSelectTab('contact')}>
                <i className="fa-solid fa-paper-plane"></i> Discuss Your Project
              </button>

              <a
                className="csx-btn csx-btn-glass"
                href={`https://wa.me/${INITIAL_DATA.company.whatsappNumber}?text=${encodeURIComponent(
                  INITIAL_DATA.company.whatsappMessage
                )}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fa-brands fa-whatsapp" style={{ color: '#25D366' }}></i> Direct WhatsApp Consultation
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          CERTIFICATE INSPECTION MODAL
          ==================================================================== */}
      {inspectedCertificate && (
        <div
          className="csx-abx-modal-overlay"
          onClick={() => setInspectedCertificate(null)}
          role="dialog"
          aria-modal="true"
        >
          <div className="csx-abx-modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="csx-abx-modal-head">
              <div>
                <span
                  style={{
                    fontSize: '0.74rem',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    color: 'var(--brand-orange)',
                    letterSpacing: '1px',
                  }}
                >
                  VERIFIED STATUTORY ACCREDITATION
                </span>
                <h3>{inspectedCertificate.title}</h3>
              </div>
              <button
                className="csx-abx-modal-close"
                onClick={() => setInspectedCertificate(null)}
                title="Close"
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>

            <div className="csx-abx-modal-body">
              <img
                src={inspectedCertificate.image}
                alt={inspectedCertificate.title}
                className="csx-abx-modal-img"
              />
              <div
                style={{
                  background: '#F8FAFC',
                  border: '1px solid var(--csx-line)',
                  borderRadius: '12px',
                  padding: '1.25rem 1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '1rem',
                }}
              >
                <div>
                  <strong style={{ fontSize: '0.92rem', color: 'var(--csx-ink)', display: 'block' }}>
                    {inspectedCertificate.authority}
                  </strong>
                  <span style={{ fontSize: '0.82rem', color: '#64748B' }}>
                    {inspectedCertificate.caption}
                  </span>
                </div>
                <button
                  className="csx-btn csx-btn-dark"
                  onClick={() => window.print()}
                  style={{ fontSize: '0.8rem', padding: '0.5rem 1rem' }}
                >
                  <i className="fa-solid fa-print"></i> Print Document
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default AboutPage;
