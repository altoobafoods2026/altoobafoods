import { getAllProductReviewStats, getCachedReviewStatsSync } from './judgeme';
import { optimizeShopifyImage } from '../utils/imageOptimizer';

const domain = import.meta.env.VITE_SHOPIFY_STORE_DOMAIN;
const storefrontAccessToken = import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN;

// In-memory cache & Session storage sync helpers for instant 0ms loads
let productsMemoryCache = null;
let productsCacheTimestamp = 0;
const CACHE_TTL = 10 * 60 * 1000; // 10 minutes

function enrichProductsWithReviewStats(products, reviewStats) {
  if (!reviewStats || !products) return products;
  return products.map(product => {
    const rawId = product.id ? String(product.id).split('/').pop() : '';
    const stat = reviewStats[product.slug] || reviewStats[rawId] || null;
    if (stat) {
      return {
        ...product,
        rating: stat.rating || 5.0,
        reviewCount: stat.count || 0
      };
    }
    return product;
  });
}

export function getCachedProductsSync() {
  const reviewStats = getCachedReviewStatsSync();
  if (productsMemoryCache && Date.now() - productsCacheTimestamp < CACHE_TTL) {
    return enrichProductsWithReviewStats(productsMemoryCache, reviewStats);
  }
  try {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      const stored = sessionStorage.getItem('altooba_products_cache_v3');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Date.now() - parsed.timestamp < CACHE_TTL) {
          const enriched = enrichProductsWithReviewStats(parsed.data || [], reviewStats);
          productsMemoryCache = enriched;
          productsCacheTimestamp = parsed.timestamp;
          return enriched;
        }
      }
    }
  } catch (e) {}
  return null;
}

export function getCachedProductBySlugSync(slug) {
  const cached = getCachedProductsSync();
  if (cached && cached.length > 0) {
    return cached.find(p => p.slug === slug) || null;
  }
  return null;
}

async function shopifyFetch({ query, variables }) {
  const endpoint = `https://${domain}/api/2024-01/graphql.json`;

  try {
    const result = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': storefrontAccessToken,
      },
      body: { query, variables } && JSON.stringify({ query, variables }),
    });

    return {
      status: result.status,
      body: await result.json(),
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      status: 500,
      error: 'Error receiving data',
    };
  }
}

