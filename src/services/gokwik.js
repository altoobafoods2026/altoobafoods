import { createShopifyCart } from './shopify';

const GOKWIK_MID = import.meta.env.VITE_GOKWIK_MID || '190a1eh49i07';
const GOKWIK_APP_ID = import.meta.env.VITE_GOKWIK_APP_ID || 'bc9a49119e000ac2bd57f0b02d5323b3';
const GOKWIK_STORE_ID = import.meta.env.VITE_GOKWIK_STORE_ID || '81970725115';
const GOKWIK_ENV = import.meta.env.VITE_GOKWIK_ENV || 'production';

/**
 * Initializes the GoKwik merchantInfo object on window
 */
export function initGokwikMerchantInfo() {
  if (typeof window === 'undefined') return;

  window.merchantInfo = {
    mid: GOKWIK_MID,
    appId: GOKWIK_APP_ID,
    storeId: GOKWIK_STORE_ID,
    environment: GOKWIK_ENV,
    type: 'merchantInfo',
    gkPlatform: 'SHOPIFY',
    integrationType: 'CUSTOM_SHOPIFY',
    isHydrogen: true,
    storefrontCartFlow: true,
    WebRedirectReturnURl: typeof window !== 'undefined' ? window.location.origin : '',
  };
}

/**
 * Ensures GoKwik SDK script is injected into document
 */
export function loadGokwikSdk() {
  if (typeof window === 'undefined') return Promise.resolve(false);

  initGokwikMerchantInfo();

  if (window.triggerGokwikCustomCheckout) {
    return Promise.resolve(true);
  }

  const existingScript = document.querySelector('script[src*="pdp.gokwik.co"]');
  if (existingScript) {
    return new Promise((resolve) => {
      let attempts = 0;
      const interval = setInterval(() => {
        attempts++;
        if (window.triggerGokwikCustomCheckout || attempts > 20) {
          clearInterval(interval);
          resolve(Boolean(window.triggerGokwikCustomCheckout));
        }
      }, 100);
    });
  }

  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://pdp.gokwik.co/merchant-integration/build/merchant.integration.js?v4';
    script.async = true;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      console.warn('GoKwik SDK script failed to load, will use Shopify native fallback');
      resolve(false);
    };
    document.head.appendChild(script);
  });
}

/**
 * Supplies the complete cart payload to window.merchantInfo.cart as required for GoKwik Headless Checkout
 */
export function populateGokwikCartPayload(cartId = '', items = null) {
  if (typeof window === 'undefined') return;

  const rawCart = localStorage.getItem('cart') || localStorage.getItem('altooba_cart') || '[]';
  let cartItems = [];
  try {
    const parsed = JSON.parse(rawCart);
    cartItems = Array.isArray(parsed) ? parsed : (parsed?.state?.items || []);
  } catch (e) {
    cartItems = [];
  }

  if (items && items.length > 0) {
    cartItems = items.map((it) => {
      let vId = it.selectedVariant && it.product?.variants?.find(
        (v) => v.name === it.selectedVariant || v.title === it.selectedVariant
      )?.id;
      if (!vId && it.product?.variants?.[0]?.id) vId = it.product.variants[0].id;
      if (!vId) vId = it.variantId || it.id || '1';

      let title = it.product?.title || it.title || it.name || '';
      if (it.complimentaryGift && !title.includes('FREE') && !title.includes('Free')) {
        title = `${title} [INCLUDES FREE GIFT: ${it.complimentaryGift.title}]`;
      }

      return {
        id: vId,
        variantId: vId,
        title: title,
        price: it.price,
        quantity: it.quantity || 1,
        image: it.product?.images?.[0]?.url || it.image || '',
        complimentaryGift: it.complimentaryGift || null,
      };
    });
  }

  const subtotal = cartItems.reduce((acc, it) => acc + (Number(it.price || 0) * (it.quantity || 1)), 0);
  const totalPaise = Math.round(subtotal * 100);
  const effectiveCartId = cartId || localStorage.getItem('shopify_cart_id') || '';
  if (effectiveCartId) {
    try {
      localStorage.setItem('shopify_cart_id', effectiveCartId);
    } catch (e) {}
  }
  const token = effectiveCartId.replace('gid://shopify/Cart/', '').split('?')[0];

  const giftItems = cartItems.filter((it) => Boolean(it.complimentaryGift));
  let cartNote = '';
  const noteAttributes = [];
  const attributesObj = {};

  if (giftItems.length > 0) {
    const giftDescriptions = giftItems
      .map((it) => `${it.complimentaryGift.title} (FREE with ${it.title || it.name || 'Talbina'})`)
      .join(' | ');

    cartNote = `🎁 FREE COMPLIMENTARY GIFT: ${giftDescriptions}`;

    giftItems.forEach((it, idx) => {
      const giftLabel = giftItems.length === 1 ? 'Free Gift' : `Free Gift ${idx + 1}`;
      noteAttributes.push({ name: giftLabel, value: `${it.complimentaryGift.title} (100% FREE)` });
      attributesObj[giftLabel] = `${it.complimentaryGift.title} (100% FREE)`;
      if (it.complimentaryGift.variantId) {
        noteAttributes.push({ name: `${giftLabel} Variant ID`, value: String(it.complimentaryGift.variantId) });
        attributesObj[`${giftLabel} Variant ID`] = String(it.complimentaryGift.variantId);
      }
    });

    noteAttributes.push({ name: 'Offer', value: 'Talbina Free Gift Combo' });
    attributesObj['Offer'] = 'Talbina Free Gift Combo';
  }

  window.merchantInfo = {
    mid: GOKWIK_MID,
    appId: GOKWIK_APP_ID,
    storeId: GOKWIK_STORE_ID,
    environment: GOKWIK_ENV,
    type: 'merchantInfo',
    gkPlatform: 'SHOPIFY',
    integrationType: 'CUSTOM_SHOPIFY',
    isHydrogen: true,
    storefrontCartFlow: true,
    WebRedirectReturnURl: typeof window !== 'undefined' ? window.location.origin : '',
    cart: {
      id: effectiveCartId,
      token: token,
      original_total_price: totalPaise,
      total_price: totalPaise,
      item_count: cartItems.reduce((acc, it) => acc + (it.quantity || 1), 0),
      note: cartNote,
      note_attributes: noteAttributes,
      attributes: attributesObj,
      tags: giftItems.length > 0 ? 'Free Gift, Talbina Free Gift' : '',
      items: cartItems.map((it) => {
        const rawId = it.variantId || it.id || '1';
        const numericId = String(rawId).replace(/\D/g, '') || 1;
        let lineTitle = it.title || it.name || '';
        const properties = {};

        if (it.complimentaryGift) {
          if (!lineTitle.includes('FREE') && !lineTitle.includes('Free')) {
            lineTitle = `${lineTitle} [INCLUDES FREE GIFT: ${it.complimentaryGift.title}]`;
          }
          properties['Free Gift Included'] = `${it.complimentaryGift.title} (100% FREE)`;
          properties['Gift Item'] = it.complimentaryGift.title;
          properties['_free_gift_variant_id'] = String(it.complimentaryGift.variantId || '');
        }

        return {
          id: Number(numericId),
          variant_id: Number(numericId),
          quantity: it.quantity || 1,
          title: lineTitle,
          price: Math.round(Number(it.price || 0) * 100),
          original_price: Math.round(Number(it.price || 0) * 100),
          line_price: Math.round(Number(it.price || 0) * (it.quantity || 1) * 100),
          image: it.image || '',
          properties: properties,
        };
      }),
    },
  };

  return window.merchantInfo.cart;
}

