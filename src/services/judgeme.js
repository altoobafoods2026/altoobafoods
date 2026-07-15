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

export const getReviews = async (productId) => {
  if (!productId) return [];
  
  const rawId = getRawId(productId);
  
  try {
    // 1. Get internal Judge.me product ID using Shopify external_id
    const productUrl = `/judgeme-api/products/-1?api_token=${privateToken}&shop_domain=${shopDomain}&external_id=${rawId}`;
    const productRes = await fetch(productUrl);
    
    if (!productRes.ok) {
      console.log('No internal Judge.me product found yet for this external_id.');
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
    return data.reviews || [];
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
