/**
 * Image paths come in two forms: the site's own files ("assets/images/x.jpg"
 * or "/assets/…") and full URLs from Cloudinary ("https://res.cloudinary…").
 * Only the first kind gets a leading slash.
 */
export const assetSrc = (path) => {
  if (!path) return '';
  const p = String(path);
  return /^(https?:|data:|blob:)/.test(p) ? p : `/${p.replace(/^\/+/, '')}`;
};

export default assetSrc;
