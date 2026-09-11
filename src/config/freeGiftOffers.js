/**
 * Configuration for Complimentary Free Gifts / Product Combos
 * Maps product slugs and variants to available free gift options and Shopify collections.
 */

export const FREE_GIFT_OFFERS = {
  // Talbina product slug
  'buy-talbina-500gm-get-talbina-250gm-free': {
    badgeText: 'COMBO OFFER',
    heading: 'CHOOSE YOUR FREE GIFT',
    variantOffers: {
      '1kg': {
        collectionHandle: 'talbina-free-gifts-1kg',
        subheading: 'Select 1 complimentary item included 100% FREE with 1kg',
        gifts: [
          {
            id: 'gift-talbina-500g',
            title: 'Talbina (500gm Pack)',
            badge: 'POPULAR CHOICE',
            mrp: 850,
            price: 0,
            image: 'https://cdn.shopify.com/s/files/1/0819/7072/5115/files/1_result.webp?v=1782990086',
            handle: 'buy-talbina-500gm-get-talbina-250gm-free',
            variantId: 'gid://shopify/ProductVariant/49285137105147',
            shortDesc: 'Pure sunnah barley superfood 500gm pack'
          },
          {
            id: 'gift-shilajit',
            title: 'Al-Tooba Shilajit Capsules',
            badge: 'PREMIUM GIFT',
            mrp: 650,
            price: 0,
            image: 'https://cdn.shopify.com/s/files/1/0819/7072/5115/files/Shilajit_cap-removebg-preview.png?v=1787053723',
            handle: 'al-tooba-shilajit-capsules',
            variantId: 'gid://shopify/ProductVariant/49191818723579',
            shortDesc: 'Pure Himalayan shilajit capsules'
          },
          {
            id: 'gift-royaljelly',
            title: 'ROYALJELLY (60 CAPSULE)',
            badge: 'HERBAL WELLNESS',
            mrp: 650,
            price: 0,
            image: 'https://cdn.shopify.com/s/files/1/0819/7072/5115/files/ROYALJELLY_result.webp?v=1785238549',
            handle: 'royaljelly60-capsule',
            variantId: 'gid://shopify/ProductVariant/49111621239035',
            shortDesc: 'Pure royal jelly vitality capsules'
          }
        ]
      },
      '500': {
        collectionHandle: 'talbina-free-gifts',
        subheading: 'Select 1 complimentary item included 100% FREE with 500gm',
        gifts: [
          {
            id: 'gift-kalonji-shampoo',
            title: 'Kalonji Shampoo (200ml)',
            badge: 'POPULAR CHOICE',
            mrp: 320,
            price: 0,
            image: 'https://cdn.shopify.com/s/files/1/0819/7072/5115/files/1.png?v=1782991339',
            handle: 'kalonji-shampoo-200ml',
            variantId: 'gid://shopify/ProductVariant/49028039180539',
            shortDesc: 'Pure black seed herbal shampoo for hair strength & shine'
          },
          {
            id: 'gift-tibb-nafs-oil',
            title: 'Tibb-E-Nafs Oil - 100% Natural',
            badge: 'HERBAL REMEDY',
            mrp: 710,
            price: 0,
            image: 'https://cdn.shopify.com/s/files/1/0819/7072/5115/files/10.png?v=1782993253',
            handle: 'tibb-e-nafs-oil-100-natural',
            variantId: 'gid://shopify/ProductVariant/49028237000955',
            shortDesc: 'Pure natural wellness massage oil'
          },
          {
            id: 'gift-talbina-250g',
            title: 'Talbina (250gm Pack)',
            badge: 'CLASSIC COMBO',
            mrp: 400,
            price: 0,
            image: 'https://cdn.shopify.com/s/files/1/0819/7072/5115/files/1_result.webp?v=1782990086',
            handle: 'buy-talbina-500gm-get-talbina-250gm-free',
            variantId: 'gid://shopify/ProductVariant/49285137137915',
            shortDesc: 'Sunnah barley superfood with 100% dry fruits'
          }
        ]
      }
    }
  }
};

/**
 * Helper to check if a product and variant qualify for a free gift offer
 */
export function getFreeGiftOffer(productSlug, variantTitle) {
  if (!productSlug) return null;
  const offerGroup = FREE_GIFT_OFFERS[productSlug];
  if (!offerGroup) return null;

  const vTitle = (variantTitle || '').toLowerCase();

  // Check 1kg match
  if (vTitle.includes('1kg')) {
    const subOffer = offerGroup.variantOffers?.['1kg'];
    if (subOffer) {
      return {
        ...offerGroup,
        ...subOffer,
        isActiveForVariant: true
      };
    }
  }

  // Check 500gm match
  if (vTitle.includes('500')) {
    const subOffer = offerGroup.variantOffers?.['500'];
    if (subOffer) {
      return {
        ...offerGroup,
        ...subOffer,
        isActiveForVariant: true
      };
    }
  }

  // Other variants (e.g. 250gm) don't have free gift, show teaser
  const defaultSubOffer = offerGroup.variantOffers?.['500'] || offerGroup.variantOffers?.['1kg'];
  return {
    ...offerGroup,
    ...defaultSubOffer,
    isActiveForVariant: false
  };
}
