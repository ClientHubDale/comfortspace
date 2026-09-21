import React, { useState, useEffect, useRef } from 'react';

/* ─── Dropdown data ─────────────────────────────────────────────────── */
const DROPDOWNS = {
  about: {
    items: [
      { icon: 'fa-building',          label: 'Our Story',          sub: '20-year legacy of craftsmanship & trust',     tab: 'about' },
      { icon: 'fa-leaf',              label: 'IGBC Founding Member',sub: 'Eco-conscious green building commitment',     tab: 'about' },
      { icon: 'fa-map-location-dot',  label: 'National Footprint', sub: 'Executing seamlessly across 7+ states',       tab: 'about' },
    ],
  },
  services: {
    items: [
      { icon: 'fa-building-columns',  label: 'Civil Construction',      sub: 'Structural, façade & RCC engineering',         tab: 'services' },
      { icon: 'fa-key',               label: 'Turnkey Base Projects',    sub: 'MEP, interiors & networking — one window',     tab: 'services' },
      { icon: 'fa-clipboard-check',   label: 'Project Management (PMC)', sub: 'BOQ, site supervision & vendor orchestration', tab: 'services' },
      { icon: 'fa-shield-halved',     label: 'Fire & Life Safety',       sub: 'Detection, suppression & statutory compliance', tab: 'services' },
      { icon: 'fa-couch',             label: 'Modular Furniture',        sub: 'Bespoke fitments, workstations & joinery',     tab: 'services' },
    ],
  },
  turnkey: {
    items: [
      { icon: 'fa-list-check',        label: '7-Step Scope of Work',     sub: 'Pre-inspection to transparent PO billing',     tab: 'turnkey' },
      { icon: 'fa-chart-gantt',       label: 'Ongoing Projects Tracker', sub: "Live progress of active McDonald's builds",   tab: 'turnkey' },
      { icon: 'fa-images',            label: 'Deliverables in Action',   sub: 'Real site photos across sectors',              tab: 'turnkey' },
    ],
  },
  projects: {
    items: [
      { icon: 'fa-utensils',          label: 'Hospitality & F&B',        sub: "McDonald's, MURO & luxury dining fit-outs",    tab: 'projects' },
      { icon: 'fa-landmark',          label: 'Corporate & Banking',       sub: 'Tata Capital, AU Bank & NBFC branches',        tab: 'projects' },
      { icon: 'fa-layer-group',       label: 'All Projects',             sub: '200+ completed projects across India',          tab: 'projects' },
    ],
  },
};

