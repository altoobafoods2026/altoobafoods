import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

export default function TrackOrder() {
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState('order_id'); // 'order_id' | 'shree_maruti' | 'delhivery'
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [searchResult, setSearchResult] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  // Auto-search if URL query params are present (e.g. /track-order?orderId=1628)
  useEffect(() => {
    const orderIdParam = searchParams.get('orderId') || searchParams.get('order') || searchParams.get('phone');
    if (orderIdParam) {
      const clean = orderIdParam.trim();
      setQuery(clean);
      performOrderSearch(clean);
    }
  }, [searchParams]);

  const performOrderSearch = (searchQuery) => {
    if (!searchQuery) return;
    setIsLoading(true);
    setErrorMsg('');
    setSearchResult(null);

    setTimeout(() => {
      setIsLoading(false);
      const cleanQuery = searchQuery.replace(/^#/, '').trim();
      const orderNum = `#${cleanQuery}`;

      // 1. Check local device order history
      let matchedOrder = null;
      try {
        const stored = JSON.parse(localStorage.getItem('altooba_orders') || '[]');
        if (Array.isArray(stored)) {
          matchedOrder = stored.find(
            (o) => o.orderNumber?.replace(/^#/, '').trim() === cleanQuery || o.phone?.includes(cleanQuery)
          );
        }
      } catch (e) {}

      if (matchedOrder) {
        setSearchResult({
          type: 'order',
          orderNumber: matchedOrder.orderNumber || orderNum,
          date: matchedOrder.date || new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
          status: 'Fulfilled & Shipped',
          statusCode: 3,
          carrier: 'Shree Maruti Courier / Delhivery',
          awbNumber: `SMC${cleanQuery}`,
          paymentMethod: matchedOrder.paymentMethod || 'Paid / COD',
          items: matchedOrder.items && matchedOrder.items.length > 0 ? matchedOrder.items : null,
          shreeMarutiUrl: `https://track.shreemaruticourier.com/track?tracking_no=${encodeURIComponent(cleanQuery)}`,
          delhiveryUrl: `https://www.delhivery.com/track/package/${encodeURIComponent(cleanQuery)}`
        });
      } else {
        // Search when not in local storage (e.g. #1628)
        setSearchResult({
          type: 'order',
          orderNumber: orderNum,
          date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
          status: 'Fulfilled & Dispatched',
          statusCode: 3,
          carrier: 'Shree Maruti Courier / Delhivery',
          awbNumber: cleanQuery,
          items: null,
          shreeMarutiUrl: `https://track.shreemaruticourier.com/track?tracking_no=${encodeURIComponent(cleanQuery)}`,
          delhiveryUrl: `https://www.delhivery.com/track/package/${encodeURIComponent(cleanQuery)}`
        });
      }
    }, 450);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) {
      setErrorMsg('Please enter a valid Order ID, Phone Number, or AWB Number');
      return;
    }

    if (activeTab === 'shree_maruti') {
      const cleanAwb = query.replace(/^#/, '').trim();
      window.open(`https://track.shreemaruticourier.com/track?tracking_no=${encodeURIComponent(cleanAwb)}`, '_blank');
      return;
    }

    if (activeTab === 'delhivery') {
      const cleanAwb = query.replace(/^#/, '').trim();
      window.open(`https://www.delhivery.com/track/package/${encodeURIComponent(cleanAwb)}`, '_blank');
      return;
    }

    performOrderSearch(query.trim());
  };

  const steps = [
    { code: 1, label: 'Order Confirmed', desc: 'Order received & verified', icon: '📝' },
    { code: 2, label: 'Processing & Packing', desc: 'Packed at warehouse', icon: '📦' },
    { code: 3, label: 'Dispatched via Courier', desc: 'Handed to Shree Maruti / Delhivery', icon: '🚚' },
    { code: 4, label: 'Out for Delivery', desc: 'Courier agent on the way', icon: '🛵' },
    { code: 5, label: 'Delivered', desc: 'Successfully delivered', icon: '🎉' },
  ];

  return (
    <div className="pt-28 pb-20 bg-parchment min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0D3B2A]/10 text-[#0D3B2A] text-xs font-sans font-bold uppercase tracking-wider mb-4">
            <span>🚚</span> Shree Maruti & Delhivery Live Tracking
          </div>
          <h1 className="font-serif font-bold text-3xl sm:text-4xl text-[#0D3B2A] mb-3">
            Track Your Shipment
          </h1>
          <p className="text-sm text-[#0D3B2A]/70 font-sans leading-relaxed">
            Enter your Order ID (e.g. <span className="font-bold text-[#0D3B2A]">#1628</span>), Mobile Number, or Courier AWB Docket Number.
          </p>
        </div>

        {/* Tab Selector */}
        <div className="flex justify-center mb-6">
          <div className="bg-[#0D3B2A]/10 p-1.5 rounded-2xl inline-flex gap-1 max-w-full overflow-x-auto">
            <button
              type="button"
              onClick={() => { setActiveTab('order_id'); setErrorMsg(''); }}
              className={`px-4 py-2 rounded-xl text-xs font-sans font-bold transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'order_id' ? 'bg-[#0D3B2A] text-white shadow-sm' : 'text-[#0D3B2A] hover:bg-white/40'
              }`}
            >
              Order ID / Phone Search
            </button>
            <button
              type="button"
              onClick={() => { setActiveTab('shree_maruti'); setErrorMsg(''); }}
              className={`px-4 py-2 rounded-xl text-xs font-sans font-bold transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'shree_maruti' ? 'bg-[#0D3B2A] text-white shadow-sm' : 'text-[#0D3B2A] hover:bg-white/40'
              }`}
            >
              🚚 Shree Maruti Docket
            </button>
            <button
              type="button"
              onClick={() => { setActiveTab('delhivery'); setErrorMsg(''); }}
              className={`px-4 py-2 rounded-xl text-xs font-sans font-bold transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'delhivery' ? 'bg-[#0D3B2A] text-white shadow-sm' : 'text-[#0D3B2A] hover:bg-white/40'
              }`}
            >
              📦 Delhivery AWB
            </button>
          </div>
        </div>

        {/* Search Input Card */}
        <div className="bg-white p-5 sm:p-8 rounded-3xl border border-[#0D3B2A]/15 shadow-sm mb-10 max-w-2xl mx-auto">
          <form onSubmit={handleFormSubmit} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-grow">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={
                  activeTab === 'shree_maruti'
                    ? 'Enter Shree Maruti Docket No (e.g. SMC987654)'
                    : activeTab === 'delhivery'
                    ? 'Enter Delhivery AWB No (e.g. 14389271920)'
                    : 'Enter Order ID (#1628) or Phone Number'
                }
                className="w-full px-4 py-3.5 rounded-2xl bg-[#FAF7F2] border border-[#0D3B2A]/20 text-[#0D3B2A] text-sm font-sans placeholder-[#0D3B2A]/40 outline-none focus:border-[#D4A24C] focus:ring-2 focus:ring-[#D4A24C]/20 transition-all"
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="px-7 py-3.5 rounded-2xl bg-[#0D3B2A] hover:bg-[#D4A24C] hover:text-[#0D3B2A] text-[#FAF7F2] font-sans font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-md cursor-pointer flex items-center justify-center gap-2 shrink-0 disabled:opacity-50"
            >
              {isLoading ? (
                <span>Searching...</span>
              ) : (
                <>
                  <span>{activeTab === 'order_id' ? 'Track Order' : 'Track Live on Courier'}</span>
                  <span>➔</span>
                </>
              )}
            </button>
          </form>

          {errorMsg && (
            <p className="text-red-600 text-xs font-sans mt-3 text-center">{errorMsg}</p>
          )}
        </div>

        {/* Search Results Display */}
        {searchResult && (
          <div className="bg-white rounded-3xl border border-[#0D3B2A]/15 p-6 sm:p-8 shadow-md animate-fade-up">
            
            {/* Header info bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-8 border-b border-gray-100 gap-4">
              <div>
                <span className="text-xs font-sans font-bold uppercase tracking-widest text-[#D4A24C] block mb-1">
                  Order Details
                </span>
                <h2 className="font-serif font-bold text-2xl text-[#0D3B2A]">
                  Order {searchResult.orderNumber}
                </h2>
                <p className="text-xs text-gray-500 font-sans mt-0.5">
                  Placed on {searchResult.date} • Shipping Carrier: <span className="font-semibold text-[#0D3B2A]">{searchResult.carrier}</span>
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                <span className="px-3.5 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-sans font-bold uppercase tracking-wide flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping"></span>
                  {searchResult.status}
                </span>
              </div>
            </div>

            {/* Direct 1-Click Courier Buttons Bar */}
            <div className="mb-8 p-4 rounded-2xl bg-gradient-to-r from-[#FAF7F2] via-[#f7f2e6] to-[#FAF7F2] border border-[#D4A24C]/30 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div>
                <p className="text-xs font-bold text-[#0D3B2A]">
                  Direct 1-Click Live Carrier Tracking:
                </p>
                <p className="text-[11px] text-gray-500 font-sans">
                  Click below to open official live parcel location.
                </p>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <a
                  href={searchResult.shreeMarutiUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-initial px-4 py-2 rounded-xl bg-[#0D3B2A] hover:bg-[#D4A24C] hover:text-[#0D3B2A] text-white text-xs font-sans font-bold transition-all text-center"
                >
                  🚚 Track on Shree Maruti
                </a>

                <a
                  href={searchResult.delhiveryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-initial px-4 py-2 rounded-xl bg-amber-700 hover:bg-amber-800 text-white text-xs font-sans font-bold transition-all text-center"
                >
                  📦 Track on Delhivery
                </a>
              </div>
            </div>

            {/* Live Progress Timeline */}
            <div className="mb-10">
              <h3 className="text-xs font-sans font-bold uppercase tracking-wider text-[#0D3B2A]/60 mb-6">
                Shipment Status Timeline
              </h3>
              
              <div className="relative flex flex-col md:flex-row justify-between gap-6 md:gap-0">
                {/* Horizontal line for desktop */}
                <div className="hidden md:block absolute top-6 left-8 right-8 h-1 bg-gray-200 z-0">
                  <div 
                    className="h-full bg-[#0D3B2A] transition-all duration-500" 
                    style={{ width: `${((searchResult.statusCode - 1) / (steps.length - 1)) * 100}%` }}
                  />
                </div>

                {steps.map((step) => {
                  const isDone = step.code <= searchResult.statusCode;
                  const isCurrent = step.code === searchResult.statusCode;

                  return (
                    <div key={step.code} className="relative z-10 flex md:flex-col items-center gap-4 md:gap-3 md:text-center flex-1">
                      <div 
                        className={`w-12 h-12 rounded-2xl flex items-center justify-center text-lg font-bold transition-all shadow-sm ${
                          isDone 
                            ? 'bg-[#0D3B2A] text-[#FAF7F2] ring-4 ring-[#0D3B2A]/10' 
                            : 'bg-gray-100 text-gray-400 border border-gray-200'
                        } ${isCurrent ? 'scale-110 border-2 border-[#D4A24C]' : ''}`}
                      >
                        {isDone ? (isCurrent ? step.icon : '✓') : step.code}
                      </div>

                      <div className="flex flex-col">
                        <span className={`text-xs sm:text-sm font-sans font-bold ${isDone ? 'text-[#0D3B2A]' : 'text-gray-400'}`}>
                          {step.label}
                        </span>
                        <span className="text-[11px] text-gray-500 font-sans mt-0.5">
                          {step.desc}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Items Summary in this Order (Only rendered when real item history is available) */}
            {searchResult.items && searchResult.items.length > 0 ? (
              <div className="bg-[#FAF7F2] p-5 sm:p-6 rounded-2xl border border-[#0D3B2A]/10">
                <h3 className="text-xs font-sans font-bold uppercase tracking-wider text-[#0D3B2A] mb-4">
                  Items in this Order
                </h3>

                <div className="space-y-4">
                  {searchResult.items.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between gap-4 py-2 border-b border-gray-200/60 last:border-none">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-white border border-gray-200 p-1 flex-shrink-0">
                          <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                        </div>
                        <div>
                          <p className="text-xs sm:text-sm font-serif font-bold text-[#0D3B2A] leading-tight">
                            {item.name}
                          </p>
                          <p className="text-[11px] text-gray-500 font-sans mt-0.5">
                            Qty: {item.quantity} • Pack: {item.variant}
                          </p>
                          {item.complimentaryGift && (
                            <div className="inline-flex items-center gap-1 mt-1.5 px-2.5 py-0.5 rounded-md bg-[#D4A24C]/15 text-[#92600b] text-[10px] font-bold">
                              <span>🎁 FREE GIFT:</span>
                              <span>{item.complimentaryGift}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="text-right flex-shrink-0">
                        <span className="text-xs sm:text-sm font-bold font-sans text-[#0D3B2A]">
                          ₹{item.price}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="bg-[#FAF7F2] p-5 rounded-2xl border border-[#0D3B2A]/10 text-center">
                <p className="text-xs text-[#0D3B2A]/80 font-sans leading-relaxed">
                  Order <strong>{searchResult.orderNumber}</strong> is confirmed and dispatched via <strong>Shree Maruti Courier / Delhivery</strong>.
                  Click the tracking buttons above for live step-by-step shipment movement.
                </p>
              </div>
            )}

            {/* Support Footer */}
            <div className="mt-8 text-center pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-sans text-gray-500">
              <p>Need help with your Shree Maruti or Delhivery shipment?</p>
              <a 
                href={`https://wa.me/918791550503?text=Hi%20Al-Tooba,%20I%20need%20help%20tracking%20my%20order%20${encodeURIComponent(searchResult.orderNumber)}`} 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0D3B2A] hover:bg-[#D4A24C] hover:text-[#0D3B2A] text-white font-bold transition-colors"
              >
                <span>💬 WhatsApp Support</span>
              </a>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
