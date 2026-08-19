import { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import TiltCard from './TiltCard';
import MagneticButton from './MagneticButton';

import { useCartStore } from '../../store/cartStore';
import { useToastStore } from '../../store/toastStore';

const CursorImageSwap = ({ frontImg, backImg, alt }) => {
  if (!backImg) {
    return (
      <img 
        src={frontImg} 
        alt={alt}
        className="w-full h-full object-cover object-center group-hover/img:scale-110 transition-transform duration-[1.2s] ease-out"
      />
    );
  }

  return (
    <div className="relative w-full h-full overflow-hidden group/swap">
      <img 
        src={frontImg} 
        alt={alt}
        className="absolute inset-0 w-full h-full object-cover object-center transition-all duration-500 ease-out group-hover/swap:opacity-0 group-hover/swap:scale-105 opacity-100 scale-100"
      />
      <img 
        src={backImg}
        alt={`${alt} back`}
        className="absolute inset-0 w-full h-full object-cover object-center transition-all duration-500 ease-out opacity-0 group-hover/swap:opacity-100 group-hover/swap:scale-105"
      />
    </div>
  );
};

export default function NoorCompleteCollection({ products = [] }) {
  const addItem = useCartStore((state) => state.addItem);
  const showToast = useToastStore((state) => state.showToast);

  const displayedProducts = products.slice(0, 16);
  const collectionProducts = [];
  const seenCategories = new Set();
  
  for (const product of displayedProducts) {
    if (!seenCategories.has(product.category)) {
      seenCategories.add(product.category);
      collectionProducts.push(product);
    }
  }

  return (
    <section className="relative bg-[#f4efe6] py-8 sm:py-10 md:py-14 overflow-hidden border-t border-[#e8dece]">
      
      {/* Background Mandalas */}
      <div className="absolute top-0 left-0 w-96 h-96 opacity-[0.04] pointer-events-none -translate-x-1/2 -translate-y-1/2">
        <img src="/bg_minimal_gold_mandala_1782721892727.png" alt="" className="w-full h-full object-contain" />
      </div>
      <div className="absolute top-0 right-0 w-96 h-96 opacity-[0.04] pointer-events-none translate-x-1/2 -translate-y-1/2">
        <img src="/bg_minimal_gold_mandala_1782721892727.png" alt="" className="w-full h-full object-contain" />
      </div>

      <div className="max-w-[1400px] mx-auto px-3 sm:px-6 md:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-6 sm:mb-8 relative z-10 flex flex-col items-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#0D3B2A] font-bold mb-2 sm:mb-3"
          >
            Our Complete Collection
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ delay: 0.1 }}
            className="text-[#D4A24C] font-sans font-bold tracking-[0.15em] sm:tracking-[0.2em] uppercase text-xs md:text-sm mb-4 sm:mb-6"
          >
            Explore our heritage range
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ delay: 0.2 }}
          >
            <Link to="/studio">
              <MagneticButton 
                style={{ '--liquid-bg': '#0D3B2A', '--liquid-text': '#FAF7F2' }}
                className="liquid bg-transparent border border-[#D4A24C] text-[#0D3B2A] px-6 sm:px-8 py-2.5 sm:py-3.5 rounded-full font-sans font-bold text-[11px] sm:text-[12px] uppercase tracking-[0.2em] transition-all duration-300 flex items-center justify-center gap-2.5 sm:gap-3 group/btn hover:border-transparent cursor-pointer"
              >
                <span>Explore Full Collection</span>
                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 transform group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </MagneticButton>
            </Link>
          </motion.div>
        </div>

        {/* Dynamic Category Grid - 2 columns on mobile, 3 on tablet, 5 on desktop */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-4 md:gap-6">
          {collectionProducts.map((product, idx) => (
            <div
              key={product.id}
              className="w-full"
            >
              <TiltCard className="h-full">
                <div className="group bg-[#FAF7F2] rounded-[14px] sm:rounded-[20px] p-2 sm:p-2.5 md:p-3 flex flex-col h-full border border-[#D4A24C]/10 hover:border-[#D4A24C]/30 shadow-[0_4px_20px_rgba(13,59,42,0.03)] hover:shadow-[0_20px_40px_rgba(13,59,42,0.1)] transition-all duration-500 relative overflow-hidden gap-1.5 md:gap-0">
                  
                  {/* Subtle Background Glow */}
                  <div className="absolute inset-0 bg-gradient-to-b from-white/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0" />

                  {/* Category Ribbon on Right Edge */}
                  <div className="absolute right-0 top-2 md:top-4 z-20 bg-[#F2E8D5] text-[#D4A24C] flex items-center justify-center py-0.5 px-1.5 sm:px-2 md:px-2.5 rounded-l-[5px] md:rounded-l-[8px] shadow-sm">
                    <span className="text-[7px] sm:text-[8px] md:text-[10px] font-sans font-extrabold uppercase tracking-widest leading-none">{product.category}</span>
                  </div>

                    <Link to={`/product/${product.slug}`} className="flex flex-col flex-grow w-full h-full text-inherit hover:no-underline">
                      {/* Image Container with compact aspect ratio */}
                      <div className="relative w-full shrink-0 aspect-[1/1] rounded-[10px] sm:rounded-[14px] overflow-hidden bg-white mb-1.5 sm:mb-2 md:mb-3 z-10 shadow-inner border border-gray-100 group/img">
                        <CursorImageSwap 
                          frontImg={product.cardImage || product.images[0]} 
                          backImg={product.cardHoverImage || (product.images && product.images.length > 1 ? product.images[1] : null)} 
                          alt={product.name} 
                        />
                        <div className="absolute inset-0 bg-[#0D3B2A]/0 group-hover:bg-[#0D3B2A]/5 transition-colors duration-500 pointer-events-none" />
                      </div>

                      {/* Product Details */}
                      <div className="flex flex-col flex-grow z-10 relative py-0.5">
                        
                        {/* Brand and Rating Row */}
                        <div className="flex flex-wrap items-center justify-between mb-1 gap-1">
                          <span className="text-[8px] sm:text-[9px] md:text-[10px] font-sans font-bold uppercase tracking-widest text-gray-400">AL-TOOBA</span>
                          <div className="flex items-center gap-0.5 sm:gap-1 text-[9px] sm:text-[10px] md:text-xs">
                            <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-3.5 md:h-3.5 fill-[#D4A24C]" viewBox="0 0 24 24">
                              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                            </svg>
                            <span className="font-sans font-medium text-gray-500">{product.rating}</span>
                            <span className="text-gray-300 mx-0.5 hidden sm:inline">|</span>
                            <span className="font-sans text-gray-400 hidden sm:inline">{product.reviewCount || 0}</span>
                          </div>
                        </div>

                        {/* Title */}
                        <h3 className="text-[11px] sm:text-[13px] md:text-[15px] font-sans font-bold text-[#0D3B2A] mb-1 sm:mb-1.5 leading-snug group-hover:text-[#D4A24C] transition-colors duration-300 line-clamp-2 min-h-[30px] sm:min-h-[36px] md:min-h-[40px]">
                          {product.name}
                        </h3>
                        
                        {/* Pricing Row */}
                        <div className="flex flex-wrap items-center gap-1 sm:gap-2 mb-2 sm:mb-3 mt-auto">
                          <span className="text-[13px] sm:text-[15px] md:text-[19px] font-sans font-bold text-[#D4A24C]">₹{product.price.toFixed(2)}</span>
                          {product.mrp && product.mrp > product.price && (
                            <span className="text-[9px] sm:text-[10px] md:text-xs font-sans text-gray-400 line-through">
                              ₹{product.mrp.toFixed(2)}
                            </span>
                          )}
                        </div>
                        
                        {/* Add to cart button */}
                        <div className="mt-auto relative z-20">
                          <div onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            if (!product.inStock) {
                              showToast('Product is out of stock', 'error');
                              return;
                            }
                            addItem(product);
                            showToast(`Added ${product.name} to cart`);
                          }}>
                            <MagneticButton 
                              style={{ '--liquid-bg': '#F7EFE0', '--liquid-text': '#0D3B2A' }}
                              className={`liquid w-full bg-[#0D3B2A] text-white hover:bg-[#F7EFE0] hover:text-[#0D3B2A] py-1.5 sm:py-2 md:py-3 rounded-lg sm:rounded-xl font-sans font-bold text-[9px] sm:text-[10px] md:text-[13px] uppercase tracking-wider sm:tracking-widest shadow-md flex items-center justify-center gap-1 sm:gap-1.5 md:gap-2 group/btn border-none ${!product.inStock ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                            >
                              <span>{product.inStock ? 'Add to Cart' : 'Out of Stock'}</span>
                              {product.inStock && (
                                <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z" />
                                </svg>
                              )}
                            </MagneticButton>
                          </div>
                        </div>
                      </div>
                    </Link>

                </div>
              </TiltCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
