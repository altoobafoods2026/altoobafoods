import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { isKwikPassLoggedIn, triggerKwikpassLogin, setupKwikPassListeners } from '../services/kwikpass';

export default function TrackOrder() {
  const [searchParams] = useSearchParams();
  const [isLoggedIn, setIsLoggedIn] = useState(() => isKwikPassLoggedIn());
  const [userPhone, setUserPhone] = useState(() => localStorage.getItem('kp_user_phone') || localStorage.getItem('kp_user_id') || '');
  
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [ordersList, setOrdersList] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');

  // Sync login status and listeners
  useEffect(() => {
    const checkLogin = () => {
      const logged = isKwikPassLoggedIn();
      setIsLoggedIn(logged);
      const phone = localStorage.getItem('kp_user_phone') || localStorage.getItem('kp_user_id') || '';
      setUserPhone(phone);
    };

    const cleanupListeners = setupKwikPassListeners(() => {
      checkLogin();
    });

    window.addEventListener('storage', checkLogin);
    window.addEventListener('kp_data_sent', checkLogin);
    window.addEventListener('kp-data-sent', checkLogin);

    return () => {
      cleanupListeners();
      window.removeEventListener('storage', checkLogin);
      window.removeEventListener('kp_data_sent', checkLogin);
      window.removeEventListener('kp-data-sent', checkLogin);
    };
  }, []);

  // Fetch orders for a search query or user's phone number
  const performOrderSearch = useCallback(async (searchQuery) => {
    if (!searchQuery) return;
    setIsLoading(true);
    setErrorMsg('');
    setOrdersList([]);

    const cleanQuery = searchQuery.trim();

    try {
      const apiRes = await fetch(`/api/track-order?orderId=${encodeURIComponent(cleanQuery)}`);
      if (apiRes.ok) {
        const apiJson = await apiRes.json();
        if (apiJson.success && (apiJson.orders || apiJson.data)) {
          const list = apiJson.orders || (apiJson.data ? [apiJson.data] : []);
          setIsLoading(false);
          setOrdersList(list);
          return;
        } else {
          setErrorMsg(apiJson.message || `No orders found matching "${cleanQuery}".`);
        }
      } else {
        setErrorMsg('Could not query order status. Please try again.');
      }
    } catch (e) {
      console.error(e);
      setErrorMsg('Network error. Please try again.');
    }

    setIsLoading(false);
  }, []);

  // Auto-search user's orders when logged in
  useEffect(() => {
    if (isLoggedIn) {
      const orderIdParam = searchParams.get('orderId') || searchParams.get('order');
      if (orderIdParam) {
        setQuery(orderIdParam.trim());
        performOrderSearch(orderIdParam.trim());
      } else if (userPhone) {
        setQuery(userPhone);
        performOrderSearch(userPhone);
      }
    }
  }, [isLoggedIn, userPhone, searchParams, performOrderSearch]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) {
      setErrorMsg('Please enter a valid Order Number or Mobile Number');
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
            {isLoggedIn
              ? 'View your active order details and live shipment status.'
              : 'Please log in with your mobile number to view your orders.'}
          </p>
        </div>

        {/* IF NOT LOGGED IN: Render Login Gate Card */}
        {!isLoggedIn ? (
          <div className="bg-white p-8 sm:p-10 rounded-2xl border border-[#0D3B2A]/10 shadow-sm text-center max-w-md mx-auto my-6">
            <div className="w-16 h-16 rounded-full bg-[#0D3B2A]/5 text-[#0D3B2A] flex items-center justify-center mx-auto mb-5">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
              </svg>
            </div>
            
            <h2 className="font-serif font-bold text-2xl text-[#0D3B2A] mb-2">
              Login Required
            </h2>
            <p className="text-xs text-gray-500 font-sans leading-relaxed mb-6">
              To keep your order information secure, please log in with your mobile number to view order details and track live shipments.
            </p>

            <button
              onClick={() => triggerKwikpassLogin()}
              className="w-full py-3.5 px-6 rounded-xl bg-[#0D3B2A] hover:bg-[#16523c] text-white font-sans font-bold text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
              </svg>
              <span>Login with OTP / KwikPass</span>
            </button>
          </div>
        ) : (
          /* IF LOGGED IN: Render Search & Orders */
          <>
            {/* Search Input Bar */}
            <div className="bg-white p-4 sm:p-6 rounded-2xl border border-[#0D3B2A]/10 shadow-sm mb-8">
              <form onSubmit={handleFormSubmit} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  id="track-order-query"
                  name="trackOrderQuery"
                  autoComplete="on"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Enter Order # (e.g. #1629) or Mobile Number"
                  className="flex-grow px-4 py-3 rounded-xl bg-[#FAF7F2] border border-gray-200 text-[#0D3B2A] text-sm font-sans placeholder-gray-400 outline-none focus:border-[#0D3B2A] transition-all"
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-6 py-3 rounded-xl bg-[#0D3B2A] hover:bg-[#16523c] text-white font-sans font-semibold text-sm transition-all shadow-sm cursor-pointer disabled:opacity-50 shrink-0"
                >
                  {isLoading ? 'Searching...' : 'Search Order'}
                </button>
              </form>

              {userPhone && (
                <p className="text-[11px] text-gray-400 font-sans mt-3 text-center">
                  Logged in as <strong className="text-[#0D3B2A]">{userPhone}</strong>
                </p>
              )}

              {errorMsg && (
                <p className="text-red-500 text-xs font-sans mt-3 text-center">{errorMsg}</p>
              )}
            </div>

            {/* Orders List */}
            {ordersList.length > 0 && (
              <div className="space-y-6">
                {ordersList.map((order, idx) => (
                  <div key={idx} className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-sm">
                    
                    {/* Header info */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-gray-100 gap-4 mb-6">
                      <div>
                        <h2 className="font-serif font-bold text-2xl text-[#0D3B2A]">
                          Order {order.orderNumber}
                        </h2>
                        <div className="flex flex-wrap items-center gap-2 mt-1 text-xs text-gray-500 font-sans">
                          {order.customerName && (
                            <span className="font-semibold text-[#0D3B2A]">{order.customerName}</span>
                          )}
                          {order.customerName && <span>•</span>}
                          <span>Placed on {order.date}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-sans font-semibold uppercase tracking-wider ${
                          order.fulfillmentStatus === 'fulfilled' 
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                            : 'bg-amber-50 text-amber-700 border border-amber-200'
                        }`}>
                          {order.statusText}
                        </span>

                        {order.fulfillmentStatus === 'fulfilled' && order.trackingUrl && (
                          <a
                            href={order.trackingUrl}
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
                        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 -translate-y-1/2 z-0" />
                        
                        <div 
                          className="absolute top-1/2 left-0 h-0.5 bg-[#0D3B2A] -translate-y-1/2 z-0 transition-all duration-500"
                          style={{ width: `${Math.min(100, Math.max(0, ((order.statusCode - 1) / (steps.length - 1)) * 100))}%` }}
                        />

                        {steps.map((step) => {
                          const isDone = step.code <= order.statusCode;
                          const isCurrent = step.code === order.statusCode;

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
                    {order.items && order.items.length > 0 && (
                      <div className="border-t border-gray-100 pt-6">
                        <h3 className="text-xs font-sans font-semibold text-gray-500 uppercase tracking-wider mb-4">
                          Order Items ({order.items.length})
                        </h3>

                        <div className="divide-y divide-gray-100">
                          {order.items.map((item, itemIdx) => (
                            <div key={itemIdx} className="py-3 flex items-center justify-between gap-4 first:pt-0 last:pb-0">
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

                    {/* Support footer */}
                    <div className="mt-8 pt-4 border-t border-gray-100 flex flex-wrap items-center justify-between gap-2 text-xs text-gray-400 font-sans">
                      <div>
                        <span>Partner: <strong className="text-gray-700">{order.fulfillmentStatus === 'fulfilled' ? order.carrier : 'Pending Dispatch'}</strong></span>
                        {order.fulfillmentStatus === 'fulfilled' && order.awbNumber && (
                          <span className="ml-3">AWB: <strong className="text-gray-700">{order.awbNumber}</strong></span>
                        )}
                      </div>
                      <a 
                        href={`https://wa.me/918791550503?text=Hi%20Al-Tooba,%20I%20need%20help%20with%20Order%20${encodeURIComponent(order.orderNumber)}`} 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#0D3B2A] hover:underline font-semibold"
                      >
                        Need help? Chat on WhatsApp
                      </a>
                    </div>

                  </div>
                ))}
              </div>
            )}
          </>
        )}

      </div>
    </div>
  );
}