export async function getProducts(forceRefresh = false) {
  if (!forceRefresh) {
    const cached = getCachedProductsSync();
    if (cached && cached.length > 0) {
      return cached;
    }
  }

  try {
    const query = `
      {
        collections(first: 50) {
          edges {
            node {
              id
              title
              handle
              products(first: 50) {
                edges {
                  node {
                    id
                    handle
                  }
                }
              }
            }
          }
        }
        products(first: 50) {
          edges {
            node {
              id
              title
              handle
              tags
              description
              descriptionHtml
              productType
              priceRange {
                minVariantPrice {
                  amount
                  currencyCode
                }
              }
              compareAtPriceRange {
                minVariantPrice {
                  amount
                  currencyCode
                }
              }
              images(first: 5) {
                edges {
                  node {
                    url
                  }
                }
              }
              variants(first: 10) {
                edges {
                  node {
                    id
                    title
                    price {
                      amount
                    }
                    compareAtPrice {
                      amount
                    }
                    image {
                      url
                    }
                    availableForSale
                  }
                }
              }
              collections(first: 15) {
                edges {
                  node {
                    title
                    handle
                  }
                }
              }
            }
          }
        }
      }
    `;

    // Instant review stats from cache or pre-seeded defaults so initial page render is never delayed
    const defaultReviewStats = {
      'talbina-500gm': { count: 28, rating: 4.9 },
      'marzanjosh-25-gm': { count: 24, rating: 4.9 },
      'kalonji-shampoo-200ml': { count: 24, rating: 4.9 },
      'nusqa-e-qalbi-500ml': { count: 25, rating: 4.8 },
      'al-tooba-shilajit-capsules': { count: 23, rating: 4.9 },
      'ajwa-tonic500-ml': { count: 18, rating: 4.9 },
      'black-seed-oil-capsule': { count: 20, rating: 4.9 },
      'al-tamr-dates-vinegar': { count: 16, rating: 4.8 },
      'tibb-e-nafs-oil-100-natural': { count: 22, rating: 4.9 }
    };

    const reviewStats = getCachedReviewStatsSync() || defaultReviewStats;

    // Fetch products from Shopify without waiting for 12 Judge.me network round-trips
    const response = await shopifyFetch({ query });

    // Sync live Judge.me reviews in the background without blocking initial paint
    if (typeof window !== 'undefined' && !getCachedReviewStatsSync()) {
      setTimeout(() => {
        getAllProductReviewStats().catch(() => {});
      }, 1500);
    }
    
    if (!response.body || !response.body.data) {
      console.error("No data returned from Shopify", response);
      const staleCache = getCachedProductsSync();
      return staleCache || [];
    }

    // Extract Shopify Collection exact manual sort sequences
    const collectionOrdersMap = {};
    if (response.body.data.collections?.edges) {
      response.body.data.collections.edges.forEach(({ node }) => {
        const productHandles = node.products.edges.map(e => e.node.handle);
        collectionOrdersMap[node.handle] = productHandles;
        if (node.title) {
          collectionOrdersMap[node.title.toLowerCase()] = productHandles;
        }
      });
    }

    // Map to our local schema
    const products = response.body.data.products.edges
      .filter(({ node }) => {
        const handles = node.collections?.edges.map(e => e.node.handle) || [];
        // Exclude products that are only meant for the videos or hero section
        if (handles.includes('videos_instagram') || handles.includes('videos-instagram')) return false;
        if (node.handle.startsWith('hero_section') || node.handle.startsWith('hero-section')) return false;

        // Exclude standalone complimentary gift products (only in free-gift collections or tagged as gift-only)
        const isFreeGiftOnly = handles.length > 0 && handles.every(h => h.includes('free-gift') || h.includes('free-gifts'));
        if (isFreeGiftOnly) return false;

        const tags = (node.tags || []).map(t => t.toLowerCase());
        if (tags.includes('gift-only') || tags.includes('free-gift-only') || tags.includes('hidden')) return false;

        return true;
      })
      .map(({ node }) => {
      const price = parseFloat(node.priceRange.minVariantPrice.amount);
      const mrp = node.compareAtPriceRange?.minVariantPrice?.amount 
        ? parseFloat(node.compareAtPriceRange.minVariantPrice.amount) 
        : price;
      
      let discount = 0;
      if (mrp > price) {
        discount = Math.round(((mrp - price) / mrp) * 100);
      }

      // Get all collection titles
      const collectionTitles = node.collections?.edges.map(e => e.node.title) || [];
      
      // Website categories to match against
      const websiteCategories = ['Talbina', 'Skin Care', 'Hair Care', 'Herbal Oil', 'Herbal Tea', 'Vinegars', 'Prophetic Remedies', 'Wellness Kit'];
      
      // Find the exact website category that matches any of the product's collections
      const matchedCategory = websiteCategories.find(cat => 
        collectionTitles.some(title => title.toLowerCase().includes(cat.toLowerCase()))
      ) || collectionTitles[0] || node.productType || "Products";

      // Hardcoded overrides for specific product handles
      const overrides = {
        'tibb-e-nafs-oil-100-natural': 'Herbal Oil'
      };
      
      const finalCategory = overrides[node.handle] || matchedCategory;
      const collectionHandles = node.collections?.edges.map(e => e.node.handle) || [];

      // Attach exact sequence position in collections for this product
      const collectionOrders = {};
      collectionHandles.forEach(h => {
        const orderList = collectionOrdersMap[h];
        if (orderList) {
          const idx = orderList.indexOf(node.handle);
          if (idx !== -1) {
            collectionOrders[h] = idx;
          }
        }
      });
      if (finalCategory) {
        const catKey = finalCategory.toLowerCase().replace(/\s+/g, '-');
        const orderList = collectionOrdersMap[catKey] || collectionOrdersMap[finalCategory.toLowerCase()];
        if (orderList) {
          const idx = orderList.indexOf(node.handle);
          if (idx !== -1) {
            collectionOrders[catKey] = idx;
          }
        }
      }

      // Real Judge.me review stats
      const rawId = node.id ? node.id.split('/').pop() : '';
      const stat = (reviewStats && (reviewStats[node.handle] || reviewStats[rawId])) || null;
      
      const realReviewCount = stat ? stat.count : 0;
      const realRating = (stat && stat.rating && stat.rating > 0) ? stat.rating : 5.0;

      // Extract description images from descriptionHtml
      const descImagesMatches = [...(node.descriptionHtml || '').matchAll(/<img[^>]+src=["']([^"']+)["']/g)];
      const descImages = descImagesMatches.map(m => m[1]);

      return {
        id: node.id,
        slug: node.handle,
        name: node.title,
        tags: node.tags || [],
        category: finalCategory,
        collections: collectionHandles,
        collectionTitles: collectionTitles,
        price: price,
        mrp: mrp,
        discount: discount,
        images: node.images.edges.map(img => img.node.url),
        descriptionImages: descImages.length > 0 ? descImages : node.images.edges.map(img => img.node.url),
        description: node.description,
        descriptionHtml: node.descriptionHtml,
        // Fallbacks for data that might not be in Shopify yet
        shortDesc: node.description.substring(0, 100) + '...',
        ingredients: "Natural Ingredients",
        benefits: "Good for health",
        howToUse: "Use as directed.",
        badge: "",
        rating: realRating,
        reviewCount: realReviewCount,
        inStock: node.variants.edges.some(v => v.node.availableForSale),
        collectionOrders: collectionOrders,
        variants: node.variants.edges.map(v => {
          const vPrice = parseFloat(v.node.price?.amount || 0);
          const vMrp = v.node.compareAtPrice?.amount ? parseFloat(v.node.compareAtPrice.amount) : vPrice;
          let vDiscount = 0;
          if (vMrp > vPrice) {
            vDiscount = Math.round(((vMrp - vPrice) / vMrp) * 100);
          }
          return {
            id: v.node.id,
            title: v.node.title,
            name: v.node.title,
            price: vPrice,
            mrp: vMrp,
            discount: vDiscount,
            image: v.node.image?.url || null,
            availableForSale: v.node.availableForSale
          };
        })
      };
    });

    // Save to memory cache and sessionStorage for instant future renders
    productsMemoryCache = products;
    productsCacheTimestamp = Date.now();
    try {
      if (typeof window !== 'undefined' && window.sessionStorage) {
        sessionStorage.setItem('altooba_products_cache_v3', JSON.stringify({
          timestamp: Date.now(),
          data: products
        }));
      }
    } catch (e) {}

    return products;
  } catch (error) {
    console.error("Failed to fetch products:", error);
    const staleCache = getCachedProductsSync();
    return staleCache || [];
  }
}

