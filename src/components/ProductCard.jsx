import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useCartStore } from '../store/cartStore';
import { useToastStore } from '../store/toastStore';

export default function ProductCard({ product, index = 0 }) {
  const cardRef = useRef(null);

  const addItem = useCartStore((state) => state.addItem);
  const showToast = useToastStore((state) => state.showToast);

  const hoverImage = product.cardHoverImage || (product.images && product.images.length > 1 ? product.images[1] : null);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!product.inStock) {
      showToast('Product is out of stock', 'error');
      return;
    }
    addItem(product);
    showToast(`Added ${product.name} to cart`);
  };

  return (
    <div
      ref={cardRef}
      className="group bg-[#FAF7F2] rounded-[16px] sm:rounded-[20px] p-2.5 sm:p-3 flex flex-col h-full border border-[#D4A24C]/10 hover:border-[#D4A24C]/30 shadow-[0_8px_30px_rgba(13,59,42,0.03)] hover:shadow-[0_20px_40px_rgba(13,59,42,0.1)] transition-all duration-500 relative overflow-hidden gap-2 md:gap-0 w-full"
    >
      {/* Subtle Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0" />

      {/* Category Ribbon on Right Edge */}
      <div className="absolute right-0 top-2.5 md:top-4 z-20 bg-[#F2E8D5] text-[#D4A24C] flex items-center justify-center py-0.5 px-2 md:px-2.5 rounded-l-[6px] md:rounded-l-[8px] shadow-sm">
        <span className="text-[8px] md:text-[10px] font-sans font-extrabold uppercase tracking-widest leading-none">{product.category || 'Product'}</span>
      </div>

      <Link to={`/product/${product.slug}`} className="flex flex-col flex-grow w-full h-full text-inherit hover:no-underline">
        {/* Image Container with compact aspect ratio */}
        <div 
          className="relative w-full shrink-0 aspect-[10/11] md:aspect-[1/1] rounded-[12px] sm:rounded-[14px] overflow-hidden bg-white md:mb-3 z-10 shadow-inner border border-gray-100 group/img"
        >
          <img 
            src={product.cardImage || product.images[0]} 
            alt={product.name} 
            loading="lazy"
            className={`w-full h-full object-contain p-2 sm:p-3 transition-all duration-500 ease-out group-hover/img:scale-110 ${hoverImage ? 'group-hover/img:opacity-0' : ''}`}
          />
          {hoverImage && (
            <img 
              src={hoverImage} 
              alt={product.name} 
              loading="lazy"
              className="absolute inset-0 w-full h-full object-contain p-2 sm:p-3 transition-all duration-500 ease-out opacity-0 group-hover/img:opacity-100 group-hover/img:scale-110 pointer-events-none"
            />
          )}
          <div className="absolute inset-0 bg-[#0D3B2A]/0 group-hover:bg-[#0D3B2A]/5 transition-colors duration-500 pointer-events-none" />
          
          {/* Out of Stock Overlay */}
          {!product.inStock && (
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center z-20 backdrop-blur-[2px]">
              <span className="text-[10px] md:text-xs font-sans font-bold tracking-widest px-2 py-1 md:px-3 md:py-1.5 rounded-full uppercase bg-[#7a2020] text-parchment shadow-md">
                SOLD OUT
              </span>
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className="flex flex-col flex-grow z-10 relative py-0.5">
          
          {/* Brand and Rating Row */}
          <div className="flex flex-wrap items-center justify-between mb-1 sm:mb-1.5 gap-1">
            <span className="text-[9px] sm:text-[10px] font-sans font-bold uppercase tracking-widest text-gray-400">AL-TOOBA</span>
            <div className="flex items-center gap-1 text-[10px] sm:text-xs">
              <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-[#D4A24C]" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              <span className="font-sans font-medium text-gray-500">{product.rating || '4.8'}</span>
              <span className="text-gray-300 mx-0.5 hidden sm:inline">|</span>
              <span className="font-sans text-gray-400 hidden sm:inline">{product.reviewCount || '38'}</span>
            </div>
          </div>

          {/* Title */}
          <h3 className="text-[13px] sm:text-[15px] font-sans font-bold text-[#0D3B2A] mb-1.5 sm:mb-2 leading-snug group-hover:text-[#D4A24C] transition-colors duration-300 line-clamp-2 min-h-[36px] sm:min-h-[40px]">
            {product.name}
          </h3>
          
          {/* Pricing Row */}
          <div className="flex flex-wrap items-center gap-1 sm:gap-2 mb-2 sm:mb-3 mt-auto">
            <span className="text-[15px] sm:text-[19px] font-sans font-bold text-[#D4A24C]">₹{product.price.toFixed(2)}</span>
            {product.mrp && product.mrp > product.price && (
              <span className="text-[10px] sm:text-xs font-sans text-gray-400 line-through">
                ₹{product.mrp.toFixed(2)}
              </span>
            )}
          </div>
        </div>
      </Link>

      {/* Add to cart button */}
      <div className="mt-auto relative z-20">
        <button 
          onClick={handleAddToCart}
          disabled={!product.inStock}
          className={`w-full bg-[#0D3B2A] text-white hover:bg-[#F7EFE0] hover:text-[#0D3B2A] py-2 sm:py-3 rounded-lg sm:rounded-xl font-sans font-bold text-[10px] sm:text-[13px] uppercase tracking-widest shadow-md flex items-center justify-center gap-1.5 sm:gap-2 group/btn border-none transition-all duration-300 ${!product.inStock ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
        >
          <span>{product.inStock ? 'Add to Cart' : 'Out of Stock'}</span>
          {product.inStock && (
            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}
