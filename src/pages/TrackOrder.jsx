import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

export default function TrackOrder() {
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [searchResult, setSearchResult] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const orderIdParam = searchParams.get('orderId') || searchParams.get('order') || searchParams.get('phone');
    if (orderIdParam) {
      const clean = orderIdParam.trim();
      setQuery(clean);
      performOrderSearch(clean);
    }
  }, [searchParams]);

  const performOrderSearch = async (searchQuery) => {
    if (!searchQuery) return;
    setIsLoading(true);
    setErrorMsg('');
    setSearchResult(null);

    const cleanQuery = searchQuery.replace(/^#/, '').trim();
    const orderNum = `#${cleanQuery}`;

    // Query serverless API endpoint
    try {
      const apiRes = await fetch(`/api/track-order?orderId=${encodeURIComponent(cleanQuery)}`);
      if (apiRes.ok) {
        const apiJson = await apiRes.json();
        if (apiJson.success && apiJson.data) {
          const d = apiJson.data;
          setIsLoading(false);
          setSearchResult({
            type: 'order',
            orderNumber: d.orderNumber,
            date: d.date,
            financialStatus: d.financialStatus,
            fulfillmentStatus: d.fulfillmentStatus,
            status: d.statusText,
            statusCode: d.statusCode,
            carrier: d.carrier,
            awbNumber: d.awbNumber,
            customerName: d.customerName,
            items: d.items,
            trackingUrl: d.trackingUrl
          });
          return;
        }
      }
    } catch (e) {}

    // Fallback to local storage
    let matchedOrder = null;
    try {
      const stored = JSON.parse(localStorage.getItem('altooba_orders') || '[]');
      if (Array.isArray(stored)) {
        matchedOrder = stored.find(
          (o) => o.orderNumber?.replace(/^#/, '').trim() === cleanQuery || o.phone?.includes(cleanQuery)
        );
      }
    } catch (e) {}

    setIsLoading(false);
    if (matchedOrder) {
      setSearchResult({
        type: 'order',
        orderNumber: matchedOrder.orderNumber || orderNum,
        date: matchedOrder.date || new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
        status: 'Processing & Packaging',
        statusCode: 2,
        carrier: 'Shree Maruti Courier / Delhivery',
        awbNumber: cleanQuery,
        items: matchedOrder.items || [],
        trackingUrl: `https://track.shreemaruticourier.com/track?tracking_no=${encodeURIComponent(cleanQuery)}`
      });
    } else {
      setErrorMsg(`Order #${cleanQuery} not found. Please check your Order Number or Mobile Number.`);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) {
      setErrorMsg('Please enter an Order Number or Mobile Number');
      return;
    }
    performOrderSearch(query.trim());
  };

  const steps = [
    { code: 1, label: 'Order Placed' },
    { code: 2, label: 'Processing' },
    { code: 3, label: 'Dispatched' },
    { code: 4, label: 'Out for Delivery' },
    { code: 5, label: 'Delivered' },
  ];

  return (
    <div className="pt-28 pb-20 bg-[#FAF7F2] min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="font-serif font-bold text-3xl sm:text-4xl text-[#0D3B2A] mb-2">
            Track Your Order
          </h1>
          <p className="text-sm text-[#0D3B2A]/60 font-sans">
            Enter your Order ID (e.g. #1629) or Mobile Number to view live shipment details.
          </p>
        </div>

        {/* Clean Search Input */}
        <div className="bg-white p-4 sm:p-6 rounded-2xl border border-[#0D3B2A]/10 shadow-sm mb-8">
          <form onSubmit={handleFormSubmit} className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Enter Order # (e.g. #1629) or Phone Number"
              className="flex-grow px-4 py-3 rounded-xl bg-[#FAF7F2] border border-gray-200 text-[#0D3B2A] text-sm font-sans placeholder-gray-400 outline-none focus:border-[#0D3B2A] transition-all"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-3 rounded-xl bg-[#0D3B2A] hover:bg-[#16523c] text-white font-sans font-semibold text-sm transition-all shadow-sm cursor-pointer disabled:opacity-50 shrink-0"
            >
              {isLoading ? 'Searching...' : 'Track Order'}
            </button>
          </form>

          {errorMsg && (
            <p className="text-red-500 text-xs font-sans mt-3 text-center">{errorMsg}</p>
          )}
        </div>

        {/* Search Results */}
        {searchResult && (
          <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-sm">
            
            {/* Header info */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-gray-100 gap-4 mb-6">
              <div>
                <h2 className="font-serif font-bold text-2xl text-[#0D3B2A]">
                  Order {searchResult.orderNumber}
                </h2>
                <div className="flex flex-wrap items-center gap-2 mt-1 text-xs text-gray-500 font-sans">
                  {searchResult.customerName && (
                    <span className="font-semibold text-[#0D3B2A]">{searchResult.customerName}</span>
                  )}
                  {searchResult.customerName && <span>•</span>}
                  <span>Placed on {searchResult.date}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className={`px-3 py-1 rounded-full text-xs font-sans font-semibold uppercase tracking-wider ${
                  searchResult.fulfillmentStatus === 'fulfilled' 
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                    : 'bg-amber-50 text-amber-700 border border-amber-200'
                }`}>
                  {searchResult.status}
                </span>

                {searchResult.trackingUrl && (
                  <a
                    href={searchResult.trackingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-1.5 rounded-lg bg-[#0D3B2A] hover:bg-[#16523c] text-white text-xs font-sans font-semibold transition-all inline-flex items-center gap-1"
                  >
                    <span>Track Live</span>
                    <span>↗</span>
                  </a>
                )}
              </div>
            </div>

            {/* Minimal Progress Line */}
            <div className="mb-8 py-2">
              <div className="relative flex items-center justify-between">
                {/* Horizontal track background */}
                <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 -translate-y-1/2 z-0" />
                
                {/* Active track line */}
                <div 
                  className="absolute top-1/2 left-0 h-0.5 bg-[#0D3B2A] -translate-y-1/2 z-0 transition-all duration-500"
                  style={{ width: `${Math.min(100, Math.max(0, ((searchResult.statusCode - 1) / (steps.length - 1)) * 100))}%` }}
                />

                {steps.map((step) => {
                  const isDone = step.code <= searchResult.statusCode;
                  const isCurrent = step.code === searchResult.statusCode;

                  return (
                    <div key={step.code} className="relative z-10 flex flex-col items-center">
                      <div 
                        className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                          isDone 
                            ? 'bg-[#0D3B2A] text-white' 
                            : 'bg-white border border-gray-300 text-gray-400'
                        } ${isCurrent ? 'ring-4 ring-[#0D3B2A]/15 border-2 border-[#0D3B2A]' : ''}`}
                      >
                        {isDone ? '✓' : step.code}
                      </div>

                      <span className={`text-[11px] font-sans font-medium mt-2 text-center whitespace-nowrap ${
                        isDone ? 'text-[#0D3B2A] font-semibold' : 'text-gray-400'
                      }`}>
                        {step.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Items List */}
            {searchResult.items && searchResult.items.length > 0 && (
              <div className="border-t border-gray-100 pt-6">
                <h3 className="text-xs font-sans font-semibold text-gray-500 uppercase tracking-wider mb-4">
                  Order Items ({searchResult.items.length})
                </h3>

                <div className="divide-y divide-gray-100">
                  {searchResult.items.map((item, idx) => (
                    <div key={idx} className="py-3 flex items-center justify-between gap-4 first:pt-0 last:pb-0">
                      <div className="flex items-center gap-3">
                        <img 
                          src={item.image || '/products_banner.jpeg'} 
                          alt={item.name} 
                          className="w-10 h-10 rounded-lg object-contain bg-gray-50 border border-gray-100 p-0.5" 
                        />
                        <div>
                          <p className="text-xs sm:text-sm font-sans font-medium text-[#0D3B2A] line-clamp-1">
                            {item.name}
                          </p>
                          <p className="text-[11px] text-gray-400 font-sans">
                            Qty: {item.quantity} {item.variant && item.variant !== 'Standard' ? `• ${item.variant}` : ''}
                          </p>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="text-xs sm:text-sm font-sans font-semibold text-[#0D3B2A]">
                          ₹{item.price}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Support link */}
            <div className="mt-8 pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400 font-sans">
              <span>Carrier: <strong className="text-gray-600">{searchResult.carrier}</strong></span>
              <a 
                href={`https://wa.me/918791550503?text=Hi%20Al-Tooba,%20I%20need%20help%20with%20Order%20${encodeURIComponent(searchResult.orderNumber)}`} 
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#0D3B2A] hover:underline font-semibold"
              >
                Need help? Chat on WhatsApp
              </a>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}

