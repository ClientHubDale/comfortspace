/**
 * Comfort Space Pvt. Ltd. (Formerly Shivashakthi Comforts)
 * Master Data Store & Initial Seeds
 */

export const INITIAL_DATA = {
  company: {
    name: "Comfort Space Pvt. Ltd.",
    formerName: "Shivashakthi Comforts",
    logo: "assets/images/logo.png",
    tagline: "Commercial Interiors, Turnkey Fit-Outs & Civil Infrastructure",
    experience: "20+",
    projectsCompleted: "200+",
    statesCovered: "7+",
    igbcStatus: "Founding Member, Indian Green Building Council (IGBC)",
    igbcVision: "To enable a sustainable built environment for all",
    phone: "+91 98450 12345",
    phoneDisplay: "+91 98450 12345",
    email: "projects@comfortspace.com",
    address: "#48, 2nd Floor, 100 Feet Ring Road, BTM Layout 2nd Stage, Bangalore, Karnataka - 560076",
    whatsappNumber: "919845012345",
    whatsappMessage: "Hello Comfort Space team, I am interested in discussing a Turnkey / Interior Fit-out project."
  },

  categories: [
    { id: "all", name: "All Projects" },
    { id: "hospitality-retail", name: "Hospitality, F&B & Retail" },
    { id: "corporate-banking", name: "Corporate, Banking & Infrastructure" }
  ],

  services: [
    {
      id: "civil-construction",
      number: "01",
      title: "Civil Construction",
      subtitle: "Commercial, Residential & Infrastructure",
      summary: "End-to-end structural engineering, shell & core building, foundation works, and commercial architectural expansion built for longevity and structural safety.",
      features: [
        "Specialized in Commercial, Residential & Industrial Structures",
        "RCC framing, steel fabrication, and exterior façade engineering",
        "Municipal and local authority drawing approvals & regulatory clearances",
        "Rigorous concrete strength testing & structural integrity audits"
      ],
      icon: "fa-building-columns",
      image: "assets/images/mcdonalds-hyd-exterior.jpg"
    },
    {
      id: "turnkey-projects",
      number: "02",
      title: "Turnkey Base Projects",
      subtitle: "Interiors, MEP, Civil & Networking Under One Roof",
      summary: "A unified single-window solution taking commercial spaces from bare shell to complete operational readiness. We handle architectural fit-outs, MEP, networking, and HVAC seamlessly.",
      features: [
        "Comprehensive single-point accountability from drawing to keys handover",
        "Integrated Electrical, Plumbing, HVAC & High-Speed Structured Cabling",
        "High-finish flooring, ceiling acoustical treatments, and dry-wall partitions",
        "Synchronized trade scheduling ensuring zero-delay project delivery"
      ],
      icon: "fa-key",
      image: "assets/images/mcdonalds-hyd-mccafe.png"
    },
    {
      id: "project-management",
      number: "03",
      title: "Project Management (PMC)",
      subtitle: "Site Supervision, BOQ & Vendor Orchestration",
      summary: "Rigorous PMC governance to protect client budgets, maintain uncompromising safety benchmarks, and ensure exact adherence to architectural specifications.",
      features: [
        "Detailed BOQ estimation, material tracking & milestone budgeting",
        "Dedicated full-time on-site Resident Engineers & QA/QC Supervisors",
        "Periodical site progress reviews with client leadership and architects",
        "Risk mitigation, snag tracking, and transparent bill audits"
      ],
      icon: "fa-clipboard-check",
      image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=900&q=80"
    },
    {
      id: "fire-safety",
      number: "04",
      title: "Fire & Life Safety",
      subtitle: "Detection, Suppression & Statutory Compliance",
      summary: "Certified life-safety design, installation, and commission of active and passive firefighting systems compliant with NBC and local fire safety codes.",
      features: [
        "Automated smoke/heat detection systems & fire alarm panels",
        "Wet riser, sprinkler piping, and clean agent suppression systems",
        "Fire-rated doors, compartmentation, and emergency exit pathway lighting",
        "Fire Department NOC documentation & statutory compliance sign-offs"
      ],
      icon: "fa-shield-halved",
      image: "https://images.unsplash.com/photo-1582139329536-e7284fece509?auto=format&fit=crop&w=900&q=80"
    },
    {
      id: "modular-furniture",
      number: "05",
      title: "Modular Furniture Supply",
      subtitle: "Bespoke Fitments, Workstations & Joinery",
      summary: "Precision-manufactured modular workstations, conference tables, acoustic pods, restaurant dining booths, and executive cabins tailored to your brand identity.",
      features: [
        "High-durability commercial grade laminates, solid wood & metal alloys",
        "Ergonomic workstations, executive desks & collaborative hub systems",
        "Custom restaurant booth seating, bar counter joinery & service consoles",
        "Factory-finished pre-fabricated panels for rapid site installation"
      ],
      icon: "fa-couch",
      image: "assets/images/mcdonalds-hyd-counters.png"
    },
    {
      id: "post-handover",
      number: "06",
      title: "Post-Handover Support & 24/7 AMC",
      subtitle: "Dedicated Rapid-Response Maintenance Teams",
      summary: "Our commitment extends well beyond handover. Dedicated 24/7 maintenance squads guarantee continuous operational comfort and rapid emergency resolution.",
      features: [
        "24/7 on-call technical response for electrical, plumbing and HVAC",
        "Preventive scheduled maintenance visits and facility audit reports",
        "Dedicated snag list rectification squads with rapid turnarounds",
        "Long-term annual maintenance contracts (AMC) for corporate chains"
      ],
      icon: "fa-screwdriver-wrench",
      image: "assets/images/mcdonalds-hyd-kitchen.jpg"
    }
  ],

  turnkeySteps: [
    {
      step: "01",
      title: "Site Inspection & Drawing Review",
      description: "Comprehensive pre-commencement site inspection. Our engineering squad audits site measurements, checks existing MEP rough-ins, verifies against architectural blueprints, and alerts the client and architect to any physical deviations before breaking ground."
    },
    {
      step: "02",
      title: "Municipal & Landlord Coordination",
      description: "Smooth coordination with Landlords (LL), Mall Management, and Municipal authorities for work permits, security protocols, debris management, and night-shift execution clearances."
    },
    {
      step: "03",
      title: "Specification-Grade Procurement",
      description: "Direct sourcing of materials strictly adhering to approved BOQ specifications. Every batch of tiles, electrical conduits, cabling, paints, and fixtures is vetted for quality and environmental sustainability."
    },
    {
      step: "04",
      title: "Real-time Updates & Periodic Reviews",
      description: "Scheduled milestone reports and periodical progress review meetings with Client Project Managers and Architects. Transparent tracking of critical paths to foresee and mitigate any risk to timelines."
    },
    {
      step: "05",
      title: "Pre-Handover Snag Rectification",
      description: "Before inviting client leadership, an exhaustive internal audit identifies any micro-deviations. Snags in paint, joinery, illumination, and plumbing are rectified with zero compromises."
    },
    {
      step: "06",
      title: "Handing Over & Sign-Off",
      description: "Formal joint inspection, demonstration of all MEP and safety systems, handover of as-built drawings, warranties, O&M manuals, and obtaining the final client sign-off."
    },
    {
      step: "07",
      title: "Transparent Billing & PO Settlement",
      description: "Clear, itemized bill submission strictly aligned with Purchase Order (PO) terms and measured on-site quantities with complete supporting documentation."
    }
  ],

  clients: [
    {
      name: "HARDCASTLE RESTAURANTS PVT. LTD.",
      tagline: "Master Franchisee of McDonald's (West & South India)",
      type: "QSR / High Street / Drive-Thru",
      scope: "22+ Projects Handled (17 Handed Over + 5 Ongoing)",
      highlight: "National QSR Partner",
      logoText: "McDonald's",
      logoBadge: "West & South India"
    },
    {
      name: "MURO Restaurant, Bangalore",
      tagline: "Luxury Top Notch Fine Dining & Cocktail Bar",
      type: "Hospitality / F&B",
      scope: "Turnkey Interior Fit-out, Bespoke Joinery & Acoustic Ambience",
      highlight: "Impeccable Luxury Ambiance",
      logoText: "MURO",
      logoBadge: "Bangalore"
    },
    {
      name: "TATA CAPITAL LIMITED",
      tagline: "Premier Financial Services Powerhouse",
      type: "Corporate Banking / Training Centers",
      scope: "Regional Office & Training Centre Mysore + Micro Finance Branches",
      highlight: "Corporate Excellence",
      logoText: "TATA CAPITAL",
      logoBadge: "Mysore & Regional"
    },
    {
      name: "KOTAK MAHINDRA BANK LTD.",
      tagline: "Leading Private Sector Commercial Bank",
      type: "Banking & Financial Services",
      scope: "Retail Branch Fit-Outs, Security Partitions & MEP Infrastructure",
      highlight: "High-Security Banking",
      logoText: "KOTAK BANK",
      logoBadge: "Commercial Branches"
    },
    {
      name: "AU SMALL FINANCE BANK LTD.",
      tagline: "Fastest Growing Scheduled Commercial Bank",
      type: "Banking & Retail Banking Hubs",
      scope: "Turnkey Branch Architecture, Signage & Modular Cash Counters",
      highlight: "Retail Banking Hubs",
      logoText: "AU BANK",
      logoBadge: "Branch Network"
    },
    {
      name: "HORIZON IMPEX PVT. LTD.",
      tagline: "Si Nonna's Sourdough Pizza Chain",
      type: "Artisanal Restaurant & Dining",
      scope: "Authentic Neapolitan Pizzeria Interior Architecture & Kitchen Fit-out",
      highlight: "Gourmet F&B Fit-Out",
      logoText: "SI NONNA'S",
      logoBadge: "Gourmet Pizzeria"
    }
  ],

  projects: [
    {
      id: "proj-mcd-hyd",
      title: "McDonald's Flagship & McCafe — Hyderabad",
      client: "HARDCASTLE RESTAURANTS PRIVATE LIMITED",
      category: "hospitality-retail",
      categoryLabel: "Hospitality, F&B & Retail",
      state: "Telangana",
      city: "Hyderabad",
      type: "High Street Flagship & McCafe",
      status: "Handed Over",
      year: "2024",
      image: "assets/images/mcdonalds-hyd-exterior.jpg",
      gallery: [
        "assets/images/mcdonalds-hyd-exterior.jpg",
        "assets/images/mcdonalds-hyd-mccafe.png",
        "assets/images/mcdonalds-hyd-kitchen.jpg",
        "assets/images/mcdonalds-hyd-counters.png"
      ],
      description: "Recently completed flagship high-street restaurant and McCafe for Hardcastle Restaurants Private Limited in Hyderabad. Delivered as an end-to-end turnkey project featuring structural glass frontage, contemporary McCafe timber louver cladding, digital ordering kiosks, commercial stainless steel modular kitchens, and custom curved dining booths.",
      scope: [
        "Exterior Glass & Steel Facade",
        "Turnkey Interior Fit-out & McCafe Louver Detailing",
        "Commercial Stainless Steel Kitchen & Exhaust Systems",
        "Self-Ordering Kiosk & Cash Counter Modular Fabrication",
        "Circular Acoustic Dining Booths & Lighting Fixtures",
        "HVAC, Gas Piping & Fire Life Safety Clearance"
      ],
      featured: true
    },
    {
      id: "proj-1",
      title: "MURO Restaurant & Cocktail Bar",
      client: "MURO Bangalore",
      category: "hospitality-retail",
      categoryLabel: "Hospitality, F&B & Retail",
      state: "Karnataka",
      city: "Bangalore",
      type: "Luxury Restaurant & Cocktail Lounge",
      status: "Handed Over",
      year: "2023",
      image: "assets/images/muro-bar-dining.jpg",
      gallery: [
        "assets/images/muro-bar-dining.jpg",
        "assets/images/muro-sign-lounge.png"
      ],
      description: "An ultra-premium dining destination in the heart of Bangalore. Delivered as a complete turnkey interior fit-out featuring intricate artisanal timber joinery, custom acoustical treatment, dramatic mood lighting, and high-specification kitchen and bar MEP integration.",
      scope: ["Turnkey Interiors", "Custom Modular Bar Counters", "Acoustic Wall Paneling", "Kitchen MEP", "Architectural Mood Lighting"],
      featured: true
    },
    {
      id: "proj-2",
      title: "Tata Capital Regional Office & Training Centre",
      client: "Tata Capital Limited",
      category: "corporate-banking",
      categoryLabel: "Corporate, Banking & Infrastructure",
      state: "Karnataka",
      city: "Mysore",
      type: "Corporate Regional Office & Training Centre",
      status: "Handed Over",
      year: "2023",
      image: "assets/images/tata-capital-reception-training.png",
      gallery: [
        "assets/images/tata-capital-reception-training.png",
        "assets/images/tata-capital-workstations.png"
      ],
      description: "Expansive corporate regional headquarters and state-of-the-art training campus for Tata Capital in Mysore. Incorporates ergonomic open-plan modular workstations, executive boardrooms, tiered training auditoriums, and IGBC-certified energy-efficient lighting.",
      scope: ["Civil Refurbishment", "Modular Workstations", "Training Auditoriums", "HVAC Automation", "Fire & Life Safety"],
      featured: true
    },
    {
      id: "proj-3",
      title: "McDonald's Drive-Thru & Restaurant — Poicha",
      client: "Hardcastle Restaurants Pvt. Ltd.",
      category: "hospitality-retail",
      categoryLabel: "Hospitality, F&B & Retail",
      state: "Gujarat",
      city: "Poicha",
      type: "Highway Drive-Thru & High Street",
      status: "Ongoing",
      year: "2024",
      image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=1200&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=1200&q=80"
      ],
      description: "Fast-track turnkey civil construction and fit-out of high-capacity highway drive-thru outlet in Poicha, Gujarat. Built strictly following global McDonald's architectural brand guidelines and heavy traffic durability parameters.",
      scope: ["Civil Construction", "Drive-Thru Lane Infrastructure", "Turnkey Interiors", "MEP & Gas Piping", "HVAC"],
      featured: true
    },
    {
      id: "proj-4",
      title: "AU Small Finance Bank Regional Branches",
      client: "AU Small Finance Bank Ltd.",
      category: "corporate-banking",
      categoryLabel: "Corporate, Banking & Infrastructure",
      state: "Karnataka",
      city: "Bangalore & Regional",
      type: "Retail Banking Branch Hub",
      status: "Handed Over",
      year: "2023",
      image: "assets/images/au-bank-cubicles-floor.png",
      gallery: [
        "assets/images/au-bank-cubicles-floor.png"
      ],
      description: "Modern retail banking branch fit-outs featuring secure teller counters, acoustic private consultation lounges, high-security record rooms, and branded facade illumination compliant with commercial banking regulations.",
      scope: ["Turnkey Fit-out", "Strong Room & Security Partitions", "Modular Cash Counters", "Networking & CCTV", "Signage"],
      featured: true
    },
    {
      id: "proj-5",
      title: "Si Nonna's Sourdough Pizzeria",
      client: "Horizon Impex Private Limited",
      category: "hospitality-retail",
      categoryLabel: "Hospitality, F&B & Retail",
      state: "Karnataka",
      city: "Bangalore",
      type: "Artisanal Casual Dining",
      status: "Handed Over",
      year: "2023",
      image: "https://images.unsplash.com/photo-1579684947550-22e945225d9a?auto=format&fit=crop&w=1200&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1579684947550-22e945225d9a?auto=format&fit=crop&w=1200&q=80"
      ],
      description: "Warm, authentic Neapolitan dining ambiance built with rustic brick finishes, open-kitchen mosaic wood-fired oven housing, bespoke dining tables, and high-efficiency kitchen exhaust systems.",
      scope: ["Turnkey Interior Fit-out", "Bespoke Dining Joinery", "Open Kitchen Exhaust & Fire Safety", "Plumbing & Gas Lines"],
      featured: true
    },
    {
      id: "proj-6",
      title: "Kotak Mahindra Bank Commercial Hub",
      client: "Kotak Mahindra Bank Ltd.",
      category: "corporate-banking",
      categoryLabel: "Corporate, Banking & Infrastructure",
      state: "Karnataka",
      city: "Bangalore",
      type: "Commercial Banking Center",
      status: "Handed Over",
      year: "2022",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80"
      ],
      description: "Commercial branch fit-out delivering sleek customer interaction zones, robust safety systems, biometric access infrastructure, and sustainable low-power lighting.",
      scope: ["Turnkey Base Project", "Security Infrastructure", "Modular Workstations", "Electrical & UPS Cabling"],
      featured: false
    }
  ],

  mcdonaldsHandedOver: [
    { sl: 1, site: "Hyderabad High Street Flagship", type: "High Street & McCafe", state: "Telangana" },
    { sl: 2, site: "Doddabalapur", type: "Drive Thru", state: "Karnataka" },
    { sl: 3, site: "Bagalur", type: "Drive Thru", state: "Karnataka" },
    { sl: 4, site: "Ibharimpatnam", type: "Drive Thru", state: "Andhra Pradesh" },
    { sl: 5, site: "Budigere", type: "Drive Thru", state: "Karnataka" },
    { sl: 6, site: "Madhurawada, Vizag", type: "High Street", state: "Andhra Pradesh" },
    { sl: 7, site: "Mettupalayam", type: "Drive Thru", state: "Tamil Nadu" },
    { sl: 8, site: "Aparna Mall, Hyderabad", type: "Food Court", state: "Telangana" },
    { sl: 9, site: "Ananthnagar, Electronic City", type: "High Street", state: "Karnataka" },
    { sl: 10, site: "Devanahalli", type: "Drive Thru", state: "Karnataka" },
    { sl: 11, site: "Phoenix Avance, Hyd LUNA", type: "Corporate Campus", state: "Telangana" },
    { sl: 12, site: "MVP Colony, Vizag", type: "High Street", state: "Andhra Pradesh" },
    { sl: 13, site: "Rajamundry", type: "Drive Thru", state: "Andhra Pradesh" },
    { sl: 14, site: "Suratkhal", type: "Drive Thru", state: "Karnataka" },
    { sl: 15, site: "Udupi", type: "Drive Thru", state: "Karnataka" },
    { sl: 16, site: "Madgaon", type: "High Street", state: "Goa" },
    { sl: 17, site: "Nexus Mall, Koramangala", type: "Food Court", state: "Karnataka" },
    { sl: 18, site: "Dombivli", type: "High Street", state: "Maharashtra" }
  ],

  ongoingProjects: [
    { sl: 1, site: "Poicha", state: "Gujarat", client: "Hardcastle Restaurants (McDonald's)", stage: "Finishing & MEP Commissioning", progress: 85 },
    { sl: 2, site: "Raipur", state: "Chhattisgarh", client: "Hardcastle Restaurants (McDonald's)", stage: "Civil Framing & Partitioning", progress: 65 },
    { sl: 3, site: "VR Mall, Bengaluru", state: "Karnataka", client: "Hardcastle Restaurants (McDonald's)", stage: "Interior Fit-Out & Ceiling", progress: 75 },
    { sl: 4, site: "Nagpur", state: "Maharashtra", client: "Hardcastle Restaurants (McDonald's)", stage: "MEP Rough-in & Flooring", progress: 50 },
    { sl: 5, site: "Makwa", state: "Gujarat", client: "Hardcastle Restaurants (McDonald's)", stage: "Pre-Commencement Civil Works", progress: 30 }
  ],

  testimonials: [
    {
      quote: "Comfort Space delivered our flagship restaurant with exemplary craftsmanship and flawless attention to micro-finishes. Their turnkey capability made a challenging architectural vision effortless.",
      author: "Senior Operations Director",
      company: "MURO Restaurant Bangalore",
      badge: "Luxury Hospitality"
    },
    {
      quote: "Executing McDonald's drive-thru and flagship high street outlets across multiple states requires rigorous timelines, brand compliance, and zero snags. Comfort Space is a trusted execution partner.",
      author: "Projects & Infrastructure Head",
      company: "Hardcastle Restaurants Pvt. Ltd.",
      badge: "McDonald's West & South"
    },
    {
      quote: "Our Mysore Regional Office and Training Centre was executed smoothly with exceptional quality, structural durability, and high modular furniture standards. Highly recommended for corporate turnkey projects.",
      author: "Regional Facilities & Admin",
      company: "Tata Capital Limited",
      badge: "Corporate & Banking"
    }
  ],

  initialLeads: [
    {
      id: "lead-101",
      name: "Arun Kumar",
      email: "arun.k@stellartech.in",
      phone: "+91 98451 88990",
      company: "Stellar Tech Parks",
      service: "Turnkey Base Projects",
      location: "Whitefield, Bangalore",
      budget: "₹50L - ₹1 Cr",
      message: "Looking for complete turnkey fit-out for 15,000 sq.ft new tech office.",
      date: "2026-09-12 14:30",
      status: "New"
    }
  ]
};

export const STORAGE_KEYS = {
  PROJECTS: "csd_projects_data_v5",
  LEADS: "csd_leads_data_v3"
};

export function getStoredProjects() {
  const data = localStorage.getItem(STORAGE_KEYS.PROJECTS);
  return data ? JSON.parse(data) : INITIAL_DATA.projects;
}

export function saveStoredProjects(projects) {
  localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projects));
}

export function getStoredLeads() {
  const data = localStorage.getItem(STORAGE_KEYS.LEADS);
  return data ? JSON.parse(data) : INITIAL_DATA.initialLeads;
}

export function saveStoredLeads(leads) {
  localStorage.setItem(STORAGE_KEYS.LEADS, JSON.stringify(leads));
}
