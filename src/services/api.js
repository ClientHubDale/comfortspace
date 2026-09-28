// Talks to comfortspace-backend. Every call resolves to the data the pages
// already understand, so components never see the raw API shape.
const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api').replace(/\/+$/, '');

const getJSON = async (path, { signal, timeout = 8000 } = {}) => {
  // give up after `timeout` ms so a sleeping server never leaves the site waiting
  const timer = new AbortController();
  const id = setTimeout(() => timer.abort(), timeout);
  const onAbort = () => timer.abort();
  signal?.addEventListener('abort', onAbort);
  try {
    const res = await fetch(`${API_BASE_URL}${path}`, { signal: timer.signal });
    if (!res.ok) throw new Error(`${path} → HTTP ${res.status}`);
    const json = await res.json();
    return json.data ?? json; // /health replies without a data wrapper
  } finally {
    clearTimeout(id);
    signal?.removeEventListener('abort', onAbort);
  }
};

/** API service → the shape of INITIAL_DATA.services */
const toSiteService = (s, index) => ({
  id: s.slug,
  number: String(index + 1).padStart(2, '0'),
  title: s.title,
  subtitle: s.subtitle || '',
  summary: s.summary || '',
  features: s.features || [],
  icon: s.icon || 'fa-briefcase',
  image: s.image?.url || '/assets/images/placeholder-project.svg',
});

/** API project → the shape of INITIAL_DATA.projects */
const toSiteProject = (p) => ({
  id: p.slug,
  title: p.title,
  client: p.client || '',
  category: p.category,
  categoryLabel: p.categoryLabel,
  state: p.state || '',
  city: p.city || '',
  type: p.type || '',
  status: p.status,
  year: p.year || '',
  // a project saved without photos still gets a branded cover instead of a broken image
  image: p.image?.url || p.gallery?.[0]?.url || '/assets/images/placeholder-project.svg',
  gallery: (p.gallery || []).map((g) => g.url).filter(Boolean),
  description: p.description || '',
  scope: p.scope || [],
  featured: Boolean(p.featured),
});

export const fetchServices = async (opts) => (await getJSON('/services', opts)).map(toSiteService);

export const fetchProjects = async (opts) => (await getJSON('/projects', opts)).map(toSiteProject);

export const fetchHealth = (opts) => getJSON('/health', opts);

export default { fetchServices, fetchProjects, fetchHealth };
