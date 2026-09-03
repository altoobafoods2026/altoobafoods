/**
 * Optimizes Shopify CDN image URLs by adding responsive width constraints and modern webp format.
 * This reduces image transfer size by up to 90% without losing visual quality on retina displays.
 *
 * @param {string} url - Original image URL
 * @param {number} width - Desired pixel width (default: 400 for cards)
 * @param {string} format - Image format (default: 'webp')
 * @returns {string} - Optimized URL
 */
export function optimizeShopifyImage(url, width = 400, format = 'webp') {
  if (!url || typeof url !== 'string') return url;
  if (!url.includes('cdn.shopify.com')) return url;

  let optimized = url;
  if (optimized.includes('width=')) {
    optimized = optimized.replace(/([?&])width=\d+/, `$1width=${width}`);
  } else {
    const separator = optimized.includes('?') ? '&' : '?';
    optimized = `${optimized}${separator}width=${width}`;
  }

  if (format && !optimized.includes('format=')) {
    optimized = `${optimized}&format=${format}`;
  }

  return optimized;
}
