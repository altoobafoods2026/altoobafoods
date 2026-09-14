import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

const STORE_DOMAIN = import.meta.env.VITE_SHOPIFY_STORE_DOMAIN || 'imrmuj-v6.myshopify.com';
const ADMIN_TOKEN = import.meta.env.VITE_SHOPIFY_ADMIN_API_TOKEN;

export default function TrackOrder() {
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState('order_id'); // 'order_id' | 'shree_maruti' | 'delhivery'
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

    // 1. Try fetching from serverless endpoint /api/track-order first
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
            shreeMarutiUrl: d.trackingUrl.toLowerCase().includes('maruti') ? d.trackingUrl : `https://track.shreemaruticourier.com/track?tracking_no=${encodeURIComponent(d.awbNumber)}`,
            delhiveryUrl: d.trackingUrl.toLowerCase().includes('delhivery') ? d.trackingUrl : `https://www.delhivery.com/track/package/${encodeURIComponent(d.awbNumber)}`,
            isRealFromShopify: true
          });
          return;
        }
      }
    } catch (e) {}

    // 2. Direct Admin Query if env variable exists
    if (ADMIN_TOKEN) {
      try {
        const isPhone = /^\d{10}$/.test(cleanQuery);
        const searchUrl = isPhone
          ? `https://${STORE_DOMAIN}/admin/api/2024-01/orders.json?phone=${encodeURIComponent(cleanQuery)}&status=any`
          : `https://${STORE_DOMAIN}/admin/api/2024-01/orders.json?name=${encodeURIComponent(cleanQuery)}&status=any`;

        const response = await fetch(searchUrl, {
          headers: {
            'X-Shopify-Access-Token': ADMIN_TOKEN,
            'Content-Type': 'application/json'
          }
        });

        const data = await response.json();

        if (data.orders && data.orders.length > 0) {
          const order = data.orders[0];
          const isFulfilled = order.fulfillment_status === 'fulfilled';
          const fulfillment = order.fulfillments?.[0] || {};
          
          const carrier = fulfillment.tracking_company || 'Shree Maruti Courier / Delhivery';
          const trackingNumber = fulfillment.tracking_number || cleanQuery;
          
          let trackingUrl = fulfillment.tracking_url || '';
          if (!trackingUrl) {
            if (carrier.toLowerCase().includes('maruti')) {
              trackingUrl = `https://track.shreemaruticourier.com/track?tracking_no=${encodeURIComponent(trackingNumber)}`;
            } else {
              trackingUrl = `https://www.delhivery.com/track/package/${encodeURIComponent(trackingNumber)}`;
            }
          }

          let giftFromNotes = null;
          if (Array.isArray(order.note_attributes)) {
            const giftAttr = order.note_attributes.find(a => a.name === 'Free Gift' || a.name?.startsWith('Free Gift'));
            if (giftAttr) giftFromNotes = giftAttr.value;
          }

          const items = order.line_items.map((line) => {
            let giftProp = null;
            if (Array.isArray(line.properties)) {
              const p = line.properties.find(prop => prop.name === 'Free Gift Included' || prop.name === 'Gift Item');
              if (p) giftProp = p.value;
            }
            return {
              name: line.title,
              variant: line.variant_title || 'Standard',
              quantity: line.quantity,
              price: parseFloat(line.price),
              image: '/products_banner.jpeg',
              complimentaryGift: giftProp || giftFromNotes || null
            };
          });

          setIsLoading(false);
          setSearchResult({
            type: 'order',
            orderNumber: order.name,
            date: new Date(order.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
            financialStatus: order.financial_status,
            fulfillmentStatus: order.fulfillment_status || 'unfulfilled',
            status: isFulfilled ? 'Fulfilled & Dispatched' : 'Processing & Packing at Warehouse',
            statusCode: isFulfilled ? 3 : 2,
            carrier: carrier,
            awbNumber: trackingNumber,
            customerName: `${order.customer?.first_name || ''} ${order.customer?.last_name || ''}`.trim(),
            items: items,
            shreeMarutiUrl: trackingUrl.toLowerCase().includes('maruti') ? trackingUrl : `https://track.shreemaruticourier.com/track?tracking_no=${encodeURIComponent(trackingNumber)}`,
            delhiveryUrl: trackingUrl.toLowerCase().includes('delhivery') ? trackingUrl : `https://www.delhivery.com/track/package/${encodeURIComponent(trackingNumber)}`,
            isRealFromShopify: true
          });
          return;
        }
      } catch (e) {
        console.warn('Direct Shopify search error:', e);
      }
    }

    // 3. Fallback to local storage if API is unreachable
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
        status: 'Processing & Packaging at Warehouse',
        statusCode: 2,
        carrier: 'Shree Maruti Courier / Delhivery',
        awbNumber: cleanQuery,
        paymentMethod: matchedOrder.paymentMethod || 'Paid / COD',
        items: matchedOrder.items || [],
        shreeMarutiUrl: `https://track.shreemaruticourier.com/track?tracking_no=${encodeURIComponent(cleanQuery)}`,
        delhiveryUrl: `https://www.delhivery.com/track/package/${encodeURIComponent(cleanQuery)}`,
        isRealFromShopify: false
      });
    } else {
      setErrorMsg(`Order #${cleanQuery} was not found in Shopify Admin. Please check the Order Number or Phone Number.`);
    }
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
            Enter your Order ID (e.g. <span className="font-bold text-[#0D3B2A]">#1628, #1629</span>), Mobile Number, or Courier AWB Docket Number.
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
                    : 'Enter Order ID (#1628, #1629) or Phone Number'
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
                <span>Searching Live...</span>
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
                  {searchResult.isRealFromShopify ? 'Verified Shopify Live Order' : 'Order Details'}
                </span>
                <h2 className="font-serif font-bold text-2xl text-[#0D3B2A]">
                  Order {searchResult.orderNumber} {searchResult.customerName ? `(${searchResult.customerName})` : ''}
                </h2>
                <p className="text-xs text-gray-500 font-sans mt-0.5">
                  Placed on {searchResult.date} • Carrier: <span className="font-semibold text-[#0D3B2A]">{searchResult.carrier}</span>
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                <span className={`px-3.5 py-1.5 rounded-full text-xs font-sans font-bold uppercase tracking-wide flex items-center gap-1.5 ${
                  searchResult.fulfillmentStatus === 'fulfilled' 
                    ? 'bg-emerald-100 text-emerald-800' 
                    : 'bg-amber-100 text-amber-800'
                }`}>
                  <span className={`w-2 h-2 rounded-full animate-ping ${searchResult.fulfillmentStatus === 'fulfilled' ? 'bg-emerald-600' : 'bg-amber-600'}`}></span>
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
                  Click below to open live shipment location.
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

            {/* Items Summary in this Order */}
            {searchResult.items && searchResult.items.length > 0 && (
              <div className="bg-[#FAF7F2] p-5 sm:p-6 rounded-2xl border border-[#0D3B2A]/10">
                <h3 className="text-xs font-sans font-bold uppercase tracking-wider text-[#0D3B2A] mb-4">
                  Items in this Order
                </h3>

                <div className="space-y-4">
                  {searchResult.items.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between gap-4 py-2 border-b border-gray-200/60 last:border-none">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-white border border-gray-200 p-1 flex-shrink-0">
                          <img src={item.image || '/products_banner.jpeg'} alt={item.name} className="w-full h-full object-contain" />
                        </div>
                        <div>
                          <p className="text-xs sm:text-sm font-serif font-bold text-[#0D3B2A] leading-tight">
                            {item.name}
                          </p>
                          <p className="text-[11px] text-gray-500 font-sans mt-0.5">
                            Qty: {item.quantity} {item.variant ? `• Pack: ${item.variant}` : ''}
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