/**
 * Direct Instant Checkout trigger with complete cart payload
 */
export function handleInstantCheckout(items = null) {
  populateGokwikCartPayload('', items);

  if (typeof window.triggerGokwikCustomCheckout === 'function') {
    try {
      window.triggerGokwikCustomCheckout();
      return true;
    } catch (err) {
      console.error('Error in triggerGokwikCustomCheckout:', err);
    }
  }
  return false;
}

/**
 * Opens GoKwik Checkout modal for a given Shopify cartId.
 * Falls back to Shopify native checkout URL if GoKwik is blocked or unavailable.
 *
 * @param {string} cartId - Shopify Cart GID (e.g. gid://shopify/Cart/...)
 * @param {string} checkoutUrl - Fallback native Shopify checkout URL
 * @param {Array} items - Optional cart items
 */
export async function triggerGokwikCheckout(cartId, checkoutUrl, items = null) {
  // Populate the full cart object with tokens and items
  populateGokwikCartPayload(cartId, items);

  // Check if SDK is available
  if (typeof window.triggerGokwikCustomCheckout === 'function') {
    try {
      window.triggerGokwikCustomCheckout();
      return true;
    } catch (err) {
      console.error('Error invoking GoKwik checkout modal:', err);
    }
  }

  // If GoKwik modal could not be triggered, use native Shopify checkout URL fallback
  if (checkoutUrl) {
    console.info('Redirecting to Shopify Checkout fallback:', checkoutUrl);
    window.location.href = checkoutUrl;
    return false;
  }

  throw new Error('GoKwik SDK is not loaded and no fallback URL was provided');
}

/**
 * Comprehensive helper: Creates a Shopify Cart and immediately opens GoKwik Checkout
 *
 * @param {Array} items - Cart items from store
 * @returns {Promise<{ cartId: string, checkoutUrl: string }>}
 */
export async function initiateGokwikCheckout(items) {
  if (!items || items.length === 0) {
    throw new Error('Your cart is empty');
  }

  // 1. Immediately populate local cart state so SDK has full items payload
  populateGokwikCartPayload('', items);

  try {
    // 2. Create official Shopify Cart
    const { cartId, checkoutUrl } = await createShopifyCart(items);

    // 3. Trigger GoKwik with full cart payload
    await triggerGokwikCheckout(cartId, checkoutUrl, items);

    return { cartId, checkoutUrl };
  } catch (err) {
    console.warn('Shopify cart creation error, falling back to local cart checkout:', err);
    // If Shopify GraphQL fails or times out, trigger GoKwik with local cart payload
    handleInstantCheckout(items);
    return { cartId: '', checkoutUrl: '' };
  }
}