export function sortProductsByCollectionSequence(items = [], collectionHandleOrName = '') {
  if (!items || items.length === 0 || !collectionHandleOrName) return items;
  const key = collectionHandleOrName.toLowerCase().replace(/\s+/g, '-');
  return [...items].sort((a, b) => {
    const posA = a.collectionOrders?.[key] ?? a.collectionOrders?.[collectionHandleOrName.toLowerCase()] ?? 999;
    const posB = b.collectionOrders?.[key] ?? b.collectionOrders?.[collectionHandleOrName.toLowerCase()] ?? 999;
    return posA - posB;
  });
}

export async function getProductBySlug(slug) {
  // Fast path: check sync cache first
  const syncCached = getCachedProductBySlugSync(slug);
  if (syncCached) {
    return syncCached;
  }
  const query = `
    query getProduct($handle: String!) {
      product(handle: $handle) {
        id
        title
        handle
        tags
        description
        descriptionHtml
        productType
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
        }
        compareAtPriceRange {
          minVariantPrice {
            amount
            currencyCode
          }
        }
        images(first: 10) {
          edges {
            node {
              url
            }
          }
        }
        variants(first: 10) {
          edges {
            node {
              id
              title
              price {
                amount
              }
              compareAtPrice {
                amount
              }
              image {
                url
              }
              availableForSale
            }
          }
        }
        collections(first: 5) {
          edges {
            node {
              title
              handle
            }
          }
        }
      }
    }
  `;

  const response = await shopifyFetch({ query, variables: { handle: slug } });
  
  if (!response.body || !response.body.data || !response.body.data.product) {
    return null;
  }

  const node = response.body.data.product;
  const price = parseFloat(node.priceRange.minVariantPrice.amount);
  const mrp = node.compareAtPriceRange?.minVariantPrice?.amount 
    ? parseFloat(node.compareAtPriceRange.minVariantPrice.amount) 
    : price;
  
  let discount = 0;
  if (mrp > price) {
    discount = Math.round(((mrp - price) / mrp) * 100);
  }

  // Get all collection titles
  const collectionTitles = node.collections?.edges.map(e => e.node.title) || [];
  
  // Website categories to match against
  const websiteCategories = ['Talbina', 'Skin Care', 'Hair Care', 'Herbal Oil', 'Herbal Tea', 'Vinegars', 'Prophetic Remedies'];
  
  // Find the exact website category that matches any of the product's collections
  const matchedCategory = websiteCategories.find(cat => 
    collectionTitles.some(title => title.toLowerCase().includes(cat.toLowerCase()))
  ) || collectionTitles[0] || node.productType || "Products";

  // Hardcoded overrides for specific product handles
  const overrides = {
    'tibb-e-nafs-oil-100-natural': 'Herbal Oil'
  };
  
  const finalCategory = overrides[node.handle] || matchedCategory;
  const collectionHandles = node.collections?.edges.map(e => e.node.handle) || [];

  const reviewStats = await getAllProductReviewStats();
  const rawId = node.id ? node.id.split('/').pop() : '';
  const stat = (reviewStats && (reviewStats[node.handle] || reviewStats[rawId])) || null;
  
  const realReviewCount = stat ? stat.count : 0;
  const realRating = (stat && stat.rating && stat.rating > 0) ? stat.rating : 5.0;

  return {
    id: node.id,
    slug: node.handle,
    name: node.title,
    tags: node.tags || [],
    category: finalCategory,
    collections: collectionHandles,
    price: price,
    mrp: mrp,
    discount: discount,
    images: node.images.edges.map(img => img.node.url),
    descriptionImages: node.images.edges.map(img => img.node.url), // Using same images as fallback
    description: node.description,
    descriptionHtml: node.descriptionHtml,
    shortDesc: node.description.substring(0, 100) + '...',
    ingredients: "Natural Ingredients",
    benefits: "Good for health",
    howToUse: "Use as directed.",
    badge: "",
    rating: realRating,
    reviewCount: realReviewCount,
    inStock: node.variants.edges.some(v => v.node.availableForSale),
    variants: node.variants.edges.map(v => {
      const vPrice = parseFloat(v.node.price?.amount || 0);
      const vMrp = v.node.compareAtPrice?.amount ? parseFloat(v.node.compareAtPrice.amount) : vPrice;
      let vDiscount = 0;
      if (vMrp > vPrice) {
        vDiscount = Math.round(((vMrp - vPrice) / vMrp) * 100);
      }
      return {
        id: v.node.id,
        title: v.node.title,
        name: v.node.title,
        price: vPrice,
        mrp: vMrp,
        discount: vDiscount,
        image: v.node.image?.url || null,
        availableForSale: v.node.availableForSale
      };
    })
  };
}

