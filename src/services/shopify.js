const domain = import.meta.env.VITE_SHOPIFY_STORE_DOMAIN;
const storefrontAccessToken = import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN;

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

let productsCache = null;
let productsPromise = null;

export async function getProducts() {
  if (productsCache) return productsCache;
  if (productsPromise) return productsPromise;

  productsPromise = (async () => {
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
              variants(first: 5) {
                edges {
                  node {
                    id
                    title
                    price {
                      amount
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
        }
      }
    `;

    const response = await shopifyFetch({ query });
    
    if (!response.body || !response.body.data) {
      console.error("No data returned from Shopify", response);
      return [];
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
        description: node.description,
        descriptionHtml: node.descriptionHtml,
        // Fallbacks for data that might not be in Shopify yet
        shortDesc: node.description.substring(0, 100) + '...',
        ingredients: "Natural Ingredients",
        benefits: "Good for health",
        howToUse: "Use as directed.",
        badge: "",
        rating: 5.0,
        reviewCount: Math.floor(Math.random() * 50) + 10,
        inStock: node.variants.edges.some(v => v.node.availableForSale),
        variants: node.variants.edges.map(v => ({
          id: v.node.id,
          name: v.node.title,
          price: parseFloat(v.node.price.amount)
        }))
      };
    });

    productsCache = products;
    return products;
  })();

  return productsPromise;
}

export async function getProductBySlug(slug) {
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
        variants(first: 5) {
          edges {
            node {
              id
              title
              price {
                amount
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
    rating: 5.0,
    reviewCount: Math.floor(Math.random() * 50) + 10,
    inStock: node.variants.edges.some(v => v.node.availableForSale),
    variants: node.variants.edges.map(v => ({
      id: v.node.id,
      name: v.node.title,
      price: parseFloat(v.node.price.amount)
    }))
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
        const videoSources = mediaEdges.length > 0 ? mediaEdges[0].node.sources : null;
        
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
          videoSrc: videoUrl
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

let heroVideoCache = null;
let heroVideoPromise = null;

export const getHeroVideo = async (handle = 'hero_section-video') => {
  if (heroVideoCache) return heroVideoCache;
  if (heroVideoPromise) return heroVideoPromise;

  heroVideoPromise = (async () => {
    const query = `
      query getHeroVideo($handle: String!) {
        product(handle: $handle) {
          id
          title
          handle
          media(first: 5) {
            edges {
              node {
                mediaContentType
                ... on Video {
                  id
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
      const mediaEdges = data?.product?.media?.edges || [];
      const videoNode = mediaEdges.find(e => e.node.mediaContentType === 'VIDEO');
      const sources = videoNode?.node?.sources || [];

      if (sources.length > 0) {
        const mp4Sources = sources.filter(s => s.format === 'mp4');
        if (mp4Sources.length > 0) {
          const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
          let preferred;
          if (isMobile) {
            // On mobile devices, 720p/480p decodes instantly at 60fps with zero frame drops
            preferred = mp4Sources.find(s => s.url.includes('720p')) || mp4Sources.find(s => s.url.includes('480p')) || mp4Sources[0];
          } else {
            // On desktop, 1080p provides maximum crisp fidelity
            preferred = mp4Sources.find(s => s.url.includes('1080p')) || mp4Sources.find(s => s.url.includes('720p')) || mp4Sources[0];
          }
          heroVideoCache = preferred.url;
          return preferred.url;
        }
      }

      return '/Islamic_Altooba_.mp4';
    } catch (err) {
      console.error('Error fetching hero video from Shopify:', err);
      return '/Islamic_Altooba_.mp4';
    }
  })();

  return heroVideoPromise;
};
