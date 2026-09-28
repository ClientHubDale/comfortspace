import React, { useEffect, useRef, useState } from 'react';
import { INITIAL_DATA } from '../data/initialData';
import useScrollReveal from '../hooks/useScrollReveal';
import { smoothScrollTo } from '../utils/smoothScroll';

/* --------------------------------------------------------------------------
   Content
   -------------------------------------------------------------------------- */
// single site photographs (several source files are named for a different shot)
const STEP_IMAGES = [
  '/assets/images/extracted_17_MURO_bar.jpeg', // McDonald's Hyderabad frontage
  '/assets/images/extracted_16_MURO_dining.jpeg', // McDonald's kiosks & dining
  '/assets/images/extracted_19_McDonald_s_dining.jpeg', // service counter & equipment
  '/assets/images/extracted_23_Tata_Capital_office.jpeg', // Tata Capital office floor
  '/assets/images/extracted_18_McDonald_s_Hyderabad.jpeg', // McCafe counter
  '/assets/images/extracted_20_McDonald_s_counter.jpeg', // finished counter & dining
  '/assets/images/extracted_21_Kitchen_fit_out.jpeg', // Tata Capital reception
];

const COMPARE = [
  { label: 'Contracts to manage', them: 'One per trade — civil, MEP, HVAC, carpentry, fire', us: 'One contract, one team' },
  { label: 'Accountability', them: 'Split between vendors who blame each other', us: 'Single point, from drawing to keys' },
  { label: 'Scheduling', them: 'Trades clash on site and wait on each other', us: 'Synchronised trade scheduling' },
  { label: 'Materials', them: 'Each vendor sources to their own standard', us: 'Procured strictly to the approved BOQ' },
  { label: 'Approvals & permits', them: 'You chase landlords and authorities', us: 'Landlord, mall and municipal coordination handled' },
  { label: 'Billing', them: 'Separate bills to reconcile', us: 'Itemised bills against PO terms' },
  { label: 'After handover', them: 'Call each vendor when something fails', us: '24/7 support and AMC' },
];

const DELIVERABLES = [
  {
    img: '/assets/images/extracted_17_MURO_bar.jpeg',
    tag: 'QSR Civil Infrastructure',
    title: "McDonald's Hyderabad Flagship",
    text: 'Structural glazing, drive-thru civil aprons and outdoor branding fit-out.',
  },
  {
    img: '/assets/images/extracted_19_McDonald_s_dining.jpeg',
    tag: 'Heavy MEP & Kitchens',
    title: 'Commercial Kitchen & MEP',
    text: 'Stainless steel hoods, specialised grease drainage and fire suppression systems.',
  },
  {
    img: '/assets/images/extracted_24_Tata_Capital_training_room.jpeg',
    tag: 'Corporate Headquarters',
    title: 'Tata Capital Regional Hub',
    text: 'Modular workstation clusters, acoustic ceilings and integrated cabling.',
  },
  {
    img: '/assets/images/extracted_12_MURO_Restaurant_interior.jpeg',
    tag: 'Turnkey Hospitality',
    title: 'MURO Luxury Dining & Bar',
    text: 'Bespoke timber louvers, marble counters and ambient architectural lighting.',
  },
];

const RING = 2 * Math.PI * 42; // circumference of the progress rings

/* --------------------------------------------------------------------------
   Turnkey
   -------------------------------------------------------------------------- */
