import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCartStore } from '../store/cartStore';
import { useToastStore } from '../store/toastStore';
import { formatPrice } from '../utils/formatPrice';
import { initiateGokwikCheckout } from '../services/gokwik';

export default function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();
  const items = useCartStore((state) => state.items);
  const showToast = useToastStore((state) => state.showToast);
  const [isGokwikLoading, setIsGokwikLoading] = useState(false);

  // Read discount info passed from Cart state
  const { discountPercent = 0, discountAmount = 0, promoCode = '' } = location.state || {};

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shippingThreshold = 1000;
  const shippingCost = subtotal >= shippingThreshold || subtotal === 0 ? 0 : 100;
  const total = subtotal - discountAmount + shippingCost;

  // Form Fields
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    paymentMethod: 'cod',
    cardNumber: '',
    cardExpiry: '',
    cardCvv: '',
  });

  const [formErrors, setFormErrors] = useState({});
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState('');

  useEffect(() => {
    const handleOrder = (event) => {
      const detail = event?.detail || {};
      if (detail.orderNumber || detail.orderId) {
        setOrderId(detail.orderNumber || detail.orderId || '1005');
        setOrderPlaced(true);
      }
    };
    window.addEventListener('gokwik_order_completed', handleOrder);
    return () => {
      window.removeEventListener('gokwik_order_completed', handleOrder);
    };
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.firstName.trim()) errors.firstName = 'Required';
    if (!formData.lastName.trim()) errors.lastName = 'Required';
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) errors.email = 'Valid email required';
    if (!formData.phone.trim() || formData.phone.length < 8) errors.phone = 'Valid phone required';
    if (!formData.address.trim()) errors.address = 'Required';
    if (!formData.city.trim()) errors.city = 'Required';
    if (!formData.state.trim()) errors.state = 'Required';
    if (!formData.zip.trim()) errors.zip = 'Required';

    if (formData.paymentMethod === 'card') {
      if (!formData.cardNumber.trim() || formData.cardNumber.replace(/\s/g, '').length !== 16) {
        errors.cardNumber = 'Valid 16-digit card number required';
      }
      if (!formData.cardExpiry.trim() || !/^\d{2}\/\d{2}$/.test(formData.cardExpiry)) {
        errors.cardExpiry = 'MM/YY required';
      }
      if (!formData.cardCvv.trim() || formData.cardCvv.length !== 3) {
        errors.cardCvv = '3 digits required';
      }
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleGokwikCheckout = async () => {
    if (items.length === 0) {
      showToast('Your cart is empty', 'error');
      return;
    }
    try {
      setIsGokwikLoading(true);
      await initiateGokwikCheckout(items);
    } catch (err) {
      console.error('GoKwik checkout failed:', err);
      showToast(err.message || 'Failed to open GoKwik checkout', 'error');
    } finally {
      setIsGokwikLoading(false);
    }
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (items.length === 0) {
      showToast('Your cart is empty', 'error');
      return;
    }

    if (!validateForm()) {
      showToast('Please fill out all required fields correctly', 'error');
      return;
    }

    // Process order (mockup success state)
    const randomId = 'AT-' + Math.floor(100000 + Math.random() * 900000);
    setOrderId(randomId);
    setOrderPlaced(true);
    
    // Clear Zustand cart store
    useCartStore.setState({ items: [], total: 0, count: 0 });
    showToast('Order placed successfully!');
  };

  if (orderPlaced) {
    return (
      <div className="pt-24 pb-20 px-6 sm:px-8 bg-parchment min-h-screen flex items-center justify-center">
        <div className="max-w-xl w-full bg-white border border-forest/10 rounded-3xl p-8 sm:p-12 shadow-lg text-center">
          <div className="w-20 h-20 bg-forest/5 text-forest rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <span className="text-gold text-xs font-sans font-bold uppercase tracking-[0.25em] block mb-2">THANK YOU FOR YOUR ORDER</span>
          <h1 className="font-serif font-bold text-3xl sm:text-4xl text-forest mb-4">Remedy Ordered!</h1>
          <p className="text-sm text-forest/70 mb-6 leading-relaxed">
            Your healing order has been registered under ID <strong className="text-forest">#{orderId}</strong>. We have dispatched a confirmation email to <span className="font-semibold text-forest">{formData.email}</span> with tracking coordinates.
          </p>
          <div className="bg-warm-light/40 rounded-2xl p-6 text-left mb-8 border border-forest/5">
            <h4 className="font-serif font-bold text-forest mb-3 border-b border-forest/5 pb-2 text-sm">Delivery Address</h4>
            <p className="text-xs text-forest/80 leading-relaxed font-sans">
              {formData.firstName} {formData.lastName}<br />
              {formData.address}<br />
              {formData.city}, {formData.state} - {formData.zip}<br />
              Phone: {formData.phone}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/studio"
              className="flex-1 rounded-full py-4 bg-forest text-parchment text-xs font-sans font-bold uppercase tracking-wider hover:bg-[#2b4c29] transition-colors"
            >
              Browse More Remedies
            </Link>
            <Link
              to="/"
              className="flex-1 rounded-full py-4 border border-forest/20 text-forest text-xs font-sans font-bold uppercase tracking-wider hover:bg-forest/5 transition-colors"
            >
              Return Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20 px-6 sm:px-8 bg-parchment min-h-screen">
      <div className="max-w-7xl mx-auto mt-8">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-xs font-sans font-bold uppercase tracking-widest text-forest/50 mb-10">
          <Link to="/" className="hover:text-forest">Home</Link>
          <span>/</span>
          <Link to="/cart" className="hover:text-forest">Cart</Link>
          <span>/</span>
          <span className="text-forest">Checkout</span>
        </div>

        <h1 className="font-serif font-bold text-4xl sm:text-5xl text-forest tracking-tight mb-12">Checkout details</h1>

        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Billing & Shipping Details Form */}
          <div className="lg:col-span-7 space-y-8 bg-white border border-forest/10 rounded-3xl p-6 sm:p-10 shadow-[0_4px_12px_rgba(0,0,0,0.01)]">
            
            {/* Express 1-Click GoKwik Checkout Box */}
            <div className="bg-[#FAF7F2] border-2 border-[#D4A24C]/40 rounded-2xl p-5 sm:p-6 text-center space-y-3">
              <div className="flex items-center justify-center gap-2 text-forest font-serif font-bold text-lg">
                <span className="text-[#D4A24C] text-xl">⚡</span>
                <span>Express 1-Click Checkout</span>
              </div>
              <p className="text-xs text-forest/70 max-w-md mx-auto leading-relaxed">
                Skip manual address filling! Pay in seconds with <strong>UPI (PhonePe, GPay, Paytm)</strong>, <strong>COD</strong>, or <strong>Cards</strong>.
              </p>
              <button
                type="button"
                onClick={handleGokwikCheckout}
                disabled={isGokwikLoading || items.length === 0}
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#0D3B2A] text-parchment text-xs font-sans font-bold uppercase tracking-widest hover:bg-[#15533c] transition-all shadow-md inline-flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
              >
                {isGokwikLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-parchment/30 border-t-parchment rounded-full animate-spin" />
                    <span>Opening GoKwik Checkout...</span>
                  </>
                ) : (
                  <>
                    <span>⚡ Pay with GoKwik</span>
                  </>
                )}
              </button>
              <div className="flex items-center justify-center gap-3 text-[10px] uppercase font-sans font-bold tracking-wider text-forest/60 pt-1">
                <span>PhonePe</span>
                <span>•</span>
                <span>GPay</span>
                <span>•</span>
                <span>Paytm</span>
                <span>•</span>
                <span>COD</span>
                <span>•</span>
                <span>Cards</span>
              </div>
            </div>

            <div className="relative flex py-1 items-center">
              <div className="flex-grow border-t border-forest/10"></div>
              <span className="flex-shrink mx-4 text-xs uppercase font-sans font-bold tracking-widest text-forest/40">Or Fill Details Manually</span>
              <div className="flex-grow border-t border-forest/10"></div>
            </div>

            {/* Contact Details */}
            <div>
              <h3 className="font-serif font-bold text-xl text-forest mb-6 border-b border-forest/5 pb-2">1. Contact Information</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-sans font-bold uppercase tracking-wider text-forest/60 mb-2">First Name *</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full bg-parchment/20 border border-forest/10 rounded-full px-5 py-3 text-sm font-sans text-forest focus:outline-none focus:border-forest"
                  />
                  {formErrors.firstName && <span className="text-red-700 text-xs mt-1 block">{formErrors.firstName}</span>}
                </div>
                <div>
                  <label className="block text-[11px] font-sans font-bold uppercase tracking-wider text-forest/60 mb-2">Last Name *</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full bg-parchment/20 border border-forest/10 rounded-full px-5 py-3 text-sm font-sans text-forest focus:outline-none focus:border-forest"
                  />
                  {formErrors.lastName && <span className="text-red-700 text-xs mt-1 block">{formErrors.lastName}</span>}
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-sans font-bold uppercase tracking-wider text-forest/60 mb-2">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full bg-parchment/20 border border-forest/10 rounded-full px-5 py-3 text-sm font-sans text-forest focus:outline-none focus:border-forest"
                  />
                  {formErrors.email && <span className="text-red-700 text-xs mt-1 block">{formErrors.email}</span>}
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-sans font-bold uppercase tracking-wider text-forest/60 mb-2">Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="e.g. +92 300 1234567"
                    className="w-full bg-parchment/20 border border-forest/10 rounded-full px-5 py-3 text-sm font-sans text-forest focus:outline-none focus:border-forest"
                  />
                  {formErrors.phone && <span className="text-red-700 text-xs mt-1 block">{formErrors.phone}</span>}
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="pt-4">
              <h3 className="font-serif font-bold text-xl text-forest mb-6 border-b border-forest/5 pb-2">2. Shipping Address</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-sans font-bold uppercase tracking-wider text-forest/60 mb-2">Street Address *</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="House/Apartment number, street name"
                    className="w-full bg-parchment/20 border border-forest/10 rounded-full px-5 py-3 text-sm font-sans text-forest focus:outline-none focus:border-forest"
                  />
                  {formErrors.address && <span className="text-red-700 text-xs mt-1 block">{formErrors.address}</span>}
                </div>
                <div>
                  <label className="block text-[11px] font-sans font-bold uppercase tracking-wider text-forest/60 mb-2">City *</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full bg-parchment/20 border border-forest/10 rounded-full px-5 py-3 text-sm font-sans text-forest focus:outline-none focus:border-forest"
                  />
                  {formErrors.city && <span className="text-red-700 text-xs mt-1 block">{formErrors.city}</span>}
                </div>
                <div>
                  <label className="block text-[11px] font-sans font-bold uppercase tracking-wider text-forest/60 mb-2">State / Province *</label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    className="w-full bg-parchment/20 border border-forest/10 rounded-full px-5 py-3 text-sm font-sans text-forest focus:outline-none focus:border-forest"
                  />
                  {formErrors.state && <span className="text-red-700 text-xs mt-1 block">{formErrors.state}</span>}
                </div>
                <div>
                  <label className="block text-[11px] font-sans font-bold uppercase tracking-wider text-forest/60 mb-2">Postal / Zip Code *</label>
                  <input
                    type="text"
                    name="zip"
                    value={formData.zip}
                    onChange={handleInputChange}
                    className="w-full bg-parchment/20 border border-forest/10 rounded-full px-5 py-3 text-sm font-sans text-forest focus:outline-none focus:border-forest"
                  />
                  {formErrors.zip && <span className="text-red-700 text-xs mt-1 block">{formErrors.zip}</span>}
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="pt-4">
              <h3 className="font-serif font-bold text-xl text-forest mb-6 border-b border-forest/5 pb-2">3. Payment Method</h3>
              <div className="space-y-4">
                {/* Cash on Delivery */}
                <label className={`flex items-center justify-between border rounded-3xl p-5 cursor-pointer transition-all ${
                  formData.paymentMethod === 'cod' ? 'border-forest bg-forest/5' : 'border-forest/10 hover:bg-forest/5'
                }`}>
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={formData.paymentMethod === 'cod'}
                      onChange={handleInputChange}
                      className="accent-forest"
                    />
                    <div>
                      <span className="block text-sm font-sans font-bold text-forest">Cash on Delivery (COD)</span>
                      <span className="block text-xs text-forest/60 mt-1">Pay with cash upon receipt.</span>
                    </div>
                  </div>
                </label>

                {/* Credit / Debit Card */}
                <label className={`flex items-center justify-between border rounded-3xl p-5 cursor-pointer transition-all ${
                  formData.paymentMethod === 'card' ? 'border-forest bg-forest/5' : 'border-forest/10 hover:bg-forest/5'
                }`}>
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="card"
                      checked={formData.paymentMethod === 'card'}
                      onChange={handleInputChange}
                      className="accent-forest"
                    />
                    <div>
                      <span className="block text-sm font-sans font-bold text-forest">Credit / Debit Card</span>
                      <span className="block text-xs text-forest/60 mt-1">Accepting Visa, MasterCard, and UnionPay.</span>
                    </div>
                  </div>
                </label>

                {formData.paymentMethod === 'card' && (
                  <div className="p-5 border border-forest/10 bg-warm-light/20 rounded-2xl space-y-4">
                    <div>
                      <label className="block text-[10px] font-sans font-bold uppercase tracking-wider text-forest/60 mb-2">Card Number</label>
                      <input
                        type="text"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        placeholder="4111 2222 3333 4444"
                        maxLength="19"
                        className="w-full bg-white border border-forest/10 rounded-full px-5 py-3 text-sm font-sans text-forest focus:outline-none focus:border-forest"
                      />
                      {formErrors.cardNumber && <span className="text-red-700 text-xs mt-1 block">{formErrors.cardNumber}</span>}
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-sans font-bold uppercase tracking-wider text-forest/60 mb-2">Expiry Date</label>
                        <input
                          type="text"
                          name="cardExpiry"
                          value={formData.cardExpiry}
                          onChange={handleInputChange}
                          placeholder="MM/YY"
                          maxLength="5"
                          className="w-full bg-white border border-forest/10 rounded-full px-5 py-3 text-sm font-sans text-forest focus:outline-none focus:border-forest"
                        />
                        {formErrors.cardExpiry && <span className="text-red-700 text-xs mt-1 block">{formErrors.cardExpiry}</span>}
                      </div>
                      <div>
                        <label className="block text-[10px] font-sans font-bold uppercase tracking-wider text-forest/60 mb-2">CVV / Security Code</label>
                        <input
                          type="password"
                          name="cardCvv"
                          value={formData.cardCvv}
                          onChange={handleInputChange}
                          placeholder="123"
                          maxLength="3"
                          className="w-full bg-white border border-forest/10 rounded-full px-5 py-3 text-sm font-sans text-forest focus:outline-none focus:border-forest"
                        />
                        {formErrors.cardCvv && <span className="text-red-700 text-xs mt-1 block">{formErrors.cardCvv}</span>}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Checkout Items Summary Sidebar */}
          <div className="lg:col-span-5 border border-forest/10 rounded-3xl bg-white p-6 sm:p-8 shadow-[0_4px_12px_rgba(0,0,0,0.01)] space-y-6">
            <h3 className="font-serif font-bold text-xl text-forest border-b border-forest/5 pb-4 mb-4">Order Items</h3>
            
            {/* Products List */}
            <div className="divide-y divide-forest/5 max-h-72 overflow-y-auto pr-2">
              {items.map((item) => (
                <div key={`${item.product.id}-${item.selectedVariant || 'default'}`} className="py-4 flex gap-4 items-center">
                  <div className="w-14 h-14 rounded-xl overflow-hidden border border-forest/5 flex-shrink-0 bg-parchment/20">
                    <img src={item.product.images[0]} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-grow">
                    <h5 className="font-serif font-bold text-sm text-forest leading-tight">{item.product.name}</h5>
                    <span className="block text-[10px] font-sans text-muted-green mt-0.5">
                      Qty: {item.quantity} {item.selectedVariant ? `• Size: ${item.selectedVariant}` : ''}
                    </span>
                  </div>
                  <span className="font-serif font-bold text-sm text-forest">{formatPrice(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>

            {/* Calculations */}
            <div className="space-y-4 font-sans text-sm text-forest border-t border-forest/5 pt-6">
              <div className="flex justify-between">
                <span className="text-forest/70">Subtotal</span>
                <span className="font-semibold">{formatPrice(subtotal)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-forest">
                  <span className="text-forest/70">Discount {promoCode && `(${promoCode})`}</span>
                  <span className="font-semibold text-forest-green">- {formatPrice(discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-forest/70">Shipping</span>
                <span className="font-semibold">{shippingCost === 0 ? 'FREE' : formatPrice(shippingCost)}</span>
              </div>
              <div className="border-t border-forest/5 pt-4 flex justify-between text-base font-bold text-forest">
                <span>Total Amount</span>
                <span className="font-serif text-lg">{formatPrice(total)}</span>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full rounded-full py-4 bg-forest text-parchment text-xs font-sans font-bold uppercase tracking-widest hover:bg-[#2b4c29] transition-colors shadow-md cursor-pointer block text-center"
            >
              Place Order ({formatPrice(total)})
            </button>
            
            <p className="text-[10px] text-forest/40 text-center font-sans">
              By clicking "Place Order" you agree to our Terms & Conditions and refund policies.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