let videosCache = {};
let videosPromise = {};

export const getCollectionVideos = async (handle) => {
  if (videosCache[handle]) return videosCache[handle];
  if (videosPromise[handle]) return videosPromise[handle];

  videosPromise[handle] = (async () => {
    const query = `
      query getCollectionVideos($handle: String!) {
        collection(handle: $handle) {
          products(first: 10) {
            edges {
              node {
                id
                title
                media(first: 1) {
                  edges {
                    node {
                      previewImage {
                        url
                      }
                      ... on Video {
                        sources {
                          url
                          format
                          mimeType
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    `;

    try {
      const endpoint = `https://${domain}/api/2024-01/graphql.json`;
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Storefront-Access-Token': storefrontAccessToken,
        },
        body: JSON.stringify({ query, variables: { handle } }),
      });

      if (!response.ok) {
        throw new Error(`Shopify API error: ${response.status}`);
      }

      const { data } = await response.json();
      
      if (!data?.collection?.products?.edges) return [];

      const videos = data.collection.products.edges.map(edge => {
        const mediaEdges = edge.node.media?.edges || [];
        const mediaNode = mediaEdges.length > 0 ? mediaEdges[0].node : null;
        const videoSources = mediaNode?.sources;
        const posterUrl = mediaNode?.previewImage?.url || '';
        
        let videoUrl = '';
        if (videoSources && videoSources.length > 0) {
          // Try to get 720p or 1080p mp4, fallback to first available
          const mp4Sources = videoSources.filter(s => s.format === 'mp4');
          if (mp4Sources.length > 0) {
            const preferred = mp4Sources.find(s => s.url.includes('720p')) || mp4Sources[0];
            videoUrl = preferred.url;
          }
        }

        return {
          id: edge.node.id,
          title: edge.node.title,
          videoSrc: videoUrl,
          poster: posterUrl
        };
      }).filter(v => v.videoSrc);

      videosCache[handle] = videos;
      return videos;
    } catch (error) {
      console.error('Error fetching collection videos:', error);
      return [];
    }
  })();
  
  return videosPromise[handle];
};

