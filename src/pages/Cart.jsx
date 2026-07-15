import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCartStore } from '../store/cartStore';
import { useToastStore } from '../store/toastStore';
import { formatPrice } from '../utils/formatPrice';

export default function Cart() {
  const items = useCartStore((state) => state.items);
  const updateQty = useCartStore((state) => state.updateQty);
  const removeItem = useCartStore((state) => state.removeItem);
  const showToast = useToastStore((state) => state.showToast);

  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoError, setPromoError] = useState('');
  const [promoSuccess, setPromoSuccess] = useState('');

  // Contact form state
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: 'general',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shippingThreshold = 1000;
  const shippingCost = subtotal >= shippingThreshold || subtotal === 0 ? 0 : 100;
  const discountAmount = (subtotal * discountPercent) / 100;
  const total = subtotal - discountAmount + shippingCost;

  const handleApplyPromo = (e) => {
    e.preventDefault();
    setPromoError('');
    setPromoSuccess('');
    
    const code = promoCode.trim().toUpperCase();
    if (code === 'TIBB10') {
      setDiscountPercent(10);
      setPromoSuccess('Promo code TIBB10 applied! 10% discount added.');
      showToast('10% Promo discount applied!');
    } else if (code === 'ALTOOBA15') {
      setDiscountPercent(15);
      setPromoSuccess('Promo code ALTOOBA15 applied! 15% discount added.');
      showToast('15% Promo discount applied!');
    } else if (code === '') {
      setPromoError('Please enter a promo code');
    } else {
      setPromoError('Invalid promo code. Try "TIBB10" or "ALTOOBA15"');
    }
  };

  const handleQtyChange = (itemId, newQty, variant) => {
    updateQty(itemId, newQty, variant);
  };

  const handleRemove = (itemId, variant, name) => {
    removeItem(itemId, variant);
    showToast(`Removed ${name} from cart`);
  };

  // Contact form handlers
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      showToast('Please complete all form fields', 'error');
      return;
    }

    // Success Mockup
    setSubmitted(true);
    showToast('Your message has been sent to Al-Tooba.');
    setForm({ name: '', email: '', subject: 'general', message: '' });
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

                {/* Promo Code Box */}
                <div className="border border-forest/10 rounded-3xl bg-white p-6 sm:p-8 shadow-[0_4px_12px_rgba(0,0,0,0.01)]">
                  <h3 className="font-serif font-bold text-lg text-forest mb-4">Have a Promocode?</h3>
                  <form onSubmit={handleApplyPromo} className="flex flex-col sm:flex-row gap-4 items-stretch">
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="e.g. TIBB10, ALTOOBA15"
                      className="flex-grow bg-parchment/30 border border-forest/10 rounded-full px-6 py-3.5 text-sm font-sans text-forest placeholder-forest/40 focus:outline-none focus:border-forest"
                    />
                    <button
                      type="submit"
                      className="rounded-full px-8 py-3.5 bg-forest text-parchment text-xs font-sans font-bold uppercase tracking-wider hover:bg-[#2b4c29] transition-colors cursor-pointer"
                    >
                      Apply Code
                  </button>
                  </form>
                  {promoError && <p className="text-red-700 font-sans font-semibold text-xs mt-3 pl-2">{promoError}</p>}
                  {promoSuccess && <p className="text-forest font-sans font-semibold text-xs mt-3 pl-2">{promoSuccess}</p>}
                  <p className="text-xs text-forest/40 mt-3 pl-2">Use "TIBB10" for 10% off or "ALTOOBA15" for 15% off.</p>
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
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-forest">
                      <span className="text-forest/70">Discount ({discountPercent}%)</span>
                      <span className="font-semibold text-forest-green">- {formatPrice(discountAmount)}</span>
                    </div>
                  )}
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

                <Link
                  to="/checkout"
                  state={{ discountPercent, discountAmount, promoCode }}
                  className="w-full text-center block rounded-full py-4 bg-forest text-parchment text-xs font-sans font-bold uppercase tracking-widest hover:bg-[#2b4c29] transition-colors shadow-md mb-4"
                >
                  Proceed to Checkout
                </Link>

                <div className="flex items-center justify-center gap-2 text-[10px] font-sans font-bold uppercase tracking-wider text-forest/40 mt-6">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  Secure Checkout Guarantee
                </div>
              </div>
            </div>

            {/* Bottom Side: Contact Us form and details grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start border-t border-forest/10 pt-16">
              {/* Left Column: Contact details */}
              <div className="lg:col-span-5 bg-[#1a4a38] border border-forest/10 rounded-3xl p-8 sm:p-10 shadow-[0_4px_12px_rgba(0,0,0,0.01)] space-y-8">
                <div>
                  <h3 className="font-serif font-bold text-xl text-parchment mb-4">Apothecary Lab</h3>
                  <p className="text-sm text-parchment/75 leading-relaxed font-sans">
                    Al-Tooba® Prophetic Remedies Pvt. Ltd.<br />
                    Rampur, Uttar Pradesh,<br />
                    India
                  </p>
                </div>

                <div>
                  <h3 className="font-serif font-bold text-xl text-parchment mb-4">Direct Contact</h3>
                  <ul className="space-y-3 text-sm text-parchment/75 font-sans">
                    <li className="flex items-start gap-2">
                      <span className="text-gold font-bold mt-0.5">📞</span>
                      <div className="flex flex-col gap-1">
                        <span>+91 8591916905</span>
                        <span>+91 8433439628</span>
                        <span>+91 8433284322</span>
                      </div>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-gold font-bold">✉️</span>
                      <a href="mailto:sales@al-tooba.com" className="hover:text-gold transition-colors">sales@al-tooba.com</a>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-gold font-bold">💬</span>
                      <span>WhatsApp: +91 8591916905</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-serif font-bold text-xl text-parchment mb-4">Operational Hours</h3>
                  <ul className="space-y-2 text-sm text-parchment/75 font-sans">
                    <li className="flex justify-between">
                      <span>Monday - Sunday</span>
                      <span className="font-semibold text-parchment">24x7 (Always Open)</span>
                    </li>
                  </ul>
                </div>

                {/* International Orders Box */}
                <div className="border border-parchment/10 bg-parchment/5 rounded-2xl p-6 text-center">
                  <span className="text-xl mb-2 block">🕋</span>
                  <h4 className="font-serif font-bold text-parchment mb-1 text-sm">International Orders</h4>
                  <p className="text-xs text-parchment/70 font-sans leading-relaxed">
                    We ship to Saudi Arabia, UAE, UK, and USA. International inquiries can be forwarded to <a href="mailto:sales@al-tooba.com" className="font-bold text-parchment hover:text-gold">sales@al-tooba.com</a>.
                  </p>
                </div>
              </div>

              {/* Right Column: Contact form */}
              <div className="lg:col-span-7 bg-[#1a4a38] border border-forest/10 rounded-3xl p-8 sm:p-10 shadow-[0_4px_12px_rgba(0,0,0,0.01)]">
                <h3 className="font-serif font-bold text-2xl text-parchment mb-2">Send a Message</h3>
                <p className="text-xs sm:text-sm text-parchment/70 mb-8 font-sans">
                  Fill in your details below and we will contact you back as soon as possible.
                </p>

                {submitted ? (
                  <div className="text-center py-12 bg-parchment/5 rounded-2xl border border-parchment/5">
                    <span className="text-4xl mb-4 block">✉️</span>
                    <h4 className="font-serif font-bold text-xl text-parchment mb-2">Message Dispatched!</h4>
                    <p className="text-xs sm:text-sm text-parchment/70 max-w-sm mx-auto mb-6 leading-relaxed">
                      Thank you for reaching out. A botanical representative will review your message and respond within 24 hours.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="rounded-full px-6 py-2.5 bg-[#D4A24C] text-forest text-xs font-sans font-bold uppercase tracking-wider hover:bg-[#c2913b] transition-colors"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label className="block text-[11px] font-sans font-bold uppercase tracking-wider text-parchment/70 mb-2">Your Name *</label>
                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-parchment/10 border border-parchment/20 rounded-full px-5 py-3.5 text-sm font-sans text-parchment focus:outline-none focus:border-gold placeholder:text-parchment/30"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-sans font-bold uppercase tracking-wider text-parchment/70 mb-2">Email Address *</label>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-parchment/10 border border-parchment/20 rounded-full px-5 py-3.5 text-sm font-sans text-parchment focus:outline-none focus:border-gold placeholder:text-parchment/30"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-sans font-bold uppercase tracking-wider text-parchment/70 mb-2">Topic of Interest</label>
                      <select
                        name="subject"
                        value={form.subject}
                        onChange={handleInputChange}
                        className="w-full bg-parchment/10 border border-parchment/20 rounded-full px-5 py-3.5 text-sm font-sans text-parchment focus:outline-none focus:border-gold"
                      >
                        <option value="general" className="bg-forest text-parchment">General Inquiry</option>
                        <option value="order" className="bg-forest text-parchment">Order Support</option>
                        <option value="consult" className="bg-forest text-parchment">Remedy Consultation</option>
                        <option value="wholesale" className="bg-forest text-parchment">Wholesale & Distribution</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-sans font-bold uppercase tracking-wider text-parchment/70 mb-2">Your Message *</label>
                      <textarea
                        name="message"
                        value={form.message}
                        onChange={handleInputChange}
                        required
                        rows="5"
                        placeholder="Describe your inquiry in detail..."
                        className="w-full bg-parchment/10 border border-parchment/20 rounded-3xl px-5 py-4 text-sm font-sans text-parchment focus:outline-none focus:border-gold resize-none placeholder:text-parchment/30"
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      className="w-full rounded-full py-4 bg-[#D4A24C] text-forest text-xs font-sans font-bold uppercase tracking-widest hover:bg-[#c2913b] transition-colors shadow-md cursor-pointer block text-center"
                    >
                      Send Message
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
