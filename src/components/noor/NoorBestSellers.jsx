import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import TiltCard from './TiltCard';
import MagneticButton from './MagneticButton';

import { useCartStore } from '../../store/cartStore';
import { useToastStore } from '../../store/toastStore';
import { optimizeShopifyImage } from '../../utils/imageOptimizer';

const CursorImageSwap = ({ frontImg, backImg, alt }) => {
  const optimizedFront = optimizeShopifyImage(frontImg, 350);
  const optimizedBack = optimizeShopifyImage(backImg, 350);

  if (!optimizedBack) {
    return (
      <img 
        src={optimizedFront} 
        alt={alt}
        loading="lazy"
        decoding="async"
        className="w-full h-full object-cover object-center group-hover/img:scale-110 transition-transform duration-[1.2s] ease-out"
      />
    );
  }

  return (
    <div className="relative w-full h-full overflow-hidden group/swap">
      <img 
        src={optimizedFront} 
        alt={alt}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 w-full h-full object-cover object-center transition-all duration-500 ease-out group-hover/swap:opacity-0 group-hover/swap:scale-105 opacity-100 scale-100"
      />
      <img 
        src={optimizedBack}
        alt={`${alt} back`}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 w-full h-full object-cover object-center transition-all duration-500 ease-out opacity-0 group-hover/swap:opacity-100 group-hover/swap:scale-105"
      />
    </div>
  );
};

export default function NoorBestSellers({ products = [] }) {
  const addItem = useCartStore((state) => state.addItem);
  const showToast = useToastStore((state) => state.showToast);

  // Filter products that belong to the Shopify "Best Sellers" collection
  const bestSellerProducts = products.filter(p => {
    const handles = p.collections || [];
    const titles = p.collectionTitles || [];
    return handles.some(h => 
      h.includes('best-seller') || h.includes('best_seller') || h.includes('bestseller') || h.includes('best-sellers')
    ) || titles.some(t => 
      t.toLowerCase().includes('best seller') || t.toLowerCase().includes('bestseller')
    );
  });

  // If products are tagged with "Best Sellers" in Shopify, use them; otherwise fallback to top products
  const displayProducts = bestSellerProducts.length > 0 
    ? bestSellerProducts.slice(0, 5) 
    : [...products].sort((a, b) => (b.reviewCount || 0) - (a.reviewCount || 0) || b.rating - a.rating).slice(0, 5);

  return (
    <section className="relative bg-white py-8 sm:py-10 md:py-14 overflow-hidden border-t border-[#FAF7F2]">
      {/* Decorative Islamic Geometric Motifs (Abstracted via SVG) */}
      <div className="absolute top-0 right-0 w-64 h-64 opacity-5 pointer-events-none">
        <svg viewBox="0 0 100 100" fill="none" stroke="#0D3B2A" strokeWidth="0.5">
          <path d="M50 0 L100 50 L50 100 L0 50 Z" />
          <path d="M25 25 L75 75 M25 75 L75 25" />
          <circle cx="50" cy="50" r="35" />
        </svg>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8">
        <div className="text-center mb-6 sm:mb-8 relative z-10">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#0D3B2A] font-bold mb-2 sm:mb-3"
          >
            Our Best Sellers
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ delay: 0.1 }}
            className="text-[#D4A24C] font-sans font-bold tracking-[0.2em] uppercase text-xs md:text-sm"
          >
            Handpicked products loved by our customers
          </motion.p>
          <div className="w-12 h-0.5 bg-[#D4A24C] mx-auto mt-4 opacity-50" />
        </div>

        {/* grid (1 col on mobile, 3 on md, 5 on lg desktop) */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
          {displayProducts.map((product, idx) => (
            <div
              key={product.id}
              className="w-full"
            >
                <TiltCard className="h-full">
                  <div className="group bg-[#FAF7F2] rounded-[16px] sm:rounded-[20px] p-2.5 sm:p-3 flex flex-col h-full border border-[#D4A24C]/10 hover:border-[#D4A24C]/30 shadow-[0_8px_30px_rgba(13,59,42,0.03)] hover:shadow-[0_20px_40px_rgba(13,59,42,0.1)] transition-all duration-500 relative overflow-hidden gap-2 md:gap-0">
                    
                    {/* Subtle Background Glow */}
                    <div className="absolute inset-0 bg-gradient-to-b from-white/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0" />

                    <Link to={`/product/${product.slug}`} className="flex flex-col flex-grow w-full h-full text-inherit hover:no-underline">
                      {/* Image Container with compact aspect ratio */}
                      <div className="relative w-full shrink-0 aspect-[1/1] rounded-[12px] sm:rounded-[14px] overflow-hidden bg-white mb-2 md:mb-3 z-10 shadow-inner border border-gray-100 group/img">
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
                        <div className="flex flex-wrap items-center justify-between mb-1 sm:mb-1.5 gap-1">
                          <span className="text-[9px] sm:text-[10px] font-sans font-bold uppercase tracking-widest text-gray-600">AL-TOOBA</span>
                          <div className="flex items-center gap-1 text-[10px] sm:text-xs">
                            <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-[#8A5E12]" viewBox="0 0 24 24">
                              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                            </svg>
                            <span className="font-sans font-medium text-gray-700">{product.rating}</span>
                            <span className="text-gray-400 mx-0.5 hidden sm:inline">|</span>
                            <span className="font-sans text-gray-600 hidden sm:inline">{product.reviewCount || 0}</span>
                          </div>
                        </div>

                        {/* Title */}
                        <h3 className="text-[13px] sm:text-[15px] font-sans font-bold text-[#0D3B2A] mb-1.5 sm:mb-2 leading-snug group-hover:text-[#8A5E12] transition-colors duration-300 line-clamp-2 min-h-[36px] sm:min-h-[40px]">
                          {product.name}
                        </h3>
                        
                        {/* Pricing Row */}
                        <div className="flex flex-wrap items-center gap-1 sm:gap-2 mb-2 sm:mb-3 mt-auto">
                          <span className="text-[15px] sm:text-[19px] font-sans font-bold text-[#8A5E12]">₹{product.price.toFixed(2)}</span>
                          {product.mrp && product.mrp > product.price && (
                            <span className="text-[10px] sm:text-xs font-sans text-gray-600 line-through">
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
                              className={`liquid w-full bg-[#0D3B2A] text-white hover:bg-[#F7EFE0] hover:text-[#0D3B2A] py-2 sm:py-3 rounded-lg sm:rounded-xl font-sans font-bold text-[10px] sm:text-[13px] uppercase tracking-widest shadow-md flex items-center justify-center gap-1.5 sm:gap-2 group/btn border-none ${!product.inStock ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                            >
                              <span>{product.inStock ? 'Add to Cart' : 'Out of Stock'}</span>
                              {product.inStock && (
                                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
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
