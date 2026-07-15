import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

export default function PolicyPage({ title }) {
  // Ensure the page scrolls to top when navigating to it
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [title]);

  return (
    <div className="bg-[#FAF7F2] min-h-screen relative font-sans overflow-hidden">
      

      {/* 1. Hero Header Section */}
      <div className="relative bg-[#0D3B2A] pt-40 pb-32 px-6 overflow-hidden">
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
            <span className="text-[#D4A24C] font-bold tracking-[0.2em] uppercase text-xs sm:text-sm mb-4 block">
              Al-Tooba Official
            </span>
            <h1 className="text-4xl md:text-6xl font-serif text-white mb-6 drop-shadow-md">
              {title}
            </h1>
            <div className="w-16 h-[2px] bg-[#D4A24C] mx-auto opacity-70"></div>
          </motion.div>
        </div>
      </div>

      {/* 2. Content Section (Overlapping Card) */}
      <div className="max-w-4xl mx-auto px-6 relative z-20 -mt-20 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="bg-white rounded-t-[32px] rounded-b-[16px] shadow-[0_20px_40px_rgba(13,59,42,0.08)] border border-[#0D3B2A]/5 p-8 md:p-14"
        >
          {/* Last Updated Date */}
          <div className="flex items-center gap-3 text-sm text-gray-400 mb-8 pb-8 border-b border-gray-100">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="font-medium tracking-wide">Last Updated: July 2026</span>
          </div>

          {/* Text Content */}
          <div className="prose prose-lg max-w-none text-[#1f3a1d]/80 leading-relaxed font-sans space-y-6">
            <p className="text-xl md:text-2xl font-serif text-[#0D3B2A] leading-snug">
              Welcome to the {title} page for Al-Tooba. We believe in complete transparency and trust with our valued customers.
            </p>
            
            <p>
              This is the official {title} document. The complete, comprehensive details and binding policies will be updated here shortly. We are currently finalizing our legal documentation to ensure we serve you with the highest standards of clarity and protection.
            </p>
            
            {/* Elegant Callout Box for Contact */}
            <div className="bg-[#FAF7F2] rounded-2xl p-6 md:p-8 my-10 border-l-4 border-[#D4A24C]">
              <h3 className="text-[#0D3B2A] font-serif text-xl font-bold mb-3">Need Immediate Assistance?</h3>
              <p className="mb-0 text-sm md:text-base">
                At Al-Tooba, we are committed to providing the highest quality products and services. If you have any urgent questions regarding our policies, please do not hesitate to contact our support team.
              </p>
              <div className="mt-6 flex flex-col sm:flex-row gap-4">
                <a href="mailto:sales@al-tooba.com" className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#0D3B2A] text-white rounded-full font-bold text-sm tracking-widest uppercase hover:bg-[#D4A24C] transition-colors duration-300">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                  Email Us
                </a>
                <a href="tel:+918591916905" className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-transparent border border-[#0D3B2A]/20 text-[#0D3B2A] rounded-full font-bold text-sm tracking-widest uppercase hover:border-[#0D3B2A] hover:bg-[#0D3B2A]/5 transition-colors duration-300">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                  Call Us
                </a>
              </div>
            </div>

            <p>
              By accessing and using our website, you acknowledge that you have read, understood, and agree to be bound by the terms outlined in our policies once they are fully published. We appreciate your patience and trust in Al-Tooba.
            </p>
          </div>
          
          {/* Back to Home Link */}
          <div className="mt-12 pt-8 border-t border-gray-100 text-center">
            <Link to="/" className="inline-flex items-center gap-2 text-[#D4A24C] font-bold hover:text-[#0D3B2A] transition-colors duration-300 uppercase tracking-widest text-sm">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Return to Store
            </Link>
          </div>
        </motion.div>
      </div>

    </div>
  );
}
