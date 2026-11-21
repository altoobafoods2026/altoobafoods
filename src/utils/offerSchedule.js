/**
 * Utility to manage time-based launch/scheduling for promotional offers.
 * Respects exact target launch timestamp:
 * Default for Umrah Mega Offer: Nov 22, 2026 at 8:00 PM IST (20:00:00).
 */
export function isOfferActiveYet(product) {
  if (!product) return true;

  // Allow local preview on localhost or if ?preview=true is in URL
  if (typeof window !== 'undefined') {
    const host = window.location.hostname;
    const search = window.location.search || '';
    if (host === 'localhost' || host === '127.0.0.1' || search.includes('preview=true') || search.includes('preview=offer')) {
      return true;
    }
  }

  // 1. Tag-based schedule check: starts:YYYY-MM-DDTHH:mm:ss or offer_starts:YYYY-MM-DDTHH:mm:ss
  const tags = Array.isArray(product.tags) ? product.tags : [];
  for (const t of tags) {
    const match = String(t).match(/^(?:starts|offer_starts):(\d{4}-\d{2}-\d{2}(?:t[\d:]+)?)/i);
    if (match) {
      const dateStr = match[1].includes('t') ? match[1] : `${match[1]}T20:00:00`;
      const startTime = new Date(dateStr).getTime();
      if (!isNaN(startTime) && Date.now() < startTime) {
        return false;
      }
    }
  }

  // 2. Default target for the Umrah Offer: 22 Nov 2026 at 8:00 PM IST
  const isUmrahOffer = (product.name && /umrah/i.test(product.name)) || 
                       (product.slug && /umrah/i.test(product.slug)) ||
                       (product.title && /umrah/i.test(product.title));

  if (isUmrahOffer) {
    // 22 November 2026, 8:00 PM IST (20:00:00)
    const umrahLaunchTime = new Date('2026-11-22T20:00:00+05:30').getTime();
    if (Date.now() < umrahLaunchTime) {
      return false; // Still pending until Kal 8:00 PM
    }
  }

  return true;
}
