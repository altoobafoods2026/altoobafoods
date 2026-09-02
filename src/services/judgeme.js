const shopDomain = import.meta.env.VITE_SHOPIFY_STORE_DOMAIN;
const publicToken = import.meta.env.VITE_JUDGEME_PUBLIC_TOKEN;
const privateToken = import.meta.env.VITE_JUDGEME_PRIVATE_TOKEN;

// Extract raw numeric ID from Shopify GID (handles base64 as well)
const getRawId = (gid) => {
  if (!gid) return '';
  let decoded = gid;
  if (!gid.startsWith('gid://')) {
    try {
      decoded = atob(gid);
    } catch (e) {}
  }
  return decoded.split('/').pop();
};

let allReviewStatsCache = null;

export const getCachedReviewStatsSync = () => {
  if (allReviewStatsCache && Object.keys(allReviewStatsCache).length > 0) {
    return allReviewStatsCache;
  }
  if (typeof window !== 'undefined') {
    try {
      const stored = sessionStorage.getItem('altooba_review_stats_cache') || localStorage.getItem('altooba_review_stats_cache');
      if (stored) {
        allReviewStatsCache = JSON.parse(stored);
        return allReviewStatsCache;
      }
    } catch (e) {}
  }
  return null;
};

let activeFetchPromise = null;

/**
 * Dynamically fetches ALL reviews from Judge.me live API across all pages.
 * Runs in parallel batches of 6 pages for high-speed retrieval (~1.5s total for 1,200+ reviews).
 */
export const getAllProductReviewStats = async () => {
  const syncCached = getCachedReviewStatsSync();

  // If already fetching, reuse ongoing promise
  if (activeFetchPromise) return activeFetchPromise;

  activeFetchPromise = (async () => {
    try {
      let allReviews = [];
      let page = 1;
      let hasMore = true;
      const batchSize = 6;

      while (hasMore) {
        const pageBatch = Array.from({ length: batchSize }, (_, idx) => page + idx);
        const batchPromises = pageBatch.map(p =>
          fetch(`/judgeme-api/reviews?api_token=${privateToken}&shop_domain=${shopDomain}&per_page=100&page=${p}`)
            .then(res => (res.ok ? res.json() : { reviews: [] }))
            .then(d => d.reviews || [])
            .catch(() => [])
        );

        const batchResults = await Promise.all(batchPromises);
        for (const revs of batchResults) {
          allReviews.push(...revs);
          if (revs.length < 100) {
            hasMore = false;
            break;
          }
        }
        page += batchSize;
        if (page > 30) break; // Safeguard against runaway requests
      }

      const validReviews = allReviews.filter(r => {
        if (r.hidden === true || r.hidden === 'true') return false;
        if (r.curated === 'hidden' || r.curated === 'spam' || r.curated === 0) return false;
        if (r.published === false || r.published === 'false') return false;
        return true;
      });

      const stats = {};
      validReviews.forEach(r => {
        const keys = [r.product_handle, r.product_external_id ? String(r.product_external_id) : null].filter(Boolean);
        keys.forEach(key => {
          if (!stats[key]) {
            stats[key] = { count: 0, totalRating: 0, rating: 5.0 };
          }
          stats[key].count += 1;
          stats[key].totalRating += (r.rating || 5);
          stats[key].rating = +(stats[key].totalRating / stats[key].count).toFixed(1);
        });
      });

      allReviewStatsCache = stats;
      try {
        if (typeof window !== 'undefined') {
          sessionStorage.setItem('altooba_review_stats_cache', JSON.stringify(stats));
          localStorage.setItem('altooba_review_stats_cache', JSON.stringify(stats));
        }
      } catch (e) {}

      return stats;
    } catch (error) {
      console.error('Error fetching all review stats from Judge.me live API:', error);
      return syncCached || {};
    } finally {
      activeFetchPromise = null;
    }
  })();

  return activeFetchPromise;
};

export const getReviews = async (productId) => {
  if (!productId) return [];
  
  const rawId = getRawId(productId);
  
  try {
    // 1. Get internal Judge.me product ID using Shopify external_id
    const productUrl = `/judgeme-api/products/-1?api_token=${privateToken}&shop_domain=${shopDomain}&external_id=${rawId}`;
    const productRes = await fetch(productUrl);
    
    if (!productRes.ok) {
      return [];
    }
    
    const productData = await productRes.json();
    const internalProductId = productData.product?.id;
    
    if (!internalProductId) return [];

    // 2. Fetch reviews using internal product ID
    const url = `/judgeme-api/reviews?api_token=${privateToken}&shop_domain=${shopDomain}&product_id=${internalProductId}`;
    const response = await fetch(url);
    
    if (!response.ok) {
      const errText = await response.text();
      console.error('Judge.me GET Error:', errText);
      throw new Error('Failed to fetch reviews from Judge.me');
    }
    const data = await response.json();
    
    // The Judge.me API returns reviews in `reviews` array
    const rawReviews = data.reviews || [];

    // Filter out hidden, spam, or unpublished reviews
    return rawReviews.filter(r => {
      if (r.hidden === true || r.hidden === 'true') return false;
      if (r.curated === 'hidden' || r.curated === 'spam' || r.curated === 0) return false;
      if (r.published === false || r.published === 'false') return false;
      return true;
    });
  } catch (error) {
    console.error('Error fetching Judge.me reviews:', error);
    return [];
  }
};

export const submitReview = async (reviewData) => {
  const { productId, name, email, rating, title, body } = reviewData;
  const rawId = getRawId(productId);

  const url = '/judgeme-api/reviews';
  
  const payload = {
    api_token: publicToken,
    shop_domain: shopDomain,
    platform: 'shopify',
    id: rawId,
    email: email || `${name.replace(/\s+/g, '').toLowerCase()}@example.com`,
    name: name,
    rating: rating,
    title: title || "Review",
    body: body
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error('Judge.me POST Error:', errText);
      throw new Error('Failed to submit review to Judge.me');
    }

    return await response.json();
  } catch (error) {
    console.error('Error submitting Judge.me review:', error);
    throw error;
  }
};
