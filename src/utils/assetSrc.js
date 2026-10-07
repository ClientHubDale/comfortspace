import { cdnImage } from './projectMedia';

/**
 * Image paths come in two forms: the site's own files ("assets/images/x.jpg"
 * or "/assets/…") and full URLs from Cloudinary ("https://res.cloudinary…").
 * Only the first kind gets a leading slash; Cloudinary images are delivered
 * resized to `width` in the best format for the visitor's browser.
 */
export const assetSrc = (path, width = 1600) => {
  if (!path) return '';
  const p = String(path);
  if (/^(https?:|data:|blob:)/.test(p)) return cdnImage(p, width);
  return `/${p.replace(/^\/+/, '')}`;
};

export default assetSrc;