let reelsMetaobjectCache = null;
let reelsMetaobjectPromise = null;

export const getInstagramReelMetaobjectVideos = async () => {
  if (reelsMetaobjectCache) return reelsMetaobjectCache;
  if (reelsMetaobjectPromise) return reelsMetaobjectPromise;

  reelsMetaobjectPromise = (async () => {
    const query = `
      query getInstaReelsMetaobject {
        metaobjects(type: "insta_reels", first: 1) {
          edges {
            node {
              id
              type
              handle
              fields {
                key
                references(first: 20) {
                  edges {
                    node {
                      ... on Video {
                        id
                        sources {
                          url
                          format
                          mimeType
                        }
                        previewImage {
                          url
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    `;

    try {
      const response = await shopifyFetch({ query });
      const edges = response?.body?.data?.metaobjects?.edges || [];
      if (edges.length > 0) {
        const fields = edges[0].node.fields || [];
        const reelsField = fields.find(f => f.key === 'reels_section');
        const refEdges = reelsField?.references?.edges || [];
        const videos = refEdges.map((e, index) => {
          const node = e.node;
          const sources = node?.sources || [];
          const mp4Sources = sources.filter(s => s.format === 'mp4');
          let videoUrl = '';
          if (mp4Sources.length > 0) {
            const preferred = mp4Sources.find(s => s.url.includes('720p')) || mp4Sources.find(s => s.url.includes('1080p')) || mp4Sources[0];
            videoUrl = preferred.url;
          }
          return {
            id: node?.id || `reel-${index}`,
            title: `Reel ${index + 1}`,
            videoSrc: videoUrl,
            poster: node?.previewImage?.url || ''
          };
        }).filter(v => v.videoSrc);

        if (videos.length > 0) {
          reelsMetaobjectCache = videos;
          return videos;
        }
      }
      return [];
    } catch (err) {
      console.error('Error fetching Instagram Reels Metaobject:', err);
      return [];
    }
  })();

  return reelsMetaobjectPromise;
};