/* ─── Main Navbar ────────────────────────────────────────────────────── */
const Navbar = ({ activeTab, onSelectTab, onToggleMobileMenu }) => {
  const [openMenu, setOpenMenu] = useState(null); // 'about' | 'services' | 'turnkey' | 'projects' | null
  const [isScrolled, setIsScrolled] = useState(false);
  const timerRef = useRef(null);
  const navRef = useRef(null);

  /* Solidify the frosted header once the page has moved off the top */
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setIsScrolled(window.scrollY > 12);
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Hover Handlers with debounce grace period */
  const handleMouseEnter = (key) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    setOpenMenu(key);
  };

  const handleMouseLeave = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setOpenMenu(null);
    }, 160);
  };

  /* Trigger Click: If menu is already open, navigate to that page. Otherwise, open menu. */
  const handleTriggerClick = (e, key, tab) => {
    e.preventDefault();
    if (openMenu === key) {
      onSelectTab(tab);
      setOpenMenu(null);
    } else {
      setOpenMenu(key);
    }
  };

  /* Dropdown Item Click */
  const handleItemClick = (tab) => {
    onSelectTab(tab);
    setOpenMenu(null);
  };

  /* Close on outside click */
  useEffect(() => {
    const handleOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setOpenMenu(null);
      }
    };
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, []);

  /* Close on Escape key */
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') setOpenMenu(null);
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, []);

  /* Close on route tab change */
  const prevTabRef = useRef(activeTab);
  if (prevTabRef.current !== activeTab) {
    prevTabRef.current = activeTab;
    if (openMenu !== null) {
      setOpenMenu(null);
    }
  }

  /* Cleanup timer */
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const navGo = (tab) => {
    onSelectTab(tab);
    setOpenMenu(null);
  };

  return (
    <header className={`main-header glass-header ${isScrolled ? 'is-scrolled' : ''}`} ref={navRef}>
      <div className="nav-container">

        {/* ── Brand logo ─────────────────────────────────────── */}
        <a href="#home" className="brand-logo" onClick={(e) => { e.preventDefault(); navGo('home'); }}>
          <div className="brand-logo-badge">
            <img src="/assets/images/logo.png" alt="Comfort Space" className="brand-logo-img" />
            <span className="brand-badge-text">comfort space</span>
          </div>
          <span className="brand-logo-text-clean">comfort space</span>
        </a>

        {/* ── Desktop nav ────────────────────────────────────── */}
        <nav aria-label="Main navigation">
          <ul className="nav-menu">

            {/* Home */}
            <li>
              <a
                href="#home"
                className={`nav-link ${activeTab === 'home' ? 'active' : ''}`}
                onClick={(e) => { e.preventDefault(); navGo('home'); }}
              >
                Home
              </a>
            </li>

            {/* About Us ▾ */}
            <li
              className={`dd-wrapper ${openMenu === 'about' ? 'is-open' : ''}`}
              onMouseEnter={() => handleMouseEnter('about')}
              onMouseLeave={handleMouseLeave}
            >
              <button
                type="button"
                className={`nav-link dd-trigger ${activeTab === 'about' ? 'active' : ''} ${openMenu === 'about' ? 'dd-open' : ''}`}
                aria-haspopup="true"
                aria-expanded={openMenu === 'about'}
                onClick={(e) => handleTriggerClick(e, 'about', 'about')}
              >
                About Us <i className="fa-solid fa-chevron-down" />
              </button>
              {openMenu === 'about' && (
                <div className="dd-panel" role="menu">
                  {DROPDOWNS.about.items.map((item) => (
                    <button
                      key={item.label}
                      type="button"
                      className="dd-item"
                      role="menuitem"
                      onClick={() => handleItemClick(item.tab)}
                    >
                      <span className="dd-icon">
                        <i className={`fa-solid ${item.icon}`} />
                      </span>
                      <span className="dd-text">
                        <strong>{item.label}</strong>
                        <span>{item.sub}</span>
                      </span>
                      <i className="fa-solid fa-chevron-right dd-arrow" />
                    </button>
                  ))}
                </div>
              )}
            </li>

            {/* Services ▾ */}
            <li
              className={`dd-wrapper ${openMenu === 'services' ? 'is-open' : ''}`}
              onMouseEnter={() => handleMouseEnter('services')}
              onMouseLeave={handleMouseLeave}
            >
              <button
                type="button"
                className={`nav-link dd-trigger ${activeTab === 'services' ? 'active' : ''} ${openMenu === 'services' ? 'dd-open' : ''}`}
                aria-haspopup="true"
                aria-expanded={openMenu === 'services'}
                onClick={(e) => handleTriggerClick(e, 'services', 'services')}
              >
                Services <i className="fa-solid fa-chevron-down" />
              </button>
              {openMenu === 'services' && (
                <div className="dd-panel" role="menu">
                  {DROPDOWNS.services.items.map((item) => (
                    <button
                      key={item.label}
                      type="button"
                      className="dd-item"
                      role="menuitem"
                      onClick={() => handleItemClick(item.tab)}
                    >
                      <span className="dd-icon">
                        <i className={`fa-solid ${item.icon}`} />
                      </span>
                      <span className="dd-text">
                        <strong>{item.label}</strong>
                        <span>{item.sub}</span>
                      </span>
                      <i className="fa-solid fa-chevron-right dd-arrow" />
                    </button>
                  ))}
                </div>
              )}
            </li>

            {/* Turnkey & Project Management ▾ */}
            <li
              className={`dd-wrapper ${openMenu === 'turnkey' ? 'is-open' : ''}`}
              onMouseEnter={() => handleMouseEnter('turnkey')}
              onMouseLeave={handleMouseLeave}
            >
              <button
                type="button"
                className={`nav-link dd-trigger ${activeTab === 'turnkey' ? 'active' : ''} ${openMenu === 'turnkey' ? 'dd-open' : ''}`}
                aria-haspopup="true"
                aria-expanded={openMenu === 'turnkey'}
                onClick={(e) => handleTriggerClick(e, 'turnkey', 'turnkey')}
              >
                Turnkey &amp; Project Management <i className="fa-solid fa-chevron-down" />
              </button>
              {openMenu === 'turnkey' && (
                <div className="dd-panel" role="menu">
                  {DROPDOWNS.turnkey.items.map((item) => (
                    <button
                      key={item.label}
                      type="button"
                      className="dd-item"
                      role="menuitem"
                      onClick={() => handleItemClick(item.tab)}
                    >
                      <span className="dd-icon">
                        <i className={`fa-solid ${item.icon}`} />
                      </span>
                      <span className="dd-text">
                        <strong>{item.label}</strong>
                        <span>{item.sub}</span>
                      </span>
                      <i className="fa-solid fa-chevron-right dd-arrow" />
                    </button>
                  ))}
                </div>
              )}
            </li>

            {/* Project Gallery ▾ */}
            <li
              className={`dd-wrapper dd-align-right ${openMenu === 'projects' ? 'is-open' : ''}`}
              onMouseEnter={() => handleMouseEnter('projects')}
              onMouseLeave={handleMouseLeave}
            >
              <button
                type="button"
                className={`nav-link dd-trigger ${activeTab === 'projects' ? 'active' : ''} ${openMenu === 'projects' ? 'dd-open' : ''}`}
                aria-haspopup="true"
                aria-expanded={openMenu === 'projects'}
                onClick={(e) => handleTriggerClick(e, 'projects', 'projects')}
              >
                Project Gallery <i className="fa-solid fa-chevron-down" />
              </button>
              {openMenu === 'projects' && (
                <div className="dd-panel" role="menu">
                  {DROPDOWNS.projects.items.map((item) => (
                    <button
                      key={item.label}
                      type="button"
                      className="dd-item"
                      role="menuitem"
                      onClick={() => handleItemClick(item.tab)}
                    >
                      <span className="dd-icon">
                        <i className={`fa-solid ${item.icon}`} />
                      </span>
                      <span className="dd-text">
                        <strong>{item.label}</strong>
                        <span>{item.sub}</span>
                      </span>
                      <i className="fa-solid fa-chevron-right dd-arrow" />
                    </button>
                  ))}
                </div>
              )}
            </li>

            {/* Contact */}
            <li>
              <a
                href="#contact"
                className={`nav-link ${activeTab === 'contact' ? 'active' : ''}`}
                onClick={(e) => { e.preventDefault(); navGo('contact'); }}
              >
                Contact
              </a>
            </li>

          </ul>
        </nav>

        {/* ── Header actions ─────────────────────────────────── */}
        <div className="header-actions">
          <a
            href="#contact"
            className="btn-header-quote"
            onClick={(e) => { e.preventDefault(); navGo('contact'); }}
          >
            Get a Quote <i className="fa-solid fa-arrow-right" />
          </a>
          <button
            className="mobile-toggle"
            id="mobileMenuToggle"
            aria-label="Toggle Menu"
            onClick={onToggleMobileMenu}
          >
            <i className="fa-solid fa-bars" />
          </button>
        </div>

      </div>
    </header>
  );
};

export default Navbar;
