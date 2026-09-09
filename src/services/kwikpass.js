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
    integrationType: 'CUSTOM_SHOPIFY',
    gkPlatform: 'SHOPIFY',
  };
}

/**
 * Ensures the KwikPass iframe exists in the DOM
 */
export function ensureKwikpassIframe() {
  if (typeof window === 'undefined' || typeof document === 'undefined') return null;

  let iframe = document.getElementById('iframe-kp');
  if (!iframe) {
    iframe = document.createElement('iframe');
    iframe.id = 'iframe-kp';
    iframe.name = 'iframe-kp';
    iframe.src = 'https://pdp.gokwik.co/kwikpass/kwikpass.html';
    iframe.className = 'iframe-kp hidden';
    iframe.setAttribute('allow', 'otp-credentials; web-share; clipboard-write;');
    iframe.setAttribute('title', 'KwikPass 1-Click Login');
    iframe.style.cssText = 'position:fixed;top:0;left:0;width:100vw;height:100vh;z-index:999999999;border:none;background:rgba(0,0,0,0.6);display:none;';
    document.body.appendChild(iframe);
  }
  return iframe;
}

/**
 * Attaches event listeners for KwikPass login response
 * @param {Function} onLoginSuccess - Callback when user logs in with KwikPass
 */
export function setupKwikPassListeners(onLoginSuccess) {
  if (typeof window === 'undefined') return;

  const handleDataSent = (e) => {
    const detail = e?.detail || {};
    if ((detail.kpToken || detail.token) && (detail.success !== false)) {
      const token = detail.kpToken || detail.token;
      const phone = detail.phone || detail.phoneNumber || '';
      console.log('KwikPass login successful. Token received:', token);
      try {
        localStorage.setItem('kpToken', token);
        localStorage.setItem('isLoggedIn', 'true');
        if (phone) {
          localStorage.setItem('kp_user_phone', phone);
          localStorage.setItem('kp_user_id', phone);
        }
      } catch (err) {
        console.warn('Could not store kpToken in localStorage', err);
      }
      if (typeof onLoginSuccess === 'function') {
        onLoginSuccess({ ...detail, kpToken: token, phone });
      }
    } else if (detail.kpLogout) {
      console.log('KwikPass user logged out');
      try {
        localStorage.removeItem('kpToken');
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('kp_user_phone');
        localStorage.removeItem('kp_user_id');
      } catch (err) {}
    }
  };

  const handleMessage = (e) => {
    if (!e || !e.data) return;
    const data = e.data;

    // Show or hide iframe based on KwikPass postMessage
    if (data.type === 'showIframe') {
      const iframe = document.getElementById('iframe-kp');
      if (iframe) {
        if (data.value) {
          iframe.classList.remove('hidden');
          iframe.style.display = 'block';
          document.body.style.overflow = 'hidden';
        } else {
          iframe.classList.add('hidden');
          iframe.style.display = 'none';
          document.body.style.overflow = 'auto';
        }
      }
    }

    if (data.type === 'close_popup' || data === 'close_popup') {
      const iframe = document.getElementById('iframe-kp');
      if (iframe) {
        iframe.classList.add('hidden');
        iframe.style.display = 'none';
        document.body.style.overflow = 'auto';
      }
    }

    if (
      data.type === 'kp_token' ||
      data.type === 'kp_token_for_custom_merchants' ||
      data.type === 'KC_PHONE_NUMBER' ||
      data.type === 'user-loggedin' ||
      data.type === 'kp_data_sent'
    ) {
      const phone = data.kcPhoneNumber || (data.phoneNumber && (data.phoneNumber.value || data.phoneNumber)) || '';
      const token = data.token || data.kpToken || data.core_token || '';

      if (token || phone) {
        if (phone) {
          try {
            localStorage.setItem('kp_user_phone', String(phone));
            localStorage.setItem('kp_user_id', String(phone));
          } catch (err) {}
        }
        if (token) {
          try {
            localStorage.setItem('kpToken', String(token));
          } catch (err) {}
        }
        try {
          localStorage.setItem('isLoggedIn', 'true');
        } catch (err) {}

        if (typeof onLoginSuccess === 'function') {
          onLoginSuccess({ kpToken: token, phone, success: true });
        }
      }
    }
  };

  window.addEventListener('kp_data_sent', handleDataSent);
  window.addEventListener('kp-data-sent', handleDataSent);
  window.addEventListener('user-loggedin', handleDataSent);
  window.addEventListener('message', handleMessage);

  return () => {
    window.removeEventListener('kp_data_sent', handleDataSent);
    window.removeEventListener('kp-data-sent', handleDataSent);
    window.removeEventListener('user-loggedin', handleDataSent);
    window.removeEventListener('message', handleMessage);
  };
}

/**
 * Triggers the KwikPass 1-Click Login Popup
 * @returns {boolean} Whether the popup was triggered
 */
export function triggerKwikpassLogin() {
  if (typeof window === 'undefined') return false;

  initKwikPassConfig();
  const iframe = ensureKwikpassIframe();

  let triggered = false;

  // 1. Dispatch official GoKwik open_login_modal event (handled by kp-merchant-v2.js)
  try {
    window.dispatchEvent(new CustomEvent('open_login_modal', {
      detail: {
        customLogin: false,
        params: { from: 'header' }
      }
    }));
    triggered = true;
  } catch (e) {
    console.warn('[KwikPass] open_login_modal dispatch error:', e);
  }

  // 2. Call kpHandleLogin or handleKpAndShopifyLogin if available
  if (typeof window.kpHandleLogin === 'function') {
    try {
      window.kpHandleLogin();
      triggered = true;
    } catch (e) {
      console.warn('[KwikPass] kpHandleLogin error:', e);
    }
  } else if (typeof window.handleKpAndShopifyLogin === 'function') {
    try {
      window.handleKpAndShopifyLogin();
      triggered = true;
    } catch (e) {
      console.warn('[KwikPass] handleKpAndShopifyLogin error:', e);
    }
  }

  // 3. Make sure iframe is visible & send direct SSO payload
  if (iframe) {
    iframe.classList.remove('hidden');
    iframe.style.display = 'block';
    document.body.style.overflow = 'hidden';

    try {
      if (typeof window.openIframe === 'function') {
        window.openIframe('login');
      }
    } catch (e) {}

    try {
      if (iframe.contentWindow) {
        iframe.contentWindow.postMessage({
          type: 'process-sso',
          event: 'login',
          mid: window.merchantInfo?.mid || GOKWIK_MID,
          gkPlatform: window.merchantInfo?.gkPlatform || 'SHOPIFY',
          integrationType: window.merchantInfo?.integrationType || 'CUSTOM_SHOPIFY',
          merchantUrl: window.location.origin,
          showLogin: true
        }, '*');
      }
    } catch (e) {}

    triggered = true;
  }

  return triggered;
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
