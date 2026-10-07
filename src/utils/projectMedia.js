/* Helpers that turn admin-managed Services / Projects into what the pages render. */

/**
 * Cloudinary images get resized and served in the best format for the browser
 * (f_auto, q_auto, w_<width>). The site's own /assets paths are returned untouched.
 */
export const cdnImage = (url, width = 1200) => {
  if (!url || !/^https:\/\/res\.cloudinary\.com\/.+\/image\/upload\//.test(url)) return url;
  return url.replace('/image/upload/', `/image/upload/f_auto,q_auto,c_limit,w_${width}/`);
};

/* Captions for the site's own flagship photographs, so the Home spotlight reads
   exactly as it always has; photos uploaded later are captioned from the project. */
const PHOTO_CAPTIONS = {
  'mcd-hyd-entrance.jpg': { title: 'Main Entrance & Facade', meta: 'Structural Glazing & Signage' },
  'mcd-hyd-mccafe-bar.jpg': { title: 'McCafe & Ordering Counter', meta: 'Timber Louver Joinery' },
  'mcd-hyd-dining-rings.jpg': { title: 'Dining Area & Lighting', meta: 'Circular Booths & Ring Fixtures' },
  'mcd-hyd-kiosks.jpg': { title: 'Self-Ordering Kiosks', meta: 'Digital Counters & Flooring' },
};

/** The flagship case study: the project marked in the admin, else the first featured one. */
export const pickFlagship = (projects = []) =>
  projects.find((p) => p.isFlagship) || projects.find((p) => p.featured) || projects[0] || null;

/** Up to four captioned photos of the flagship for the Home spotlight. */
export const flagshipShots = (project) => {
  if (!project) return [];
  const photos = (project.gallery?.length ? project.gallery : [project.image]).filter(Boolean).slice(0, 4);
  return photos.map((img, i) => {
    const known = PHOTO_CAPTIONS[img.split('/').pop()];
    return {
      img,
      title: known?.title || project.scope?.[i] || project.type || project.title,
      meta: known?.meta || [project.city, project.state].filter(Boolean).join(', ') || project.categoryLabel,
    };
  });
};

/** First sentence of a description, for short intro lines. */
export const firstSentence = (text = '') => {
  const match = text.match(/^.*?[.!?](\s|$)/);
  return (match ? match[0] : text).trim();
};

/**
 * Ongoing projects in the shape of the Turnkey tracker's rows.
 * "McDonald's Drive-Thru & Restaurant — Poicha" is shown as "Poicha".
 */
export const liveSites = (projects = []) =>
  projects
    .filter((p) => p.status === 'Ongoing')
    .map((p, i) => ({
      sl: i + 1,
      id: p.id,
      site: p.title.includes(' — ') ? p.title.split(' — ').pop() : p.city || p.title,
      state: p.state,
      client: p.client,
      stage: p.stage || 'In progress',
      progress: Math.max(0, Math.min(100, Number(p.progress) || 0)),
    }));
