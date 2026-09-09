/**
 * KwikPass (GoKwik SSO / 1-Click Login) Integration Service
 */

const GOKWIK_MID = import.meta.env.VITE_GOKWIK_MID || '190a1eh49i07';
const GOKWIK_APP_ID = import.meta.env.VITE_GOKWIK_APP_ID || 'bc9a49119e000ac2bd57f0b02d5323b3';
const GOKWIK_STORE_ID = import.meta.env.VITE_GOKWIK_STORE_ID || '81970725115';
const GOKWIK_ENV = import.meta.env.VITE_GOKWIK_ENV || 'production';

/**
 * Initializes KwikPass config on window.merchantInfo
 */
export function initKwikPassConfig() {
  if (typeof window === 'undefined') return;

  window.merchantInfo = {
    ...(window.merchantInfo || {}),
    mid: GOKWIK_MID,
    appId: GOKWIK_APP_ID,
    storeId: GOKWIK_STORE_ID,
    environment: GOKWIK_ENV,
    type: 'merchantInfo',
    integrationType: 'custom_shopify',
    gkPlatform: 'shopify',
  };
}

/**
 * Attaches event listeners for KwikPass login response
 * @param {Function} onLoginSuccess - Callback when user logs in with KwikPass
 */
export function setupKwikPassListeners(onLoginSuccess) {
  if (typeof window === 'undefined') return;

  const handleDataSent = (e) => {
    const detail = e?.detail || {};
    if (detail.kpToken && detail.success) {
      console.log('KwikPass login successful. Token received:', detail.kpToken);
      try {
        localStorage.setItem('kpToken', detail.kpToken);
        localStorage.setItem('isLoggedIn', 'true');
      } catch (err) {
        console.warn('Could not store kpToken in localStorage', err);
      }
      if (typeof onLoginSuccess === 'function') {
        onLoginSuccess(detail);
      }
    } else if (detail.kpLogout) {
      console.log('KwikPass user logged out');
      try {
        localStorage.removeItem('kpToken');
        localStorage.removeItem('isLoggedIn');
      } catch (err) {}
    }
  };

  window.addEventListener('kp_data_sent', handleDataSent);
  window.addEventListener('kp-data-sent', handleDataSent);
  window.addEventListener('user-loggedin', (e) => {
    console.log('KwikPass user-loggedin event:', e?.detail);
    if (typeof onLoginSuccess === 'function') {
      onLoginSuccess(e?.detail);
    }
  });

  return () => {
    window.removeEventListener('kp_data_sent', handleDataSent);
    window.removeEventListener('kp-data-sent', handleDataSent);
  };
}

/**
 * Triggers the KwikPass 1-Click Login Popup
 * @returns {boolean} Whether the popup was triggered
 */
export function triggerKwikpassLogin() {
  if (typeof window === 'undefined') return false;

  initKwikPassConfig();

  // 1. Try official KwikPass core openIframe
  if (typeof window.openIframe === 'function') {
    try {
      window.openIframe('login');
      return true;
    } catch (e) {
      console.warn('openIframe error:', e);
    }
  }

  // 2. Try kpHandleLogin
  if (typeof window.kpHandleLogin === 'function') {
    try {
      window.kpHandleLogin();
      return true;
    } catch (e) {
      console.warn('kpHandleLogin error:', e);
    }
  }

  // 3. Try official custom SDK instance
  if (window.__KP_LOGIN_SDK_INSTANCE__?.handleKpLogin) {
    try {
      window.__KP_LOGIN_SDK_INSTANCE__.handleKpLogin();
      return true;
    } catch (e) {
      console.warn('Error calling __KP_LOGIN_SDK_INSTANCE__.handleKpLogin', e);
    }
  }

  // 4. Try global handleKpLogin
  if (typeof window.handleKpLogin === 'function') {
    try {
      window.handleKpLogin();
      return true;
    } catch (e) {
      console.warn('Error calling window.handleKpLogin', e);
    }
  }

  // 5. Try kp_trigger_popup
  if (typeof window.kp_trigger_popup === 'function') {
    try {
      window.kp_trigger_popup();
      return true;
    } catch (e) {}
  }

  // 6. Try clicking element with class kwik-pass-login
  const kpEl = document.querySelector('.kwik-pass-login, #kwik-pass-login');
  if (kpEl) {
    kpEl.click();
    return true;
  }

  console.warn('KwikPass SDK is not fully loaded yet.');
  return false;
}

/**
 * Handles KwikPass Logout
 */
export function handleKwikPassLogout() {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem('kpToken');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('kp_user_id');
    localStorage.removeItem('kp_user_phone');
    if (typeof window.handleLogout === 'function') {
      window.handleLogout();
    }
    window.dispatchEvent(new CustomEvent('kp-logout-success'));
  } catch (err) {
    console.error('Logout error:', err);
  }
}

/**
 * Checks if user has an active KwikPass session
 */
export function isKwikPassLoggedIn() {
  if (typeof window === 'undefined') return false;
  try {
    return Boolean(localStorage.getItem('kpToken') || localStorage.getItem('isLoggedIn') === 'true');
  } catch (e) {
    return false;
  }
}
