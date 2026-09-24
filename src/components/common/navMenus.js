/* Navigation dropdown contents, shared by the desktop Navbar and the mobile
   drawer. An item with `section` scrolls to that element id on its page. */
export const DROPDOWNS = {
  about: {
    items: [
      { icon: 'fa-book-open',         label: 'Our Story',                sub: 'Two decades of craftsmanship & trust',   tab: 'about', section: 'about-story' },
      { icon: 'fa-bullseye',          label: 'Mission, Vision & Values', sub: 'The purpose behind every project',       tab: 'about', section: 'about-purpose' },
      { icon: 'fa-thumbs-up',         label: 'Why Choose Us',            sub: 'Eight reasons brands build with us',     tab: 'about', section: 'about-why' },
      { icon: 'fa-industry',          label: 'Industries We Serve',      sub: 'QSR, banking, corporate & more',         tab: 'about', section: 'about-industries' },
      { icon: 'fa-timeline',          label: 'Our Journey',              sub: '2004 to today, milestone by milestone',  tab: 'about', section: 'about-journey' },
      { icon: 'fa-users',             label: 'Leadership',               sub: 'The people behind every handover',       tab: 'about', section: 'about-leadership' },
      { icon: 'fa-leaf',              label: 'IGBC & Credentials',       sub: 'Founding Member & accreditations',       tab: 'about', section: 'about-credentials' },
      { icon: 'fa-map-location-dot',  label: 'Pan-India Presence',       sub: 'Executing across 7+ states',             tab: 'about', section: 'about-presence' },
    ],
  },
  services: {
    items: [
      { icon: 'fa-building-columns',  label: 'Civil Construction',       sub: 'Structural, façade & RCC engineering',          tab: 'services', section: 'svc-civil-construction' },
      { icon: 'fa-key',               label: 'Turnkey Base Projects',    sub: 'MEP, interiors & networking — one window',      tab: 'services', section: 'svc-turnkey-projects' },
      { icon: 'fa-clipboard-check',   label: 'Project Management (PMC)', sub: 'BOQ, site supervision & vendor orchestration',  tab: 'services', section: 'svc-project-management' },
      { icon: 'fa-shield-halved',     label: 'Fire & Life Safety',       sub: 'Detection, suppression & statutory compliance', tab: 'services', section: 'svc-fire-safety' },
      { icon: 'fa-couch',             label: 'Modular Furniture',        sub: 'Bespoke fitments, workstations & joinery',      tab: 'services', section: 'svc-modular-furniture' },
      { icon: 'fa-screwdriver-wrench',label: 'Post-Handover & 24/7 AMC', sub: 'Rapid-response maintenance squads',             tab: 'services', section: 'svc-post-handover' },
    ],
  },
  turnkey: {
    items: [
      { icon: 'fa-list-check',        label: '7-Step Scope of Work',     sub: 'Pre-inspection to transparent PO billing',     tab: 'turnkey', section: 'tk-scope' },
      { icon: 'fa-images',            label: 'Deliverables in Action',   sub: 'Real site photos across sectors',              tab: 'turnkey', section: 'tk-deliverables' },
      { icon: 'fa-chart-gantt',       label: 'Ongoing Projects Tracker', sub: "Live progress of active McDonald's builds",   tab: 'turnkey', section: 'tk-tracker' },
    ],
  },
  projects: {
    items: [
      { icon: 'fa-utensils',          label: 'Hospitality & F&B',        sub: "McDonald's, MURO & luxury dining fit-outs",    tab: 'projects', section: 'projects-gallery', filter: 'hospitality-retail' },
      { icon: 'fa-landmark',          label: 'Corporate & Banking',      sub: 'Tata Capital, AU Bank & NBFC branches',        tab: 'projects', section: 'projects-gallery', filter: 'corporate-banking' },
      { icon: 'fa-layer-group',       label: 'All Projects',             sub: '200+ completed projects across India',          tab: 'projects', section: 'projects-gallery', filter: 'all' },
    ],
  },
};
