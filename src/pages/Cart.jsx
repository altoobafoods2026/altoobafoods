import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCartStore } from '../store/cartStore';
import { useToastStore } from '../store/toastStore';
import { formatPrice } from '../utils/formatPrice';
import { initiateGokwikCheckout } from '../services/gokwik';

export default function Cart() {
  const items = useCartStore((state) => state.items);
  const updateQty = useCartStore((state) => state.updateQty);
  const removeItem = useCartStore((state) => state.removeItem);
  const showToast = useToastStore((state) => state.showToast);

  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shippingThreshold = 1000;
  const shippingCost = subtotal >= shippingThreshold || subtotal === 0 ? 0 : 100;
  const total = subtotal + shippingCost;

  const handleQtyChange = (itemId, newQty, variant) => {
    updateQty(itemId, newQty, variant);
  };

  const handleRemove = (itemId, variant, name) => {
    removeItem(itemId, variant);
    showToast(`Removed ${name} from cart`);
  };

  const handleCheckout = async () => {
    if (items.length === 0) return;
    try {
      setIsCheckingOut(true);
      await initiateGokwikCheckout(items);
    } catch (err) {
      console.error('GoKwik checkout failed:', err);
      showToast(err.message || 'Failed to open checkout. Please try again.', 'error');
    } finally {
      setIsCheckingOut(false);
    }
  };

  return (
    <div className="pt-24 pb-20 px-6 sm:px-8 bg-parchment min-h-screen">
      <div className="max-w-7xl mx-auto mt-8">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-xs font-sans font-bold uppercase tracking-widest text-forest/50 mb-10">
          <Link to="/" className="hover:text-forest">Home</Link>
          <span>/</span>
          <span className="text-forest">Shopping Cart</span>
        </div>

        <h1 className="font-serif font-bold text-4xl sm:text-5xl text-forest tracking-tight mb-12">Your Shopping Cart</h1>

        {items.length === 0 ? (
          <div className="text-center py-24 bg-white/40 border border-forest/5 rounded-3xl backdrop-blur-sm max-w-2xl mx-auto">
            <svg className="w-16 h-16 text-muted-green mx-auto mb-4 stroke-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            </svg>
            <h3 className="font-serif text-xl font-bold text-forest mb-2">Your cart is empty</h3>
            <p className="text-sm text-forest/60 mb-8 max-w-sm mx-auto">
              Before you can checkout, you must add some prophetic remedies to your shopping cart.
            </p>
            <Link
              to="/studio"
              className="inline-block rounded-full px-8 py-4 bg-forest text-parchment text-xs font-sans font-bold uppercase tracking-wider hover:bg-[#2b4c29] transition-colors shadow-md"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-20">
            {/* Top Side: Cart Details & Summary Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              {/* Cart Items List */}
              <div className="lg:col-span-8 space-y-6">
                <div className="border border-forest/10 rounded-3xl bg-white overflow-hidden shadow-[0_4px_12px_rgba(0,0,0,0.01)]">
                  {/* Header row (hidden on mobile) */}
                  <div className="hidden sm:grid grid-cols-12 gap-4 px-8 py-4 bg-warm-light/40 border-b border-forest/5 text-[11px] font-sans font-bold uppercase tracking-widest text-forest/50">
                    <div className="col-span-6">Product</div>
                    <div className="col-span-2 text-center">Price</div>
                    <div className="col-span-2 text-center">Quantity</div>
                    <div className="col-span-2 text-right">Total</div>
                  </div>

                  {/* Items */}
                  <div className="divide-y divide-forest/5">
                    {items.map((item, idx) => (
                      <div key={`${item.product.id}-${item.selectedVariant || 'default'}`} className="p-6 sm:p-8 grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                        {/* Product Detail */}
                        <div className="col-span-1 sm:col-span-6 flex items-center gap-4">
                          <div className="w-20 h-20 rounded-2xl overflow-hidden border border-forest/5 flex-shrink-0 bg-parchment/20">
                            <img
                              src={item.product.images[0]}
                              alt={item.product.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <Link to={`/product/${item.product.slug}`} className="font-serif font-bold text-base text-forest hover:text-gold transition-colors">
                              {item.product.name}
                            </Link>
                            {item.selectedVariant && (
                              <span className="block text-xs font-sans font-bold uppercase tracking-wider text-muted-green mt-1">
                                Size: {item.selectedVariant}
                              </span>
                            )}
                            <button
                              onClick={() => handleRemove(item.product.id, item.selectedVariant, item.product.name)}
                              className="text-xs text-red-700 hover:text-red-950 font-sans font-semibold mt-2 flex items-center gap-1 cursor-pointer focus:outline-none"
                            >
                              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                              Remove
                            </button>
                          </div>
                        </div>

                        {/* Unit Price */}
                        <div className="col-span-1 sm:col-span-2 text-left sm:text-center">
                          <span className="sm:hidden text-xs text-forest/40 font-bold mr-2 uppercase tracking-wider">Price:</span>
                          <span className="font-sans font-semibold text-forest">{formatPrice(item.price)}</span>
                        </div>

                        {/* Quantity Controls */}
                        <div className="col-span-1 sm:col-span-2 flex justify-start sm:justify-center">
                          <div className="flex items-center justify-between border border-forest/15 rounded-full px-3 py-1.5 bg-white w-28">
                            <button
                              onClick={() => handleQtyChange(item.product.id, item.quantity - 1, item.selectedVariant)}
                              className="text-forest hover:opacity-75 font-bold focus:outline-none"
                            >
                              -
                            </button>
                            <span className="font-sans font-bold text-xs text-forest">{item.quantity}</span>
                            <button
                              onClick={() => handleQtyChange(item.product.id, item.quantity + 1, item.selectedVariant)}
                              className="text-forest hover:opacity-75 font-bold focus:outline-none"
                            >
                              +
                            </button>
                          </div>
                        </div>

                        {/* Subtotal */}
                        <div className="col-span-1 sm:col-span-2 text-left sm:text-right">
                          <span className="sm:hidden text-xs text-forest/40 font-bold mr-2 uppercase tracking-wider">Total:</span>
                          <span className="font-serif font-bold text-forest">{formatPrice(item.price * item.quantity)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Order Summary */}
              <div className="lg:col-span-4 border border-forest/10 rounded-3xl bg-white p-6 sm:p-8 shadow-[0_4px_12px_rgba(0,0,0,0.01)]">
                <h3 className="font-serif font-bold text-xl text-forest border-b border-forest/5 pb-4 mb-6">Order Summary</h3>
                <div className="space-y-4 font-sans text-sm text-forest mb-6">
                  <div className="flex justify-between">
                    <span className="text-forest/70">Subtotal</span>
                    <span className="font-semibold">{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-forest/70">Shipping</span>
                    <span className="font-semibold">
                      {shippingCost === 0 ? 'FREE' : formatPrice(shippingCost)}
                    </span>
                  </div>
                  {shippingCost > 0 && (
                    <p className="text-[11px] text-muted-green leading-snug">
                      Free shipping on orders above {formatPrice(shippingThreshold)}. Add {formatPrice(shippingThreshold - subtotal)} more to qualify.
                    </p>
                  )}
                  <div className="border-t border-forest/5 pt-4 flex justify-between text-base font-bold text-forest">
                    <span>Grand Total</span>
                    <span className="font-serif text-lg">{formatPrice(total)}</span>
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  disabled={isCheckingOut || items.length === 0}
                  className="w-full text-center flex items-center justify-center gap-2 rounded-full py-4 bg-forest text-parchment text-xs font-sans font-bold uppercase tracking-widest hover:bg-[#2b4c29] transition-all shadow-md mb-3 cursor-pointer disabled:opacity-70"
                >
                  {isCheckingOut ? (
                    <>
                      <div className="w-4 h-4 border-2 border-parchment/30 border-t-parchment rounded-full animate-spin" />
                      <span>Securing 1-Click Checkout...</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4 text-[#D4A24C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                      <span>Instant 1-Click Checkout</span>
                    </>
                  )}
                </button>
                <div className="flex items-center justify-center gap-2.5 text-[10px] uppercase font-sans font-bold tracking-wider text-forest/60 mb-4">
                  <span>⚡ UPI</span>
                  <span>•</span>
                  <span>Cash On Delivery</span>
                  <span>•</span>
                  <span>Cards</span>
                </div>

                <div className="flex items-center justify-center gap-2 text-[10px] font-sans font-bold uppercase tracking-wider text-forest/40 mt-4">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  Secure Checkout Guarantee
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