let heroVideoCache = null;
let heroVideoPromise = null;

export const getCachedHeroVideoSync = () => {
  if (heroVideoCache) return heroVideoCache;
  if (typeof window !== 'undefined' && window.sessionStorage) {
    try {
      const stored = sessionStorage.getItem('altooba_hero_video_cache');
      if (stored) {
        heroVideoCache = stored;
        return stored;
      }
    } catch (e) {}
  }
  return null;
};

export const getHeroVideo = async () => {
  const syncCached = getCachedHeroVideoSync();
  if (syncCached) return syncCached;
  if (heroVideoPromise) return heroVideoPromise;

  heroVideoPromise = (async () => {
    const query = `
      query getHeroVideoMetaobject {
        metaobjects(type: "hero_video", first: 1) {
          edges {
            node {
              id
              type
              handle
              fields {
                key
                reference {
                  ... on Video {
                    sources {
                      url
                      format
                      mimeType
                    }
                  }
                }
              }
            }
          }
        }
      }
    `;

    try {
      const response = await shopifyFetch({ query });
      const edges = response?.body?.data?.metaobjects?.edges || [];
      if (edges.length > 0) {
        const fields = edges[0].node.fields || [];
        const videoField = fields.find(f => f.key === 'desktop_video');
        const sources = videoField?.reference?.sources || [];
        const mp4Sources = sources.filter(s => s.format === 'mp4');

        if (mp4Sources.length > 0) {
          const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
          let preferred;
          if (isMobile) {
            preferred = mp4Sources.find(s => s.url.includes('720p')) || mp4Sources.find(s => s.url.includes('480p')) || mp4Sources[0];
          } else {
            preferred = mp4Sources.find(s => s.url.includes('1080p')) || mp4Sources.find(s => s.url.includes('720p')) || mp4Sources[0];
          }
          heroVideoCache = preferred.url;
          try {
            if (typeof window !== 'undefined' && window.sessionStorage) {
              sessionStorage.setItem('altooba_hero_video_cache', preferred.url);
            }
          } catch (e) {}
          return preferred.url;
        }
      }
      return heroVideoCache || null;
    } catch (err) {
      console.error('Error fetching hero video Metaobject:', err);
      return heroVideoCache || null;
    }
  })();

  return heroVideoPromise;
};

let carouselMetaobjectCache = null;
let carouselMetaobjectPromise = null;

export const getCarouselMetaobjectData = async () => {
  if (carouselMetaobjectCache) return carouselMetaobjectCache;
  if (carouselMetaobjectPromise) return carouselMetaobjectPromise;

  carouselMetaobjectPromise = (async () => {
    const query = `
      query getCarouselMetaobject {
        metaobjects(type: "3d_carousel", first: 1) {
          edges {
            node {
              id
              type
              handle
              fields {
                key
                references(first: 10) {
                  edges {
                    node {
                      ... on MediaImage {
                        image {
                          url
                        }
                      }
                      ... on Product {
                        id
                        handle
                        title
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    `;

    try {
      const response = await shopifyFetch({ query });
      const edges = response?.body?.data?.metaobjects?.edges || [];
      if (edges.length > 0) {
        const fields = edges[0].node.fields || [];
        const imagesField = fields.find(f => f.key === 'images');
        const productsField = fields.find(f => f.key === 'products');

        const imageEdges = imagesField?.references?.edges || [];
        const productEdges = productsField?.references?.edges || [];

        const imageUrls = imageEdges.map(e => e.node?.image?.url).filter(Boolean);
        const productHandles = productEdges.map(e => e.node?.handle).filter(Boolean);

        const slides = imageUrls.map((url, index) => ({
          image: url,
          slug: productHandles[index] || '',
        }));

        if (slides.length > 0) {
          carouselMetaobjectCache = slides;
          return slides;
        }
      }
      return [];
    } catch (err) {
      console.error('Error fetching 3D Carousel Metaobject:', err);
      return [];
    }
  })();

  return carouselMetaobjectPromise;
};

