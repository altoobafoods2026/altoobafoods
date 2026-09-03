import { getAllProductReviewStats, getCachedReviewStatsSync } from './judgeme';

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
      const stored = sessionStorage.getItem('altooba_products_cache');
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
        products(first: 50) {
          edges {
            node {
              id
              title
              handle
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

    // Map to our local schema
    const products = response.body.data.products.edges
      .filter(({ node }) => {
        // Exclude products that are only meant for the videos or hero section
        const handles = node.collections?.edges.map(e => e.node.handle) || [];
        if (handles.includes('videos_instagram') || handles.includes('videos-instagram')) return false;
        if (node.handle.startsWith('hero_section') || node.handle.startsWith('hero-section')) return false;
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
        sessionStorage.setItem('altooba_products_cache', JSON.stringify({
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

