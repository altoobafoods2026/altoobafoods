import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCartStore } from '../store/cartStore';

export default function OrderSuccessModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [orderData, setOrderData] = useState(null);
  const [copiedToken, setCopiedToken] = useState(false);

  const handleCopyToken = (token) => {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(token);
      setCopiedToken(true);
      setTimeout(() => setCopiedToken(false), 2500);
    }
  };

  useEffect(() => {
    // 1-Click Test Simulation Helper (e.g. ?test_order=true)
    if (typeof window !== 'undefined' && window.location.search.includes('test_order=true')) {
      const testOrder = {
        orderNumber: '#1054',
        orderId: 'gid://shopify/Order/1054',
        totalPrice: 650,
        paymentMethod: 'Cash on Delivery (COD)',
        phone: '8433284322',
        email: 'customer@gmail.com',
        address: 'House 42, Mumbai, Maharashtra - 400001',
        date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
        hasLuckyDraw: true,
        luckyToken: 'LUCKY-1054',
        items: [
          {
            name: 'Al-Tooba Special Umrah Offer: Buy Talbina (500g) Get 250g Free + Guaranteed Umrah Lucky Draw Token',
            variant: 'Standard',
            quantity: 1,
            price: 650,
            image: 'https://cdn.shopify.com/s/files/1/0819/7072/5115/files/Altoobaumrahdesign.png?v=1795263274'
          }
        ]
      };

      try {
        const existing = JSON.parse(localStorage.getItem('altooba_orders') || '[]');
        const updated = [testOrder, ...existing.filter(o => o.orderNumber !== testOrder.orderNumber)];
        localStorage.setItem('altooba_orders', JSON.stringify(updated));
      } catch (e) {}

      setOrderData(testOrder);
      setIsOpen(true);
      return;
    }

    const handleOrderCompleted = (event) => {
      const detail = event?.detail || {};
      const currentCartItems = useCartStore.getState().items || [];

      // Check if any cart item qualifies for the lucky draw
      const hasLuckyDrawItem = currentCartItems.some(it => {
        const prod = it.product || {};
        const tags = Array.isArray(prod.tags) ? prod.tags : [];
        return tags.some(t => /lucky[-_]?draw|contest|giveaway|token|umrah/i.test(t)) ||
               /lucky[-_]?draw|contest|giveaway|umrah/i.test(it.name || '') ||
               /wellness\s*kit|hamper/i.test(it.name || '') ||
               prod.category === 'Wellness Kit';
      });

      const cleanOrderNum = String(detail.orderNumber || '1005').replace(/\D/g, '') || String(detail.orderNumber || '1005').replace(/^#/, '');
      const luckyToken = hasLuckyDrawItem ? `LUCKY-${cleanOrderNum}` : null;

      const newOrder = {
        orderNumber: detail.orderNumber || '#1005',
        orderId: detail.orderId || '',
        totalPrice: detail.totalPrice || null,
        paymentMethod: detail.paymentMethod || 'Cash on Delivery (COD)',
        phone: detail.phone || '',
        email: detail.email || '',
        address: detail.address || null,
        date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
        hasLuckyDraw: hasLuckyDrawItem,
        luckyToken: luckyToken,
        items: currentCartItems.map((it) => ({
          name: it.product?.title || it.title || it.name || 'Al-Tooba Prophetic Remedy',
          variant: it.selectedVariant || 'Standard',
          quantity: it.quantity || 1,
          price: it.price || 0,
          image: typeof it.product?.images?.[0] === 'string' ? it.product.images[0] : (it.product?.images?.[0]?.url || it.image || '/products_banner.jpeg'),
          complimentaryGift: it.complimentaryGift ? `${it.complimentaryGift.title} (100% FREE)` : null
        }))
      };

      try {
        const existing = JSON.parse(localStorage.getItem('altooba_orders') || '[]');
        const updated = [newOrder, ...existing.filter(o => o.orderNumber !== newOrder.orderNumber)];
        localStorage.setItem('altooba_orders', JSON.stringify(updated));
      } catch (e) {}

      setOrderData(newOrder);
      setIsOpen(true);
      document.body.style.overflow = 'hidden';
    };

    window.addEventListener('gokwik_order_completed', handleOrderCompleted);
    return () => {
      window.removeEventListener('gokwik_order_completed', handleOrderCompleted);
    };
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    document.body.style.overflow = 'auto';
  };

  if (!isOpen || !orderData) return null;

  return (
    <div className="fixed inset-0 z-[999999] flex items-center justify-center p-3 sm:p-4 overflow-hidden">
      {/* Dimmed Blurred Backdrop */}
      <div 
        className="fixed inset-0 bg-[#0D2018]/70 backdrop-blur-md transition-opacity duration-300" 
        onClick={handleClose}
      />

      {/* Modal Card - No Scrollbar / Slider, Everything Fits Naturally */}
      <div 
        className="relative w-full max-w-[410px] bg-[#FAF7F2] border border-[#0D3B2A]/15 rounded-2xl sm:rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] z-10 animate-fade-up text-center my-auto overflow-hidden"
        role="dialog"
        aria-modal="true"
      >
        {/* Top Decorative Green Header with Pattern */}
        <div className="bg-[#0D3B2A] text-parchment pt-4 pb-3 px-5 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#D4A24C_1px,transparent_1px)] [background-size:16px_16px]" />
          
          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all cursor-pointer z-10"
            aria-label="Close modal"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Glowing Animated Success Icon */}
          <div className="w-11 h-11 rounded-full bg-[#D4A24C]/20 border-2 border-[#D4A24C] text-[#D4A24C] mx-auto flex items-center justify-center mb-1.5 shadow-[0_0_15px_rgba(212,162,76,0.3)] animate-pulse">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <div className="inline-flex items-center gap-1 bg-[#D4A24C]/25 text-[#f4d89e] text-[9px] font-sans font-bold uppercase tracking-[0.18em] px-2.5 py-0.5 rounded-full mb-1">
            <span>✨ Order Booked Successfully</span>
          </div>

          <h2 className="font-serif font-bold text-xl sm:text-2xl text-white tracking-tight leading-tight">
            Order {orderData.orderNumber}
          </h2>
          <p className="text-[10.5px] text-white/70 font-sans mt-0.5">
            Al-Tooba Prophetic Remedies (Tibb-e-Nabawi)
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-5 space-y-2.5">
          <p className="text-xs text-[#0D3B2A]/80 leading-snug">
            <strong className="text-[#0D3B2A]">Jazakallah Khair!</strong> Your healing remedy order has been registered and is being prepared with sunnah care.
          </p>

          {/* Details Pill Grid */}
          <div className="bg-white border border-[#0D3B2A]/10 rounded-xl p-3 text-left space-y-1.5 shadow-sm text-xs">
            <div className="flex items-center justify-between pb-1.5 border-b border-[#0D3B2A]/5">
              <span className="text-[#0D3B2A]/60 font-medium">Payment Mode</span>
              <span className="font-bold text-[#0D3B2A] bg-[#0D3B2A]/5 px-2 py-0.5 rounded-full text-[10.5px]">
                {orderData.paymentMethod}
              </span>
            </div>

            <div className="flex items-center justify-between pb-1.5 border-b border-[#0D3B2A]/5">
              <span className="text-[#0D3B2A]/60 font-medium">Delivery Status</span>
              <span className="font-semibold text-emerald-800 flex items-center gap-1 text-[11.5px]">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-ping" />
                Preparing for Dispatch
              </span>
            </div>

            <div className="flex items-center justify-between text-[11.5px]">
              <span className="text-[#0D3B2A]/60 font-medium">Tracking Updates</span>
              <span className="font-medium text-[#0D3B2A]/80 text-right truncate max-w-[200px]">
                {orderData.phone ? 'SMS & WhatsApp to ' + orderData.phone : 'SMS & WhatsApp on mobile'}
              </span>
            </div>
          </div>

          {/* Golden Lucky Draw Ticket Card */}
          {orderData.luckyToken && (
            <div className="relative my-2.5 p-3 sm:p-3.5 rounded-2xl bg-gradient-to-br from-[#FFF9EE] via-[#FFF3D6] to-[#FFE8B2] border-2 border-dashed border-[#D4A24C] shadow-sm text-left overflow-hidden">
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <span className="inline-flex items-center gap-1 text-[9.5px] sm:text-[10px] font-sans font-extrabold uppercase tracking-widest text-[#8A5E12]">
                  <span>🎟️</span>
                  <span>Lucky Draw Entry Confirmed</span>
                </span>
                <span className="text-[9px] font-sans font-bold text-[#0D3B2A] bg-white/90 px-2 py-0.5 rounded-full border border-[#D4A24C]/40">
                  1x Valid Token
                </span>
              </div>

              <div className="bg-white/95 rounded-xl p-2.5 border border-[#D4A24C]/35 flex items-center justify-between gap-3 shadow-inner">
                <div className="min-w-0">
                  <span className="text-[9px] uppercase tracking-wider text-gray-500 font-sans font-bold block">
                    Your Lucky Token Number:
                  </span>
                  <span className="font-mono font-black text-lg sm:text-xl text-[#0D3B2A] tracking-wider select-all block truncate">
                    {orderData.luckyToken}
                  </span>
                </div>

                <button
                  onClick={() => handleCopyToken(orderData.luckyToken)}
                  className="px-3 py-1.5 rounded-lg bg-[#0D3B2A] hover:bg-[#8A5E12] text-white text-[10px] font-sans font-bold uppercase tracking-wider transition-all shadow-sm flex items-center gap-1 shrink-0 cursor-pointer"
                >
                  {copiedToken ? (
                    <>
                      <span>✓</span>
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              <p className="text-[9.5px] text-[#5C4018] mt-1.5 leading-snug">
                ✨ <strong>Keep this token safe!</strong> Winner will be announced when the 1-month offer concludes.
              </p>
            </div>
          )}

          {/* Authentic Guarantee Pill */}
          <div className="p-2 sm:p-2.5 bg-[#FAF3E0] border border-[#D4A24C]/30 rounded-xl text-left flex items-center gap-2">
            <span className="text-sm">🌿</span>
            <p className="text-[10px] sm:text-[10.5px] text-[#5C4018] leading-tight">
              <strong>Authentic Sunnah Quality Guaranteed:</strong> Fresh under strict unani guidelines.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-1.5 pt-0.5">
            {/* Direct Track Order CTA button */}
            <Link
              to={`/track-order?orderId=${encodeURIComponent(orderData.orderNumber || '')}&phone=${encodeURIComponent(orderData.phone || '')}`}
              onClick={handleClose}
              className="w-full rounded-full py-2.5 bg-[#D4A24C] hover:bg-[#b08339] text-[#0D3B2A] text-xs font-sans font-extrabold uppercase tracking-wider transition-all shadow-md cursor-pointer flex items-center justify-center gap-1.5"
            >
              <span>Track Order Status</span>
            </Link>

            {/* Stay on this screen button */}
            <button
              onClick={handleClose}
              className="w-full rounded-full py-2 bg-[#0D3B2A] text-[#FAF7F2] text-xs font-sans font-bold uppercase tracking-wider hover:bg-[#15533c] transition-all shadow-md cursor-pointer flex items-center justify-center gap-1.5"
            >
              <span>Continue Browsing</span>
            </button>

            {/* Link to Studio */}
            <Link
              to="/studio"
              onClick={handleClose}
              className="block w-full rounded-full py-2 border border-[#0D3B2A]/20 text-[#0D3B2A] text-[11px] font-sans font-bold uppercase tracking-wider hover:bg-[#0D3B2A]/5 transition-colors text-center cursor-pointer"
            >
              Browse More Remedies
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