export const getCarouselMetaobjectImages = async () => {
  const data = await getCarouselMetaobjectData();
  return data.map(item => item.image);
};

/**
 * Creates an official Shopify Cart via Storefront GraphQL API
 * Required for headless checkout integrations like GoKwik (Scenario 2)
 *
 * @param {Array} items - Array of cart items [{ product, selectedVariant, quantity }]
 * @returns {Promise<{ cartId: string, checkoutUrl: string, totalQuantity: number }>}
 */
export async function createShopifyCart(items = []) {
  if (!items || items.length === 0) {
    throw new Error('Cart is empty');
  }

  const lines = items
    .map((item) => {
      let variantId = null;
      if (item.selectedVariant && item.product?.variants?.length > 0) {
        const match = item.product.variants.find(
          (v) => v.name === item.selectedVariant || v.title === item.selectedVariant
        );
        if (match && match.id) variantId = match.id;
      }

      if (!variantId && item.product?.variants?.length > 0) {
        variantId = item.product.variants[0].id;
      }

      if (!variantId && item.product?.id) {
        variantId = item.product.id;
      }

      if (variantId && !variantId.startsWith('gid://')) {
        variantId = `gid://shopify/ProductVariant/${variantId}`;
      }

      const line = {
        merchandiseId: variantId,
        quantity: item.quantity || 1,
      };

      if (item.complimentaryGift) {
        line.attributes = [
          {
            key: 'Complimentary Gift',
            value: `${item.complimentaryGift.title} (FREE)`,
          },
        ];
      }

      return line;
    })
    .filter((line) => Boolean(line.merchandiseId));

  if (lines.length === 0) {
    throw new Error('No valid products found in cart');
  }

  const query = `
    mutation createCart($lines: [CartLineInput!]) {
      cartCreate(input: { lines: $lines }) {
        cart {
          id
          checkoutUrl
          totalQuantity
        }
        userErrors {
          code
          field
          message
        }
      }
    }
  `;

  const response = await shopifyFetch({ query, variables: { lines } });

  if (response.body?.errors) {
    console.error('Shopify cartCreate error:', response.body.errors);
    throw new Error(response.body.errors[0]?.message || 'Failed to create Shopify cart');
  }

  const cartData = response.body?.data?.cartCreate;
  if (cartData?.userErrors?.length > 0) {
    console.error('Shopify cart userErrors:', cartData.userErrors);
    throw new Error(cartData.userErrors[0].message);
  }

  if (!cartData?.cart?.id) {
    throw new Error('Invalid cart response from Shopify');
  }

  return {
    cartId: cartData.cart.id,
    checkoutUrl: cartData.cart.checkoutUrl,
    totalQuantity: cartData.cart.totalQuantity,
  };
}

const collectionProductsCache = new Map();

/**
 * Synchronous cache getter for collection products (0ms instant load)
 */
export function getCachedCollectionProductsSync(collectionHandle, currentVariantTitle = '') {
  if (!collectionHandle) return null;
  const cacheKey = `${collectionHandle}-${currentVariantTitle || 'default'}`;
  if (collectionProductsCache.has(cacheKey)) {
    return collectionProductsCache.get(cacheKey);
  }
  try {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      const stored = sessionStorage.getItem(`altooba_gift_coll_${cacheKey}`);
      if (stored) {
        const parsed = JSON.parse(stored);
        collectionProductsCache.set(cacheKey, parsed);
        return parsed;
      }
    }
  } catch (e) {}
  return null;
}

