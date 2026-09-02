import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getProductBySlug, getProducts, getCachedProductBySlugSync, getCachedProductsSync } from '../services/shopify';
import { useCartStore } from '../store/cartStore';
import { useToastStore } from '../store/toastStore';
import TrustedBy from '../components/TrustedBy';
import ProductCard from '../components/ProductCard';

export default function ProductDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [showFullDesc, setShowFullDesc] = useState(false);
  const [isZooming, setIsZooming] = useState(false);
  const [zoomStyle, setZoomStyle] = useState({ transform: 'scale(1)', transformOrigin: 'center center' });

  const [product, setProduct] = useState(() => getCachedProductBySlugSync(slug));
  const [selectedVariant, setSelectedVariant] = useState(() => {
    const cached = getCachedProductBySlugSync(slug);
    return cached?.variants?.[0] || null;
  });
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(() => !getCachedProductBySlugSync(slug));

  const addItem = useCartStore((state) => state.addItem);
  const showToast = useToastStore((state) => state.showToast);

  useEffect(() => {
    async function loadProduct() {
      if (!product) {
        setIsLoading(true);
      }
      try {
        const fetchedProduct = await getProductBySlug(slug);
        if (!fetchedProduct) {
          navigate('/studio');
          return;
        }
        setProduct(fetchedProduct);
        if (fetchedProduct.variants && fetchedProduct.variants.length > 0) {
          setSelectedVariant(fetchedProduct.variants[0]);
        } else {
          setSelectedVariant(null);
        }
        setActiveImage(0);
        setQuantity(1);
        setShowFullDesc(false);
        
        // Force scroll to top after DOM update
        setTimeout(() => {
          window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
        }, 10);

        // Load related products
        const allProducts = await getProducts();
        const related = allProducts
          .filter(p => 
            p.category === fetchedProduct.category && 
            p.id !== fetchedProduct.id &&
            !p.name.toLowerCase().includes('al-rayhan') &&
            !p.name.toLowerCase().includes('tulsi')
          )
          .slice(0, 4);
        setRelatedProducts(related);
      } catch (error) {
        console.error("Failed to load product:", error);
      } finally {
        setIsLoading(false);
      }
    }
    loadProduct();
  }, [slug, navigate]);

  if (isLoading) {
    return (
      <div className="pt-32 pb-24 min-h-screen bg-[#FAF7F2] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-[#0D3B2A]/20 border-t-[#D4A24C] rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!product) return null;

  const currentPrice = selectedVariant ? selectedVariant.price : product.price;
  const mrpPrice = selectedVariant ? (selectedVariant.mrp || selectedVariant.price * 1.25) : (product.mrp || product.price * 1.25);
  const discountPercent = selectedVariant && selectedVariant.discount !== undefined
    ? selectedVariant.discount
    : Math.round(((mrpPrice - currentPrice) / (mrpPrice || 1)) * 100);

  // Ensure maximum 5 images for the gallery without duplication
  const finalImages = product.images.slice(0, 5);

  const handleAddToCart = () => {
    if (!product.inStock) {
      showToast('Product is out of stock', 'error');
      return;
    }
    for (let i = 0; i < quantity; i++) {
      addItem(product, selectedVariant?.title || null);
    }
    const variantSuffix = selectedVariant && selectedVariant.title !== 'Default Title' ? ` (${selectedVariant.title})` : '';
    showToast(`Added ${quantity}x ${product.name}${variantSuffix} to cart`);
  };

  const handleBuyNow = () => {
    if (!product.inStock) {
      showToast('Product is out of stock', 'error');
      return;
    }
    for (let i = 0; i < quantity; i++) {
      addItem(product, selectedVariant?.title || null);
    }
    window.scrollTo(0, 0);
    navigate('/checkout');
  };

  const [touchStartX, setTouchStartX] = useState(0);

  const handlePrevImage = () => {
    setActiveImage((prev) => (prev > 0 ? prev - 1 : finalImages.length - 1));
  };

  const handleNextImage = () => {
    setActiveImage((prev) => (prev < finalImages.length - 1 ? prev + 1 : 0));
  };

  useEffect(() => {
    const container = document.getElementById('product-thumbnails-container');
    const activeBtn = container?.children?.[activeImage];
    if (activeBtn) {
      activeBtn.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }
  }, [activeImage]);

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomStyle({
      transformOrigin: `${x}% ${y}%`,
      transform: 'scale(2.5)'
    });
  };

  const handleMouseEnter = () => {
    setIsZooming(true);
  };

  const handleMouseLeave = () => {
    setIsZooming(false);
    setZoomStyle({ transform: 'scale(1)', transformOrigin: 'center center' });
  };

  return (
    <div className="bg-[#f6f5ef] min-h-screen pt-24 sm:pt-28 pb-4 sm:pb-6">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-10 items-start">
          
          {/* Left Column: Gallery */}
          <div className="flex flex-col-reverse lg:flex-row gap-4 lg:gap-6 sticky top-28 self-start">
            
            {/* Thumbnails */}
            <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-visible items-center scrollbar-none py-1">
              {finalImages.length > 1 && (
                <button 
                  onClick={handlePrevImage}
                  className="lg:hidden flex-shrink-0 w-8 h-16 sm:h-20 flex items-center justify-center text-gray-500 hover:text-black cursor-pointer active:scale-95 transition-transform"
                  aria-label="Previous image"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" /></svg>
                </button>
              )}

              <div id="product-thumbnails-container" className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-visible py-1 scrollbar-none">
                {finalImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(idx)}
                    className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-[14px] overflow-hidden bg-[#e6e6e6] transition-all flex-shrink-0 cursor-pointer ${
                      activeImage === idx 
                        ? 'ring-2 ring-[#0D3B2A] border-transparent scale-105 shadow-md' 
                        : 'opacity-70 hover:opacity-100 border border-gray-200'
                    }`}
                  >
                    <img 
                      src={img} 
                      alt="" 
                      className="w-full h-full object-contain p-1.5 mix-blend-multiply"
                    />
                  </button>
                ))}
              </div>

              {finalImages.length > 1 && (
                <button 
                  onClick={handleNextImage}
                  className="lg:hidden flex-shrink-0 w-8 h-16 sm:h-20 flex items-center justify-center text-gray-500 hover:text-black cursor-pointer active:scale-95 transition-transform"
                  aria-label="Next image"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" /></svg>
                </button>
              )}
            </div>

            {/* Main Image */}
            <div 
              className="relative flex-grow bg-[#e6e6e6] rounded-[20px] overflow-hidden flex items-center justify-center cursor-crosshair w-full aspect-square touch-pan-y"
              onMouseMove={handleMouseMove}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onTouchStart={(e) => setTouchStartX(e.targetTouches[0].clientX)}
              onTouchEnd={(e) => {
                if (!touchStartX) return;
                const touchEndX = e.changedTouches[0].clientX;
                const diff = touchStartX - touchEndX;
                if (diff > 40) handleNextImage();
                else if (diff < -40) handlePrevImage();
                setTouchStartX(0);
              }}
            >
              {/* Counter */}
              {finalImages.length > 1 && (
                <div className="absolute top-4 right-4 bg-black/70 text-white text-[11px] font-bold px-3 py-1 rounded-full z-10 pointer-events-none">
                  {activeImage + 1} / {finalImages.length}
                </div>
              )}

              {/* Mobile Main Image Navigation Arrows */}
              {finalImages.length > 1 && (
                <>
                  <button
                    onClick={(e) => { e.stopPropagation(); handlePrevImage(); }}
                    className="lg:hidden absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 backdrop-blur-sm text-gray-800 shadow-md flex items-center justify-center z-10 active:scale-90 transition-transform"
                    aria-label="Previous"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" /></svg>
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); handleNextImage(); }}
                    className="lg:hidden absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 backdrop-blur-sm text-gray-800 shadow-md flex items-center justify-center z-10 active:scale-90 transition-transform"
                    aria-label="Next"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" /></svg>
                  </button>
                </>
              )}
              
              <img 
                src={finalImages[activeImage]} 
                alt={product.name} 
                className={`w-full h-full object-contain mix-blend-multiply transition-transform duration-300 ${isZooming ? 'ease-out' : 'ease-in-out'}`}
                style={isZooming ? zoomStyle : { transform: 'scale(1)', transformOrigin: 'center center' }}
              />
            </div>
          </div>

          {/* Right Column: Info */}
          <div className="flex flex-col py-1">
            
            {/* Category Line */}
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-[1px] bg-[#c8a86a]"></div>
              <span className="text-[#c8a86a] text-[10px] font-bold tracking-[0.2em] uppercase">
                {product.category || 'PROPHETIC REMEDY'}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-2xl sm:text-[32px] font-bold text-gray-900 leading-tight mb-4 font-sans tracking-tight">
              {product.name}
            </h1>

            {/* Price Block */}
            <div className="flex items-center gap-3 sm:gap-4 mb-5">
              <span className="text-[26px] sm:text-[28px] font-bold text-[#0D3B2A] font-sans">
                ₹ {currentPrice.toFixed(0)}
              </span>
              <span className="text-base sm:text-lg text-gray-400 line-through font-medium">
                ₹ {mrpPrice.toFixed(0)}
              </span>
              <span className="bg-[#ffe8e8] text-[#d63a3a] text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
                Save {discountPercent}%
              </span>
            </div>

            {/* Multi-Weight / Size Variant Selector (RuhaniSouq Style) */}
            {product.variants && product.variants.length > 1 && product.variants[0].title !== 'Default Title' && (
              <div className="mb-5 bg-white p-3.5 sm:p-4 rounded-2xl border border-gray-200/90 shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
                <div className="text-[11px] font-sans font-bold uppercase tracking-wider text-[#0D3B2A] mb-3 flex items-center justify-between">
                  <span>
                    OPTION: <strong className="text-[#0D3B2A] font-extrabold text-[12px] bg-[#FAF7F2] px-2.5 py-0.5 rounded border border-[#0D3B2A]/10 ml-1">{selectedVariant?.title}</strong>
                  </span>
                  <span className="text-[10px] text-gray-400 font-medium">{product.variants.length} options available</span>
                </div>

                <div className="flex flex-wrap gap-2.5 sm:gap-3">
                  {product.variants.map((v) => {
                    const isSelected = selectedVariant?.id === v.id;
                    const vThumb = v.image || product.images[0];

                    return (
                      <button
                        key={v.id}
                        type="button"
                        onClick={() => {
                          setSelectedVariant(v);
                          if (v.image) {
                            const imgIdx = finalImages.findIndex(img => img === v.image);
                            if (imgIdx > -1) {
                              setActiveImage(imgIdx);
                            }
                          }
                        }}
                        className={`flex flex-col items-center justify-between p-2.5 rounded-2xl border-2 transition-all duration-200 min-w-[90px] sm:min-w-[105px] bg-white cursor-pointer relative ${
                          isSelected
                            ? 'border-[#0D3B2A] shadow-[0_6px_20px_rgba(13,59,42,0.18)] bg-[#FAF7F2]/60 ring-2 ring-[#0D3B2A]/20 scale-[1.03]'
                            : 'border-gray-200 hover:border-gray-400 opacity-80 hover:opacity-100'
                        }`}
                      >
                        {/* Thumbnail Image */}
                        <div className="w-12 h-12 sm:w-14 sm:h-14 mb-2 flex items-center justify-center overflow-hidden rounded-xl bg-[#FAF7F2] p-1">
                          <img
                            src={vThumb}
                            alt={v.title}
                            className="w-full h-full object-contain mix-blend-multiply transition-transform hover:scale-105"
                          />
                        </div>

                        {/* Variant Weight / Name */}
                        <span className={`text-[11px] sm:text-[12px] font-bold font-sans mb-0.5 ${
                          isSelected ? 'text-[#0D3B2A]' : 'text-gray-700'
                        }`}>
                          {v.title}
                        </span>

                        {/* Price & Strikethrough MRP */}
                        <div className="flex flex-col items-center">
                          <span className="text-[12px] sm:text-[13px] font-extrabold text-[#0D3B2A] font-sans">
                            ₹{v.price.toFixed(0)}
                          </span>
                          {v.mrp > v.price && (
                            <span className="text-[9px] text-gray-400 line-through font-medium">
                              ₹{v.mrp.toFixed(0)}
                            </span>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Feature Grid */}
            <div className="grid grid-cols-2 gap-y-4 gap-x-4 mb-5">
              <div className="flex items-center gap-2.5">
                <svg className="w-4 h-4 text-[#c8a86a]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path></svg>
                <span className="text-[11px] sm:text-[12px] font-bold text-gray-800">100% Pure & Natural</span>
              </div>
              <div className="flex items-center gap-2.5">
                <svg className="w-4 h-4 text-[#c8a86a]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path></svg>
                <span className="text-[11px] sm:text-[12px] font-bold text-gray-800">Prophetic Sunnah</span>
              </div>
              <div className="flex items-center gap-2.5">
                <svg className="w-4 h-4 text-[#c8a86a]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path></svg>
                <span className="text-[11px] sm:text-[12px] font-bold text-gray-800">Fast Delivery</span>
              </div>
              <div className="flex items-center gap-2.5">
                <svg className="w-4 h-4 text-[#c8a86a]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                <span className="text-[11px] sm:text-[12px] font-bold text-gray-800">Secure Checkout</span>
              </div>
            </div>

            <hr className="border-t border-gray-200 mb-5" />

            {/* Description */}
            <div className="mb-2">
              <div 
                className={`text-[13px] text-gray-500 font-sans leading-relaxed [&>p]:mb-3 [&>ul]:list-disc [&>ul]:pl-5 [&>ul>li]:mb-1 [&>h2]:font-bold [&>h2]:text-gray-800 [&>h2]:mb-2 [&>h2]:mt-4 [&>h3]:font-bold [&>h3]:text-gray-800 [&>h3]:mb-2 [&>h3]:mt-4 [&>strong]:font-bold [&>strong]:text-gray-800 ${!showFullDesc ? 'line-clamp-3' : ''}`}
                dangerouslySetInnerHTML={{ __html: (product.descriptionHtml || product.description || product.shortDesc || '').replace(/<img[^>]*>/gi, '') }}
              />
            </div>
            
            <button 
              onClick={() => setShowFullDesc(!showFullDesc)}
              className="text-[10px] font-bold text-[#0D3B2A] uppercase tracking-widest flex items-center gap-1 mb-6 hover:text-[#c8a86a] transition-colors w-fit"
            >
              READ {showFullDesc ? 'LESS' : 'MORE'} 
              <svg className={`w-3 h-3 transform transition-transform ${showFullDesc ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </button>

            {/* Quantity and Action Row */}
            <div className="flex flex-col gap-3.5">
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                <div className="flex items-center gap-4 shrink-0">
                  <span className="text-[11px] font-bold tracking-widest text-gray-900 uppercase">QUANTITY:</span>
                  <div className="flex items-center justify-between border border-gray-300 rounded-full px-4 py-1.5 bg-white min-w-[100px]">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="text-gray-500 hover:text-black font-bold focus:outline-none w-6 h-6 flex items-center justify-center text-lg cursor-pointer"
                    >
                      -
                    </button>
                    <span className="font-sans font-bold text-black px-2 text-sm">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="text-gray-500 hover:text-black font-bold focus:outline-none w-6 h-6 flex items-center justify-center text-lg cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className="w-full sm:flex-1 bg-white text-[#153423] border-2 border-[#153423] hover:bg-[#153423] hover:text-white transition-all duration-300 py-3.5 rounded-[14px] font-sans font-bold text-[12px] uppercase tracking-widest disabled:opacity-50 disabled:cursor-not-allowed shadow-sm cursor-pointer flex items-center justify-center gap-2"
                >
                  {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                  {product.inStock && (
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                      <line x1="3" y1="6" x2="21" y2="6"></line>
                      <path d="M16 10a4 4 0 0 1-8 0"></path>
                    </svg>
                  )}
                </button>
              </div>

              {/* Instant Checkout / Buy Now Button */}
              <button
                onClick={handleBuyNow}
                disabled={!product.inStock}
                className="w-full bg-[#153423] hover:bg-[#1f4a33] text-[#FAF7F2] transition-all duration-300 py-3.5 rounded-[14px] font-sans font-bold text-[13px] uppercase tracking-widest disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_4px_16px_rgba(21,52,35,0.2)] hover:shadow-lg hover:scale-[1.008] active:scale-[0.99] cursor-pointer flex items-center justify-center gap-2.5"
              >
                <span>Proceed to Checkout</span>
                <svg className="w-4 h-4 text-[#D4A24C]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </button>
            </div>

          </div>
        </div>
      </div>
      
      {/* Visual Description Section */}
      {product.descriptionHtml && (
        <div className="w-full mt-16 flex flex-col items-center">
          {[...product.descriptionHtml.matchAll(/<img[^>]+src=["']([^"']+)["']/gi)].map((match, idx) => (
            <img 
              key={idx} 
              src={match[1]} 
              alt={`${product.name} Description ${idx + 1}`} 
              className="w-full object-cover block" 
            />
          ))}
        </div>
      )}

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="max-w-6xl mx-auto px-4 sm:px-8 mt-16 mb-8">
          <div className="flex items-center gap-3 mb-6 sm:mb-8">
            <div className="w-8 h-[2px] bg-[#c8a86a]"></div>
            <h2 className="text-xl sm:text-2xl font-bold font-serif text-gray-900 uppercase tracking-wide">You May Also Like</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
            {relatedProducts.map((p, idx) => (
              <ProductCard key={p.id} product={p} index={idx} />
            ))}
          </div>
        </div>
      )}

      {/* Product Specific Reviews */}
      <TrustedBy productId={product.id} productName={product.name} />
    </div>
  );
}