const TurnkeyPage = ({ onSelectTab }) => {
  const steps = INITIAL_DATA.turnkeySteps;
  const ongoing = INITIAL_DATA.ongoingProjects;

  const hscrollRef = useRef(null);
  const trackRef = useRef(null);
  const [stepIdx, setStepIdx] = useState(0);
  const [hPinned, setHPinned] = useState(false);
  const [openPanel, setOpenPanel] = useState(0);

  useScrollReveal([]);

  /* The 7 steps pin in place and slide sideways as the page scrolls down.
     The section is made exactly tall enough to cover the sideways travel. */
  useEffect(() => {
    const section = hscrollRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const HEADER = 72;
    let distance = 0;
    let ticking = false;

    const canPin = () =>
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches && window.innerWidth > 900;

    const update = () => {
      ticking = false;
      if (!canPin()) return;
      const travel = section.offsetHeight - (window.innerHeight - HEADER);
      const progress = Math.min(Math.max((HEADER - section.getBoundingClientRect().top) / travel, 0), 1);
      track.style.transform = `translate3d(${-progress * distance}px, 0, 0)`;
      section.style.setProperty('--hp', progress.toFixed(4));
      const idx = Math.min(steps.length - 1, Math.round(progress * (steps.length - 1)));
      setStepIdx((prev) => (prev === idx ? prev : idx));
    };

    const measure = () => {
      if (!canPin()) {
        setHPinned(false);
        section.style.height = '';
        track.style.transform = '';
        return;
      }
      setHPinned(true);
      distance = Math.max(track.scrollWidth - track.parentElement.clientWidth, 0);
      section.style.height = `${distance + window.innerHeight}px`;
      update();
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };

    let resizeTimer;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(measure, 150);
    };

    measure();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    return () => {
      clearTimeout(resizeTimer);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      section.style.height = '';
    };
  }, [steps.length]);

  return (
    <main id="tab-turnkey" className="tab-page active-page csx-page csx-turnkey">
      {/* ====================================================================
          1. HERO
          ==================================================================== */}
      <section className="tkx-hero">
        <div className="container tkx-hero-grid">
          <div className="tkx-hero-copy">
            <nav className="abx-crumb" aria-label="Breadcrumb">
              <button onClick={() => onSelectTab('home')}>Home</button>
              <span aria-hidden="true">/</span>
              <span aria-current="page">Turnkey &amp; Project Management</span>
            </nav>

            <span className="abx-eyebrow">
              <span className="abx-eyebrow-line" aria-hidden="true"></span>
              Unified Turnkey Track
            </span>

            <h1 className="tkx-title">
              <span className="tkx-title-line">From bare shell</span>
              <span className="tkx-title-line">
                to <em>brand-ready</em>
              </span>
              <span className="tkx-title-line">handover.</span>
            </h1>

            <p className="tkx-sub">
              Site inspection, permits, procurement, civil, MEP and interiors, snag clearance and
              transparent PO billing — one team carries every commercial build end to end.
            </p>

            <div className="tkx-hero-actions">
              <button className="csx-btn csx-btn-brand" onClick={() => onSelectTab('contact')}>
                Start a Turnkey Project <i className="fa-solid fa-arrow-right"></i>
              </button>
              <button className="csx-btn csx-btn-outline" onClick={() => smoothScrollTo('tk-scope')}>
                See the 7 Steps
              </button>
            </div>

            <ul className="tkx-hero-facts">
              <li>
                <strong>07</strong>
                <span>Step delivery framework</span>
              </li>
              <li>
                <strong>01</strong>
                <span>Contract &amp; point of contact</span>
              </li>
              <li>
                <strong>0{ongoing.length}</strong>
                <span>Sites under construction now</span>
              </li>
            </ul>
          </div>

          <div className="tkx-hero-media">
            <div className="tkx-hero-photo">
              <img
                src="/assets/images/extracted_17_MURO_bar.jpeg"
                alt="McDonald's Hyderabad flagship built turnkey by Comfort Space"
              />
            </div>

            <div className="tkx-float tkx-float-a">
              <span className="tkx-float-icon">
                <i className="fa-solid fa-key"></i>
              </span>
              <div>
                <strong>Single-window delivery</strong>
                <small>Drawing to keys handover</small>
              </div>
            </div>

            <div className="tkx-float tkx-float-b">
              <div className="tkx-float-head">
                <span className="tkx-live-dot" aria-hidden="true"></span>
                Live on site
              </div>
              {ongoing.slice(0, 3).map((p) => (
                <div key={p.sl} className="tkx-mini">
                  <div className="tkx-mini-row">
                    <span>{p.site}</span>
                    <b>{p.progress}%</b>
                  </div>
                  <span className="tkx-mini-bar">
                    <span style={{ '--w': `${p.progress}%` }}></span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          2. WHY TURNKEY — side-by-side comparison
          ==================================================================== */}
      <section id="tk-why" className="tkx-section">
        <div className="container">
          <div className="tkx-head tkx-head-center" data-reveal>
            <span className="csx-tag">Why Turnkey</span>
            <h2 className="csx-head-title csx-head-sm">
              Many contractors, or <span className="svx-serif">one accountable team?</span>
            </h2>
          </div>

          <div className="tkx-compare" data-reveal>
            <div className="tkx-compare-head">
              <span></span>
              <span className="tkx-col-them">
                <i className="fa-solid fa-people-arrows"></i> Separate contractors
              </span>
              <span className="tkx-col-us">
                <i className="fa-solid fa-key"></i> Comfort Space turnkey
              </span>
            </div>
            {COMPARE.map((row, idx) => (
              <div key={row.label} className="tkx-compare-row" style={{ '--r': idx }}>
                <span className="tkx-compare-label">{row.label}</span>
                <span className="tkx-compare-them">
                  <i className="fa-solid fa-xmark"></i>
                  {row.them}
                </span>
                <span className="tkx-compare-us">
                  <i className="fa-solid fa-check"></i>
                  {row.us}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================================
          3. 7-STEP SCOPE — pinned, slides sideways with the scroll
          ==================================================================== */}
      <section id="tk-scope" ref={hscrollRef} className={`tkx-hscroll ${hPinned ? 'is-pinned' : ''}`}>
        <div className="tkx-hscroll-sticky">
          <div className="container tkx-hscroll-head">
            <div>
              <span className="csx-tag">Execution Roadmap</span>
              <h2 className="csx-head-title csx-head-sm">The 7-step turnkey scope of work</h2>
            </div>
            <div className="tkx-counter" aria-hidden="true">
              <span className="tkx-counter-now">{steps[stepIdx].step}</span>
              <span className="tkx-counter-all">/ 0{steps.length}</span>
            </div>
          </div>

          <div className="tkx-hscroll-viewport">
            <div className="tkx-track" ref={trackRef}>
              {steps.map((s, idx) => (
                <article key={s.step} className={`tkx-step ${idx === stepIdx ? 'is-active' : ''}`}>
                  <div className="tkx-step-media">
                    <img src={STEP_IMAGES[idx]} alt={s.title} />
                    <span className="tkx-step-num">{s.step}</span>
                  </div>
                  <div className="tkx-step-body">
                    <span className="tkx-step-label">Step {s.step}</span>
                    <h3>{s.title}</h3>
                    <p>{s.description}</p>
                  </div>
                </article>
              ))}

              <article className="tkx-step tkx-step-end">
                <span className="tkx-step-end-icon">
                  <i className="fa-solid fa-flag-checkered"></i>
                </span>
                <h3>Documented in your SLA</h3>
                <p>
                  Every step is written into the client service level agreement, so you always know
                  what happens next and who owns it.
                </p>
                <button className="csx-btn csx-btn-white" onClick={() => onSelectTab('contact')}>
                  Initiate a Turnkey Inquiry <i className="fa-solid fa-arrow-right"></i>
                </button>
              </article>
            </div>
          </div>

          <div className="container">
            <div className="tkx-progress" aria-hidden="true">
              <span className="tkx-progress-fill"></span>
              {steps.map((s, idx) => (
                <span
                  key={s.step}
                  className={`tkx-progress-dot ${idx <= stepIdx ? 'is-on' : ''}`}
                  style={{ left: `${(idx / (steps.length - 1)) * 100}%` }}
                ></span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          4. DELIVERABLES — expanding photo panels
          ==================================================================== */}
      <section id="tk-deliverables" className="tkx-section tkx-tint">
        <div className="container">
          <div className="tkx-head tkx-head-split" data-reveal>
            <div>
              <span className="csx-tag">Visual Verification</span>
              <h2 className="csx-head-title csx-head-sm">Turnkey deliverables in action</h2>
            </div>
            <p className="tkx-head-note">
              Real site photographs — structural integrity, precision MEP and corporate fit-out
              standards across our key sectors.
            </p>
          </div>

          <div className="tkx-panels" data-reveal>
            {DELIVERABLES.map((d, idx) => (
              <button
                key={d.title}
                type="button"
                className={`tkx-panel ${openPanel === idx ? 'is-open' : ''}`}
                onMouseEnter={() => setOpenPanel(idx)}
                onFocus={() => setOpenPanel(idx)}
                onClick={() => setOpenPanel(idx)}
                aria-expanded={openPanel === idx}
              >
                <img src={d.img} alt="" loading="lazy" />
                <span className="tkx-panel-shade" aria-hidden="true"></span>
                <span className="tkx-panel-num">0{idx + 1}</span>
                <span className="tkx-panel-spine">{d.title}</span>
                <span className="tkx-panel-copy">
                  <small>{d.tag}</small>
                  <strong>{d.title}</strong>
                  <span>{d.text}</span>
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================================
          5. LIVE TRACKER — progress rings
          ==================================================================== */}
      <section id="tk-tracker" className="tkx-section">
        <div className="container">
          <div className="tkx-head tkx-head-split" data-reveal>
            <div>
              <span className="csx-tag">
                <span className="tkx-live-dot" aria-hidden="true"></span> Active Construction
              </span>
              <h2 className="csx-head-title csx-head-sm">Ongoing turnkey projects tracker</h2>
            </div>
            <p className="tkx-head-note">
              Live status of ongoing McDonald&apos;s executions for Hardcastle Restaurants Pvt. Ltd.
            </p>
          </div>

          <div className="tkx-sites">
            {ongoing.map((p, idx) => (
              <article
                key={p.sl}
                className="tkx-site"
                data-reveal
                style={{ '--reveal-delay': `${idx * 80}ms` }}
              >
                <div className="tkx-ring">
                  <svg viewBox="0 0 100 100" aria-hidden="true">
                    <circle className="tkx-ring-bg" cx="50" cy="50" r="42" />
                    <circle
                      className="tkx-ring-fg"
                      cx="50"
                      cy="50"
                      r="42"
                      style={{ strokeDasharray: RING, '--off': RING * (1 - p.progress / 100) }}
                    />
                  </svg>
                  <span className="tkx-ring-val">
                    {p.progress}
                    <small>%</small>
                  </span>
                </div>
                <div className="tkx-site-body">
                  <h3>{p.site}</h3>
                  <span className="tkx-site-state">
                    <i className="fa-solid fa-location-dot"></i> {p.state}
                  </span>
                  <span className="tkx-site-stage">{p.stage}</span>
                  <span className="tkx-site-client">{p.client}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================================
          6. CTA
          ==================================================================== */}
      <section className="tkx-cta-wrap">
        <div className="container">
          <div className="tkx-cta" data-reveal>
            <div className="tkx-cta-copy">
              <span className="abx-tag-light">Multi-Site Rollouts</span>
              <h2>
                Opening several outlets at once? <em>We&apos;re already doing it.</em>
              </h2>
              <p>
                Our mobile engineering squads are running these builds in parallel right now — yours
                can join the schedule.
              </p>
              <button className="csx-btn csx-btn-brand" onClick={() => onSelectTab('contact')}>
                Plan My Rollout <i className="fa-solid fa-arrow-right"></i>
              </button>
            </div>
            <ul className="tkx-cta-cities">
              {ongoing.map((p) => (
                <li key={p.sl}>
                  <span className="tkx-live-dot" aria-hidden="true"></span>
                  <strong>{p.site}</strong>
                  <small>{p.state}</small>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
};

export default TurnkeyPage;