/**
 * Fetch all products belonging to a specific collection by its handle (cached)
 */
export async function getCollectionProducts(collectionHandle, currentVariantTitle = '') {
  if (!collectionHandle) return [];
  const syncCached = getCachedCollectionProductsSync(collectionHandle, currentVariantTitle);
  if (syncCached && syncCached.length > 0) {
    return syncCached;
  }

  const cacheKey = `${collectionHandle}-${currentVariantTitle || 'default'}`;

  const query = `
    query getCollection($handle: String!) {
      collection(handle: $handle) {
        id
        title
        products(first: 30) {
          edges {
            node {
              id
              title
              handle
              availableForSale
              featuredImage {
                url
              }
              images(first: 2) {
                edges {
                  node {
                    url
                  }
                }
              }
              variants(first: 5) {
                edges {
                  node {
                    id
                    title
                    availableForSale
                    price {
                      amount
                    }
                    compareAtPrice {
                      amount
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  try {
    const res = await shopifyFetch({ query, variables: { handle: collectionHandle } });
    const collection = res.body?.data?.collection;
    if (!collection || !collection.products?.edges || collection.products.edges.length === 0) {
      return [];
    }

    const vTitleLower = (currentVariantTitle || '').toLowerCase();

    const mappedGifts = collection.products.edges.map((e, idx) => {
      const node = e.node;
      const isTalbina = node.handle?.includes('talbina') || node.title?.toLowerCase().includes('talbina');

      let chosenVariant = node.variants?.edges?.[0]?.node;
      let displayTitle = node.title;

      // Smart variant picker if Talbina is inside the collection
      if (isTalbina && node.variants?.edges?.length > 1) {
        if (vTitleLower.includes('1kg')) {
          const match500 = node.variants.edges.find((v) => v.node.title.toLowerCase().includes('500'));
          if (match500) {
            chosenVariant = match500.node;
            displayTitle = 'Talbina (500gm Pack)';
          }
        } else if (vTitleLower.includes('500')) {
          const match250 = node.variants.edges.find((v) => v.node.title.toLowerCase().includes('250'));
          if (match250) {
            chosenVariant = match250.node;
            displayTitle = 'Talbina (250gm Pack)';
          }
        }
      }

      const isAvailable = Boolean(chosenVariant ? chosenVariant.availableForSale : node.availableForSale);
      const price = parseFloat(chosenVariant?.price?.amount || '0');
      const mrp = parseFloat(chosenVariant?.compareAtPrice?.amount || chosenVariant?.price?.amount || '0');
      const rawImg = node.featuredImage?.url || node.images?.edges?.[0]?.node?.url || '';
      const img = optimizeShopifyImage(rawImg, 250);

      const badges = ['POPULAR CHOICE', 'PREMIUM GIFT', 'HERBAL WELLNESS', 'CLASSIC COMBO'];
      const badge = badges[idx % badges.length];

      return {
        id: chosenVariant?.id ? `${node.id}-${chosenVariant.id}` : node.id,
        productId: node.id,
        title: displayTitle,
        handle: node.handle,
        variantId: chosenVariant?.id || '',
        price: 0,
        mrp: mrp > 0 ? mrp : price,
        image: img,
        badge: badge,
        availableForSale: isAvailable,
      };
    });

    // Filter out Out-of-Stock gifts (Option A)
    const inStockGifts = mappedGifts.filter((g) => g.availableForSale === true);

    collectionProductsCache.set(cacheKey, inStockGifts);
    try {
      if (typeof window !== 'undefined' && window.sessionStorage) {
        sessionStorage.setItem(`altooba_gift_coll_${cacheKey}`, JSON.stringify(inStockGifts));
      }
    } catch (e) {}

    return inStockGifts;
  } catch (err) {
    console.error('Error fetching collection products:', err);
    return [];
  }
}
