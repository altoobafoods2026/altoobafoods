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
          <div className="flex items-center gap-2.5 text-xs sm:text-sm text-gray-400 mb-8 sm:mb-10 pb-6 border-b border-gray-100">
            <Clock className="w-4 h-4 text-[#D4A24C]" />
            <span className="font-medium tracking-wide">Last Updated: August 2026</span>
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
                    <strong>Note:</strong> Shipping charges are non-refundable once the order packaging & fulfillment is initiated.
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
                      Once received and verified, refund will be processed within 5–7 business days.
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

              {/* 5. Refund Processing */}
              <section className="space-y-3.5">
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#0D3B2A]">
                  Refund Processing
                </h3>

                <div className="bg-[#FAF7F2] border border-[#0D3B2A]/5 rounded-2xl p-4 sm:p-6 space-y-2.5 text-xs sm:text-sm">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                    <span className="font-bold text-[#0D3B2A] min-w-[140px]">Processing Time:</span>
                    <span className="text-gray-700">5–7 business days after verification</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                    <span className="font-bold text-[#0D3B2A] min-w-[140px]">Refund Method:</span>
                    <span className="text-gray-700">Amount credited to original payment method (card/wallet/UPI)</span>
                  </div>
                  <div className="pt-2 border-t border-gray-200/60 text-gray-500 text-[11px] sm:text-xs italic">
                    <strong>Note:</strong> Shipping charges are non-refundable unless it&apos;s a defective product.
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
              <p className="text-sm sm:text-base text-[#0D3B2A]/80 leading-relaxed font-sans">
                This Privacy Policy describes how we collect, use, and share your personal information when you visit or make a purchase from our website.
              </p>

              {/* 1. Information We Collect */}
              <section className="space-y-3.5">
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#0D3B2A]">
                  1. Information We Collect
                </h3>

                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                  When you visit the website, we automatically collect certain information about your device, including your web browser, IP address, time zone, and cookies.
                </p>

                <p className="text-xs sm:text-sm text-gray-600 font-medium pt-1">
                  When you make a purchase, we collect:
                </p>

                <ul className="space-y-2 text-xs sm:text-sm text-gray-700">
                  <li className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0D3B2A] shrink-0"></span>
                    <span>Name</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0D3B2A] shrink-0"></span>
                    <span>Billing and shipping address</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0D3B2A] shrink-0"></span>
                    <span>Payment information</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0D3B2A] shrink-0"></span>
                    <span>Email address</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0D3B2A] shrink-0"></span>
                    <span>Phone number</span>
                  </li>
                </ul>
              </section>

              {/* 2. How We Use Your Information */}
              <section className="space-y-3.5">
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#0D3B2A]">
                  2. How We Use Your Information
                </h3>

                <p className="text-xs sm:text-sm text-gray-600">
                  We use your information to:
                </p>

                <ul className="space-y-2 text-xs sm:text-sm text-gray-700">
                  <li className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0D3B2A] shrink-0"></span>
                    <span>Process and fulfill orders</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0D3B2A] shrink-0"></span>
                    <span>Communicate with you</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0D3B2A] shrink-0"></span>
                    <span>Screen orders for fraud or risk</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0D3B2A] shrink-0"></span>
                    <span>Improve customer experience</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0D3B2A] shrink-0"></span>
                    <span>Send marketing updates (only with consent)</span>
                  </li>
                </ul>
              </section>

              {/* 3. Sharing Your Information */}
              <section className="space-y-3.5">
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#0D3B2A]">
                  3. Sharing Your Information
                </h3>

                <p className="text-xs sm:text-sm text-gray-600">
                  We share your personal data with trusted third parties such as:
                </p>

                <ul className="space-y-2 text-xs sm:text-sm text-gray-700">
                  <li className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0D3B2A] shrink-0"></span>
                    <span>Payment gateways</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0D3B2A] shrink-0"></span>
                    <span>Shipping partners</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0D3B2A] shrink-0"></span>
                    <span>Analytics providers</span>
                  </li>
                </ul>

                <div className="bg-[#FAF7F2] border border-[#0D3B2A]/10 rounded-xl p-3.5 sm:p-4 mt-2">
                  <p className="font-bold text-xs sm:text-sm text-[#0D3B2A]">
                    We do not sell your personal data.
                  </p>
                </div>
              </section>

              {/* 4. Data Retention */}
              <section className="space-y-3.5">
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#0D3B2A]">
                  4. Data Retention
                </h3>

                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                  We retain your data for our records unless you request deletion.
                </p>
              </section>

              {/* 5. Your Rights */}
              <section className="space-y-3.5">
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#0D3B2A]">
                  5. Your Rights
                </h3>

                <p className="text-xs sm:text-sm text-gray-600">
                  You have the right to:
                </p>

                <ul className="space-y-2 text-xs sm:text-sm text-gray-700">
                  <li className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0D3B2A] shrink-0"></span>
                    <span>Access your data</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0D3B2A] shrink-0"></span>
                    <span>Correct your data</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0D3B2A] shrink-0"></span>
                    <span>Request deletion</span>
                  </li>
                </ul>
              </section>

              {/* 6. Security */}
              <section className="space-y-3.5">
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#0D3B2A]">
                  6. Security
                </h3>

                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                  We use industry-standard security measures to protect your data.
                </p>
              </section>

              {/* 7. Changes to Policy */}
              <section className="space-y-3.5">
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#0D3B2A]">
                  7. Changes to Policy
                </h3>

                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                  We may update this policy periodically. Your continued use of our website signifies your acceptance of these changes.
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
