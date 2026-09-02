/**
 * Optimizes Shopify CDN image URLs by adding responsive width constraints.
 * This reduces image transfer size by up to 90% without losing visual quality on retina displays.
 *
 * @param {string} url - Original image URL
 * @param {number} width - Desired pixel width (default: 400 for cards)
 * @returns {string} - Optimized URL
 */
export function optimizeShopifyImage(url, width = 400) {
  if (!url || typeof url !== 'string') return url;
  if (!url.includes('cdn.shopify.com')) return url;

  if (url.includes('width=')) {
    return url.replace(/([?&])width=\d+/, `$1width=${width}`);
  }

  const separator = url.includes('?') ? '&' : '?';
  return `${url}${separator}width=${width}`;
}
