import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { 
  Clock, 
  AlertCircle, 
  CheckCircle2, 
  PackageX, 
  Mail, 
  Phone, 
  MapPin, 
  ArrowLeft,
  RefreshCw,
  Truck
} from 'lucide-react';

export default function PolicyPage({ title }) {
  // Ensure the page scrolls to top when navigating to it
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [title]);

  const isCancellationPolicy = title === 'Cancellation Policy';
  const isReturnRefund = title === 'Return & Refund' || title === 'Return & Refund Policy';
  const isShippingPolicy = title === 'Shipping Policy' || title === 'Shipping & Delivery';
  const isTermsConditions = title === 'Terms & Conditions' || title === 'Terms and Conditions' || title === 'Terms of Service';
  const isPrivacyPolicy = title === 'Privacy Policy';

  return (
    <div className="bg-[#FAF7F2] min-h-screen relative font-sans overflow-hidden">
      
      {/* 1. Hero Header Section */}
      <div className="relative bg-[#0D3B2A] pt-36 sm:pt-40 pb-28 sm:pb-32 px-6 overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0,100 C20,0 50,0 100,100 Z" fill="#D4A24C" />
          </svg>
        </div>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#D4A24C]/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#D4A24C]/10 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/3"></div>

        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <Link 
              to="/" 
              className="inline-flex items-center gap-1.5 text-xs font-sans font-bold uppercase tracking-widest text-[#D4A24C] hover:text-white transition-colors mb-4"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Back to Home
            </Link>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-white mb-3 sm:mb-4 drop-shadow-md">
              {title}
            </h1>
            {isCancellationPolicy && (
              <p className="text-white/80 font-sans text-sm sm:text-base font-normal tracking-wide mb-6">
                Easy Order Cancellations
              </p>
            )}
            {isReturnRefund && (
              <p className="text-white/80 font-sans text-sm sm:text-base font-normal tracking-wide mb-6">
                Simple &amp; Hassle-Free Returns
              </p>
            )}
            {isShippingPolicy && (
              <p className="text-white/80 font-sans text-sm sm:text-base font-normal tracking-wide mb-6">
                Fast, Safe &amp; Reliable Delivery
              </p>
            )}
            {isTermsConditions && (
              <p className="text-white/80 font-sans text-sm sm:text-base font-normal tracking-wide mb-6">
                Legal Agreement &amp; User Guidelines
              </p>
            )}
            {isPrivacyPolicy && (
              <p className="text-white/80 font-sans text-sm sm:text-base font-normal tracking-wide mb-6">
                Data Protection &amp; Privacy Commitment
              </p>
            )}
            <div className="w-16 h-[2px] bg-[#D4A24C] mx-auto opacity-70"></div>
          </motion.div>
        </div>
      </div>

      {/* 2. Content Section (Overlapping Card) */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-20 -mt-16 sm:-mt-20 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="bg-white rounded-t-[28px] sm:rounded-t-[32px] rounded-b-[20px] shadow-[0_20px_40px_rgba(13,59,42,0.08)] border border-[#0D3B2A]/5 p-6 sm:p-10 md:p-14"
        >
          {/* Last Updated Date */}
          <div className="flex items-center gap-2.5 text-xs sm:text-sm text-gray-500 mb-8 sm:mb-10 pb-6 border-b border-gray-100">
            <Clock className="w-4 h-4 text-[#8A5E12]" />
            <span className="font-medium tracking-wide">Last Updated: {isPrivacyPolicy ? 'September 2026' : 'August 2026'}</span>
          </div>

          {isCancellationPolicy ? (
            /* ================= CANCELLATION POLICY STRUCTURED CONTENT ================= */
            <div className="space-y-10 sm:space-y-12 font-sans text-[#1f3a1d]/85">
              
              {/* 1. Cancellation Window */}
              <section className="space-y-3.5">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-[#0D3B2A]/5 flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4 text-[#0D3B2A]" />
                  </div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#0D3B2A]">
                    Cancellation Window
                  </h3>
                </div>

                <div className="bg-[#EBF5FB] border border-[#3498DB]/20 rounded-2xl p-4 sm:p-5 text-sm sm:text-base">
                  <h4 className="font-sans font-bold text-[#1B4F72] text-sm sm:text-base mb-1">
                    Orders can be cancelled within 12 hours of placement
                  </h4>
                  <p className="text-[#2C3E50]/80 text-xs sm:text-sm leading-relaxed">
                    After 12 hours, if your order has been dispatched, cancellation is not possible. However, you can request a return after delivery.
                  </p>
                </div>
              </section>

              {/* 2. Cannot Be Cancelled */}
              <section className="space-y-3.5">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-rose-50 flex items-center justify-center shrink-0">
                    <AlertCircle className="w-4 h-4 text-rose-500" />
                  </div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#0D3B2A]">
                    Cannot Be Cancelled
                  </h3>
                </div>

                <p className="text-xs sm:text-sm text-gray-600">
                  The following orders cannot be cancelled:
                </p>

                <ul className="space-y-2 text-xs sm:text-sm text-gray-700">
                  <li className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0D3B2A] shrink-0"></span>
                    <span>Orders already dispatched/shipped</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0D3B2A] shrink-0"></span>
                    <span>Orders out for delivery</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0D3B2A] shrink-0"></span>
                    <span>Orders already delivered</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0D3B2A] shrink-0"></span>
                    <span>Orders beyond the 12-hour cancellation window</span>
                  </li>
                </ul>
              </section>

              {/* 3. How to Cancel */}
              <section className="space-y-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-emerald-50 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  </div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#0D3B2A]">
                    How to Cancel
                  </h3>
                </div>

                <div className="space-y-3">
                  {/* Option 1 */}
                  <div className="bg-[#FAF7F2] border border-[#0D3B2A]/5 rounded-2xl p-4 sm:p-5">
                    <h4 className="font-sans font-bold text-[#0D3B2A] text-sm sm:text-base mb-1">
                      Option 1: Self-Cancellation
                    </h4>
                    <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                      Log in to your account and cancel the order directly from your order history (if within 12 hours).
                    </p>
                  </div>

                  {/* Option 2 */}
                  <div className="bg-[#FAF7F2] border border-[#0D3B2A]/5 rounded-2xl p-4 sm:p-5">
                    <h4 className="font-sans font-bold text-[#0D3B2A] text-sm sm:text-base mb-1">
                      Option 2: Contact Support
                    </h4>
                    <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                      Email <a href="mailto:altoobafoods2026@gmail.com" className="text-[#D4A24C] font-semibold hover:underline">altoobafoods2026@gmail.com</a> with your order number and cancellation request.
                    </p>
                  </div>
                </div>
              </section>

              {/* 4. Refund on Cancellation */}
              <section className="space-y-3.5">
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#0D3B2A]">
                  Refund on Cancellation
                </h3>

                <div className="bg-[#FAF7F2] border border-[#0D3B2A]/5 rounded-2xl p-4 sm:p-6 space-y-2.5 text-xs sm:text-sm">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                    <span className="font-bold text-[#0D3B2A] min-w-[140px]">Processing Time:</span>
                    <span className="text-gray-700">3–5 business days</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                    <span className="font-bold text-[#0D3B2A] min-w-[140px]">Refund Amount:</span>
                    <span className="text-gray-700">Full payment amount (including taxes)</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                    <span className="font-bold text-[#0D3B2A] min-w-[140px]">Refunded To:</span>
                    <span className="text-gray-700">Original payment method</span>
                  </div>
                  <div className="pt-2 border-t border-gray-200/60 text-gray-500 text-[11px] sm:text-xs italic">
                    <strong>Note:</strong> Shipping charges are non-refundable once order packaging &amp; fulfillment is initiated. If an order is returned after dispatch, applicable product GST will be deducted as per our Return &amp; Refund Policy.
                  </div>
                </div>
              </section>

              {/* 5. What Happens After Cancellation? */}
              <section className="space-y-3.5">
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#0D3B2A]">
                  What Happens After Cancellation?
                </h3>

                <ul className="space-y-2 text-xs sm:text-sm text-gray-700">
                  <li className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0D3B2A] shrink-0"></span>
                    <span>Order status changes to &quot;Cancelled&quot;</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0D3B2A] shrink-0"></span>
                    <span>You&apos;ll receive a cancellation confirmation email</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0D3B2A] shrink-0"></span>
                    <span>Refund initiated to your account</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0D3B2A] shrink-0"></span>
                    <span>Stock becomes available for other customers</span>
                  </li>
                </ul>
              </section>

              {/* 6. Already Dispatched? */}
              <section className="space-y-4">
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#0D3B2A]">
                  Already Dispatched?
                </h3>

                <p className="text-xs sm:text-sm text-gray-600">
                  If your order has already been dispatched or shipped, you cannot cancel it. However, you have two options:
                </p>

                <div className="space-y-3">
                  {/* Option 1 */}
                  <div className="bg-[#FAF7F2] border border-[#0D3B2A]/5 rounded-2xl p-4 sm:p-5">
                    <h4 className="font-sans font-bold text-[#0D3B2A] text-sm sm:text-base mb-1">
                      Option 1: Return After Delivery
                    </h4>
                    <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                      Reject the delivery and return the product for a full refund (See <Link to="/return-refund" className="text-[#D4A24C] font-semibold hover:underline">Return & Refund Policy</Link>).
                    </p>
                  </div>

                  {/* Option 2 */}
                  <div className="bg-[#FAF7F2] border border-[#0D3B2A]/5 rounded-2xl p-4 sm:p-5">
                    <h4 className="font-sans font-bold text-[#0D3B2A] text-sm sm:text-base mb-1">
                      Option 2: Contact Support
                    </h4>
                    <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                      Reach out to <a href="mailto:altoobafoods2026@gmail.com" className="text-[#D4A24C] font-semibold hover:underline">altoobafoods2026@gmail.com</a> or call <a href="tel:+918433284322" className="text-[#D4A24C] font-semibold hover:underline">+91 84332 84322</a> immediately for special assistance.
                    </p>
                  </div>
                </div>
              </section>

              {/* 7. Contact Us */}
              <section className="space-y-3.5">
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#0D3B2A]">
                  Contact Us
                </h3>

                <div className="bg-[#FAF7F2] border border-[#0D3B2A]/5 rounded-2xl p-4 sm:p-6 space-y-2.5 text-xs sm:text-sm">
                  <p className="text-gray-600 font-medium mb-3">
                    For cancellation requests or assistance:
                  </p>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                    <span className="font-bold text-[#0D3B2A] min-w-[90px]">Email:</span>
                    <a href="mailto:altoobafoods2026@gmail.com" className="text-[#D4A24C] font-semibold hover:underline">altoobafoods2026@gmail.com</a>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                    <span className="font-bold text-[#0D3B2A] min-w-[90px]">Phone:</span>
                    <a href="tel:+918433284322" className="text-[#D4A24C] font-semibold hover:underline">+91 84332 84322</a>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                    <span className="font-bold text-[#0D3B2A] min-w-[90px]">Location:</span>
                    <span className="text-gray-700">Bilaspur Gate, Nainital Road, Rampur, UP</span>
                  </div>
                  <div className="pt-2 border-t border-gray-200/60 text-gray-500 text-[11px] sm:text-xs">
                    Response within 24 hours during business days
                  </div>
                </div>
              </section>

            </div>
          ) : isReturnRefund ? (
            /* ================= RETURN & REFUND POLICY STRUCTURED CONTENT ================= */
            <div className="space-y-10 sm:space-y-12 font-sans text-[#1f3a1d]/85">
              
              {/* Introduction Callout */}
              <p className="text-sm sm:text-base text-[#0D3B2A]/80 leading-relaxed font-sans">
                We aim to deliver the highest quality products. We understand that sometimes returns are necessary, and we make the process simple and hassle-free.
              </p>

              {/* 1. Return Eligibility */}
              <section className="space-y-3.5">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-emerald-50 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  </div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#0D3B2A]">
                    Return Eligibility
                  </h3>
                </div>

                <p className="text-xs sm:text-sm text-gray-600">
                  To be eligible for a return, your order must meet the following conditions:
                </p>

                <ul className="space-y-2 text-xs sm:text-sm text-gray-700">
                  <li className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0D3B2A] shrink-0"></span>
                    <span>Return request must be raised <strong className="text-[#0D3B2A] font-bold">within 3 days of delivery</strong></span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0D3B2A] shrink-0"></span>
                    <span>Product must be <strong className="text-[#0D3B2A] font-bold">unused and unopened</strong></span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0D3B2A] shrink-0"></span>
                    <span>Product must be in <strong className="text-[#0D3B2A] font-bold">original packaging</strong></span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0D3B2A] shrink-0"></span>
                    <span>All accessories and documentation must be included</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0D3B2A] shrink-0"></span>
                    <span>Product must not show signs of wear or damage</span>
                  </li>
                </ul>
              </section>

              {/* 2. Non-Returnable Items */}
              <section className="space-y-3.5">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-rose-50 flex items-center justify-center shrink-0">
                    <AlertCircle className="w-4 h-4 text-rose-500" />
                  </div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#0D3B2A]">
                    Non-Returnable Items
                  </h3>
                </div>

                <p className="text-xs sm:text-sm text-gray-600">
                  The following items cannot be returned:
                </p>

                <ul className="space-y-2 text-xs sm:text-sm text-gray-700">
                  <li className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0"></span>
                    <span><strong className="text-[#0D3B2A] font-bold">Opened or used personal care products</strong> (for hygiene reasons)</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0"></span>
                    <span>Items damaged due to misuse or mishandling</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0"></span>
                    <span>Products returned after 3 days</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0"></span>
                    <span>Items without original packaging</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0"></span>
                    <span>Custom or personalized items</span>
                  </li>
                </ul>
              </section>

              {/* 3. Return Process */}
              <section className="space-y-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-[#0D3B2A]/5 flex items-center justify-center shrink-0">
                    <RefreshCw className="w-4 h-4 text-[#0D3B2A]" />
                  </div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#0D3B2A]">
                    Return Process
                  </h3>
                </div>

                <div className="space-y-3">
                  {/* Step 1 */}
                  <div className="bg-[#FAF7F2] border border-[#0D3B2A]/5 rounded-2xl p-4 sm:p-5">
                    <h4 className="font-sans font-bold text-[#0D3B2A] text-sm sm:text-base mb-1">
                      Step 1: Request Return
                    </h4>
                    <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                      Email <a href="mailto:altoobafoods2026@gmail.com" className="text-[#D4A24C] font-semibold hover:underline">altoobafoods2026@gmail.com</a> with your order number and reason for return within 3 days of delivery.
                    </p>
                  </div>

                  {/* Step 2 */}
                  <div className="bg-[#FAF7F2] border border-[#0D3B2A]/5 rounded-2xl p-4 sm:p-5">
                    <h4 className="font-sans font-bold text-[#0D3B2A] text-sm sm:text-base mb-1">
                      Step 2: Return Authorization
                    </h4>
                    <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                      We&apos;ll verify your request and provide a return shipping address.
                    </p>
                  </div>

                  {/* Step 3 */}
                  <div className="bg-[#FAF7F2] border border-[#0D3B2A]/5 rounded-2xl p-4 sm:p-5">
                    <h4 className="font-sans font-bold text-[#0D3B2A] text-sm sm:text-base mb-1">
                      Step 3: Ship Product
                    </h4>
                    <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                      Pack the product securely and ship it to our address. (Return shipping is free for defective items).
                    </p>
                  </div>

                  {/* Step 4 */}
                  <div className="bg-[#FAF7F2] border border-[#0D3B2A]/5 rounded-2xl p-4 sm:p-5">
                    <h4 className="font-sans font-bold text-[#0D3B2A] text-sm sm:text-base mb-1">
                      Step 4: Receive Refund
                    </h4>
                    <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                      Once received and verified, your refund (net of applicable product GST and non-refundable shipping) will be processed within 5–7 business days to your original payment method.
                    </p>
                  </div>
                </div>
              </section>

              {/* 4. Damaged or Wrong Product */}
              <section className="space-y-3.5">
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#0D3B2A]">
                  Damaged or Wrong Product
                </h3>

                <p className="text-xs sm:text-sm text-gray-600">
                  If you receive a damaged or incorrect product:
                </p>

                <ul className="space-y-2 text-xs sm:text-sm text-gray-700">
                  <li className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0D3B2A] shrink-0"></span>
                    <span>Contact us <strong className="text-[#0D3B2A] font-bold">within 24 hours</strong> of delivery</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0D3B2A] shrink-0"></span>
                    <span>Provide photos/videos of the damage or wrong item</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0D3B2A] shrink-0"></span>
                    <span>We will send a replacement immediately or process a full refund</span>
                  </li>
                </ul>
              </section>

              {/* 5. Refund Processing & Deductions */}
              <section className="space-y-3.5">
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#0D3B2A]">
                  Refund Processing &amp; Deductions
                </h3>

                <div className="bg-[#FAF7F2] border border-[#0D3B2A]/5 rounded-2xl p-4 sm:p-6 space-y-3 text-xs sm:text-sm">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                    <span className="font-bold text-[#0D3B2A] min-w-[150px]">Processing Time:</span>
                    <span className="text-gray-700">5–7 business days after inspection &amp; verification</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                    <span className="font-bold text-[#0D3B2A] min-w-[150px]">Refund Method:</span>
                    <span className="text-gray-700">Amount credited to original payment method (Card/Net Banking/UPI/Wallet)</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-2">
                    <span className="font-bold text-[#0D3B2A] min-w-[150px]">Refund Calculation:</span>
                    <span className="text-gray-700 leading-relaxed">
                      Refund Amount = <strong>Total Product Price Paid – Applicable GST Amount – Non-Refundable Shipping Charges</strong> (if applicable).
                    </span>
                  </div>

                  {/* GST Deduction Policy Highlight Box */}
                  <div className="bg-amber-50/80 border border-amber-200/90 rounded-xl p-3.5 sm:p-4 mt-2 space-y-1.5">
                    <div className="flex items-center gap-2 text-[#8A5E12] font-bold text-xs sm:text-sm">
                      <AlertCircle className="w-4 h-4 shrink-0 text-[#8A5E12]" />
                      <span>Important Notice Regarding GST (Tax) Deduction:</span>
                    </div>
                    <p className="text-gray-700 text-xs sm:text-sm leading-relaxed">
                      Please note that the statutory <strong className="text-[#0D3B2A]">Goods and Services Tax (GST)</strong> charged on the product at the time of purchase is non-refundable upon customer-initiated returns. <strong className="text-[#0D3B2A]">The exact GST amount levied on the returned product(s) will be deducted from your final refund amount.</strong>
                    </p>
                    <p className="text-gray-600 text-[11px] sm:text-xs italic pt-0.5">
                      (Note: In the rare case of a return due to verified manufacturing defect, damage in transit, or incorrect item delivery confirmed by us, the full refund including taxes will be honored).
                    </p>
                  </div>

                  <div className="pt-2 border-t border-gray-200/60 text-gray-500 text-[11px] sm:text-xs italic">
                    <strong>Note:</strong> Outward and return shipping charges are non-refundable unless the return is due to transit damage or defective item confirmed by our team.
                  </div>
                </div>
              </section>

              {/* 6. Replacements */}
              <section className="space-y-3.5">
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#0D3B2A]">
                  Replacements
                </h3>

                <p className="text-xs sm:text-sm text-gray-600">
                  For defective items, we offer a free replacement option:
                </p>

                <ul className="space-y-2 text-xs sm:text-sm text-gray-700">
                  <li className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0D3B2A] shrink-0"></span>
                    <span>Free replacement shipped to your address</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0D3B2A] shrink-0"></span>
                    <span>Pickup of defective item arranged by us</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0D3B2A] shrink-0"></span>
                    <span>Replacement sent with prepaid return label</span>
                  </li>
                </ul>
              </section>

              {/* 7. Contact Us */}
              <section className="space-y-3.5">
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#0D3B2A]">
                  Contact Us
                </h3>

                <div className="bg-[#FAF7F2] border border-[#0D3B2A]/5 rounded-2xl p-4 sm:p-6 space-y-2.5 text-xs sm:text-sm">
                  <p className="text-gray-600 font-medium mb-3">
                    For return or refund assistance:
                  </p>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                    <span className="font-bold text-[#0D3B2A] min-w-[90px]">Email:</span>
                    <a href="mailto:altoobafoods2026@gmail.com" className="text-[#D4A24C] font-semibold hover:underline">altoobafoods2026@gmail.com</a>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                    <span className="font-bold text-[#0D3B2A] min-w-[90px]">Phone:</span>
                    <a href="tel:+918433284322" className="text-[#D4A24C] font-semibold hover:underline">+91 84332 84322</a>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                    <span className="font-bold text-[#0D3B2A] min-w-[90px]">Location:</span>
                    <span className="text-gray-700">Bilaspur Gate, Nainital Road, Rampur, UP</span>
                  </div>
                  <div className="pt-2 border-t border-gray-200/60 text-gray-500 text-[11px] sm:text-xs">
                    Response within 24 hours during business days
                  </div>
                </div>
              </section>

            </div>
          ) : isShippingPolicy ? (
            /* ================= SHIPPING POLICY STRUCTURED CONTENT ================= */
            <div className="space-y-10 sm:space-y-12 font-sans text-[#1f3a1d]/85">
              
              {/* 1. Order Processing */}
              <section className="space-y-3.5">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-[#0D3B2A]/5 flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4 text-[#0D3B2A]" />
                  </div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#0D3B2A]">
                    Order Processing
                  </h3>
                </div>

                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                  All orders are processed within <strong className="text-[#0D3B2A] font-bold">1–2 business days</strong> after payment confirmation. Orders placed on weekends or holidays will be processed on the next working day.
                </p>
              </section>

              {/* 2. Delivery Timeframe */}
              <section className="space-y-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-emerald-50 flex items-center justify-center shrink-0">
                    <Truck className="w-4 h-4 text-emerald-600" />
                  </div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#0D3B2A]">
                    Delivery Timeframe
                  </h3>
                </div>

                <div className="space-y-3">
                  {/* Metro Cities */}
                  <div className="bg-[#FAF7F2] border border-[#0D3B2A]/5 rounded-2xl p-4 sm:p-5">
                    <h4 className="font-sans font-bold text-[#0D3B2A] text-sm sm:text-base mb-1">
                      Metro Cities (Delhi, Mumbai, Bangalore, Hyderabad, Pune)
                    </h4>
                    <p className="text-[#D4A24C] font-bold text-xs sm:text-sm">
                      2–4 business days <span className="text-gray-500 font-normal">from dispatch</span>
                    </p>
                  </div>

                  {/* Other Locations */}
                  <div className="bg-[#FAF7F2] border border-[#0D3B2A]/5 rounded-2xl p-4 sm:p-5">
                    <h4 className="font-sans font-bold text-[#0D3B2A] text-sm sm:text-base mb-1">
                      Other Locations
                    </h4>
                    <p className="text-[#D4A24C] font-bold text-xs sm:text-sm">
                      3–7 business days <span className="text-gray-500 font-normal">from dispatch</span>
                    </p>
                  </div>

                  {/* Remote Areas */}
                  <div className="bg-[#FAF7F2] border border-[#0D3B2A]/5 rounded-2xl p-4 sm:p-5">
                    <h4 className="font-sans font-bold text-[#0D3B2A] text-sm sm:text-base mb-1">
                      Remote Areas
                    </h4>
                    <p className="text-[#D4A24C] font-bold text-xs sm:text-sm">
                      7–14 business days <span className="text-gray-500 font-normal">from dispatch</span>
                    </p>
                  </div>
                </div>
              </section>

              {/* 3. Shipping Charges */}
              <section className="space-y-3.5">
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#0D3B2A]">
                  Shipping Charges
                </h3>

                <ul className="space-y-2.5 text-xs sm:text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0D3B2A] mt-2 shrink-0"></span>
                    <span><strong className="text-[#0D3B2A] font-bold">Free Shipping:</strong> On orders above ₹500 (Prepaid only)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0D3B2A] mt-2 shrink-0"></span>
                    <span><strong className="text-[#0D3B2A] font-bold">Standard Shipping:</strong> ₹50–150 depending on location (Prepaid)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0D3B2A] mt-2 shrink-0"></span>
                    <span><strong className="text-[#0D3B2A] font-bold">COD (Cash on Delivery):</strong> Additional ₹30–50 charges apply</span>
                  </li>
                </ul>
              </section>

              {/* 4. Tracking Your Order */}
              <section className="space-y-3.5">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-[#0D3B2A]/5 flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4 text-[#0D3B2A]" />
                  </div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#0D3B2A]">
                    Tracking Your Order
                  </h3>
                </div>

                <p className="text-xs sm:text-sm text-gray-600">
                  Once your order is dispatched, you will receive:
                </p>

                <ul className="space-y-2 text-xs sm:text-sm text-gray-700">
                  <li className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0D3B2A] shrink-0"></span>
                    <span>SMS with tracking number and courier details</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0D3B2A] shrink-0"></span>
                    <span>Email with shipping updates</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0D3B2A] shrink-0"></span>
                    <span><strong className="text-[#0D3B2A] font-bold">Tracking link</strong> to monitor real-time delivery status</span>
                  </li>
                </ul>
              </section>

              {/* 5. Potential Delays */}
              <section className="space-y-3.5">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-amber-50 flex items-center justify-center shrink-0">
                    <AlertCircle className="w-4 h-4 text-amber-600" />
                  </div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#0D3B2A]">
                    Potential Delays
                  </h3>
                </div>

                <p className="text-xs sm:text-sm text-gray-600">
                  Occasionally, deliveries may be delayed due to:
                </p>

                <ul className="space-y-2 text-xs sm:text-sm text-gray-700">
                  <li className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0"></span>
                    <span>High order volume during festivals/sales</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0"></span>
                    <span>Courier partner issues or transit delays</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0"></span>
                    <span>Natural disruptions (weather, emergencies)</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0"></span>
                    <span>Address issues or incomplete details</span>
                  </li>
                </ul>

                <p className="text-xs sm:text-sm text-gray-500 italic pt-1">
                  In such cases, you will be notified immediately via SMS/email.
                </p>
              </section>

              {/* 6. Undelivered Orders */}
              <section className="space-y-3.5">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-rose-50 flex items-center justify-center shrink-0">
                    <PackageX className="w-4 h-4 text-rose-500" />
                  </div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#0D3B2A]">
                    Undelivered Orders
                  </h3>
                </div>

                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                  If your delivery fails 3 times, we will initiate a return and process a refund.
                </p>
                <p className="text-xs sm:text-sm text-gray-500 italic">
                  Please ensure your delivery address is correct and accessible.
                </p>
              </section>

              {/* 7. Contact Us */}
              <section className="space-y-3.5">
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#0D3B2A]">
                  Contact Us
                </h3>

                <div className="bg-[#FAF7F2] border border-[#0D3B2A]/5 rounded-2xl p-4 sm:p-6 space-y-2.5 text-xs sm:text-sm">
                  <p className="text-gray-600 font-medium mb-3">
                    For shipping inquiries or issues:
                  </p>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                    <span className="font-bold text-[#0D3B2A] min-w-[90px]">Email:</span>
                    <a href="mailto:altoobafoods2026@gmail.com" className="text-[#D4A24C] font-semibold hover:underline">altoobafoods2026@gmail.com</a>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                    <span className="font-bold text-[#0D3B2A] min-w-[90px]">Phone:</span>
                    <a href="tel:+918433284322" className="text-[#D4A24C] font-semibold hover:underline">+91 84332 84322</a>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                    <span className="font-bold text-[#0D3B2A] min-w-[90px]">Location:</span>
                    <span className="text-gray-700">Bilaspur Gate, Nainital Road, Rampur, UP</span>
                  </div>
                  <div className="pt-2 border-t border-gray-200/60 text-gray-500 text-[11px] sm:text-xs">
                    Response within 24 hours during business days
                  </div>
                </div>
              </section>

            </div>
          ) : isTermsConditions ? (
            /* ================= TERMS & CONDITIONS STRUCTURED CONTENT ================= */
            <div className="space-y-10 sm:space-y-12 font-sans text-[#1f3a1d]/85">
              
              {/* Intro Statement */}
              <p className="text-sm sm:text-base text-[#0D3B2A]/80 leading-relaxed font-sans">
                By accessing or using our website and services, you agree to be bound by these Terms &amp; Conditions.
              </p>

              {/* 1. General Conditions */}
              <section className="space-y-3.5">
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#0D3B2A]">
                  1. General Conditions
                </h3>

                <ul className="space-y-2 text-xs sm:text-sm text-gray-700">
                  <li className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0D3B2A] shrink-0"></span>
                    <span>You must be at least 18 years old</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0D3B2A] shrink-0"></span>
                    <span>You agree to provide accurate information</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0D3B2A] shrink-0"></span>
                    <span>You are responsible for maintaining the confidentiality of your account</span>
                  </li>
                </ul>
              </section>

              {/* 2. Products & Pricing */}
              <section className="space-y-3.5">
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#0D3B2A]">
                  2. Products &amp; Pricing
                </h3>

                <ul className="space-y-2 text-xs sm:text-sm text-gray-700">
                  <li className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0D3B2A] shrink-0"></span>
                    <span>All prices are in INR (Indian Rupees)</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0D3B2A] shrink-0"></span>
                    <span>Prices are subject to change without notice</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0D3B2A] shrink-0"></span>
                    <span>We reserve the right to limit quantities</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0D3B2A] shrink-0"></span>
                    <span>All product information is subject to verification</span>
                  </li>
                </ul>
              </section>

              {/* 3. Order Acceptance */}
              <section className="space-y-3.5">
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#0D3B2A]">
                  3. Order Acceptance
                </h3>

                <p className="text-xs sm:text-sm text-gray-600">
                  We reserve the right to refuse or cancel any order due to:
                </p>

                <ul className="space-y-2 text-xs sm:text-sm text-gray-700">
                  <li className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0D3B2A] shrink-0"></span>
                    <span>Fraud suspicion</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0D3B2A] shrink-0"></span>
                    <span>Incorrect pricing</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0D3B2A] shrink-0"></span>
                    <span>Stock unavailability</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0D3B2A] shrink-0"></span>
                    <span>Violation of these terms</span>
                  </li>
                </ul>
              </section>

              {/* 4. Intellectual Property */}
              <section className="space-y-3.5">
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#0D3B2A]">
                  4. Intellectual Property
                </h3>

                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                  All content on this website (text, images, logos, designs) is owned by Al-Tooba and cannot be reproduced, copied, or used without prior written permission.
                </p>
              </section>

              {/* 5. Limitation of Liability */}
              <section className="space-y-3.5">
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#0D3B2A]">
                  5. Limitation of Liability
                </h3>

                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                  We are not liable for any indirect, incidental, special, or consequential damages arising from the use or inability to use our products or website, including loss of profits, loss of data, or business interruption.
                </p>
              </section>

              {/* 6. Governing Law & Jurisdiction */}
              <section className="space-y-3.5">
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#0D3B2A]">
                  6. Governing Law &amp; Jurisdiction
                </h3>

                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                  These Terms &amp; Conditions are governed by and construed in accordance with the laws of India, without regard to its conflict of law provisions.
                </p>
                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                  The exclusive jurisdiction and venue for any legal action arising from these terms shall be in the courts located in Uttar Pradesh / Delhi, India.
                </p>
              </section>

              {/* 7. Changes to Terms */}
              <section className="space-y-3.5">
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#0D3B2A]">
                  7. Changes to Terms
                </h3>

                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                  We reserve the right to modify these Terms &amp; Conditions at any time. Changes will be effective immediately upon posting to the website.
                </p>
              </section>

              {/* 8. Contact Information */}
              <section className="space-y-3.5">
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#0D3B2A]">
                  8. Contact Information
                </h3>

                <div className="bg-[#FAF7F2] border border-[#0D3B2A]/5 rounded-2xl p-4 sm:p-6 space-y-2.5 text-xs sm:text-sm">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                    <span className="font-bold text-[#0D3B2A] min-w-[90px]">Email:</span>
                    <a href="mailto:altoobafoods2026@gmail.com" className="text-[#D4A24C] font-semibold hover:underline">altoobafoods2026@gmail.com</a>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                    <span className="font-bold text-[#0D3B2A] min-w-[90px]">Phone:</span>
                    <a href="tel:+918433284322" className="text-[#D4A24C] font-semibold hover:underline">+91 84332 84322</a>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                    <span className="font-bold text-[#0D3B2A] min-w-[90px]">Location:</span>
                    <span className="text-gray-700">Bilaspur Gate, Nainital Road, Rampur, UP</span>
                  </div>
                </div>
              </section>

            </div>
          ) : isPrivacyPolicy ? (
            /* ================= PRIVACY POLICY STRUCTURED CONTENT ================= */
            <div className="space-y-10 sm:space-y-12 font-sans text-[#1f3a1d]/85">
              
              {/* Intro Statement */}
              <div className="bg-[#FAF7F2] border-l-4 border-[#8A5E12] p-4 sm:p-5 rounded-r-2xl">
                <p className="text-sm sm:text-base text-[#0D3B2A] leading-relaxed font-sans">
                  At <strong className="font-bold">AL TOOBA PROPHETIC REMEDIES PRIVATE LIMITED</strong> (“Al-Tooba”, “we”, “our”, or “us”), we are deeply committed to protecting your privacy and ensuring complete transparency. This Privacy Policy describes how your personal information is collected, used, shared, and safeguarded when you visit or make a purchase from <strong className="font-semibold text-[#8A5E12]">altoobafoods.com</strong>.
                </p>
              </div>

              {/* 1. Information We Collect */}
              <section className="space-y-3.5">
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#0D3B2A]">
                  1. Information We Collect
                </h3>

                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                  We collect personal data to provide authentic Prophetic remedies, seamless doctor consultations, and smooth order fulfillment:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                  <div className="bg-[#FAF7F2]/70 border border-[#0D3B2A]/10 rounded-xl p-4 space-y-2">
                    <h4 className="text-xs sm:text-sm font-bold text-[#0D3B2A] uppercase tracking-wider">A. Information You Provide Directly</h4>
                    <ul className="space-y-1.5 text-xs sm:text-sm text-gray-700">
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#8A5E12] shrink-0 mt-1.5"></span>
                        <span><strong>Personal Details:</strong> Full name, age, gender.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#8A5E12] shrink-0 mt-1.5"></span>
                        <span><strong>Contact Details:</strong> Mobile phone number, email address.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#8A5E12] shrink-0 mt-1.5"></span>
                        <span><strong>Delivery Details:</strong> Complete shipping and billing addresses with PIN codes.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#8A5E12] shrink-0 mt-1.5"></span>
                        <span><strong>Consultation Records:</strong> Health concerns or notes voluntarily shared for Tibb-e-Nabawi guidance.</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-[#FAF7F2]/70 border border-[#0D3B2A]/10 rounded-xl p-4 space-y-2">
                    <h4 className="text-xs sm:text-sm font-bold text-[#0D3B2A] uppercase tracking-wider">B. Automatically Collected Information</h4>
                    <ul className="space-y-1.5 text-xs sm:text-sm text-gray-700">
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#8A5E12] shrink-0 mt-1.5"></span>
                        <span><strong>Device Data:</strong> Web browser version, IP address, device type, and operating system.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#8A5E12] shrink-0 mt-1.5"></span>
                        <span><strong>Usage &amp; Interaction:</strong> Pages visited, remedies viewed, time spent, and referring URLs.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#8A5E12] shrink-0 mt-1.5"></span>
                        <span><strong>Order Identifiers:</strong> Product selections, cart items, order IDs, and payment statuses.</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* 2. Payment Security & Zero Credential Storage */}
              <section className="space-y-3.5">
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#0D3B2A]">
                  2. Payment Security &amp; Zero Credential Storage
                </h3>

                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                  Your financial security is our utmost priority. We want to be 100% transparent about how payments are handled on our platform:
                </p>

                <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-2xl p-4 sm:p-5 space-y-2.5">
                  <div className="flex items-center gap-2 text-[#0D3B2A] font-bold text-xs sm:text-sm">
                    <svg className="w-5 h-5 text-emerald-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    <span>We Never Store Your Sensitive Financial Credentials</span>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                    <strong>AL TOOBA PROPHETIC REMEDIES PRIVATE LIMITED does NOT store, capture, view, or process your credit/debit card numbers, CVV codes, Net Banking passwords, or UPI PINs.</strong>
                  </p>
                  <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                    All transactions are directly executed through authorized, RBI-compliant, PCI-DSS Level 1 certified payment gateways (such as Razorpay, PhonePe, Cashfree, and Shopify Payments) with end-to-end 256-bit SSL encryption.
                  </p>
                </div>
              </section>

              {/* 3. Cookies & Tracking Technologies */}
              <section className="space-y-3.5">
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#0D3B2A]">
                  3. Cookies &amp; Tracking Technologies
                </h3>

                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                  We use cookies, local web storage, and similar technologies to ensure smooth site navigation, fast page loading, and an optimized shopping experience:
                </p>

                <ul className="space-y-2.5 text-xs sm:text-sm text-gray-700">
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0D3B2A] shrink-0 mt-1.5"></span>
                    <span><strong>Essential &amp; Functional Cookies:</strong> Necessary for maintaining your active browsing session, shopping cart contents, wishlists, and secure checkout navigation.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0D3B2A] shrink-0 mt-1.5"></span>
                    <span><strong>Performance &amp; Analytics Tracking:</strong> Anonymized tools (such as Google Analytics and performance monitoring metrics) help us analyze traffic patterns, monitor website loading speeds, detect errors, and continuously improve user experience.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0D3B2A] shrink-0 mt-1.5"></span>
                    <span><strong>User Control:</strong> You can choose to disable or block cookies through your web browser settings. However, disabling essential cookies may impact certain interactive features such as the shopping bag or checkout.</span>
                  </li>
                </ul>
              </section>

              {/* 4. Courier & Logistics Data Sharing */}
              <section className="space-y-3.5">
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#0D3B2A]">
                  4. Courier &amp; Logistics Data Sharing
                </h3>

                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                  In order to fulfill and deliver your orders safely to your doorstep, we share necessary shipping information with authorized third-party logistics and courier partners (e.g., Shiprocket, Delhivery, Blue Dart, DTDC, India Post):
                </p>

                <ul className="space-y-2 text-xs sm:text-sm text-gray-700">
                  <li className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0D3B2A] shrink-0"></span>
                    <span><strong>Recipient Name:</strong> For package identification and handover.</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0D3B2A] shrink-0"></span>
                    <span><strong>Delivery Address &amp; PIN Code:</strong> For accurate route navigation and door delivery.</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0D3B2A] shrink-0"></span>
                    <span><strong>Primary Contact Number:</strong> For delivery coordination, transit calls, and SMS/OTP verification by the delivery executive.</span>
                  </li>
                </ul>

                <p className="text-xs sm:text-sm text-gray-600 italic">
                  Our logistics partners are contractually obligated to use this information strictly for shipping and transit verification and are prohibited from using it for independent marketing.
                </p>
              </section>

              {/* 5. WhatsApp, SMS & Email Communication */}
              <section className="space-y-3.5">
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#0D3B2A]">
                  5. WhatsApp, SMS &amp; Email Communication
                </h3>

                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                  By placing an order or registering an account, you agree to receive essential transactional and service communications:
                </p>

                <div className="space-y-2 text-xs sm:text-sm text-gray-700">
                  <div className="p-3 bg-[#FAF7F2] rounded-xl border border-[#0D3B2A]/5">
                    <p className="font-bold text-[#0D3B2A] mb-1">A. Transactional &amp; Order Notifications (Automated)</p>
                    <p className="text-gray-600">Order confirmations, invoices, shipment tracking links, dispatch notices, delivery verification OTPs, and doctor consultation reminders sent via SMS, WhatsApp, and email.</p>
                  </div>

                  <div className="p-3 bg-[#FAF7F2] rounded-xl border border-[#0D3B2A]/5">
                    <p className="font-bold text-[#0D3B2A] mb-1">B. Direct Customer Support</p>
                    <p className="text-gray-600">One-on-one communication with our wellness team and customer service executives regarding dosage guidance, shipment inquiries, or general support.</p>
                  </div>

                  <div className="p-3 bg-[#FAF7F2] rounded-xl border border-[#0D3B2A]/5">
                    <p className="font-bold text-[#0D3B2A] mb-1">C. Promotional &amp; Educational Updates (Consent-Based Only)</p>
                    <p className="text-gray-600">Health articles, Sunnah wellness insights, new remedy launches, and special offers are shared only when you opt in. You may opt out or unsubscribe from promotional messages at any time by replying “STOP” on WhatsApp or clicking the unsubscribe link in our emails.</p>
                  </div>
                </div>
              </section>

              {/* 6. Third-Party Services & External Links */}
              <section className="space-y-3.5">
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#0D3B2A]">
                  6. Third-Party Services &amp; External Links
                </h3>

                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                  We integrate trusted third-party service providers to power our platform, including cloud storefront hosting (Shopify), licensed payment processors, shipping aggregators, verified review platforms (Judge.me), and analytics tools.
                </p>

                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                  Please be aware that these third-party services operate under their own independent privacy notices and policies. Once you click on an external link or are redirected to a third-party gateway, your information is governed by their respective privacy terms. We encourage you to review their policies prior to submitting data.
                </p>

                <div className="bg-[#FAF7F2] border border-[#0D3B2A]/10 rounded-xl p-3.5 sm:p-4">
                  <p className="font-bold text-xs sm:text-sm text-[#0D3B2A]">
                    We do not sell, rent, or trade your personal data to any third party for commercial monetization.
                  </p>
                </div>
              </section>

              {/* 7. Data Retention & Legal/Tax Compliance */}
              <section className="space-y-3.5">
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#0D3B2A]">
                  7. Data Retention &amp; Legal Compliance
                </h3>

                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                  We retain personal customer data only for as long as necessary to fulfill the operational purposes described in this policy:
                </p>

                <ul className="space-y-2 text-xs sm:text-sm text-gray-700">
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0D3B2A] shrink-0 mt-1.5"></span>
                    <span><strong>Account &amp; Marketing Profiles:</strong> Active for as long as your account remains open or until you request deletion.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0D3B2A] shrink-0 mt-1.5"></span>
                    <span><strong>Statutory, Tax &amp; Accounting Records:</strong> Please note that if you submit a deletion request, certain transactional records—including commercial tax invoices, GST filings, payment settlement logs, and accounting ledger entries—<strong>must be lawfully retained</strong> for the mandatory periods prescribed under applicable Indian tax, corporate, and audit regulations before permanent, secure purging.</span>
                  </li>
                </ul>
              </section>

              {/* 8. Your Privacy Rights */}
              <section className="space-y-3.5">
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#0D3B2A]">
                  8. Your Privacy Rights
                </h3>

                <p className="text-xs sm:text-sm text-gray-600">
                  In accordance with applicable privacy guidelines, you have the following rights:
                </p>

                <ul className="space-y-2 text-xs sm:text-sm text-gray-700">
                  <li className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0D3B2A] shrink-0"></span>
                    <span><strong>Right to Access:</strong> Request a summary of the personal information we hold about you.</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0D3B2A] shrink-0"></span>
                    <span><strong>Right to Rectification:</strong> Request correction of inaccurate, outdated, or incomplete data.</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0D3B2A] shrink-0"></span>
                    <span><strong>Right to Erasure:</strong> Request deletion of your personal account data (subject to statutory tax/invoice retention requirements).</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0D3B2A] shrink-0"></span>
                    <span><strong>Right to Withdraw Consent:</strong> Unsubscribe from marketing newsletters or promotional updates at any time.</span>
                  </li>
                </ul>
              </section>

              {/* 9. Security Measures */}
              <section className="space-y-3.5">
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#0D3B2A]">
                  9. Security Measures
                </h3>

                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                  We maintain industry-standard physical, electronic, and procedural safeguards to protect your personal information against unauthorized access, alteration, disclosure, or destruction. Our infrastructure includes 256-bit SSL encryption, restricted administrative access, and strict internal confidentiality standards.
                </p>
              </section>

              {/* 10. Grievance Redressal & Privacy Contact */}
              <section className="space-y-3.5">
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#0D3B2A]">
                  10. Grievance Officer &amp; Privacy Contact
                </h3>

                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                  If you have questions regarding this Privacy Policy, wish to exercise your data rights, or have any grievances regarding your personal information, please contact our designated Grievance &amp; Compliance Officer:
                </p>

                <div className="bg-[#FAF7F2] border border-[#0D3B2A]/10 rounded-2xl p-5 sm:p-7 space-y-3 text-xs sm:text-sm">
                  <div className="border-b border-[#0D3B2A]/10 pb-3">
                    <p className="font-bold text-[#0D3B2A] text-sm sm:text-base">
                      AL TOOBA PROPHETIC REMEDIES PRIVATE LIMITED
                    </p>
                    <p className="text-gray-600 text-xs mt-0.5">
                      Attn: Grievance &amp; Privacy Compliance Officer
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    <div>
                      <span className="font-bold text-[#0D3B2A] block mb-0.5">Official Email:</span>
                      <a href="mailto:altoobafoods2026@gmail.com" className="text-[#8A5E12] font-semibold hover:underline">
                        altoobafoods2026@gmail.com
                      </a>
                    </div>
                    <div>
                      <span className="font-bold text-[#0D3B2A] block mb-0.5">Direct Helpline / WhatsApp:</span>
                      <a href="tel:+918433284322" className="text-[#8A5E12] font-semibold hover:underline">
                        +91 84332 84322
                      </a>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-[#0D3B2A]/10">
                    <span className="font-bold text-[#0D3B2A] block mb-0.5">Registered Corporate Office:</span>
                    <span className="text-gray-700 leading-relaxed block">
                      AQSA MASJID ROAD, NEAR TASLEEM BHAI HOUSE, AQSA MASJID, NANKAR, Rampur, Uttar Pradesh - 244901, India
                    </span>
                  </div>

                  <div className="pt-2 text-[11px] text-gray-500">
                    <span>Operating Hours: Monday – Saturday | 10:00 AM – 7:00 PM IST (Response time within 24–48 hours)</span>
                  </div>
                </div>

                {/* Final Sign-off Badge */}
                <div className="flex flex-wrap items-center justify-between gap-2 pt-4 border-t border-gray-100 text-xs text-gray-500">
                  <span className="font-medium text-[#0D3B2A]">
                    Al-Tooba® Authentic Prophetic Wellness
                  </span>
                  <span className="font-semibold text-[#8A5E12]">
                    Last Updated: September 2026
                  </span>
                </div>
              </section>

            </div>
          ) : (
            /* ================= DEFAULT POLICY PAGE TEMPLATE ================= */
            <div className="prose prose-lg max-w-none text-[#1f3a1d]/80 leading-relaxed font-sans space-y-6">
              <p className="text-xl md:text-2xl font-serif text-[#0D3B2A] leading-snug">
                Welcome to the {title} page for Al-Tooba. We believe in complete transparency and trust with our valued customers.
              </p>
              
              <p>
                This is the official {title} document. The complete, comprehensive details and binding policies are provided to ensure we serve you with the highest standards of clarity, purity, and customer protection.
              </p>
              
              {/* Elegant Callout Box for Contact */}
              <div className="bg-[#FAF7F2] rounded-2xl p-6 md:p-8 my-10 border-l-4 border-[#D4A24C]">
                <h3 className="text-[#0D3B2A] font-serif text-xl font-bold mb-3">Need Immediate Assistance?</h3>
                <p className="mb-0 text-sm md:text-base">
                  At Al-Tooba, we are committed to providing the highest quality prophetic herbal remedies and customer care. If you have any urgent questions regarding our policies, please do not hesitate to contact our team.
                </p>
                <div className="mt-6 flex flex-col sm:flex-row gap-4">
                  <a href="mailto:altoobafoods2026@gmail.com" className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#0D3B2A] text-white rounded-full font-bold text-sm tracking-widest uppercase hover:bg-[#D4A24C] transition-colors duration-300">
                    <Mail className="w-4 h-4" />
                    Email Us
                  </a>
                  <a href="tel:+918433284322" className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-transparent border border-[#0D3B2A]/20 text-[#0D3B2A] rounded-full font-bold text-sm tracking-widest uppercase hover:border-[#0D3B2A] hover:bg-[#0D3B2A]/5 transition-colors duration-300">
                    <Phone className="w-4 h-4" />
                    Call Us
                  </a>
                </div>
              </div>

              <p>
                By accessing and using our website, you acknowledge that you have read, understood, and agree to be bound by the terms outlined in our policies. We appreciate your patience and trust in Al-Tooba.
              </p>
            </div>
          )}
          
          {/* Back to Home Link */}
          <div className="mt-12 pt-8 border-t border-gray-100 text-center">
            <Link to="/" className="inline-flex items-center gap-2 text-[#D4A24C] font-bold hover:text-[#0D3B2A] transition-colors duration-300 uppercase tracking-widest text-sm">
              <ArrowLeft className="w-4 h-4" />
              Return to Store
            </Link>
          </div>
        </motion.div>
      </div>

    </div>
  );
}
