import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useNavigate, Link } from 'react-router-dom';
import { useToastStore } from '../store/toastStore';
import { triggerKwikpassLogin, setupKwikPassListeners, isKwikPassLoggedIn, handleKwikPassLogout, ensureKwikpassIframe } from '../services/kwikpass';
import logoImg from '../assets/logo.webp';

export default function Login() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => isKwikPassLoggedIn());
  const [userPhone, setUserPhone] = useState(() => {
    try {
      return localStorage.getItem('kp_user_phone') || localStorage.getItem('kp_user_id') || '';
    } catch (e) {
      return '';
    }
  });
  const [isTriggering, setIsTriggering] = useState(false);

  const showToast = useToastStore((state) => state.showToast);
  const navigate = useNavigate();

  // Setup KwikPass listeners & preload iframe
  useEffect(() => {
    ensureKwikpassIframe();

    const cleanup = setupKwikPassListeners((detail) => {
      setIsLoggedIn(true);
      if (detail?.phone || detail?.phoneNumber) {
        const phone = detail.phone || detail.phoneNumber;
        setUserPhone(phone);
        try {
          localStorage.setItem('kp_user_phone', phone);
        } catch (e) {}
      }
      showToast('Welcome to Al-Tooba! Login successful.');
    });

    const handleLogoutEvent = () => {
      setIsLoggedIn(false);
      setUserPhone('');
      showToast('Logged out successfully');
    };

    window.addEventListener('kp-logout-success', handleLogoutEvent);

    return () => {
      cleanup?.();
      window.removeEventListener('kp-logout-success', handleLogoutEvent);
    };
  }, [showToast]);

  const handleLaunchKwikPass = () => {
    setIsTriggering(true);
    const triggered = triggerKwikpassLogin();
    if (!triggered) {
      showToast('Opening KwikPass Login...');
    }
    setTimeout(() => setIsTriggering(false), 2000);
  };

  const handleLogout = () => {
    handleKwikPassLogout();
    setIsLoggedIn(false);
    setUserPhone('');
    showToast('Logged out successfully');
  };

  return (
    <div className="min-h-screen pt-28 pb-16 flex items-center justify-center bg-[#FAF7F2] font-sans px-4 sm:px-6 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-[#0D3B2A]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#D4A24C]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Main Container Card */}
      <motion.div 
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="max-w-[480px] w-full bg-white rounded-[32px] md:rounded-[40px] shadow-[0_20px_50px_rgba(13,59,42,0.06)] border border-[#D4A24C]/15 z-10 p-8 sm:p-12 flex flex-col items-center text-center"
      >
        {/* Brand Logo Header */}
        <div className="mb-6 flex flex-col items-center">
          <img 
            src={logoImg} 
            alt="Al-Tooba Prophetic Remedies" 
            className="h-16 w-auto object-contain mb-3"
            width="120"
            height="64"
          />
          <span className="text-[#8A5E12] text-[10px] font-bold tracking-[0.25em] uppercase font-sans">
            Al-Tooba Prophetic Remedies
          </span>
        </div>

        {isLoggedIn ? (
          /* Logged In State */
          <div className="w-full space-y-6">
            <div className="w-16 h-16 bg-[#0D3B2A]/10 text-[#0D3B2A] rounded-full flex items-center justify-center mx-auto mb-2">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>

            <div>
              <h2 className="text-2xl font-serif font-bold text-[#0D3B2A] mb-1">Welcome Back!</h2>
              <p className="text-xs text-gray-500 font-sans">
                {userPhone ? `Logged in with ${userPhone}` : 'You are logged in via KwikPass'}
              </p>
            </div>

            <div className="bg-[#FAF7F2] border border-[#0D3B2A]/10 rounded-2xl p-4 text-left space-y-2 text-xs text-gray-700">
              <div className="flex items-center gap-2 text-[#0D3B2A] font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>KwikPass Active Account</span>
              </div>
              <p className="text-gray-600 text-[11px] leading-relaxed">
                Your mobile identity is linked. You get 1-Click fast checkout, instant order tracking, and exclusive discounts across the store.
              </p>
            </div>

            <div className="space-y-3 pt-2">
              <Link
                to="/studio"
                className="w-full block py-3.5 rounded-full bg-[#0D3B2A] hover:bg-[#15533c] text-white font-sans font-bold text-xs uppercase tracking-widest transition-all shadow-md"
              >
                Explore Remedies
              </Link>
              <button
                type="button"
                onClick={handleLogout}
                className="w-full py-3 rounded-full border border-red-200 text-red-700 hover:bg-red-50 font-sans font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
              >
                Sign Out
              </button>
            </div>
          </div>
        ) : (
          /* KwikPass Login State */
          <div className="w-full space-y-6">
            <div>
              <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#0D3B2A] mb-2 leading-tight">
                Sign In to Your Account
              </h1>
              <p className="text-xs sm:text-sm text-gray-600 font-sans leading-relaxed">
                Login now to avail best offers and track your herbal remedies with 1-click simplicity.
              </p>
            </div>

            {/* KwikPass Primary Action Card */}
            <div className="bg-gradient-to-b from-[#FAF7F2] to-white border-2 border-[#D4A24C]/30 rounded-3xl p-6 shadow-sm space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0D3B2A]/10 text-[#0D3B2A] text-[11px] font-bold uppercase tracking-wider">
                <span className="text-[#D4A24C]">⚡</span>
                <span>Fast 1-Click Login</span>
              </div>

              <p className="text-xs text-gray-600 font-sans">
                Instant OTP via Phone, WhatsApp or Truecaller.<br />
                <strong>No passwords to remember.</strong>
              </p>

              {/* KwikPass Trigger Button matching user's dashboard (#203D1E) */}
              <button
                type="button"
                onClick={handleLaunchKwikPass}
                disabled={isTriggering}
                className="kwik-pass-login w-full py-4 rounded-2xl bg-[#203D1E] hover:bg-[#162b15] text-[#FAF7F2] font-sans font-bold text-sm tracking-wide transition-all shadow-[0_6px_20px_rgba(32,61,30,0.25)] hover:shadow-xl hover:scale-[1.01] active:scale-[0.99] cursor-pointer flex items-center justify-center gap-2.5"
              >
                {isTriggering ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Opening KwikPass...</span>
                  </>
                ) : (
                  <>
                    <span className="text-[#D4A24C] text-base">⚡</span>
                    <span>Sign In with KwikPass</span>
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-3 text-[10px] uppercase font-sans font-bold tracking-wider text-gray-500 pt-1">
                <span>✓ WhatsApp OTP</span>
                <span>•</span>
                <span>✓ SMS</span>
                <span>•</span>
                <span>✓ Truecaller</span>
              </div>
            </div>

            {/* Key Benefits of KwikPass Account */}
            <div className="pt-2 text-left space-y-2.5 border-t border-gray-100">
              <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400 text-center mb-3">
                Member Benefits
              </p>
              <div className="grid grid-cols-2 gap-2.5 text-xs text-gray-700">
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-[#FAF7F2] border border-gray-100">
                  <span className="text-sm">📦</span>
                  <span className="text-[11px] font-medium leading-tight">Order Tracking</span>
                </div>
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-[#FAF7F2] border border-gray-100">
                  <span className="text-sm">⚡</span>
                  <span className="text-[11px] font-medium leading-tight">1-Click Checkout</span>
                </div>
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-[#FAF7F2] border border-gray-100">
                  <span className="text-sm">🌿</span>
                  <span className="text-[11px] font-medium leading-tight">Remedy History</span>
                </div>
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-[#FAF7F2] border border-gray-100">
                  <span className="text-sm">🎁</span>
                  <span className="text-[11px] font-medium leading-tight">Sunnah Offers</span>
                </div>
              </div>
            </div>

            <p className="text-[10px] text-gray-400 font-sans text-center">
              By continuing, you agree to Al-Tooba&apos;s{' '}
              <Link to="/terms-conditions" className="text-[#8A5E12] underline hover:text-[#0D3B2A]">
                Terms &amp; Conditions
              </Link>{' '}
              and{' '}
              <Link to="/privacy-policy" className="text-[#8A5E12] underline hover:text-[#0D3B2A]">
                Privacy Policy
              </Link>.
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
}
