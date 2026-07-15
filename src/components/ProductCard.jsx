import { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { useCartStore } from '../store/cartStore';
import { useWishlistStore } from '../store/wishlistStore';
import { useToastStore } from '../store/toastStore';
import { formatPrice } from '../utils/formatPrice';
import TrimmedImage from './TrimmedImage';

export default function ProductCard({ product, index = 0 }) {
  const cardRef = useRef(null);
  const imgRef = useRef(null);
  const imgContainerRef = useRef(null);
  const [showHoverImg, setShowHoverImg] = useState(false);

  const addItem = useCartStore((state) => state.addItem);
  const toggleWishlist = useWishlistStore((state) => state.toggleItem);
  const isWishlisted = useWishlistStore((state) => state.isWishlisted(product.id));
  const showToast = useToastStore((state) => state.showToast);

  // Alternating background color for image area
  const isEven = index % 2 === 0;
  const imageBgColor = isEven ? 'bg-forest-light' : 'bg-warm-light';

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMouseEnter = () => {
      gsap.to(card, {
        scale: 1.03,
        boxShadow: '0 20px 40px rgba(31, 58, 29, 0.08)',
        borderColor: '#c8a86a',
        duration: 0.3,
        ease: 'power2.out'
      });
    };

    const handleMouseLeave = () => {
      gsap.to(card, {
        scale: 1.0,
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.02)',
        borderColor: '#ddd5c4',
        duration: 0.3,
        ease: 'power2.out'
      });
    };

    card.addEventListener('mouseenter', handleMouseEnter);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mouseenter', handleMouseEnter);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const hoverImage = product.cardHoverImage || (product.images && product.images.length > 1 ? product.images[1] : null);

  const handleMouseMove = (e) => {
    if (!hoverImage || !imgContainerRef.current) return;
    const { left, width } = imgContainerRef.current.getBoundingClientRect();
    const x = e.clientX - left;
    setShowHoverImg(x / width > 0.5);
  };

  const handleMouseLeaveImg = () => {
    setShowHoverImg(false);
  };

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

  const handleWishlistToggle = (e) => {
    e.preventDefault();
    toggleWishlist(product);
    showToast(isWishlisted ? `Removed ${product.name} from wishlist` : `Added ${product.name} to wishlist`);
  };

  // Badge mapping
  let badgeClass = 'bg-forest text-parchment';
  if (product.badge === 'NEW') badgeClass = 'bg-[#2e5c46] text-parchment';
  if (product.badge === 'LIMITED') badgeClass = 'bg-[#7a2020] text-parchment';

  return (
    <div
      ref={cardRef}
      className="group bg-[#FAF7F2] rounded-[16px] sm:rounded-[24px] p-3 flex flex-col h-full border border-[#D4A24C]/10 hover:border-[#D4A24C]/30 shadow-[0_8px_30px_rgba(13,59,42,0.03)] hover:shadow-[0_20px_40px_rgba(13,59,42,0.1)] transition-all duration-500 relative overflow-hidden gap-3 md:gap-0 w-full"
    >
      {/* Subtle Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0" />

      {/* Category Ribbon on Right Edge */}
      <div className="absolute right-0 top-3 md:top-6 z-20 bg-[#F2E8D5] text-[#D4A24C] flex items-center justify-center py-1 px-2 md:px-3 rounded-l-[6px] md:rounded-l-[8px] shadow-sm">
        <span className="text-[9px] md:text-[11px] font-sans font-extrabold uppercase tracking-widest leading-none">{product.category || 'Product'}</span>
      </div>

      <Link to={`/product/${product.slug}`} className="flex flex-col flex-grow w-full h-full text-inherit hover:no-underline">
        {/* Image Container with a clean thin border */}
        <div 
          ref={imgContainerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeaveImg}
          className="relative w-full shrink-0 aspect-[10/11] md:aspect-[4/5] rounded-[12px] sm:rounded-[16px] overflow-hidden bg-white md:mb-5 z-10 shadow-inner border border-gray-100 group/img"
        >
          <TrimmedImage 
            src={showHoverImg && hoverImage ? hoverImage : (product.cardImage || product.images[0])} 
            alt={product.name} 
            className="w-full h-full object-contain p-4 transition-transform duration-500 ease-out group-hover/img:scale-110"
          />
          <div className="absolute inset-0 bg-[#0D3B2A]/0 group-hover:bg-[#0D3B2A]/5 transition-colors duration-500 pointer-events-none" />
          
          {/* Out of Stock Overlay */}
          {!product.inStock && (
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center z-20 backdrop-blur-[2px]">
              <span className="text-[10px] md:text-sm font-sans font-bold tracking-widest px-2 py-1 md:px-4 md:py-2 rounded-full uppercase bg-[#7a2020] text-parchment shadow-md">
                SOLD OUT
              </span>
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className="flex flex-col flex-grow z-10 relative py-1">
          
          {/* Brand and Rating Row */}
          <div className="flex flex-wrap items-center justify-between mb-1.5 sm:mb-2 gap-1">
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
          <h3 className="text-[14px] sm:text-[17px] font-sans font-bold text-[#0D3B2A] mb-2 sm:mb-3 leading-snug group-hover:text-[#D4A24C] transition-colors duration-300 line-clamp-2 min-h-[44px] sm:min-h-[50px]">
            {product.name}
          </h3>
          
          {/* Pricing Row */}
          <div className="flex flex-wrap items-center gap-1 sm:gap-2 mb-3 md:mb-6 mt-auto">
            <span className="text-[16px] sm:text-[22px] font-sans font-bold text-[#D4A24C]">₹{product.price.toFixed(2)}</span>
            {product.mrp && product.mrp > product.price && (
              <span className="text-[11px] sm:text-sm font-sans text-gray-400 line-through">
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
