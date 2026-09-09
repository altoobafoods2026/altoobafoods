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
 * Opens GoKwik Checkout modal for a given Shopify cartId.
 * Falls back to Shopify native checkout URL if GoKwik is blocked or unavailable.
 *
 * @param {string} cartId - Shopify Cart GID (e.g. gid://shopify/Cart/...)
 * @param {string} checkoutUrl - Fallback native Shopify checkout URL
 */
export async function triggerGokwikCheckout(cartId, checkoutUrl) {
  if (!cartId) {
    throw new Error('Missing cartId for GoKwik checkout');
  }

  initGokwikMerchantInfo();

  // Assign the cart ID to merchantInfo as required by GoKwik Scenario 2
  window.merchantInfo.cart = { id: cartId };

  // Check if SDK is available or try to wait briefly
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

  // 1. Create official Shopify Cart
  const { cartId, checkoutUrl } = await createShopifyCart(items);

  // 2. Trigger GoKwik with Shopify fallback
  await triggerGokwikCheckout(cartId, checkoutUrl);

  return { cartId, checkoutUrl };
}
