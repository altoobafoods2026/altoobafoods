import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useToastStore } from '../store/toastStore';
import { getReviews, submitReview } from '../services/judgeme';
import { generateReviews } from '../utils/generateReviews';

export default function TrustedBy({ productId, productName }) {
  const [showModal, setShowModal] = useState(false);
  const [rating, setRating] = useState(5);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [judgeMeReviews, setJudgeMeReviews] = useState([]);
  const showToast = useToastStore((state) => state.showToast);

  useEffect(() => {
    const fetchJudgeMeReviews = async () => {
      if (productId) {
        const reviews = await getReviews(productId);
        // Map Judge.me format to our local format
        const formattedReviews = reviews.map(r => ({
          id: r.id,
          name: r.reviewer?.name || "Verified Buyer",
          role: "Verified Buyer",
          rating: r.rating,
          text: r.body,
          product: productName,
          avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(r.reviewer?.name || 'V B')}&background=random`,
          date: r.created_at
        }));
        setJudgeMeReviews(formattedReviews);
      }
    };
    fetchJudgeMeReviews();
  }, [productId, productName]);

  const allReviews = useMemo(() => {
    const defaultReviews = generateReviews(productId, productName);
    // Show newest user reviews first
    return [...judgeMeReviews, ...defaultReviews];
  }, [productId, productName, judgeMeReviews]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % allReviews.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + allReviews.length) % allReviews.length);
  };

  const visibleReviews = [
    allReviews[currentIndex],
    allReviews[(currentIndex + 1) % allReviews.length],
    allReviews[(currentIndex + 2) % allReviews.length],
  ];

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get('name');
    const text = formData.get('reviewText');
    const email = formData.get('email');
    
    try {
      await submitReview({
        productId,
        name,
        email,
        rating: rating,
        title: "Review from " + name,
        body: text
      });
      
      // Optimistically update the UI
      setJudgeMeReviews([{
        id: Date.now(),
        name,
        role: "Verified Buyer",
        rating,
        text,
        product: productName,
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`,
        date: new Date().toISOString()
      }, ...judgeMeReviews]);

      setShowModal(false);
      showToast('Thank you! Your review has been added to Judge.me.', 'success');
      setRating(5);
    } catch (error) {
      showToast('Failed to submit review. Please try again.', 'error');
    }
  };

  return (
    <section className="bg-white py-24 border-t border-[#FAF7F2] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16 relative">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-serif font-bold text-[#0D3B2A] mb-4"
          >
            Trusted By Our Community
          </motion.h2>
          <div className="w-16 h-[2px] bg-[#D4A24C] mx-auto mb-6"></div>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-600 font-sans max-w-2xl mx-auto text-sm md:text-base leading-relaxed mb-8"
          >
            Discover what our community has to say about their healing journeys with our authentic Prophetic remedies and natural wellness products.
          </motion.p>
          
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            onClick={() => setShowModal(true)}
            className="inline-flex items-center gap-2 bg-[#0D3B2A] text-[#FAF7F2] px-8 py-3.5 rounded-full font-sans font-bold uppercase tracking-widest text-xs hover:bg-[#1a4a38] transition-colors shadow-lg cursor-pointer"
          >
            Write a Review
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </motion.button>
        </div>

        {/* Reviews Grid */}
        <div className="relative overflow-hidden min-h-[300px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {visibleReviews.map((review, index) => (
                <div
                  key={review.id}
                  className={`bg-[#FAF7F2] rounded-3xl p-8 border border-[#0D3B2A]/5 hover:shadow-xl hover:shadow-[#0D3B2A]/5 transition-all duration-300 flex-col h-full ${index === 0 ? 'flex' : 'hidden md:flex'}`}
                >
                  <div className="flex gap-1 mb-6">
                    {[...Array(review.rating)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 text-[#D4A24C] fill-current" viewBox="0 0 24 24">
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-[#0D3B2A]/80 font-sans text-base leading-relaxed mb-8 flex-grow">
                    "{review.text}"
                  </p>
                  <div className="mt-auto border-t border-[#0D3B2A]/10 pt-6 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img src={review.avatar} alt={review.name} className="w-10 h-10 rounded-full object-cover border border-[#0D3B2A]/10" />
                      <div>
                        <h4 className="font-sans font-bold text-[#0D3B2A] text-base leading-tight">{review.name}</h4>
                        <span className="text-[10px] font-sans uppercase tracking-widest text-gray-500">{review.role}</span>
                      </div>
                    </div>
                    <span className="text-[9px] font-sans font-bold uppercase tracking-widest bg-[#0D3B2A] text-[#FAF7F2] px-2.5 py-1 rounded-full text-center max-w-[100px] leading-tight flex-shrink-0">
                      {review.product}
                    </span>
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-center items-center gap-6 mt-12">
          <button 
            onClick={handlePrev} 
            className="p-4 rounded-full bg-white text-[#0D3B2A] hover:bg-[#D4A24C] hover:text-white transition-colors border border-[#0D3B2A]/10 shadow-sm cursor-pointer"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
          </button>
          <button 
            onClick={handleNext} 
            className="p-4 rounded-full bg-white text-[#0D3B2A] hover:bg-[#D4A24C] hover:text-white transition-colors border border-[#0D3B2A]/10 shadow-sm cursor-pointer"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>

      </div>

      {/* Write a Review Modal */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            
            {/* Modal Content */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-[#FAF7F2] rounded-3xl p-8 sm:p-10 shadow-2xl z-10"
            >
              <button 
                onClick={() => setShowModal(false)}
                className="absolute top-6 right-6 text-gray-400 hover:text-[#0D3B2A] transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <h3 className="font-serif font-bold text-3xl text-[#0D3B2A] mb-2">Share Your Experience</h3>
              <p className="font-sans text-sm text-gray-600 mb-8">Your feedback helps others on their healing journey.</p>

              <form onSubmit={handleSubmitReview} className="flex flex-col gap-5">
                
                {/* Rating Input */}
                <div>
                  <label className="block text-xs font-sans font-bold uppercase tracking-widest text-[#0D3B2A] mb-2">Rating</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        className="focus:outline-none transition-transform hover:scale-110"
                      >
                        <svg className={`w-8 h-8 ${star <= rating ? 'text-[#D4A24C] fill-current' : 'text-gray-300 fill-current'}`} viewBox="0 0 24 24">
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                        </svg>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Name and Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                  <div>
                    <label className="block text-xs font-sans font-bold uppercase tracking-widest text-[#0D3B2A] mb-2">Your Name</label>
                    <input 
                      name="name"
                      type="text" 
                      required
                      placeholder="e.g. Aisha M."
                      className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm font-sans focus:outline-none focus:border-[#D4A24C] focus:ring-1 focus:ring-[#D4A24C] transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-sans font-bold uppercase tracking-widest text-[#0D3B2A] mb-2">Email (For verification)</label>
                    <input 
                      name="email"
                      type="email" 
                      required
                      placeholder="e.g. aisha@example.com"
                      className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm font-sans focus:outline-none focus:border-[#D4A24C] focus:ring-1 focus:ring-[#D4A24C] transition-all"
                    />
                  </div>
                </div>

                {/* Review Text */}
                <div>
                  <label className="block text-xs font-sans font-bold uppercase tracking-widest text-[#0D3B2A] mb-2">Your Review</label>
                  <textarea 
                    name="reviewText"
                    required
                    rows="4"
                    placeholder="Tell us about your experience..."
                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm font-sans focus:outline-none focus:border-[#D4A24C] focus:ring-1 focus:ring-[#D4A24C] transition-all resize-none"
                  ></textarea>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-[#0D3B2A] text-white rounded-xl py-4 mt-2 font-sans font-bold uppercase tracking-widest text-xs hover:bg-[#1a4a38] transition-colors shadow-lg cursor-pointer"
                >
                  Submit Review
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
