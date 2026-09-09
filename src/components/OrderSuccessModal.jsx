import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function OrderSuccessModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [orderData, setOrderData] = useState(null);

  useEffect(() => {
    const handleOrderCompleted = (event) => {
      const detail = event?.detail || {};
      setOrderData({
        orderNumber: detail.orderNumber || '#1005',
        orderId: detail.orderId || '',
        totalPrice: detail.totalPrice || null,
        paymentMethod: detail.paymentMethod || 'Cash on Delivery (COD)',
        phone: detail.phone || '',
        email: detail.email || '',
        address: detail.address || null
      });
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

          {/* Authentic Guarantee Pill */}
          <div className="p-2 sm:p-2.5 bg-[#FAF3E0] border border-[#D4A24C]/30 rounded-xl text-left flex items-center gap-2">
            <span className="text-sm">🌿</span>
            <p className="text-[10px] sm:text-[10.5px] text-[#5C4018] leading-tight">
              <strong>Authentic Sunnah Quality Guaranteed:</strong> Fresh under strict unani guidelines.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-1.5 pt-0.5">
            {/* Stay on this screen button */}
            <button
              onClick={handleClose}
              className="w-full rounded-full py-2.5 bg-[#0D3B2A] text-[#FAF7F2] text-xs font-sans font-bold uppercase tracking-wider hover:bg-[#15533c] transition-all shadow-md cursor-pointer flex items-center justify-center gap-1.5"
            >
              <span>Continue Browsing</span>
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
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
